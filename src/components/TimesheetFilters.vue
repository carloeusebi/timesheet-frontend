<script lang="ts" setup>
import { useAuthStore } from '@/stores';
import { ref } from 'vue';

interface QueryParams {
	[string: string]: string;
}

const queryParams = ref({
	employee: '',
	project: '',
	activity: '',
	dateFrom: '',
	dateTo: '',
});

const user = useAuthStore();
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const emit = defineEmits(['filter-change']);

/**
 * Removes the empty query params.
 */
const removeEmptyProperties = (obj: QueryParams) => {
	const cleanedObj: QueryParams = {};
	for (let key in obj) {
		if (obj[key]) cleanedObj[key] = obj[key];
	}
	return cleanedObj;
};

/**
 * Syncs the url with the filters, not really needed but improves UX.
 */
const syncUrlQueryParams = (queryParams: QueryParams) => {
	const currentURL = new URL(window.location.href);
	for (let key in queryParams) {
		currentURL.searchParams.set(key, queryParams[key]);
	}
	window.history.replaceState({}, '', currentURL.toString());
};

const applyFilters = () => {
	if (timeoutId) clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		const cleanedQueryParams = removeEmptyProperties(queryParams.value);
		syncUrlQueryParams(cleanedQueryParams);
		emit('filter-change', cleanedQueryParams);
	}, 500);
};
</script>

<template>
	<p class="d-inline-flex gap-1">
		<button
			class="btn btn-primary"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#collapseTimesheetFilter"
			aria-expanded="false"
			aria-controls="collapseTimesheetFilter"
		>
			Filters
		</button>
	</p>
	<div
		class="collapse mb-3"
		id="collapseTimesheetFilter"
	>
		<div class="card card-body">
			<div class="d-flex justify-content-evenly">
				<!-- EMPLOYEE -->
				<div v-if="user.isAdmin">
					<label for="employee"> Employee </label>
					<input
						@keyup="applyFilters"
						v-model="queryParams.employee"
						class="form-control"
						type="text"
					/>
				</div>

				<!-- PROJECT -->
				<div>
					<label for="project"> Project </label>
					<input
						@keyup="applyFilters"
						v-model="queryParams.project"
						class="form-control"
						type="text"
					/>
				</div>

				<!-- ACTIVITY -->
				<div>
					<label for="activity"> Activity </label>
					<input
						@keyup="applyFilters"
						v-model="queryParams.activity"
						class="form-control"
						type="text"
					/>
				</div>

				<!-- DATE FORM -->
				<div>
					<label for="dateFrom"> From </label>
					<input
						@input="applyFilters"
						v-model="queryParams.dateFrom"
						class="form-control"
						type="date"
					/>
				</div>

				<!-- DATE TO -->
				<div>
					<label for="dateTo"> To </label>
					<input
						@input="applyFilters"
						v-model="queryParams.dateTo"
						class="form-control"
						type="date"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
