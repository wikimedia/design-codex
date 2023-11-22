<template>
	<div class="cdx-info-chip">
		<cdx-icon
			v-if="computedIcon"
			class="cdx-info-chip__icon"
			:class="iconClass"
			:icon="computedIcon"
		/>
		<span class="cdx-info-chip--text">
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
	cdxIconError,
	cdxIconAlert,
	cdxIconSuccess,
	Icon
} from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';

const iconMap: Partial<StatusIconMap> = {
	error: cdxIconError,
	warning: cdxIconAlert,
	success: cdxIconSuccess
};

/**
 * A non-interactive item that provides information.
 */
export default defineComponent( {
	name: 'CdxInfoChip',
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
		 * Custom icon to use for "notice" chips. Chips with other status types
		 * (warning, etc) do not allow custom icons and will ignore this option.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: null
		}
	},
	setup( props ) {
		const iconClass = computed( (): Record<string, boolean> => {
			return {
				[ `cdx-info-chip__icon--${ props.status }` ]: true
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

.cdx-info-chip {
	background-color: @background-color-transparent;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: @spacing-25;
	max-width: @size-3200;
	border: @border-width-base @border-style-base @border-color-subtle;
	border-radius: @border-radius-pill;
	padding: 0 @spacing-50;
	line-height: @line-height-small;

	&--text {
		.text-overflow( @param-visible: false );
		color: @color-subtle;
		font-size: @font-size-small;
	}

	&__icon {
		&--notice {
			color: @color-notice;
		}

		&--error {
			color: @color-error;
		}

		&--warning {
			color: @color-warning;
		}

		&--success {
			color: @color-success;
		}
	}

	.cdx-icon {
		min-width: @min-size-icon-small;
		min-height: @min-size-icon-small;
		width: @size-icon-small;
		height: @size-icon-small;
	}
}

</style>
