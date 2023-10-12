<script lang="ts" setup>
import axiosInstance from '@/assets/axios';
import { Link, Timesheet } from '@/assets/interfaces';
import AppAlert from '@/components/AppAlert.vue';
import AppPagination from '@/components/AppPagination.vue';
import { useAuthStore, useLoaderStore } from '@/stores';
import { onMounted, ref } from 'vue';
import TimesheetFilters from '@/components/TimesheetFilters.vue';
import { calculateHours } from '@/assets/helpers';

const timesheets = ref<Timesheet[] | null>(null);

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const url = `${baseUrl}/api/timesheets`;

const user = useAuthStore();
const loader = useLoaderStore();

const links = ref<Link[] | null>(null);
/**
 * Saves the query params to keep them consistent when changing page.
 */
const queryParams = ref<Object>({});

/**
 * Localize a UTC DateTime
 * @param date The UTC DateTime.
 */
const localizeDate = (date: string) => new Date(date).toLocaleDateString();

/**
 * Fetches the timesheets. Page and Query Params are configurable.
 *
 * @param url - Can be different based on the requesting page.
 * @param params - Additional query params like the employee's name or the date range.
 */
const fetchTimesheets = async (url: string, params = {}) => {
  loader.setLoader();
  try {
    const { data } = await axiosInstance.get(url, { params });
    timesheets.value = data.data;
    links.value = data.meta.links;
  } catch (err) {
    console.error(err);
  } finally {
    loader.unsetLoader();
  }
};

const changePage = (url: string) => {
  fetchTimesheets(url, queryParams.value);
};

const filterTimesheets = (newParams: Object) => {
  queryParams.value = newParams;
  fetchTimesheets(url, queryParams.value);
};

onMounted(() => {
  fetchTimesheets(url);
});
</script>

<template>
  <header class="my-4">
    <h1 class="h3" v-if="!user.isAdmin">Welcome, {{ user.user?.name }}</h1>
  </header>

  <div v-if="!user.isAdmin">
    <RouterLink :to="{ name: 'timesheet-create' }">
      <button class="btn btn-success mb-2">Log a new Activity</button>
    </RouterLink>
  </div>
  <TimesheetFilters @filter-change="filterTimesheets" />
  <div v-if="timesheets && timesheets.length > 0">
    <div class="d-flex justify-content-end">
      <AppPagination v-if="links" :links="links" @change-page="changePage" />
    </div>

    <table class="table table-striped shadow">
      <thead>
        <tr>
          <th scope="col" v-if="user.isAdmin">Employee</th>
          <th scope="col">Project</th>
          <th scope="col">Activity</th>
          <th scope="col">Date</th>
          <th scope="col">Hours</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timesheet in timesheets" :key="timesheet.id">
          <td v-if="user.isAdmin">{{ timesheet.employee }}</td>
          <td>{{ timesheet.project ?? 'Project Deleted' }}</td>
          <td>{{ timesheet.activity ?? 'Activity Deleted' }}</td>
          <td>{{ localizeDate(timesheet.activityStart) }}</td>
          <td>
            {{ calculateHours(timesheet.activityStart, timesheet.activityEnd) }}
          </td>
          <td>
            <RouterLink :to="{ name: 'timesheet-details', params: { id: timesheet.id } }">
              <button class="btn btn-primary">View</button>
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <AppAlert :show="!loader.isLoading" type="info"> No Timesheets found. </AppAlert>
  </div>
</template>

<style scoped></style>
