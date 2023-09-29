<script lang="ts" setup>
import { LoginForm } from '@/assets/interfaces';
import AppAlert from '@/components/AppAlert.vue';
import { useAuthStore, useLoaderStore } from '@/stores';
import { isAxiosError } from 'axios';
import { ref } from 'vue';

const loader = useLoaderStore();
loader.unsetLoader();

const emptyForm: LoginForm = {
  email: '',
  password: '',
};

const auth = useAuthStore();
const form = ref<LoginForm>({ ...emptyForm });
const isInvalid = ref(false);
const errorMessage = ref('');

const attemptLogin = async () => {
  loader.setLoader();
  try {
    await auth.login({ ...form.value });
  } catch (err) {
    isInvalid.value = true;
    if (isAxiosError(err)) {
      errorMessage.value = err.response?.data.message;
    } else console.error(err);
    form.value = { ...emptyForm };
  } finally {
    loader.unsetLoader();
  }
};
</script>

<template>
  <div class="vw-100 vh-100 d-flex justify-content-center align-items-center">
    <div class="login-card card p-5 shadow">
      <h1 class="mb-5 text-center">ACME s.p.a.</h1>

      <form @submit.prevent="attemptLogin">
        <!-- Email input -->
        <div class="form-outline mb-4">
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="form-control"
          />
          <label class="form-label" for="email">Email address</label>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="form-control"
          />
          <label class="form-label" for="password">Password</label>
        </div>

        <!-- Submit button -->
        <button class="btn btn-primary d-block w-100 mb-4">Sign in</button>
      </form>
      <AppAlert type="warning" :show="isInvalid">
        {{ errorMessage }}
      </AppAlert>
    </div>
  </div>
</template>

<style scoped>
.login-card {
  max-width: 95vw;
  width: 500px;
}
</style>
