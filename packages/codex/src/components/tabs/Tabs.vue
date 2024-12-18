<template>
	<div
		ref="rootElement"
		class="cdx-tabs"
		:class="rootClasses"
	>
		<div class="cdx-tabs__header">
			<div
				v-show="!firstLabelVisible"
				ref="prevScroller"
				class="cdx-tabs__prev-scroller"
			>
				<cdx-button
					class="cdx-tabs__scroll-button"
					weight="quiet"
					type="button"
					tabindex="-1"
					:aria-hidden="true"
					@mousedown.prevent
					@click="scrollTabs( 'prev' )"
				>
					<cdx-icon :icon="cdxIconPrevious" />
				</cdx-button>
			</div>
			<div
				ref="tabListElement"
				class="cdx-tabs__list"
				role="tablist"
			>
				<button
					v-for="( tab, index ) in tabsData.values()"
					:id="`${tab.id}-label`"
					:key="index"
					:ref="( ref ) => assignTemplateRefForTabButton( ref, index )"
					:disabled="tab.disabled ? true : undefined"
					:aria-controls="tab.id"
					:aria-selected="tab.name === activeTab"
					:tabindex="tab.name === activeTab ? undefined : -1"
					class="cdx-tabs__list__item"
					role="tab"
					@click.prevent="select( tab.name )"
					@keyup.enter="select( tab.name )"
					@keydown.right.prevent="onRightArrowKeypress"
					@keydown.down.prevent="onDownArrowKeypress"
					@keydown.left.prevent="onLeftArrowKeypress"
				>
					<span>{{ tab.label }}</span>
				</button>
			</div>
			<div
				v-show="!lastLabelVisible"
				ref="nextScroller"
				class="cdx-tabs__next-scroller"
			>
				<cdx-button
					class="cdx-tabs__scroll-button"
					weight="quiet"
					type="button"
					tabindex="-1"
					:aria-hidden="true"
					@mousedown.prevent
					@click="scrollTabs( 'next' )"
				>
					<cdx-icon :icon="cdxIconNext" />
				</cdx-button>
			</div>
		</div>

		<div class="cdx-tabs__content">
			<!-- @slot One or more Tab components must be provided here -->
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	computed,
	provide,
	ref,
	toRef,
	watch,
	nextTick,
	VNode,
	ComponentPublicInstance
} from 'vue';

import { cdxIconPrevious, cdxIconNext } from '@wikimedia/codex-icons';

import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';
import CdxTab from '../tab/Tab.vue';

import useGeneratedId from '../../composables/useGeneratedId';
import useComputedDirection from '../../composables/useComputedDirection';
import useOptionalModelWrapper from '../../composables/useOptionalModelWrapper';
import useIntersectionObserver from '../../composables/useIntersectionObserver';
import useSlotContents from '../../composables/useSlotContents';

import { TabData } from '../../types';
import { TabsKey, ActiveTabKey } from '../../constants';
import { isComponentVNode } from '../../utils/slotContents';

/**
 * A layout for navigating between sections of content.
 */
export default defineComponent( {
	name: 'CdxTabs',

	components: {
		CdxButton,
		CdxIcon
	},

	props: {
		/**
		 * The `name` of the currently active Tab in the layout.
		 *
		 * This prop is optional; if it is provided, it should be bound
		 * using a `v-model:active` directive in the parent component.
		 * Two-way binding the active tab is only necessary if some tab
		 * other than the first should be active as soon as the component
		 * renders (such as in cases where the active tab is bound to URL
		 * params). If this prop is not provided, then the first tab will
		 * be active by default. Regardless, the active tab can be changed
		 * normally by user interaction (clicking on tab headings) or by
		 * using the exposed methods "select", "next", and "prev".
		 */
		active: {
			type: String,
			default: null
		},

		/**
		 * Whether or not the component should be displayed in a framed
		 * visual style.
		 */
		framed: {
			type: Boolean,
			default: false
		}
	},

	emits: [
		/**
		 * Emitted whenever the active tab changes, assuming that an `active`
		 * prop has been provided in the parent.
		 *
		 * @property {string} active The `name` of the current active tab
		 */
		'update:active'
	],

	/**
	 * Some methods are exposed to allow for programmatic selection of
	 * the active tab from outside of the component.
	 */
	expose: [
		'select',
		'next',
		'prev'
	],

	setup( props, { slots, emit } ) {
		const rootElement = ref<HTMLDivElement>();
		const tabListElement = ref<HTMLDivElement>();
		const prevScroller = ref<HTMLDivElement>();
		const nextScroller = ref<HTMLDivElement>();
		const currentDirection = useComputedDirection( rootElement );

		const childTabNodes = computed( () => {
			const slotContents = useSlotContents( slots.default );
			if ( !slotContents.every( ( node ): node is VNode => typeof node === 'object' && isComponentVNode( node, CdxTab.name )
			) ) {
				throw new Error( 'Slot content may only contain CdxTab components' );
			}
			if ( slotContents.length === 0 ) {
				throw new Error( 'Slot content cannot be empty' );
			}
			return slotContents;
		} );

		/**
		 * Returns a data structure that represents all provided tabs.
		 * Data is provided as an ES Map object.
		 */
		const tabsData = computed( () => childTabNodes.value.reduce( ( map, item ) => {
			if ( item.props?.name && typeof item.props.name === 'string' ) {
				// Each tab "name" must be unique. If a given name is already
				// present in the dataset, throw an error; do not proceed
				if ( map.get( item.props.name ) ) {
					throw new Error( 'Tab names must be unique' );
				}

				// Store the tab's data in the map object, using the "name"
				// prop as a key
				map.set( item.props.name, {
					name: item.props.name,
					id: useGeneratedId( item.props.name ),
					label: item.props.label || item.props.name,
					disabled: item.props.disabled
				} );
			}
			return map;
		}, new Map<string, TabData>() ) );

		// Properties tracking the current state of the tabs
		const internalRefForActiveTab = ref( Array.from( tabsData.value.keys() )[ 0 ] );
		const activeTab = useOptionalModelWrapper( internalRefForActiveTab, toRef( props, 'active' ), emit, 'update:active' );
		const tabNames = computed( () => Array.from( tabsData.value.keys() ) );
		const activeTabIndex = computed( () => tabNames.value.indexOf( activeTab.value ) );
		const activeTabId = computed( () => tabsData.value.get( activeTab.value )?.id );

		// Data provided to child Tab components
		provide( ActiveTabKey, activeTab );
		provide( TabsKey, tabsData );

		// Set up a map to contain references to all the tab button elements, so
		// that they can be programmatically focused at runtime if necessary.
		const tabButtonRefs = ref( new Map<number, HTMLButtonElement>() );

		// Also set up dedicated refs for the fist and last tab button elements,
		// which will be used to determine whether or not to show the left and
		// right scroll buttons inside the tab header based on the user's viewport
		const firstTabLabel = ref<HTMLButtonElement>();
		const lastTabLabel = ref<HTMLButtonElement>();
		const firstLabelVisible = useIntersectionObserver( firstTabLabel, { threshold: 0.95 } );
		const lastLabelVisible = useIntersectionObserver( lastTabLabel, { threshold: 0.95 } );

		/**
		 * Store pointers to each tab button element which gets rendered into
		 * previously-prepared reactive variables so that we can keep track of
		 * them.
		 *
		 * @param templateRef
		 * @param index
		 */
		function assignTemplateRefForTabButton(
			templateRef: Element | ComponentPublicInstance | null,
			index: number
		) {
			const el = templateRef as HTMLButtonElement | null;
			if ( el ) {
				tabButtonRefs.value.set( index, el );

				if ( index === 0 ) {
					firstTabLabel.value = el;
				} else if ( index === ( tabNames.value.length - 1 ) ) {
					lastTabLabel.value = el;
				}
			}
		}

		const rootClasses = computed( () => ( {
			'cdx-tabs--framed': props.framed,
			'cdx-tabs--quiet': !props.framed
		} ) );

		/**
		 * Set focus on the active tab button after the DOM has updated
		 */
		function focusActiveTab() {
			tabButtonRefs.value.get( activeTabIndex.value )?.focus();
		}

		/**
		 * Compute how far we have to scroll the tabs list (listElement.value) in order to scroll
		 * tabLabel fully into view, taking into account the fact that the prev/next scroller
		 * buttons obscure part of the tabs list.
		 *
		 * @param tabLabel Child element of listElement (<li> element)
		 * @return Scroll distance (positive to scroll to the right, negative to scroll to the left)
		 */
		function getScrollDistance( tabLabel: HTMLElement ): number {
			if ( !tabListElement.value || !prevScroller.value || !nextScroller.value ) {
				return 0;
			}

			// Identify which of the scrollers appears on the left, and which on the right
			const leftScroller = currentDirection.value === 'rtl' ? nextScroller.value : prevScroller.value;
			const rightScroller = currentDirection.value === 'rtl' ? prevScroller.value : nextScroller.value;

			// Find the X coordinates of the left and right edges of the tab label. Because this
			// uses .offsetLeft, the coordinates are relative to the start of the tabs list (in LTR,
			// starting at 0 from the left edge and increasing to the right; in RTL, starting at 0
			// from the right edge and decreasing into negative numbers to the left), and don't
			// change when the tabs list is scrolled
			const labelLeft = tabLabel.offsetLeft;
			const labelRight = labelLeft + tabLabel.clientWidth;

			// Find the range of X coordinates that is currently scrolled into view and not obscured
			// by either of the scrollers. This uses .scrollLeft, which uses the same coordinate
			// system as .offsetLeft above.
			const visibleLeft = tabListElement.value.scrollLeft + leftScroller.clientWidth;
			const visibleRight = tabListElement.value.scrollLeft +
				tabListElement.value.clientWidth - rightScroller.clientWidth;

			// If the tab label is (partially) to the left of the visible area, scroll left until
			// its left edge is just visible
			if ( labelLeft < visibleLeft ) {
				return labelLeft - visibleLeft;
			}
			// If the tab label is (partially) to the right of the visible area, scroll right until
			// its right edge is just visible
			if ( labelRight > visibleRight ) {
				return labelRight - visibleRight;
			}
			// The tab label is entirely within the visible area, so don't scroll
			return 0;
		}

		function scrollTabs( logicalDirection: 'prev' | 'next' ) {
			if ( !tabListElement.value || !prevScroller.value || !nextScroller.value ) {
				return;
			}

			// In LTR, prev scrolls to the left (negative), next to the right (positive);
			// in RTL, it's the other way around
			const scrollDirection =
				( logicalDirection === 'next' && currentDirection.value === 'ltr' ) ||
				( logicalDirection === 'prev' && currentDirection.value === 'rtl' ) ?
					1 : -1;
			// Iterate through the tab labels in the specified direction, until we find one that
			// would force us to scroll in the specified direction, then scroll that one into view
			let scrollDistance = 0;
			let tabLabel = logicalDirection === 'next' ?
				tabListElement.value.firstElementChild as HTMLElement|null :
				tabListElement.value.lastElementChild as HTMLElement|null;
			while ( tabLabel ) {
				const nextTabLabel = logicalDirection === 'next' ?
					tabLabel.nextElementSibling as HTMLElement|null :
					tabLabel.previousElementSibling as HTMLElement|null;

				scrollDistance = getScrollDistance( tabLabel );
				if ( Math.sign( scrollDistance ) === scrollDirection ) {
					// This is the first tab that requires scrolling in the specified direction
					// If the scroll distance is too low (<25% of the width of the tabs list),
					// advance one more
					if (
						nextTabLabel &&
						Math.abs( scrollDistance ) < 0.25 * tabListElement.value.clientWidth
					) {
						scrollDistance = getScrollDistance( nextTabLabel );
					}
					break;
				}
				tabLabel = nextTabLabel;
			}

			tabListElement.value.scrollBy( {
				left: scrollDistance,
				behavior: 'smooth'
			} );

			// Focus the active tab button, so that we receive any subsequent arrow key presses
			focusActiveTab();
		}

		// Scroll the active tab into view if it changes
		watch( activeTab, () => {
			if (
				activeTabId.value === undefined ||
				!tabListElement.value || !prevScroller.value || !nextScroller.value
			) {
				return;
			}
			const activeTabLabel = document.getElementById( `${ activeTabId.value }-label` );
			if ( !activeTabLabel ) {
				return;
			}

			// We'd like to use activeTabLabel.scrollIntoView() here, but that doesn't take into
			// account that the prev/next buttons obscure part of the tab label even if it is
			// "in view". Instead, we do the math ourselves.
			tabListElement.value.scrollBy( {
				left: getScrollDistance( activeTabLabel ),
				behavior: 'smooth'
			} );
		} );

		return {
			activeTab,
			activeTabIndex,
			activeTabId,
			currentDirection,
			rootElement,
			tabListElement,
			prevScroller,
			nextScroller,
			rootClasses,
			tabNames,
			tabsData,
			firstLabelVisible,
			lastLabelVisible,
			assignTemplateRefForTabButton,
			scrollTabs,
			focusActiveTab,
			cdxIconPrevious,
			cdxIconNext
		};
	},

	/**
	 * Some non-public methods are defined here rather than in setup because
	 * they support public methods (which *must* be defined using the Options
	 * API in order to show up in documentation), or are thematically related
	 * (such as key handlers).
	 */
	methods: {
		/**
		 * Programmatically select a tab based on its "name" prop
		 *
		 * @param {string} tabName The name of the tab to select
		 * @param {boolean} setFocus Whether or not to also set focus to the new tab
		 * @public
		 */
		select( tabName: string, setFocus?: boolean ): void {
			const target = this.tabsData.get( tabName );
			if ( target && !target?.disabled ) {
				this.activeTab = tabName;
				if ( setFocus ) {
					// Wait for DOM to update before setting focus
					// eslint-disable-next-line @typescript-eslint/no-floating-promises
					nextTick( () => {
						this.focusActiveTab();
					} );
				}
			}
		},

		/**
		 * Used to select next or previous tab in the sequence, skipping
		 * over any tabs that are disabled. The provided increment should
		 * be either 1 (to move forward) or -1 (to move backwards)
		 *
		 * @param index
		 * @param increment
		 * @param setFocus
		 */
		selectNonDisabled( index: number, increment: -1 | 1, setFocus?: boolean ): void {
			const target = this.tabsData.get( this.tabNames[ index + increment ] );
			if ( target ) {
				if ( target.disabled ) {
					this.selectNonDisabled( index + increment, increment, setFocus );
				} else {
					this.select( target.name, setFocus );
				}
			}
		},

		/**
		 * Set the next tab to active, if one exists
		 *
		 * @param {boolean} setFocus
		 * @public
		 */
		next( setFocus?: boolean ): void {
			this.selectNonDisabled( this.activeTabIndex, 1, setFocus );
		},

		/**
		 * Set the previous tab to active, if one exists
		 *
		 * @param {boolean} setFocus
		 * @public
		 */
		prev( setFocus?: boolean ): void {
			this.selectNonDisabled( this.activeTabIndex, -1, setFocus );
		},

		/**
		 * Handle left arrow key navigation (based on LTR/RTL direction)
		 */
		onLeftArrowKeypress(): void {
			if ( this.currentDirection === 'rtl' ) {
				this.next( true );
			} else {
				this.prev( true );
			}
		},

		/**
		 * Handle right arrow key navigation (based on LTR/RTL direction)
		 */
		onRightArrowKeypress(): void {
			if ( this.currentDirection === 'rtl' ) {
				this.prev( true );
			} else {
				this.next( true );
			}
		},

		/**
		 * Handle down arrow key navigation by moving focus to the contents
		 * of the currently active tab
		 */
		onDownArrowKeypress(): void {
			if ( this.activeTabId ) {
				document.getElementById( this.activeTabId )?.focus();
			}
		}
	}
} );
</script>

<!-- eslint-disable max-len -->
<style lang="less">
/* stylelint-disable no-descending-specificity, max-nesting-depth */
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

.cdx-tabs {
	// Tabs header common styles.
	&__header {
		display: flex;
		align-items: flex-end;
		position: relative;
	}

	&__prev-scroller,
	&__next-scroller {
		// The scrollers should obscure the tab labels behind them, but quiet buttons sometimes
		// have transparent backgrounds. Remedy this by giving the scrollers the same background
		// color as the header.
		background-color: inherit;
		position: absolute;
		top: 0;
		bottom: 0;
	}

	&__prev-scroller {
		left: 0;
	}

	&__next-scroller {
		right: 0;
	}

	&__prev-scroller::after,
	&__next-scroller::before {
		content: '';
		position: absolute;
		top: 0;
		z-index: @z-index-stacking-1;
		width: @size-150;
		height: @size-full;
		pointer-events: none;
	}

	&__prev-scroller::after {
		left: @size-full;
	}

	&__next-scroller::before {
		right: @size-full;
	}

	&__scroll-button.cdx-button {
		height: @size-full;
	}

	// Tabs list common styles.
	&__list {
		display: flex;
		overflow-x: auto;
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;

		&::-webkit-scrollbar {
			/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
			-webkit-appearance: none;
			display: none;
		}

		&__item {
			// Override browser <button> styles for background
			background-color: @background-color-transparent;
			display: block;
			flex: 0 0 auto;
			max-width: @size-1600;
			// Override browser <button> styles for border
			border-width: 0;
			border-top-left-radius: @border-radius-base;
			border-top-right-radius: @border-radius-base;
			padding: @spacing-25 @spacing-75;
			font-size: @font-size-medium;
			font-weight: @font-weight-bold;
			line-height: @line-height-x-small;
			text-decoration: @text-decoration-none;
			.text-overflow( @param-visible: false );
			transition-property: @transition-property-base;
			transition-duration: @transition-duration-base;

			&:hover {
				cursor: @cursor-base--hover;
			}

			&[ aria-selected='true' ] {
				cursor: @cursor-base;
			}
		}
	}

	& > &__header &__list__item + &__list__item {
		// Eliminate excess space between tab list items.
		margin-left: 0;
	}

	// Framed Tabs.
	&--framed > &__header {
		background-color: @background-color-interactive;

		.cdx-tabs__prev-scroller::after {
			background-image: linear-gradient( to right, @background-color-interactive 0, @background-color-transparent @size-full );
		}

		.cdx-tabs__next-scroller::before {
			background-image: linear-gradient( to left, @background-color-interactive 0, @background-color-transparent @size-full );
		}

		// Framed Tabs List item.
		.cdx-tabs__list__item {
			color: @color-base;
			margin: @spacing-50 @spacing-25 0 @spacing-50;

			&:enabled {
				// Clip link background color to border radius.
				overflow: hidden;

				&:hover {
					background-color: @background-color-interactive-subtle--hover;
					color: @color-base;
					/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
					mix-blend-mode: @mix-blend-mode-blend;
				}

				&:active {
					background-color: @background-color-interactive-subtle--active;
					color: @color-base;
				}
			}

			&[ aria-selected='true' ] {
				&,
				&:hover {
					background-color: @background-color-base;
					color: @color-base;
					/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
					mix-blend-mode: @mix-blend-mode-base;
				}
			}

			&:disabled {
				background-color: @background-color-interactive;
				color: @color-disabled;
				cursor: @cursor-base--disabled;
			}

			&:last-child {
				margin-right: @spacing-50;
			}
		}
	}

	// Quiet Tabs.
	&:not( .cdx-tabs--framed ) > &__header {
		background-color: @background-color-base;
		margin: 0 @spacing-25;
		// The border separating quiet Tabs header from Tab content.
		border-bottom: @border-base;

		.cdx-tabs__prev-scroller::after {
			background-image: linear-gradient( to right, @background-color-base 0, @background-color-transparent @size-full );
		}

		.cdx-tabs__next-scroller::before {
			background-image: linear-gradient( to left, @background-color-base 0, @background-color-transparent @size-full );
		}

		// Quiet Tabs List item.
		.cdx-tabs__list__item {
			margin: 0 @spacing-12;

			&:enabled {
				color: @color-base;

				&:hover:not( [ aria-selected='true' ] ) {
					color: @color-progressive--hover;
					box-shadow: @box-shadow-inset-medium-vertical @box-shadow-color-progressive-selected--hover;
				}

				&:active:not( [ aria-selected='true' ] ) {
					color: @color-progressive--active;
					box-shadow: @box-shadow-inset-medium-vertical @box-shadow-color-progressive-selected--active;
				}
			}

			&[ aria-selected='true' ] {
				color: @color-progressive;
				box-shadow: @box-shadow-inset-medium-vertical @box-shadow-color-progressive-selected;

				&:hover {
					color: @color-progressive;
				}
			}

			&:disabled {
				color: @color-disabled;
				cursor: @cursor-base--disabled;
			}

			&:first-child {
				margin-left: 0;
			}

			&:last-child {
				margin-right: 0;
			}
		}
	}

	// focus-visible styles for keyboard navigation only.
	&--framed,
	&:not( .cdx-tabs--framed ) {
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		> .cdx-tabs__header .cdx-tabs__list__item:focus-visible {
			box-shadow: @box-shadow-inset-medium @border-color-progressive;
			outline: @outline-base--focus;
			overflow: hidden;
		}
	}
}
</style>
<!-- eslint-enable max-len -->
