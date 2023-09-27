<script lang="ts" setup>
import { Link } from '@/assets/interfaces';
import { computed } from 'vue';

interface Props {
	links: Link[];
}
const props = defineProps<Props>();
const emit = defineEmits(['change-page']);

const showPagination = computed(() => props.links.length > 3);
</script>

<template>
	<div v-if="showPagination">
		<nav>
			<ul class="pagination">
				<li
					v-for="link in links"
					:key="link.label"
					:class="{ active: link.active }"
					@click="emit('change-page', link.url)"
				>
					<span
						class="page-link"
						v-html="link.label"
					></span>
				</li>
			</ul>
		</nav>
	</div>
</template>

<style scoped>
li {
	cursor: pointer;
}
* {
	user-select: none;
}
</style>
