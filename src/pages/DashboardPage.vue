<script lang="ts" setup>
import { Activity, Project, User } from '@/assets/interfaces';
import { useLoaderStore } from '@/stores';
import { ref, onMounted } from 'vue';
import { fetch } from '@/assets/helpers';

const users = ref<User[] | null>(null);
const projects = ref<Project[] | null>(null);
const activities = ref<Activity[] | null>(null);

const loader = useLoaderStore();

onMounted(async () => {
  loader.setLoader();
  try {
    await Promise.all([
      fetch('users', users),
      fetch('projects', projects),
      fetch('activities', activities),
    ]);
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
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h5 class="card-title mb-0">Active Projects</h5>
          <RouterLink :to="{ name: 'projects-create' }">
            <button class="btn btn-secondary">Add new Project</button>
          </RouterLink>
        </div>
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            v-for="project in projects"
            :key="project.id"
          >
            <RouterLink
              :to="{ name: 'projects-details', params: { id: project.id } }"
              class="d-block w-100 h-100"
            >
              {{ project.name }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- ACTIVITIES -->
      <div class="card mb-3">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h5 class="card-title mb-0">Activities</h5>
          <RouterLink :to="{ name: 'activities-create' }">
            <button class="btn btn-secondary">Add new Activity</button>
          </RouterLink>
        </div>
        <ul class="list-group list-group-flush">
          <li
            v-for="activity in activities"
            :key="activity.id"
            class="list-group-item"
          >
            <RouterLink
              :to="{ name: 'activities-details', params: { id: activity.id } }"
              class="d-block w-100 h-100"
            >
              {{ activity.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div>
      <!-- USERS -->
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h5 class="card-tile">Employees</h5>
          <RouterLink :to="{ name: 'users-create' }">
            <button class="btn btn-secondary">Add new Employee</button>
          </RouterLink>
        </div>
        <div class="users-card">
          <ul class="list-group list-group-flush">
            <li v-for="user in users" :key="user.id" class="list-group-item">
              <RouterLink
                :to="{ name: 'users-details', params: { id: user.id } }"
                class="d-block h-100 w-100"
              >
                {{ user.name }}
              </RouterLink>
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

a {
  color: black;
}

li:hover {
  background-color: #eee;
}
</style>
