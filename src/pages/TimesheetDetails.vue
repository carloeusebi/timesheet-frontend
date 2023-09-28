<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { Project, Timesheet } from '@/assets/interfaces';
import axiosInstance from '@/assets/axios';
import { useAuthStore, useLoaderStore } from '@/stores';
import AppAlert from '@/components/AppAlert.vue';
import TimesheetForm from '@/components/TimesheetForm.vue';
import { isAxiosError } from 'axios';

const route = useRoute();
const id = route.params.id as string;

const timesheet = ref<Timesheet | null>(null);
const userProjects = ref<Project[] | null>(null);
const loader = useLoaderStore();
const user = useAuthStore();
const editMode = ref(false);

const errors = ref<{ [field: string]: string }>({});

const fetchTimesheet = async (id: string) => {
	loader.setLoader();
	try {
		const { data } = await axiosInstance.get(`timesheets/${id}`);
		timesheet.value = data;
	} catch (err) {
		console.error(err);
	} finally {
		loader.unsetLoader();
	}
};

const fetchProjects = async () => {
	const { data } = await axiosInstance.get('projects');
	userProjects.value = data;
};

const handleFormSubmission = async (timesheet: Timesheet) => {
	loader.setLoader();
	errors.value = {};
	try {
		await axiosInstance.put(`timesheets/${timesheet.id}`, timesheet);
	} catch (err) {
		if (isAxiosError(err)) {
			// build the error object;
			const errorsInResponse = err.response?.data.errors;
			for (let field in errorsInResponse) errors.value[field] = errorsInResponse[field][0];
			console.log(errors.value);
		}
	} finally {
		loader.unsetLoader();
	}
};

onMounted(async () => {
	fetchTimesheet(id);
	fetchProjects();
});
</script>

<template>
	<RouterLink :to="{ name: 'home' }">
		<button class="my-3 btn btn-secondary">Back</button>
	</RouterLink>
	<button
		class="ms-3 btn btn-primary"
		v-if="!user.isAdmin"
		@click="editMode = !editMode"
	>
		Edit
	</button>
	<div
		class="card"
		v-if="timesheet"
	>
		<div class="card-body">
			<strong>Employee: </strong>{{ timesheet.user.name }}
			<div
				class="card-content"
				v-if="editMode"
			>
				<hr />
				<TimesheetForm
					@form-submit="handleFormSubmission"
					:timesheet="timesheet"
					:user-projects="userProjects"
					:errors="errors"
				/>
			</div>
			<div
				v-else
				class="card-content"
			>
				<ul class="list-unstyled">
					<li><strong>Project: </strong>{{ timesheet.project.name }}</li>
					<li><strong>Activity: </strong>{{ timesheet.activity.name }}</li>
					<li><strong>Date: </strong>{{ timesheet.date }}</li>
					<li><strong>Hours: </strong>{{ timesheet.hours }}</li>
				</ul>
				<div><strong>Description:</strong></div>
				<p>
					{{ timesheet.description }}
				</p>
			</div>
		</div>
	</div>
	<div v-else>
		<AppAlert
			type="info"
			:show="!loader.isLoading"
		>
			Timesheet not found
		</AppAlert>
	</div>
</template>

<style scoped></style>
