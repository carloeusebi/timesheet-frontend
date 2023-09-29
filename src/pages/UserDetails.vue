<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { fetch } from '@/assets/helpers';
import { User } from '@/assets/interfaces';
import UserForm from '@/components/UserForm.vue';
import { useLoaderStore } from '@/stores';
import AppAlert from '@/components/AppAlert.vue';
import axiosInstance from '@/assets/axios';
import { isAxiosError } from 'axios';
import AppDelete from '@/components/AppDelete.vue';

const id = useRoute().params.id;
const user = ref<User | null>(null);
const errors = ref<{ [field: string]: string }>({});
const loader = useLoaderStore();

onMounted(async () => {
  loader.setLoader();
  try {
    await fetch(`users/${id}`, user);
  } catch (err) {
    console.error(err);
  } finally {
    loader.unsetLoader();
  }
});

const handleFormSubmission = async (toUpdateUser: User) => {
  try {
    loader.setLoader();
    const { data } = await axiosInstance.put(
      `users/${user.value?.id}`,
      toUpdateUser
    );
    user.value = { ...data };
    // todo proper alert
    alert('User updated successfully');
  } catch (err) {
    if (isAxiosError(err)) {
      const responseErrors = err.response?.data.errors;
      for (let field in responseErrors)
        errors.value[field] = responseErrors[field][0];
    } else console.error(err);
  } finally {
    loader.unsetLoader();
  }
};
</script>

<template>
  <div class="my-5">
    <div class="mb-5">
      <RouterLink :to="{ name: 'dashboard' }">
        <button class="btn btn-secondary">Back</button>
      </RouterLink>
      <AppDelete v-if="user" class="ms-2" :endpoint="`users/${user.id}`" />
    </div>

    <!-- USER CARD -->
    <div class="card" v-if="user">
      <div class="card-body">
        <UserForm
          :errors="errors"
          :user="user"
          @form-submit="handleFormSubmission"
        />
      </div>
    </div>
    <div v-else>
      <AppAlert :show="!loader.isLoading" type="info">
        User not Found.
      </AppAlert>
    </div>
  </div>
</template>
