<template>
	<component
		:is="isFieldset ? 'fieldset' : 'div'"
		class="cdx-field"
		:class="rootClasses"
		:aria-disabled="!isFieldset && computedDisabled ? true : undefined"
		:disabled="isFieldset && computedDisabled ? true : undefined"
	>
		<cdx-label
			:id="labelId"
			:icon="labelIcon"
			:visually-hidden="hideLabel"
			:optional="optional"
			:optional-flag="optionalFlag"
			:input-id="inputId"
			:description-id="descriptionId"
			:disabled="computedDisabled"
			:is-legend="isFieldset"
		>
			<template #default>
				<!-- @slot Label text. -->
				<slot name="label" />
			</template>
			<template v-if="$slots.description && $slots.description().length > 0" #description>
				<!-- @slot Short description text. -->
				<slot name="description" />
			</template>
		</cdx-label>

		<div class="cdx-field__control">
			<!-- @slot Input, control, or input group. -->
			<slot />
		</div>

		<div class="cdx-field__help-text">
			<!-- @slot Further explanation of how to use this field. -->
			<slot name="help-text" />
		</div>

		<div
			v-if="!computedDisabled && validationMessage || $slots[ validationMessageType ]"
			class="cdx-field__validation-message"
		>
			<cdx-message :type="validationMessageType" :inline="true">
				<!-- @slot Warning message content for messages containing HTML markup. -->
				<slot v-if="status === 'warning' && $slots.warning" name="warning" />

				<!-- @slot Error message content for messages containing HTML markup. -->
				<slot v-else-if="status === 'error' && $slots.error" name="error" />

				<!-- @slot Success message content for messages containing HTML markup. -->
				<slot v-else-if="status === 'success' && $slots.success" name="success" />
				<template v-else>
					{{ validationMessage }}
				</template>
			</cdx-message>
		</div>
	</component>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, toRefs, computed, useId } from 'vue';
import { Icon } from '@wikimedia/codex-icons';

import CdxLabel from '../label/Label.vue';
import CdxMessage from '../message/Message.vue';

import { ValidationStatusTypes, DisabledKey, FieldInputIdKey, FieldDescriptionIdKey, FieldStatusKey } from '../../constants';
import { ValidationStatusType, ValidationMessages } from '../../types';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import useComputedDisabled from '../../composables/useComputedDisabled';
const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * Form field with a label, an input or control, and an optional validation message.
 */
export default defineComponent( {
	name: 'CdxField',
	components: { CdxLabel, CdxMessage },
	props: {
		/**
		 * Icon before the label text.
		 *
		 * Do not use this if including a start icon within the input component.
		 */
		labelIcon: {
			type: [ String, Object ] as PropType<Icon>,
			default: ''
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
		// DEPRECATED: set default to '(optional)' (T368444).
		/**
		 * Text to indicate that the field is optional.
		 *
		 * Omit this prop to use the default value, "(optional)".
		 */
		optionalFlag: {
			type: String,
			default: ''
		},
		/**
		 * Whether the label should be visually hidden.
		 *
		 * Note that this will also hide the description.
		 */
		hideLabel: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether this field contains a group of inputs.
		 *
		 * When true, this outputs a `<fieldset>` element with a semantic `<legend>`. When false,
		 * it outputs a `<div>` with a semantic `<label>`.
		 */
		isFieldset: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the entire field is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * `status` attribute of the input. This also determines which validation message is shown.
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
		},
		/**
		 * Message text keyed on validation status type.
		 *
		 * @default {}
		 */
		messages: {
			type: Object as PropType<ValidationMessages>,
			default: () => ( {} )
		}
	},
	setup( props, { slots } ) {
		const { disabled, status, isFieldset } = toRefs( props );
		const computedDisabled = useComputedDisabled( disabled );

		const rootClasses = computed( () => ( {
			'cdx-field--disabled': computedDisabled.value,
			'cdx-field--is-fieldset': isFieldset.value
		} ) );

		// An id attribute is added to the label in case it's useful to dev users.
		const labelId = useId();
		// The description ID is provided to the input for `aria-describedby`.
		const descriptionId = useId();

		// In the case of single input fields (not fieldsets), the input id is passed to the label
		// and provided to the input component.
		// For fieldsets, this is all taken care of by the native HTML elements (<fieldset> and
		// <legend>).
		const inputId = useId();

		// Provide the input ID and description ID to child components
		const computedInputId = computed( () => !isFieldset.value ? inputId : undefined );
		provide( FieldInputIdKey, computedInputId );
		const computedDescriptionId = computed(
			() => !isFieldset.value && slots.description ? descriptionId : undefined
		);
		provide( FieldDescriptionIdKey, computedDescriptionId );

		// Provide the values of the disabled and status props to child components.
		provide( DisabledKey, computedDisabled );
		provide( FieldStatusKey, status );

		const validationMessage = computed( () => props.status !== 'default' && props.status in props.messages ?
			props.messages[ props.status ] :
			''
		);

		// We don't allow notice validation messages, but this assures TypeScript that we won't try
		// passing 'default' to the type prop of the Message component.
		const validationMessageType = computed( () => props.status === 'default' ? 'notice' : props.status );

		return {
			rootClasses,
			computedDisabled,
			labelId,
			descriptionId,
			inputId,
			validationMessage,
			validationMessageType
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-field {
	// These styles (margin, border, and padding) are added by both browsers and in MediaWiki,
	// e.g. the fieldset styles in resources/src/mediawiki.skinning/elements.less. Border and
	// padding are unset here to ensure that this component looks the same whether it's a single
	// field or a fieldset.
	// Add vertical space between adjacent elements by adding top margin.
	// Normalize/reset the fieldset by setting margin zero to the other sides of the element.
	margin: @spacing-100 0 0 0;
	// Remove border and padding.
	border: 0;
	padding: 0;

	&:first-child {
		margin-top: 0;
	}

	&__help-text {
		line-height: @line-height-xx-small;
	}

	&__help-text,
	&__validation-message {
		margin-top: @spacing-50;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			margin-top: @spacing-25;
		}
	}

	&:not( .cdx-field--disabled ) {
		.cdx-field__help-text {
			color: @color-subtle;
		}
	}

	/* stylelint-disable no-descending-specificity */
	&--disabled {
		.cdx-field__help-text {
			color: @color-disabled;
		}
	}
	/* stylelint-enable no-descending-specificity */
}
</style>
