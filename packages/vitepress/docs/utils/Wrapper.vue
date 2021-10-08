<template>
	<div class="vp-wrapper">
		<div class="vp-wrapper__demo">
			<slot name="demo" />
			<cdx-button
				class="vp-wrapper__demo__button"
				type="quiet"
				@click="onClick"
			>
				{{ buttonLabel }}
			</cdx-button>
		</div>
		<div v-show="showCode" class="vp-wrapper__code">
			<slot name="code" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import CdxButton from '../../../vue-components/src/components/button/Button.vue';

export default defineComponent( {
	name: 'Wrapper',
	components: { CdxButton },
	setup() {
		const showCode = ref( false );
		const buttonLabel = computed( () => {
			return showCode.value === true ? 'Hide code' : 'Show code';
		} );
		const onClick = (): void => {
			showCode.value = !showCode.value;
		};
		return {
			showCode,
			buttonLabel,
			onClick
		};
	}
} );
</script>

<style>
/* TODO: Use design tokens */
/* TODO: nesting */

.vp-wrapper {
	margin-top: 16px;
}

.vp-wrapper__demo {
	border: 1px solid #c8ccd1;
	border-radius: 2px;
	padding: 24px;
	position: relative;

	/* Similar to our wikis, font size should be 1em on mobile and 0.875em on larger screens. */
	@media screen and ( min-width: 720px ) {
		font-size: 0.875em;
	}
}

.vp-wrapper__demo__button {
	position: absolute;
	right: 0;
	bottom: 0;
}

.vp-wrapper__code div[class*="language-"] {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	margin-top: 0;
}
</style>
