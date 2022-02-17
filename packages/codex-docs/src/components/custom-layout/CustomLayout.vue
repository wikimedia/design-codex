<template>
	<Layout>
		<template #navbar-search>
			<!-- Needs dir="ltr" to make the bidirectional styles for CdxButton work -->
			<div
				v-show="isComponentPage"
				class="cdx-theme-direction-switcher"
				dir="ltr"
			>
				Direction:
				<direction-switcher v-model="dir" />
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue';
import { HTMLDirection } from '@wikimedia/codex';
import DirectionSwitcher from '../../../../codex/src/demo/DirectionSwitcher.vue';
import { DirectionKey } from '../../constants';
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
const { Layout } = DefaultTheme;

const dir = ref<HTMLDirection>( 'ltr' );
const route = useRoute();
const isComponentPage = computed( () => route.path.includes( '/components/' ) );

// Provide the direction for use in Wrapper.vue
provide( DirectionKey, dir );
</script>

<style lang="less">
.cdx-theme-direction-switcher {
	margin-left: 16px;
}
</style>
