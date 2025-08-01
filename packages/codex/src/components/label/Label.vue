<template>
	<!-- Separate <label> and description are wrapped in a <div>. -->
	<div
		v-if="!isLegend"
		class="cdx-label"
		:class="rootClasses"
		:style="rootStyle"
	>
		<label
			class="cdx-label__label"
			:for="inputId ? inputId : undefined"
			v-bind="otherAttrs"
		>
			<cdx-icon
				v-if="icon"
				:icon="icon"
				class="cdx-label__label__icon"
			/>
			<span class="cdx-label__label__text">
				<!-- @slot Label text. -->
				<slot />
			</span>
			<span v-if="optionalFlag || optional" class="cdx-label__label__optional-flag">
				<!-- Add a space before the optional flag text. Vue strips whitespace
					between everything except plain text, so we can't rely on a newline to
					add a natural space here. -->
				<!-- eslint-disable-next-line vue/no-useless-mustaches -->
				{{ ' ' }}
				{{ translatedOptionalFlag }}
			</span>
		</label>

		<!-- Include an ID attribute that will be used on the input for aria-describedby. -->
		<span
			v-if="$slots.description && $slots.description().length > 0"
			:id="descriptionId || undefined"
			class="cdx-label__description"
		>
			<!-- @slot Short description text. -->
			<slot name="description" />
		</span>
	</div>

	<!-- <legend> must be the root element so it is a direct child of <fieldset>, and <legend>
		contains the description. Both required for assistive technology support. -->
	<legend
		v-else
		class="cdx-label"
		:class="rootClasses"
		:style="rootStyle"
		v-bind="otherAttrs"
	>
		<span class="cdx-label__label">
			<cdx-icon
				v-if="icon"
				:icon="icon"
				class="cdx-label__label__icon"
			/>
			<span class="cdx-label__label__text">
				<!-- @slot Label text. -->
				<slot />
			</span>
			<span v-if="optionalFlag || optional" class="cdx-label__label__optional-flag">
				<!-- Add a space before the optional flag text. Vue strips whitespace
					between everything except plain text, so we can't rely on a newline to
					add a natural space here. -->
				<!-- eslint-disable-next-line vue/no-useless-mustaches -->
				{{ ' ' }}
				{{ translatedOptionalFlag }}
			</span>
		</span>

		<!-- For legends, the description needs to be inside the <legend> for
			assistive technology support. -->
		<span
			v-if="$slots.description && $slots.description().length > 0"
			class="cdx-label__description"
		>
			<!-- @slot Short description text. -->
			<slot name="description" />
		</span>
	</legend>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRef } from 'vue';
import { Icon } from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';
import useFieldData from '../../composables/useFieldData';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useI18nWithOverride from '../../composables/useI18nWithOverride';

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
		 * Whether the field is optional.
		 *
		 * This will add a flag next to the label indicating that the field is optional.
		 */
		optional: {
			type: Boolean,
			default: false
		},
		// DEPRECATED: set default to '(optional)' and remove validator (T368444).
		/**
		 * Text to indicate that the field is optional.
		 *
		 * Omit this prop to use the default value, "(optional)".
		 */
		optionalFlag: {
			type: String,
			default: '',
			validator: ( value: string, props ) => {
				if ( value.length > 0 && !props.optional ) {
					// eslint-disable-next-line no-console
					console.warn(
						`[CdxLabel]: The boolean \`optional\` prop is required to show the optional flag.\n
Refer to https://doc.wikimedia.org/codex/latest/components/demos/label.html#props.`
					);
					return false;
				}
				return true;
			}
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

		const internalClasses = computed( () => ( {
			'cdx-label--visually-hidden': props.visuallyHidden,
			'cdx-label--disabled': computedDisabled.value
		} ) );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		const translatedOptionalFlag = useI18nWithOverride(
			toRef( props, 'optionalFlag' ),
			'cdx-label-optional-flag',
			'(optional)'
		);

		return {
			rootClasses,
			rootStyle,
			otherAttrs,
			translatedOptionalFlag
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

.cdx-label {
	display: flex;
	// Display the description on a separate line after the label text.
	flex-direction: column;
	font-size: @font-size-medium;
	line-height: @line-height-small;

	// Styles for label content.
	&__label {
		&__icon.cdx-icon {
			color: @color-subtle;
			margin-right: @spacing-25;
		}

		&__text {
			font-weight: @font-weight-bold;
		}
	}

	legend& {
		// Unset <legend> browser style.
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
