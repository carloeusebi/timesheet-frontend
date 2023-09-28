<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores';

const auth = useAuthStore();

// validate the user at every page refresh
const validateUser = () => {
	auth.validateUser();
};

onMounted(() => {
	validateUser();
});
</script>

<template>
	<RouterView />
</template>

<style></style>
