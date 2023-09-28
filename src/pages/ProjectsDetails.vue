<script lang="ts" setup>
import { Project } from '@/assets/interfaces';
import { ref, onMounted } from 'vue';
import { useLoaderStore } from '@/stores';
import { useRoute } from 'vue-router';
import AppAlert from '@/components/AppAlert.vue';
import { fetch } from '@/assets/helpers';
import ProjectForm from '@/components/ProjectForm.vue';
import axiosInstance from '@/assets/axios';
import AppDelete from '@/components/AppDelete.vue';

const loader = useLoaderStore();
const id = useRoute().params.id;

const project = ref<Project | null>(null);
const userIds = ref<number[] | null>(null);
const activityIds = ref<number[] | null>(null);

/**
 * Fetch the project, creates two arrays with the user and activity ids
 */
onMounted(async () => {
	loader.setLoader();
	await fetch(`projects/${id}`, project);

	userIds.value = project.value?.users.map(({ id }) => id) || [];
	activityIds.value = project.value?.activities.map(({ id }) => id) || [];
	loader.unsetLoader();
});

const handleFormSubmission = async (updatedProject: Project) => {
	loader.setLoader();
	console.log(updatedProject);
	try {
		await axiosInstance.put(`projects/${updatedProject.id}`, updatedProject);
		alert('Project updated with success!');
	} catch (err) {
		alert(err);
	} finally {
		loader.unsetLoader();
	}
};
</script>

<template>
	<div class="mb-5">
		<!-- BACK BUTTON -->
		<RouterLink :to="{ name: 'dashboard' }">
			<button class="btn btn-secondary my-3">Back</button>
		</RouterLink>

		<!-- DELETE BUTTON -->
		<AppDelete
			v-if="project"
			class="ms-2"
			:endpoint="`projects/${project?.id}`"
		/>

		<section v-if="project">
			<div class="card">
				<div class="card-body">
					<ProjectForm
						v-if="userIds && activityIds"
						@form-submit="handleFormSubmission"
						:user-ids="userIds"
						:activity-ids="activityIds"
						:project="project"
					/>
				</div>
			</div>
		</section>

		<div v-else>
			<AppAlert
				:show="!loader.isLoading"
				type="info"
			>
				Project not found.
			</AppAlert>
		</div>
	</div>
</template>

<style scoped></style>