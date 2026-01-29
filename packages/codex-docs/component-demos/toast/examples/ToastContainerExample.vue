<template>
	<div class="cdx-docs-toast-container-example">
		<div class="cdx-docs-toast-container-example__buttons">
			<cdx-button @click="showFirstToast">
				Show first toast
			</cdx-button>
			<cdx-button @click="showSecondToast">
				Show second toast
			</cdx-button>
		</div>
		<cdx-toast-container />
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxToastContainer, useToast } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ToastContainerExample',
	components: { CdxButton, CdxToastContainer },
	setup() {
		const toast = useToast();

		function showFirstToast() {
			toast.success( 'First toast', { autoDismiss: true } );
		}

		function showSecondToast() {
			toast.info( 'Second toast', { autoDismiss: true } );
		}

		return { showFirstToast, showSecondToast };
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-toast-container-example {
	&__buttons {
		display: flex;
		gap: @spacing-50;
		margin-bottom: @spacing-100;
	}
}
</style>
