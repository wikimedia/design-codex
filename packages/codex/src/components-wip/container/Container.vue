<template>
	<div
		class="cdx-container"
		:class="rootClasses"
	>
		<!-- @slot The Container content. -->
		<slot />
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	PropType,
	computed
} from 'vue';

import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

import {
	ContainerSizes
} from '../../constants';
import { ContainerSize } from '../../types';

const containerSizeValidator = makeStringTypeValidator( ContainerSizes );

/**
 * A flexible layout wrapper that adapts across the different breakpoints and screen sizes.
 */
export default defineComponent( {
	name: 'CdxContainer',
	props: {
		/**
		 * Container size prop enacted via `max-width`.
		 *
		 * @values 'medium', 'large', 'x-large', 'full'
		 */
		size: {
			type: String as PropType<ContainerSize>,
			default: 'full',
			validator: containerSizeValidator
		}
	},
	setup( props ) {
		const rootClasses = computed( () => ( {
			[ `cdx-container--${ props.size }` ]: true
		} ) );

		return {
			rootClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-container {
	box-sizing: @box-sizing-base;
	// Set Container to full `max-width` by default. Even though that's provided inherit by
	// user-agent styles we'd like to be explicit about it for better understanding of
	// the component.
	max-width: @size-full;
	margin: 0 auto;

	// TODO:: The `max-width` values are provided statically for now. Container is a special
	// component that is defined in a combination with other Codex layout measures like Grid or
	// Flexbox. For the time being, we are only introducing static values to be replaced with
	// the actual design tokens once we've settled on above combination.
	&--medium {
		// `dimension.4000` is used in current design.
		// max-width: @max-width-container-medium;
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		max-width: 40rem;
	}

	&--large {
		// `dimension.5900` (to be added) is used in current design.
		// max-width: @max-width-container-large;
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		max-width: 59rem;
	}

	&--x-large {
		// `dimension.9975` (to be added) is used in current design.
		// max-width: @max-width-container-x-large;
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		max-width: 99.75rem;
	}

	@media screen and ( max-width: @max-width-breakpoint-mobile ) {
		// Set Container always to full width on mobile.
		max-width: @size-full;
	}
}
</style>
