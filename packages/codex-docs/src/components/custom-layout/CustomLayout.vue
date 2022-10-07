<template>
	<!--
		On non-component pages, add dir="ltr" to make bidirectional styles work.
		On component pages, we have to add dir="ltr" on the demo container instead, and separately
		on each container that contains other components, because our bidirectional styles don't
		support nesting multiple containers with dir attributes.
	-->
	<div :dir="isComponentPage ? undefined : 'ltr'">
		<Layout>
			<template #nav-bar-content-before>
				<!-- Needs dir="ltr" to make the bidirectional styles for CdxButton work -->
				<div
					v-show="isComponentPage"
					class="cdx-docs-direction-switcher"
					dir="ltr"
				>
					Direction:
					<direction-switcher v-model="dir" />
				</div>
			</template>
		</Layout>
	</div>
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
const isComponentPage = computed( () => route.path.includes( '/components/demos/' ) );

// Provide the direction for use in Wrapper.vue
provide( DirectionKey, dir );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-direction-switcher {
	// TODO: remove from the header entirely.
	// For now, set to `display: none` since the direction switcher breaks the header layout
	// at certain screen sizes (tablet). This way, it can be made visible by those who know
	// about it and want to use it for testing.
	display: none;

	.cdx-demo-direction-switcher {
		margin-left: @spacing-50;
	}
}
</style>
