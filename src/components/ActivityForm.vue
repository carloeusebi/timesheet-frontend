<script lang="ts" setup>
import { Activity } from '@/assets/interfaces';
import { ref } from 'vue';

interface Props {
  activity?: Activity;
  errors: { [field: string]: string };
}

const props = defineProps<Props>();
const name = ref(props.activity?.name || '');
const emit = defineEmits(['form-submit']);

const handleFormSubmit = () => {
  const form = { name: name.value };
  emit('form-submit', form);
};
</script>

<template>
  <form @submit.prevent="handleFormSubmit">
    <label for="name">Activity Name:</label>
    <input
      id="name"
      class="form-control"
      :class="{ 'is-invalid': errors.name }"
      v-model="name"
    />
    <div class="invalid-feedback">{{ errors.name }}</div>
    <button class="my-3 btn btn-success px-5">Save</button>
  </form>
</template>

<style scoped></style>
