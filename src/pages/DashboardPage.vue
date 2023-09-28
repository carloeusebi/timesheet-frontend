<script lang="ts" setup>
import axiosInstance from '@/assets/axios';
import { Activity, Project, User } from '@/assets/interfaces';
import { useLoaderStore } from '@/stores';
import { ref, onMounted, Ref } from 'vue';

const users = ref<User[] | null>(null);
const projects = ref<Project[] | null>(null);
const activities = ref<Activity[] | null>(null);

const loader = useLoaderStore();

onMounted(async () => {
	const fetch = async (endpoint: string, ref: Ref) => {
		const { data } = await axiosInstance.get(endpoint);
		ref.value = data;
	};

	loader.setLoader();
	try {
		await Promise.all([fetch('users', users), fetch('projects', projects), fetch('activities', activities)]);
	} catch (err) {
		console.error(err);
	} finally {
		loader.unsetLoader();
	}
});
</script>

<template>
	<header class="my-3">
		<h1 class="h3">Admin Dashboard</h1>
	</header>

	<section
		v-if="!loader.isLoading"
		class="row row-cols-1 row-cols-md-2 mt-3 mb-5 align-items-start"
	>
		<!-- LEFT COLUMN -->
		<div>
			<!-- PROJECTS -->
			<div class="card mb-3">
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5 class="card-title mb-0">Active Projects</h5>
					<button class="btn btn-secondary">Add new Project</button>
				</div>
				<ul class="list-group list-group-flush">
					<li
						v-for="project in projects"
						:key="project.id"
						class="list-group-item"
					>
						{{ project.name }}
					</li>
				</ul>
			</div>

			<!-- ACTIVITIES -->
			<div class="card mb-3">
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5 class="card-title mb-0">Activities</h5>
					<button class="btn btn-secondary">Add new Activity</button>
				</div>
				<ul class="list-group list-group-flush">
					<li
						v-for="activity in activities"
						:key="activity.id"
						class="list-group-item"
					>
						{{ activity.name }}
					</li>
				</ul>
			</div>
		</div>

		<!-- RIGHT COLUMN -->
		<div>
			<!-- USERS -->
			<div class="card">
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5 class="card-tile">Users</h5>
					<button class="btn btn-secondary">Add new User</button>
				</div>
				<div class="users-card">
					<ul class="list-group list-group-flush">
						<li
							v-for="user in users"
							:key="user.id"
							class="list-group-item"
						>
							{{ user.name }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.users-card {
	max-height: 750px;
	overflow-y: auto;
}

li {
	cursor: pointer;
}

li:hover {
	background-color: #eee;
}
</style>
