<template>
	<div class="cdx-docs-return-to-top">
		<cdx-button
			size="large"
			aria-label="Return to top"
			@click="onClick"
		>
			<cdx-icon :icon="cdxIconArrowUp" />
		</cdx-button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconArrowUp } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'CdxDocsReturnToTop',
	components: { CdxButton, CdxIcon },
	setup() {
		function onClick() {
			// Navigate smoothly to the top of the page.
			window.scrollTo( { top: 0, behavior: 'smooth' } );
		}

		return {
			cdxIconArrowUp,
			onClick
		};
	}
} );

</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-return-to-top {
	// The button is injected into the doc via VitePress custom theme layout slots.
	position: fixed;
	right: @spacing-150;
	bottom: @spacing-150;

	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		right: @spacing-200;
		bottom: @spacing-200;
	}
}
</style>
