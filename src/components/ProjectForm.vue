<script lang="ts" setup>
import { Activity, Project, User } from '@/assets/interfaces';
import { ref, onMounted } from 'vue';
import { fetch } from '@/assets/helpers';

interface Props {
	errors: { [field: string]: string };
	project?: Project;
	userIds: number[];
	activityIds: number[];
}

const props = defineProps<Props>();

const users = ref<User[] | null>(null);
const activities = ref<Activity[] | null>(null);

const selectedUserIds = ref<number[]>([...props.userIds]);
const selectedActivityIds = ref<number[]>([...props.activityIds]);

const name = ref(props.project?.name || '');

const emit = defineEmits(['form-submit']);

const handleFormSubmission = () => {
	const form = {
		id: props.project?.id ?? null,
		name: name.value,
		userIds: selectedUserIds.value,
		activityIds: selectedActivityIds.value,
	};

	emit('form-submit', form);
};

onMounted(async () => {
	await Promise.all([fetch('users', users), fetch('activities', activities)]);
});
</script>

<template>
	<form
		@submit.prevent="handleFormSubmission"
		v-if="users && activities"
	>
		<div class="row row-cols-1 row-cols-md-2">
			<div>
				<label for="name">Project Name</label>
				<input
					type="text"
					id="name"
					class="form-control"
					:class="{ 'is-invalid': errors.name }"
					v-model="name"
				/>
				<div class="invalid-feedback">
					{{ errors.name }}
				</div>
				<!-- ACTIVITIES -->
				<hr />
				<section id="activities">
					<h5>Activities</h5>
					<ul class="list-group">
						<li
							v-for="activity in activities"
							:key="activity.id"
							class="list-group-item"
						>
							<div class="form-check">
								<input
									:id="`activity-${activity.id}`"
									type="checkbox"
									class="form-check-input"
									:value="activity.id"
									:checked="activityIds?.includes(activity.id)"
									v-model="selectedActivityIds"
								/>
								<label
									:for="`activity-${activity.id}`"
									class="form-check-label"
									>{{ activity.name }}</label
								>
							</div>
						</li>
					</ul>
				</section>
			</div>
			<!-- USER LIST -->
			<div>
				<h5>Employees</h5>
				<ul class="list-group users">
					<li
						v-for="user in users"
						:key="user.id"
						class="list-group-item"
					>
						<div class="form-check">
							<input
								:id="`user-${user.id}`"
								type="checkbox"
								class="form-check-input"
								:value="user.id"
								:checked="userIds?.includes(user.id)"
								v-model="selectedUserIds"
							/>
							<label
								:for="`user-${user.id}`"
								class="form-check-label"
								>{{ user.name }}</label
							>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<hr />
		<div>
			<button class="btn btn-success px-5">Submit</button>
		</div>
	</form>
</template>

<style scoped>
.users {
	max-height: 650px;
	overflow-y: auto;
}
</style>
