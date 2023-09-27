<script lang="ts" setup>
import TheLogoutButton from './TheLogoutButton.vue';
</script>

<template>
	<nav
		class="navbar bg-dark border-bottom border-body"
		data-bs-theme="dark"
	>
		<div class="container py-2 d-flex justify-content-between">
			<div></div>
			<div>
				<TheLogoutButton />
			</div>
		</div>
	</nav>
</template>

<style scoped></style>
