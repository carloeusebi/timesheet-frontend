<script lang="ts" setup>
import axiosInstance from '@/assets/axios';
import { fetch } from '@/assets/helpers';
import { Activity } from '@/assets/interfaces';
import ActivityForm from '@/components/ActivityForm.vue';
import AppAlert from '@/components/AppAlert.vue';
import AppDelete from '@/components/AppDelete.vue';
import { useLoaderStore } from '@/stores';
import { isAxiosError } from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const id = useRoute().params.id;
const activity = ref<Activity | null>(null);
const loader = useLoaderStore();
const errors = ref<{ [field: string]: string }>({});
const router = useRouter();

onMounted(async () => {
  loader.setLoader();
  try {
    await fetch(`activities/${id}`, activity);
  } catch (err) {
    console.error(err);
  } finally {
    loader.unsetLoader();
  }
});

const handleFormSubmission = async (activity: Activity) => {
  const loader = useLoaderStore();
  loader.setLoader();
  try {
    await axiosInstance.put(`activities/${id}`, activity);
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
  <div class="my-3">
    <div class="mb-3">
      <RouterLink :to="{ name: 'dashboard' }">
        <button class="btn-secondary btn">Back</button>
      </RouterLink>
      <AppDelete v-if="activity" class="ms-2" :endpoint="`activities/${id}`" />
    </div>

    <div class="card" v-if="activity">
      <div class="card-body">
        <ActivityForm
          :errors="errors"
          :activity="activity"
          @form-submit="handleFormSubmission"
        />
      </div>
    </div>
    <div v-else>
      <AppAlert :show="!loader.isLoading" type="info">
        Activity not found.
      </AppAlert>
    </div>
  </div>
</template>

<style scoped></style>
