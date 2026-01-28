<template>
	<teleport :to="computedTarget" :disabled="renderInPlace">
		<!-- Focus trap start -->
		<div
			v-if="open"
			ref="focusTrapStart"
			tabindex="0"
			@focus="focusLast"
		/>
		<div
			v-if="open"
			ref="floating"
			class="cdx-popover"
			:style="floatingStyles"
			v-bind="$attrs"
		>
			<header v-if="showHeader || $slots.header" class="cdx-popover__header">
				<!-- @slot Customizable Popover header. -->
				<slot name="header">
					<cdx-icon
						v-if="icon"
						class="cdx-popover__header__icon"
						:icon
					/>
					<div v-if="title" class="cdx-popover__header__title">
						{{ title }}
					</div>
					<div class="cdx-popover__header__button-wrapper">
						<cdx-button
							v-if="useCloseButton"
							class="cdx-popover__header__close-button"
							weight="quiet"
							type="button"
							:aria-label="translatedCloseButtonLabel"
							@click="close"
						>
							<cdx-icon :icon="cdxIconClose" />
						</cdx-button>
					</div>
				</slot>
			</header>

			<div
				ref="focusHolder"
				class="cdx-popover-focus-trap"
				tabindex="-1"
			/>

			<div
				ref="popoverBody"
				class="cdx-popover__body"
			>
				<!-- @slot Popover body content. -->
				<slot />
			</div>

			<footer v-if="showFooter || $slots.footer" class="cdx-popover__footer">
				<!-- @slot Customizable Popover footer. -->
				<slot name="footer">
					<div
						class="cdx-popover__footer__actions"
						:class="footerActionsClasses"
					>
						<cdx-button
							v-if="primaryAction"
							class="cdx-popover__footer__primary-action"
							weight="primary"
							:action="primaryAction.actionType"
							:disabled="primaryAction.disabled"
							@click="$emit( 'primary' )"
						>
							{{ primaryAction.label }}
						</cdx-button>

						<cdx-button
							v-if="defaultAction"
							class="cdx-popover__footer__default-action"
							:disabled="defaultAction.disabled"
							@click="$emit( 'default' )"
						>
							{{ defaultAction.label }}
						</cdx-button>
					</div>
				</slot>
			</footer>
			<div
				ref="arrowRef"
				class="cdx-popover__arrow"
				:style="arrowStyles"
			/>
		</div>
		<!-- Focus trap end -->
		<div
			v-if="open"
			ref="focusTrapEnd"
			tabindex="0"
			@focus="focusFirst"
		/>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ComponentPublicInstance, computed, inject, toRef, ref, watch, onMounted, onUnmounted, nextTick, reactive, unref } from 'vue';
import { useFloating, offset, flip, autoUpdate, size, arrow, Side, Placement } from '@floating-ui/vue';
import { Icon, cdxIconClose } from '@wikimedia/codex-icons';

import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';

import useI18nWithOverride from '../../composables/useI18nWithOverride';
import { unwrapElement } from '../../utils/unwrapElement';
import { PrimaryModalAction, ModalAction, TeleportTarget } from '../../types';
import { oppositeSides } from '../../constants';
import useFocusTrap from '../../composables/useFocusTrap';

/**
 * Internal component: Floating variant of Popover using Floating UI.
 * This component is not exported and should only be used internally by Popover.
 */
export default defineComponent( {
	name: 'CdxPopoverFloating',

	components: { CdxButton, CdxIcon },

	inheritAttrs: false,

	props: {
		/**
		 * The triggering element that opens and closes the popover. This should be a template ref,
		 * which can be either an HTML element or a Vue component.
		 */
		anchor: {
			type: Object as PropType<HTMLElement | ComponentPublicInstance | null>,
			default: null
		},

		/**
		 * Whether the popover is visible.
		 */
		open: {
			type: Boolean,
			default: false
		},

		/**
		 * Title text at the top of the popover.
		 */
		title: {
			type: String,
			default: ''
		},

		/**
		 * Icon displayed at the start of the popover.
		 */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			default: ''
		},

		/**
		 * Add an icon-only close button to the popover header.
		 */
		useCloseButton: {
			type: Boolean,
			default: false
		},

		/**
		 * Visually-hidden label text for the icon-only close button in the header.
		 */
		closeButtonLabel: {
			type: String,
			default: 'Close'
		},

		/**
		 * Primary user action.
		 */
		primaryAction: {
			type: Object as PropType<PrimaryModalAction>,
			default: null
		},

		/**
		 * Default user action.
		 */
		defaultAction: {
			type: Object as PropType<ModalAction>,
			default: null
		},

		/**
		 * Whether action buttons should be vertically stacked and 100% width.
		 */
		stackedActions: {
			type: Boolean,
			default: false
		},

		/**
		 * Whether to disable the use of teleport and render the Popover in its
		 * original location in the document.
		 */
		renderInPlace: {
			type: Boolean,
			default: false
		},

		/**
		 * Positioning options for the Popover.
		 */
		placement: {
			type: String as PropType<Placement>,
			default: 'bottom'
		}
	},

	emits: [
		'update:open',
		'primary',
		'default'
	],

	setup( props, { emit } ) {
		const placementRef = toRef( props, 'placement' );

		// Floating UI behavior.
		const floating = ref<HTMLDivElement>();
		const reference = toRef( props, 'anchor' );
		const arrowRef = ref<HTMLDivElement>();
		const popoverBody = ref<HTMLDivElement>();

		// TODO: Convert hardcoded values to JS Token T388062.
		const clipPadding = 16;
		const minClipWidth = 192;
		const minClipHeight = 200;
		const maxClipWidth = 512;

		const sideA = 16;
		const sideB = 16;
		const sideC = Math.sqrt( ( sideA ** 2 ) + ( sideB ** 2 ) );
		const triangleHeight = sideC / 2;
		const arrowOffset = 4;
		const offsetDistance = triangleHeight + arrowOffset;

		const computedMiddleware = computed( () => [
			offset( offsetDistance ),
			flip(),
			size( {
				padding: clipPadding,
				apply( { availableWidth, availableHeight, elements } ) {
					const maxWidth = Math.min( maxClipWidth, availableWidth );
					Object.assign( elements.floating.style, {
						maxWidth: `${ Math.max( minClipWidth, maxWidth ) }px`,
						maxHeight: `${ Math.max( minClipHeight, availableHeight ) }px`
					} );
				}
			} ),
			arrow( { element: arrowRef } )
		] );

		const {
			floatingStyles,
			middlewareData,
			placement,
			x,
			y
		} = useFloating( reference, floating, {
			whileElementsMounted: autoUpdate,
			placement: placementRef,
			middleware: computedMiddleware
		} );

		const arrowStyles = reactive<Record<Side|'transform', string>>( {
			left: '0',
			top: '0',
			right: '0',
			bottom: '0',
			transform: 'none'
		} );

		const oppositeSide = computed( () => oppositeSides[ placement.value ] );

		watch( [ x, y ], () => {
			if ( middlewareData.value.arrow ) {
				const { x: arrowX, y: arrowY } = middlewareData.value.arrow;

				arrowStyles.left = arrowX ? `${ arrowX }px` : '';
				arrowStyles.top = arrowY ? `${ arrowY }px` : '';
				arrowStyles.right = '';
				arrowStyles.bottom = '';

				arrowStyles[ oppositeSide.value ] = `${ ( -16 / 2 ) - 1 }px`;

				const arrowTransforms = {
					top: 'rotate( 45deg )',
					right: 'rotate( 135deg )',
					bottom: 'rotate( 225deg )',
					left: 'rotate( 315deg )'
				};

				arrowStyles.transform = arrowTransforms[ oppositeSide.value ];
			}
		} );

		const providedTarget = inject<TeleportTarget>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => unref( providedTarget ) ?? 'body' );

		const translatedCloseButtonLabel = useI18nWithOverride(
			toRef( props, 'closeButtonLabel' ),
			'cdx-popover-close-button-label',
			'Close'
		);

		const showHeader = computed( () => !!props.title || !!props.icon || props.useCloseButton );
		const showFooter = computed( () => !!props.primaryAction || !!props.defaultAction );

		const footerActionsClasses = computed( () => ( {
			'cdx-popover__footer__actions--vertical': props.stackedActions
		} ) );

		function close() {
			emit( 'update:open', false );
		}

		const {
			focusTrapStart,
			focusTrapEnd,
			focusHolder,
			focusFirst,
			focusLast,
			activateFocusTrap,
			deactivateFocusTrap
		} = useFocusTrap( {
			containerRef: floating,
			bodyRef: popoverBody,
			anchorRef: reference,
			preventScroll: true
		} );

		function onKeydown( event: KeyboardEvent ) {
			if ( event.key === 'Escape' ) {
				close();
			}
		}

		function onFocusOut( event: MouseEvent | FocusEvent ) {
			const referenceEl = unwrapElement( reference.value );
			const isOutsidePopoverAndTrigger = (
				event.target !== document.documentElement &&
				( floating.value && !floating.value.contains( event.target as Node ) ) &&
				( !referenceEl?.contains( event.target as Node ) )
			);

			if ( isOutsidePopoverAndTrigger ) {
				close();
			}
		}

		watch( () => props.open, async ( isOpen ) => {
			if ( isOpen ) {
				document.addEventListener( 'keydown', onKeydown );
				document.addEventListener( 'mousedown', onFocusOut );
				document.addEventListener( 'focusin', onFocusOut );
				await activateFocusTrap();
			} else {
				document.removeEventListener( 'keydown', onKeydown );
				document.removeEventListener( 'mousedown', onFocusOut );
				document.removeEventListener( 'focusin', onFocusOut );
				deactivateFocusTrap();
			}
		} );

		onMounted( async () => {
			if ( props.open ) {
				document.addEventListener( 'keydown', onKeydown );
				document.addEventListener( 'mousedown', onFocusOut );
				document.addEventListener( 'focusin', onFocusOut );
				await activateFocusTrap();
			}

			await nextTick();
			if ( props.anchor === null ) {
				// eslint-disable-next-line no-console
				console.warn( '[CdxPopoverFloating]: The "anchor" prop must be provided to position the CdxPopoverFloating.' );
			}
		} );

		onUnmounted( () => {
			deactivateFocusTrap();
			document.removeEventListener( 'keydown', onKeydown );
			document.removeEventListener( 'mousedown', onFocusOut );
			document.removeEventListener( 'focusin', onFocusOut );
		} );

		return {
			computedTarget,
			translatedCloseButtonLabel,
			showHeader,
			showFooter,
			footerActionsClasses,
			close,
			cdxIconClose,
			floating,
			floatingStyles,
			arrowRef,
			arrowStyles,
			focusTrapStart,
			focusTrapEnd,
			focusHolder,
			popoverBody,
			focusFirst,
			focusLast
		};
	}
} );
</script>

<style lang="less">
@import (reference) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-popover {
	background-color: @background-color-base;
	display: flex;
	flex-direction: column;
	position: absolute;
	z-index: @z-index-popover;
	box-sizing: @box-sizing-base;
	// Note that max-width is set by FloatingUI's size middleware.
	min-width: @size-1200;
	border: @border-base;
	border-radius: @border-radius-base;
	padding: @spacing-100;
	box-shadow: @box-shadow-medium;

	&__header {
		display: flex;
		align-items: flex-start;
		flex-shrink: 0;
		gap: @spacing-50;
		margin-bottom: @spacing-50;

		&__icon {
			flex-shrink: 0;
			height: @line-height-small;
		}

		&__title {
			font-size: @font-size-medium;
			font-weight: @font-weight-bold;
			line-height: @line-height-small;
		}

		&__button-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: @line-height-small;
			margin-right: -@spacing-50;
			margin-left: auto;
		}
	}

	&__body {
		flex-grow: 1;
		flex-shrink: 1;
		overflow-y: auto;
		font-size: @font-size-medium;
		line-height: @line-height-small;
	}

	&__footer {
		flex-shrink: 0;
		margin-top: @spacing-100;

		&__actions {
			display: flex;
			flex-direction: row-reverse;
			gap: @spacing-75;

			&--vertical {
				flex-direction: column;
				width: @size-full;

				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-button {
					max-width: none;
				}
			}

			@media ( max-width: @min-width-breakpoint-tablet ) {
				flex-direction: column;
				width: @size-full;

				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-button {
					max-width: none;
				}
			}
		}
	}

	&__arrow {
		background-color: @background-color-base;
		position: absolute;
		width: @size-100;
		height: @size-100;
		border: @border-base;
		border-top-left-radius: @border-radius-base;
		box-shadow: @box-shadow-medium;
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		clip-path: polygon( 0 0, 100% 0, 0 100% );
	}
}

.cdx-popover-focus-trap {
	position: absolute;

	&:focus {
		outline: 0;
	}
}
</style>
