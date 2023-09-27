<script lang="ts" setup>
import { RouterView } from 'vue-router';
import TheNavbar from '@/components/TheNavbar.vue';
import { useAuthStore } from '@/stores';

const auth = useAuthStore();
</script>

<template>
	<TheNavbar />
	<div class="container">
		<header class="my-4">
			<h1 class="h3">Welcome, {{ auth.user?.name }}</h1>
		</header>
		<main>
			<RouterView />
		</main>
	</div>
</template>

<style scoped></style>
