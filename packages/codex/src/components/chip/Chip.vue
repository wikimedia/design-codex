<template>
	<div class="cdx-chip">
		<cdx-icon
			v-if="computedIcon"
			class="cdx-chip__icon"
			:class="iconClass"
			:icon="computedIcon"
		/>
		<span class="cdx-chip--text">
			<!-- @slot Chip content. -->
			<slot />
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { statusTypeValidator } from '../../constants';
import { StatusType, StatusIconMap } from '../../types';
import {
	cdxIconInfoFilled,
	cdxIconError,
	cdxIconAlert,
	cdxIconSuccess,
	Icon
} from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';

const iconMap: StatusIconMap = {
	notice: cdxIconInfoFilled,
	error: cdxIconError,
	warning: cdxIconAlert,
	success: cdxIconSuccess
};

/**
 * A chip wrapping slotted content.
 */
export default defineComponent( {
	name: 'CdxChip',
	components: { CdxIcon },
	props: {
		/**
		 * Status type.
		 *
		 * @values 'notice', 'warning', 'error', 'success'
		 */
		status: {
			type: String as PropType<StatusType>,
			default: 'notice',
			validator: statusTypeValidator
		},
		/**
		 *
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: null
		}
	},
	setup( props ) {
		const iconClass = computed( (): Record<string, boolean> => {
			return {
				[ `cdx-chip__icon--${props.status}` ]: true
			};
		} );

		// For notice messages, use a custom icon if provided. Otherwise, use the default icon.
		const computedIcon = computed( () =>
			props.status === 'notice' ? props.icon : iconMap[ props.status ]
		);

		return {
			iconClass,
			computedIcon
		};
	}
} );

</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

// TODO: Tokenize
@font-size: 0.875em;

.cdx-chip__icon svg {
	height: @size-icon-small;
}

.cdx-chip {
	background-color: @background-color-transparent;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: @spacing-25;
	max-width: @size-3200;
	border: @border-width-base @border-style-base @border-color-notice;
	border-radius: @border-radius-pill;
	padding: 0 @spacing-50;
	line-height: @line-height-small;

	&--text {
		.text-overflow( @param-visible: false );
		color: @color-subtle;
		font-size: @font-size;
	}

	&__icon {
		&--notice {
			color: @color-subtle;
		}

		&--error {
			color: @border-color-error;
		}

		&--warning {
			color: @border-color-warning;
		}

		&--success {
			color: @border-color-success;
		}
	}
}

</style>
