<script lang="ts" setup>
import axiosInstance from '@/assets/axios';
import ProjectForm from '@/components/ProjectForm.vue';
import { isAxiosError } from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Project } from '@/assets/interfaces';

const router = useRouter();

const errors = ref<{ [field: string]: string }>({});

const handleFormSubmission = async (newProject: Project) => {
	try {
		await axiosInstance.post('projects', newProject);
		router.push({ name: 'dashboard' });
	} catch (err) {
		if (isAxiosError(err)) {
			// build the error object;
			const errorsInResponse = err.response?.data.errors;
			for (let field in errorsInResponse) errors.value[field] = errorsInResponse[field][0];
		}
	}
};
</script>

<template>
	<div class="mb-5">
		<!-- BACK BUTTON -->
		<RouterLink :to="{ name: 'dashboard' }">
			<button class="btn btn-secondary my-3">Back</button>
		</RouterLink>
		<div class="card">
			<div class="card-body">
				<ProjectForm
					@form-submit="handleFormSubmission"
					:errors="errors"
					:user-ids="[]"
					:activity-ids="[]"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
