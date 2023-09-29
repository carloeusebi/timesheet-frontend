<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { Timesheet } from '@/assets/interfaces';
import axiosInstance from '@/assets/axios';
import { useAuthStore, useLoaderStore } from '@/stores';
import AppAlert from '@/components/AppAlert.vue';
import TimesheetForm from '@/components/TimesheetForm.vue';
import { isAxiosError } from 'axios';
import { calculateHours, localizeTime } from '@/assets/helpers';

const route = useRoute();
const id = route.params.id as string;

const timesheet = ref<Timesheet | null>(null);
const loader = useLoaderStore();
const user = useAuthStore();
const editMode = ref(false);
const errors = ref<{ [field: string]: string }>({});

const fetchTimesheet = async (id: string) => {
	loader.setLoader();
	try {
		const { data } = await axiosInstance.get(`timesheets/${id}`);
		timesheet.value = {...data};
	} catch (err) {
		console.error(err);
	} finally {
		loader.unsetLoader();
	}
};

/**
 * Handles the update form submission.
 *
 * @param timesheet - The Timesheet with the updated data
 */
const handleFormSubmission = async (updatedTimesheet: Timesheet) => {
	loader.setLoader();
	errors.value = {};
	try {
		const { data } = await axiosInstance.put(`timesheets/${updatedTimesheet.id}`, updatedTimesheet);
		timesheet.value = { ...data };
		editMode.value = false;
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
					<li><strong>Start: </strong>{{ localizeTime(timesheet.activityStart) }}</li>
					<li><strong>End: </strong>{{ localizeTime(timesheet.activityEnd) }}</li>
					<li><strong>Hours: </strong>{{ calculateHours(timesheet.activityStart, timesheet.activityEnd)}}</li>
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
