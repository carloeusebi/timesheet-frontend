<script lang="ts" setup>
import { useAuthStore } from '@/stores';
import TheLogoutButton from './TheLogoutButton.vue';

const user = useAuthStore();
const links = [
	{ name: 'home', label: 'Home', requiredAdmin: false },
	{ name: 'dashboard', label: 'Dashboard', requiredAdmin: true },
];
</script>

<template>
	<nav
		class="navbar bg-dark navbar-expand-lg"
		data-bs-theme="dark"
	>
		<div class="container">
			<a
				class="navbar-brand"
				href="#"
				>Acme spa</a
			>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div
				class="collapse navbar-collapse"
				id="navbarSupportedContent"
			>
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li
						v-for="(link, i) in links"
						:key="i"
						class="nav-item"
					>
						<RouterLink
							v-if="!link.requiredAdmin || (link.requiredAdmin && user.isAdmin)"
							:to="{ name: link.name }"
							class="nav-link"
						>
							{{ link.label }}
						</RouterLink>
					</li>
				</ul>
				<TheLogoutButton />
			</div>
		</div>
	</nav>
</template>

<style scoped></style>
