<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores';
import AppLoader from './components/AppLoader.vue';

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
  <AppLoader />
  <RouterView />
</template>

<style></style>
