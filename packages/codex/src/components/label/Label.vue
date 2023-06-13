<template>
	<div
		class="cdx-label"
		:class="rootClasses"
		:style="rootStyle"
	>
		<component
			:is="isLegend ? 'legend' : 'label'"
			class="cdx-label__label"
			:for="!isLegend && inputId ? inputId : undefined"
			v-bind="otherAttrs"
		>
			<span>
				<cdx-icon
					v-if="icon"
					:icon="icon"
					class="cdx-label__label__icon"
				/>
				<span class="cdx-label__label__text">
					<!-- @slot Label text. -->
					<slot />
				</span>
				<span v-if="optionalFlag" class="cdx-label__label__optional-flag">
					<!-- Add a space before the optional flag text. Vue strips whitespace
						between everything except plain text, so we can't rely on a newline to
						add a natural space here. -->
					<!-- eslint-disable-next-line vue/no-useless-mustaches -->
					{{ ' ' }}
					{{ optionalFlag }}
				</span>
			</span>

			<!-- For legends, the description needs to be inside the <legend> for screen reader
				support. -->
			<span v-if="isLegend" class="cdx-label__description">
				<!-- @slot Short description text. -->
				<slot name="description" />
			</span>
		</component>

		<!-- For single fields, add an ID attribute that will be used on the input for
			aria-describedby. -->
		<span
			v-if="!isLegend"
			:id="descriptionId || undefined"
			class="cdx-label__description"
		>
			<!-- @slot Short description text. -->
			<slot name="description" />
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRef } from 'vue';
import { Icon } from '@wikimedia/codex-icons';
import CdxIcon from '../../components/icon/Icon.vue';
import useFieldData from '../../composables/useFieldData';
import useSplitAttributes from '../../composables/useSplitAttributes';

/**
 * Describes the information requested by a given form field.
 */
export default defineComponent( {
	name: 'CdxLabel',
	components: { CdxIcon },
	/**
	 * We want the label or legend to inherit attributes, not the root element.
	 */
	inheritAttrs: false,
	props: {
		/**
		 * Icon before the label text.
		 *
		 * Do not use this if including a start icon within the input component.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon|null>,
			default: null
		},
		/**
		 * Text to indicate that the field is optional.
		 *
		 * For example, this might be '(optional)' in English. This text will be placed next to
		 * the label text.
		 */
		optionalFlag: {
			type: String,
			default: ''
		},
		/**
		 * Whether the label should be visually hidden.
		 */
		visuallyHidden: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether this component should output a `<legend>` element.
		 *
		 * Always set this to true when this component is used inside a `<fieldset>` element. Do not
		 * set it to true otherwise.
		 */
		isLegend: {
			type: Boolean,
			default: false
		},
		/**
		 * The ID of the input/control this label is for.
		 *
		 * Will be added as the `for` attribute of the `<label>`. Not needed for `<legend>`.
		 */
		inputId: {
			type: String,
			default: ''
		},
		/**
		 * The ID of the description element.
		 *
		 * This ID can be used for the `aria-describedby` attribute of the input.
		 */
		descriptionId: {
			type: String,
			default: ''
		},
		/**
		 * Whether this label is for a disabled field or input.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup( props, { attrs } ) {
		const { computedDisabled } = useFieldData( toRef( props, 'disabled' ) );

		const internalClasses = computed( () => {
			return {
				'cdx-label--visually-hidden': props.visuallyHidden,
				'cdx-label--disabled': computedDisabled.value
			};
		} );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		return {
			rootClasses,
			rootStyle,
			otherAttrs
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

.cdx-label {
	line-height: @line-height-xx-small;

	&__label {
		// For legends, display the description on a separate line after the label text.
		display: flex;
		flex-direction: column;

		&__icon {
			margin-right: @spacing-25;
		}

		&__text {
			font-weight: @font-weight-bold;
		}
	}

	legend {
		// Unset browser style.
		padding: 0;
	}

	// Labels of nested fields within a fieldset should not be bolded.
	fieldset label&__label &__label__text {
		font-weight: @font-weight-normal;
	}

	&:not( .cdx-label--disabled ) {
		.cdx-label__label__optional-flag,
		.cdx-label__description {
			color: @color-subtle;
		}
	}

	&--disabled {
		&,
		.cdx-label__label__icon {
			color: @color-disabled;
		}
	}

	&--visually-hidden {
		.screen-reader-text();
	}

	&:not( .cdx-label--visually-hidden ) {
		padding-bottom: @spacing-50;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			padding-bottom: @spacing-25;
		}
	}
}
</style>
