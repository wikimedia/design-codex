<template>
	<div class="vp-wrapper">
		<div class="vp-wrapper__demo">
			<slot name="demo" />
			<cdx-button
				v-if="hasCodeSample"
				class="vp-wrapper__demo__button"
				type="quiet"
				@click="onClick"
			>
				{{ buttonLabel }}
			</cdx-button>
		</div>
		<div
			v-if="hasCodeSample"
			v-show="showCode"
			class="vp-wrapper__code"
		>
			<slot name="code" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import CdxButton from 'vue-components/src/components/button/Button.vue';

export default defineComponent( {
	name: 'Wrapper',
	components: { CdxButton },
	setup( props, { slots } ) {
		// Set up show code/hide code button.
		const hasCodeSample = slots && slots.code;
		const showCode = ref( false );
		const buttonLabel = computed( () => {
			return showCode.value === true ? 'Hide code' : 'Show code';
		} );
		const onClick = (): void => {
			showCode.value = !showCode.value;
		};

		return {
			hasCodeSample,
			showCode,
			buttonLabel,
			onClick
		};
	}
} );
</script>

<style lang="less">
// TODO: Remove references to wikimedia-ui-base once we have the proper tokens in place.
@import 'wikimedia-ui-base/wikimedia-ui-base.less';

.vp-wrapper {
	margin-top: 16px;

	&__demo {
		position: relative;
		border: @border-width-base @border-style-base @border-color-heading;
		border-radius: @border-radius-base;
		padding: 24px;

		&__button {
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 0.875em;
		}
	}

	&__code div[ class*='language-' ] {
		margin-top: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
}
</style>
