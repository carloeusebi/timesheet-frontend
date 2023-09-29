<script setup lang="ts">
import { User } from '@/assets/interfaces';
import { ref } from 'vue';

interface Props {
  user?: User;
  errors: { [field: string]: string };
}

const props = defineProps<Props>();

const name = ref(props.user?.name || '');
const email = ref(props.user?.email || '');

const emit = defineEmits(['form-submit']);

const handleFormSubmission = () => {
  const form = {
    name: name.value,
    email: email.value,
  };
  emit('form-submit', form);
};
</script>

<template>
  <form @submit.prevent="handleFormSubmission">
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col mb-3">
        <label for="name">Name:</label>
        <input
          class="form-control"
          id="name"
          v-model="name"
          :class="{ 'is-invalid': errors.name }"
        />
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>
      <div class="col mb-3">
        <label for="email">Email:</label>
        <input
          class="form-control"
          id="email"
          type="email"
          v-model="email"
          :class="{ 'is-invalid': errors.email }"
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>
      <div>
        <button class="btn btn-success px-5">Save</button>
      </div>
    </div>
  </form>
</template>
