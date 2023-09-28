<script lang="ts" setup></script>

<template>
	<div class="d-flex flex-column justify-content-center align-items-center vh-100">
		<h1>403 - Forbidden</h1>
		<RouterLink :to="{ name: 'home' }">
			<button class="btn btn-primary">Homepage</button>
		</RouterLink>
	</div>
</template>

<style scoped></style>
