<script lang="ts" setup>
import axiosInstance from '@/assets/axios';
import { useRouter } from 'vue-router';

const props = defineProps({
	endpoint: {
		type: String,
		required: true,
	},
});

const router = useRouter();

const handleDeleteRequest = async () => {
	const confirmation = confirm('Are you sure you want to delete?');
	if (!confirmation) return;
	try {
		await axiosInstance.delete(props.endpoint);
		router.push({ name: 'dashboard' });
	} catch (err) {
		console.error(err);
	}
};
</script>

<template>
	<!-- Button trigger modal -->
	<button
		@click="handleDeleteRequest"
		class="btn btn-danger"
	>
		Delete
	</button>
</template>
