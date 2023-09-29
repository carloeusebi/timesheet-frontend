<script setup lang="ts">
import axiosInstance from '@/assets/axios';
import { Activity } from '@/assets/interfaces';
import ActivityForm from '@/components/ActivityForm.vue';
import { useLoaderStore } from '@/stores';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { isAxiosError } from 'axios';

const router = useRouter();
const errors = ref<{ [field: string]: string }>({});

const handleFormSubmission = async (activity: Activity) => {
  const loader = useLoaderStore();
  loader.setLoader();
  try {
    await axiosInstance.post('activities', activity);
    router.push({ name: 'dashboard' });
  } catch (err) {
    if (isAxiosError(err)) {
      const responseErrors = err.response?.data.errors;
      for (let field in responseErrors)
        errors.value[field] = responseErrors[field][0];
    }
  } finally {
    loader.unsetLoader();
  }
};
</script>

<template>
  <div class="my-5">
    <RouterLink :to="{ name: 'dashboard' }">
      <button class="btn btn-secondary mb-3">Back</button>
    </RouterLink>

    <div class="card">
      <div class="card-body">
        <ActivityForm :errors="errors" @form-submit="handleFormSubmission" />
      </div>
    </div>
  </div>
</template>
