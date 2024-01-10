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

		<div
			class="cdx-field__control"
			:class="{ 'cdx-field__control--has-help-text': ( $slots[ 'help-text' ] &&
				$slots[ 'help-text' ]().length > 0 ) || validationMessage }"
		>
			<!-- @slot Input, control, or input group. -->
			<slot />
		</div>

		<div class="cdx-field__help-text">
			<!-- @slot Further explanation of how to use this field. -->
			<slot name="help-text" />
		</div>

		<div
			v-if="!computedDisabled && validationMessage"
			class="cdx-field__validation-message"
		>
			<cdx-message :type="validationMessageType" :inline="true">
				{{ validationMessage }}
			</cdx-message>
		</div>
	</component>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, toRefs, computed } from 'vue';
import { Icon } from '@wikimedia/codex-icons';

import CdxLabel from '../label/Label.vue';
import CdxMessage from '../../components/message/Message.vue';

import { ValidationStatusTypes, DisabledKey, FieldInputIdKey, FieldDescriptionIdKey, FieldStatusKey } from '../../constants';
import { ValidationStatusType, ValidationMessages } from '../../types';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import useGeneratedId from '../../composables/useGeneratedId';
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
		 */
		messages: {
			type: Object as PropType<ValidationMessages>,
			default: () => {
				return {};
			}
		}
	},
	setup( props, { slots } ) {
		const { disabled, status, isFieldset } = toRefs( props );
		const computedDisabled = useComputedDisabled( disabled );

		const rootClasses = computed( () => {
			return {
				'cdx-field--disabled': computedDisabled.value
			};
		} );

		// An id attribute is added to the label in case it's useful to dev users.
		const labelId = useGeneratedId( 'label' );
		// The description ID is provided to the input for `aria-describedby`.
		const descriptionId = useGeneratedId( 'description' );

		// In the case of single input fields (not fieldsets), the input id is passed to the label
		// and provided to the input component.
		// For fieldsets, this is all taken care of by the native HTML elements (<fieldset> and
		// <legend>).
		const inputId = useGeneratedId( 'input' );

		// Provide the input ID and description ID to child components
		const computedInputId = computed( () => !isFieldset.value ? inputId : undefined );
		provide( FieldInputIdKey, computedInputId );
		const computedDescriptionId = computed( () =>
			!isFieldset.value && slots.description ? descriptionId : undefined
		);
		provide( FieldDescriptionIdKey, computedDescriptionId );

		// Provide the values of the disabled and status props to child components.
		provide( DisabledKey, computedDisabled );
		provide( FieldStatusKey, status );

		const validationMessage = computed( () =>
			props.status !== 'default' && props.status in props.messages ?
				props.messages[ props.status ] :
				''
		);

		// We don't allow notice validation messages, but this assures TypeScript that we won't try
		// passing 'default' to the type prop of the Message component.
		const validationMessageType = computed( () =>
			props.status === 'default' ? 'notice' : props.status );

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
	// Remove <fieldset> margin, border, and padding.
	// These styles are added by both browsers and in MediaWiki, e.g. the fieldset styles in
	// resources/src/mediawiki.skinning/elements.less. They are all unset here to ensure that
	// this component looks the same whether it's a single field or a fieldset.
	// The margin could be overridden in feature code or in a future CdxForm component to add
	// space between fields.
	margin: 0;
	border: 0;
	padding: 0;

	&__control {
		&--has-help-text {
			padding-bottom: @spacing-50;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				padding-bottom: @spacing-25;
			}
		}
	}

	&__help-text {
		line-height: @line-height-xx-small;
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
