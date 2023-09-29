<script lang="ts" setup>
import { useLoaderStore } from '@/stores';

const loader = useLoaderStore();
</script>

<template>
  <div class="layover" v-if="loader.isLoading">
    <div class="h1 text-white">Loading...</div>
  </div>
</template>

<style scoped>
.layover {
  position: fixed;
  inset: 0;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.6);
}
</style>
