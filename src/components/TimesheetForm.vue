<script lang="ts" setup>
import { Project, Timesheet } from '@/assets/interfaces';
import { useAuthStore } from '@/stores';
import { computed, ref, onMounted } from 'vue';
import AppAlert from './AppAlert.vue';
import axiosInstance from '@/assets/axios';

interface Props {
	timesheet?: Timesheet;
	errors: { [field: string]: string };
}
const props = defineProps<Props>();
const userProjects = ref<Project[] | null>();

// all the form's field, with defaults based on the timesheet prop
const selectedProjectId = ref<number | null>(props.timesheet?.project?.id || null);
const selectedActivityId = ref<number | null>(props.timesheet?.activity?.id || null);
const description = ref(props.timesheet?.description || '');
const hours = ref(props.timesheet?.hours || '');

// sets default date to today
const today = new Date().toISOString().slice(0, 10);
const date = ref(props.timesheet?.date || today);

const emit = defineEmits(['form-submit']);

const fetchProjects = async () => {
	const { data } = await axiosInstance.get('projects');
	userProjects.value = data;
};

/**
 * Calculates the activities based on the current selected project
 */
const projectActivities = computed(() => {
	if (!userProjects.value) return [];
	const selectedProject = userProjects.value.find(({ id }) => id === selectedProjectId.value);
	return selectedProject?.activities;
});
const thereAreErrors = computed(() => Object.keys(props.errors).length > 0);

/**
 * Builds the form and emits the form submission event.
 */
const handleFormSubmission = () => {
	const userId = useAuthStore().user?.id;

	const form = {
		id: props.timesheet?.id ?? null,
		userId,
		projectId: selectedProjectId.value,
		activityId: selectedActivityId.value,
		description: description.value,
		hours: hours.value,
		date: date.value,
	};
	// todo frontend validation

	emit('form-submit', form);
};

onMounted(async () => {
	fetchProjects();
});
</script>

<template>
	<!-- FORM -->
	<form @submit.prevent="handleFormSubmission">
		<!-- ALERT -->
		<AppAlert
			:show="thereAreErrors"
			type="warning"
		>
			<ul class="list-unstyled">
				<li
					v-for="error in errors"
					:key="error"
				>
					{{ error }}
				</li>
			</ul>
		</AppAlert>

		<div class="d-flex gap-3">
			<!-- PROJECT -->
			<div>
				<label for="project">Project:</label>
				<select
					id="project"
					class="form-select"
					v-model="selectedProjectId"
				>
					<option
						v-for="project in userProjects"
						:key="project.id"
						:value="project.id"
						:selected="project.id == timesheet?.project?.id"
					>
						{{ project.name }}
					</option>
				</select>
			</div>
			<!-- ACTIVITY -->
			<div>
				<label for="activity">Activity:</label>
				<select
					id="activity"
					class="form-select"
					v-model="selectedActivityId"
				>
					<option
						v-for="activity in projectActivities"
						:key="activity.id"
						:value="activity.id"
						:selected="activity.id == timesheet?.activity?.id"
					>
						{{ activity.name }}
					</option>
				</select>
			</div>
			<!-- DATE -->
			<div>
				<label for="date">Date</label>
				<input
					id="date"
					type="date"
					class="form-control"
					v-model="date"
				/>
			</div>
			<!-- HOURS -->
			<div>
				<label for="hours">Hours</label>
				<input
					id="hours"
					type="number"
					class="form-control"
					max="8"
					min="1"
					v-model="hours"
				/>
			</div>
		</div>
		<!-- DESCRIPTION -->
		<div class="my-3">
			<label for="description">Description:</label>
			<div class="mb-3">
				<textarea
					class="form-control"
					id="description"
					rows="3"
					v-model="description"
					:class="{ 'is-invalid': errors.description }"
				></textarea>
				<div class="invalid-feedback">
					{{ errors.description }}
				</div>
			</div>
		</div>
		<div>
			<button class="btn btn-success px-5">Save</button>
		</div>
	</form>
</template>

<style scoped></style>
