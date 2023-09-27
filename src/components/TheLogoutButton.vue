<script lang="ts" setup>
import { useAuthStore } from '@/stores';

const auth = useAuthStore();

const logout = () => {
	auth.logout();
};
</script>

<template>
	<button
		@click="logout"
		class="btn btn-danger"
	>
		Logout
	</button>
</template>

<style scoped></style>
