<script lang="ts" setup>
import axiosInstance from '@/assets/axios';
import { useLoaderStore } from '@/stores';
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
  const loader = useLoaderStore();
  try {
    loader.setLoader();
    await axiosInstance.delete(props.endpoint);
    router.push({ name: 'dashboard' });
  } catch (err) {
    console.error(err);
  } finally {
    loader.unsetLoader();
  }
};
</script>

<template>
  <!-- Button trigger modal -->
  <button @click="handleDeleteRequest" class="btn btn-danger">Delete</button>
</template>
