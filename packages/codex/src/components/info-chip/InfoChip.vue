<template>
	<div
		v-tooltip="tooltipContent"
		class="cdx-info-chip"
		:class="rootClasses"
	>
		<cdx-icon
			v-if="computedIcon"
			class="cdx-info-chip__icon--vue"
			:icon="computedIcon"
		/>
		<span ref="textElement" class="cdx-info-chip__text">
			<!-- @slot Chip content. -->
			<slot />
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted } from 'vue';
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
import useSlotContents from '../../composables/useSlotContents';
import CdxTooltip from '../tooltip/Tooltip';

const iconMap: Partial<StatusIconMap> = {
	notice: cdxIconInfoFilled,
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
	directives: {
		tooltip: CdxTooltip
	},
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
	setup( props, { slots } ) {
		const rootClasses = computed( (): Record<string, boolean> => ( {
			[ `cdx-info-chip--${ props.status }` ]: true
		} ) );

		// For notice messages, use a custom icon if provided. Otherwise, use the default icon.
		const computedIcon = computed( () => props.status === 'notice' ? props.icon : iconMap[ props.status ]
		);

		const textElement = ref<HTMLSpanElement>();
		const isMounted = ref( false );
		const tooltipContent = computed( () => {
			if ( !isMounted.value ) {
				return null;
			}

			// Check for content overflow and return slot content for the tooltip
			// if it does overflow
			if (
				textElement.value && textElement.value.scrollWidth > textElement.value.clientWidth
			) {
				return useSlotContents( slots?.default )[ 0 ];
			}

			// No tooltip by default
			return null;
		} );

		onMounted( () => {
			isMounted.value = true;
		} );

		return {
			rootClasses,
			computedIcon,
			tooltipContent,
			textElement
		};
	}
} );

</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';

.cdx-info-chip {
	background-color: @background-color-notice-subtle;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: @spacing-25;
	box-sizing: @box-sizing-base;
	max-width: @size-full;
	border: @border-width-base @border-style-base @border-color-notice;
	border-radius: @border-radius-pill;
	padding: 0 @spacing-35;
	line-height: @line-height-small;

	&__text {
		.text-overflow( @param-visible: false );
		color: @color-base;
		font-size: @font-size-small;
	}

	// Set the default CSS icon to the icon for notice, which is the default type.
	.cdx-info-chip__icon {
		.cdx-mixin-css-icon(  @cdx-icon-info-filled, @color-icon-notice, @size-icon-small );
	}

	.cdx-info-chip__icon--vue {
		color: @color-icon-notice;
	}

	&--error {
		background-color: @background-color-error-subtle;
		border-color: @border-color-error;

		.cdx-info-chip__icon {
			.cdx-mixin-css-icon( @cdx-icon-error, @color-icon-error, @size-icon-small );
		}

		.cdx-info-chip__icon--vue {
			color: @color-icon-error;
		}
	}

	&--warning {
		background-color: @background-color-warning-subtle;
		border-color: @border-color-warning;

		.cdx-info-chip__icon {
			.cdx-mixin-css-icon( @cdx-icon-alert, @color-icon-warning, @size-icon-small );
		}

		.cdx-info-chip__icon--vue {
			color: @color-icon-warning;
		}
	}

	&--success {
		background-color: @background-color-success-subtle;
		border-color: @border-color-success;

		.cdx-info-chip__icon {
			.cdx-mixin-css-icon( @cdx-icon-success, @color-icon-success, @size-icon-small );
		}

		.cdx-info-chip__icon--vue {
			color: @color-icon-success;
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
