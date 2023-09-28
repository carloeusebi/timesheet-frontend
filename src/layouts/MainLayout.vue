<script lang="ts" setup>
import { RouterView } from 'vue-router';
import TheNavbar from '@/components/TheNavbar.vue';
</script>

<template>
	<TheNavbar />
	<div class="container">
		<main>
			<RouterView />
		</main>
	</div>
</template>

<style scoped></style>
