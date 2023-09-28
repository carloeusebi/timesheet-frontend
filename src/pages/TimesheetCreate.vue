<script lang="ts" setup>
import axiosInstance from '@/assets/axios';
import { Timesheet } from '@/assets/interfaces';
import TimesheetForm from '@/components/TimesheetForm.vue';
import { useLoaderStore } from '@/stores';
import { isAxiosError } from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const errors = ref<{ [field: string]: string }>({});
const router = useRouter();

/**
 * Handles the update form submission.
 *
 * @param timesheet - The Timesheet with the updated data
 */
const handleFormSubmission = async (timesheet: Timesheet) => {
	const loader = useLoaderStore();
	errors.value = {};
	loader.setLoader();
	try {
		await axiosInstance.post('timesheets', timesheet);
		router.push({ name: 'home' });
	} catch (err) {
		if (isAxiosError(err)) {
			// build the error object;
			const errorsInResponse = err.response?.data.errors;
			for (let field in errorsInResponse) errors.value[field] = errorsInResponse[field][0];
		}
	} finally {
		loader.unsetLoader();
	}
};
</script>

<template>
	<RouterLink :to="{ name: 'home' }">
		<button class="my-3 btn btn-secondary">Back</button>
	</RouterLink>
	<div class="card">
		<div class="card-body">
			<TimesheetForm
				:errors="errors"
				@form-submit="handleFormSubmission"
			/>
		</div>
	</div>
</template>

<style scoped></style>
