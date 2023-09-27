<script lang="ts" setup>
interface Props {
	show: boolean;
	type: 'danger' | 'warning' | 'info' | 'success';
	title?: string;
	message?: string;
	dismissable?: boolean;
}
defineProps<Props>();
</script>

<template>
	<div
		v-if="show"
		class="alert alert-dismissible fade show"
		:class="`alert-${type}`"
		role="alert"
	>
		<div>
			<strong>{{ title }}</strong>
		</div>
		{{ message }}
		<slot></slot>
		<button
			v-if="dismissable"
			type="button"
			class="btn-close"
			data-bs-dismiss="alert"
			aria-label="Close"
		></button>
	</div>
</template>

<style scoped></style>
