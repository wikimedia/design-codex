<template>
	<div
		ref="rootElement"
		class="cdx-tabs"
		:class="rootClasses"
	>
		<div
			class="cdx-tabs__header"
			tabindex="0"
			@keydown.right.prevent="onRightArrowKeypress"
			@keydown.down.prevent="onDownArrowKeypress"
			@keydown.left.prevent="onLeftArrowKeypress"
		>
			<div
				ref="focusHolder"
				tabindex="-1"
			/>
			<div
				v-show="!firstLabelVisible"
				ref="prevScroller"
				class="cdx-tabs__prev-scroller"
			>
				<cdx-button
					class="cdx-tabs__scroll-button"
					type="quiet"
					tabindex="-1"
					:aria-hidden="true"
					@mousedown.prevent
					@click="scrollTabs( 'prev' )"
				>
					<cdx-icon :icon="cdxIconPrevious" />
				</cdx-button>
			</div>
			<ul
				ref="listElement"
				class="cdx-tabs__list"
				role="tablist"
				:aria-activedescendant="activeTabId"
			>
				<li
					v-for="( tab, index ) in tabsData.values()"
					:id="`${tab.id}-label`"
					:key="index"
					:ref="( ref ) => assignTemplateRefIfNecessary( ref, index )"
					:class="getLabelClasses( tab.name )"
					class="cdx-tabs__list__item"
					role="presentation"
				>
					<a
						:href="`#${tab.id}`"
						role="tab"
						tabIndex="-1"
						:aria-selected="tab.name === activeTab"
						@click.prevent="select( tab.name )"
						@keyup.enter="select( tab.name )"
					>
						{{ tab.label }}
					</a>
				</li>
			</ul>
			<div
				v-show="!lastLabelVisible"
				ref="nextScroller"
				class="cdx-tabs__next-scroller"
			>
				<cdx-button
					class="cdx-tabs__scroll-button"
					type="quiet"
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
	VNode,
	VNodeChild,
	ComponentPublicInstance
} from 'vue';

import { cdxIconPrevious, cdxIconNext } from '@wikimedia/codex-icons';

import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';

import useGeneratedId from '../../composables/useGeneratedId';
import useComputedDirection from '../../composables/useComputedDirection';
import useModelWrapper from '../../composables/useModelWrapper';
import useIntersectionObserver from '../../composables/useIntersectionObserver';

import { TabData } from '../../types';
import { TabsKey, ActiveTabKey } from '../../constants';

/**
 * A layout containing multiple sections, only one of which is visible at any
 * given time. A header row is automatically generated from the provided
 * content.
 *
 * One or more `<Tab>` components must be provided in the default slot of the
 * `<Tabs>` component. Each child `<Tab>` component must have a `name` property.
 * The `<Tabs>` component must have an active prop which matches the name of one
 * of the child `<Tab>` components in the slot.
 *
 * In order for the active tabs to change, the `name` of the active tab must be
 * bound in the parent somehow, either using `v-model:active` or by manually
 * binding the `active` prop and listening for `update:active` events.
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
		 * Provided by `v-model:active` binding in the parent component.
		 */
		active: {
			type: String,
			required: true
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
		 * Emitted whenever the active tab changes
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
		const listElement = ref<HTMLUListElement>();
		const focusHolder = ref<HTMLDivElement>();
		const prevScroller = ref<HTMLDivElement>();
		const nextScroller = ref<HTMLDivElement>();
		const currentDirection = useComputedDirection( rootElement );

		/**
		 * Computed property that returns slot content, unpacking children when
		 * necessary (like when tabs are generated inside a v-for loop)
		 */
		const contents = computed( () => {
			const tabs: Array<VNode> = [];
			const rawSlotContent = slots.default?.();
			if ( rawSlotContent ) {
				rawSlotContent.forEach( recursivelyWalkSlotNode );
			}

			// The slot content of the <Tabs> component could contain a number
			// of different things. In addition to <Tab> child components, we
			// must also handle fragments like v-for loops (where the tabs we
			// want will be defined as children), comment tags, etc. This
			// recursive function will test a given VNode and determine whether
			// it is something we care about or whether it's children may be.
			function recursivelyWalkSlotNode( node: VNode | VNodeChild ) {
				if ( node && typeof node === 'object' && 'type' in node ) {
					if ( typeof node.type === 'object' && 'name' in node.type && node.type.name === 'CdxTab' ) {
						tabs.push( node );
					} else if ( 'children' in node && Array.isArray( node.children ) ) {
						node.children.forEach( recursivelyWalkSlotNode );
					}
				}
			}

			return tabs;
		} );

		// Throw error if no slot content provided
		if ( !contents.value || contents.value.length === 0 ) {
			throw new Error( 'Slot content cannot be empty' );
		}

		/**
		 * Returns a data structure that represents all provided tabs.
		 * Data is provided as an ES Map object.
		 */
		const tabsData = computed( () => {
			return contents.value.reduce( ( map, item ) => {
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
			}, new Map<string, TabData>() );
		} );

		// Properties tracking the current state of the tabs
		const activeTab = useModelWrapper( toRef( props, 'active' ), emit, 'update:active' );
		const tabNames = computed( () => Array.from( tabsData.value.keys() ) );
		const activeTabIndex = computed( () => tabNames.value.indexOf( activeTab.value ) );
		const activeTabId = computed( () => tabsData.value.get( activeTab.value )?.id );

		// Data provided to child Tab components
		provide( ActiveTabKey, activeTab );
		provide( TabsKey, tabsData );

		// Display logic: framed vs unframed, prev/next buttons
		const firstTabLabel = ref<HTMLLIElement>();
		const lastTabLabel = ref<HTMLLIElement>();
		const firstLabelVisible = useIntersectionObserver( firstTabLabel, { threshold: 0.95 } );
		const lastLabelVisible = useIntersectionObserver( lastTabLabel, { threshold: 0.95 } );

		/**
		 * Assign an element to the appropriate template ref if it is the first
		 * or last child of its parent. Used to determine whether prev/next
		 * buttons at the start/end of the tabs list should be enabled or disabled.
		 *
		 * @param templateRef
		 * @param index
		 */
		function assignTemplateRefIfNecessary(
			templateRef: Element | ComponentPublicInstance | null,
			index: number
		) {
			const el = templateRef as HTMLLIElement | null;
			if ( el ) {
				if ( index === 0 ) {
					firstTabLabel.value = el;
				} else if ( index === ( tabNames.value.length - 1 ) ) {
					lastTabLabel.value = el;
				}
			}
		}

		/**
		 * Get the tab label classes for a given tab "name"
		 *
		 * @param tabName
		 * @return class binding object
		 */
		function getLabelClasses( tabName: string ) {
			const isActive = tabName === activeTab.value;
			const isDisabled = !!( tabsData.value.get( tabName )?.disabled );

			return {
				'cdx-tabs__list__item--selected': isActive,
				'cdx-tabs__list__item--enabled': !isDisabled,
				'cdx-tabs__list__item--disabled': isDisabled
			};
		}

		const rootClasses = computed( () => {
			return {
				'cdx-tabs--framed': props.framed,
				'cdx-tabs--quiet': !props.framed
			};
		} );

		/**
		 * Compute how far we have to scroll the tabs list (listElement.value) in order to scroll
		 * tabLabel fully into view, taking into account the fact that the prev/next scroller
		 * buttons obscure part of the tabs list.
		 *
		 * @param tabLabel Child element of listElement (<li> element)
		 * @return Scroll distance (positive to scroll to the right, negative to scroll to the left)
		 */
		function getScrollDistance( tabLabel: HTMLElement ): number {
			if ( !listElement.value || !prevScroller.value || !nextScroller.value ) {
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
			const visibleLeft = listElement.value.scrollLeft + leftScroller.clientWidth;
			const visibleRight = listElement.value.scrollLeft +
				listElement.value.clientWidth - rightScroller.clientWidth;

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
			if ( !listElement.value || !prevScroller.value || !nextScroller.value ) {
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
				listElement.value.firstElementChild as HTMLElement|null :
				listElement.value.lastElementChild as HTMLElement|null;
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
						Math.abs( scrollDistance ) < 0.25 * listElement.value.clientWidth
					) {
						scrollDistance = getScrollDistance( nextTabLabel );
					}
					break;
				}
				tabLabel = nextTabLabel;
			}

			listElement.value.scrollBy( {
				left: scrollDistance,
				behavior: 'smooth'
			} );

			// Focus the focusHolder div, so that we receive any subsequent arrow key presses
			focusHolder.value?.focus();
		}

		// Scroll the active tab into view if it changes
		watch( activeTab, () => {
			if (
				activeTabId.value === undefined ||
				!listElement.value || !prevScroller.value || !nextScroller.value
			) {
				return;
			}
			const activeTabLabel = document.getElementById( `${activeTabId.value}-label` );
			if ( !activeTabLabel ) {
				return;
			}

			// We'd like to use activeTabLabel.scrollIntoView() here, but that doesn't take into
			// account that the prev/next buttons obscure part of the tab label even if it is
			// "in view". Instead, we do the math ourselves.
			listElement.value.scrollBy( {
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
			listElement,
			focusHolder,
			prevScroller,
			nextScroller,
			rootClasses,
			tabNames,
			tabsData,
			firstLabelVisible,
			lastLabelVisible,
			getLabelClasses,
			assignTemplateRefIfNecessary,
			scrollTabs,
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
		 * @public
		 */
		select( tabName: string ): void {
			const target = this.tabsData.get( tabName );
			if ( target && !target?.disabled ) {
				this.activeTab = tabName;
			}
		},

		/**
		 * Used to select next or previous tab in the sequence, skipping
		 * over any tabs that are disabled. The provided increment should
		 * be either 1 (to move forward) or -1 (to move backwards)
		 *
		 * @param index
		 * @param increment
		 */
		selectNonDisabled( index: number, increment: -1 | 1 ): void {
			const target = this.tabsData.get( this.tabNames[ index + increment ] );
			if ( target ) {
				if ( target.disabled ) {
					this.selectNonDisabled( index + increment, increment );
				} else {
					this.select( target.name );
				}
			}
		},

		/**
		 * Set the next tab to active, if one exists
		 *
		 * @public
		 */
		next(): void {
			this.selectNonDisabled( this.activeTabIndex, 1 );
		},

		/**
		 * Set the previous tab to active, if one exists
		 *
		 * @public
		 */
		prev(): void {
			this.selectNonDisabled( this.activeTabIndex, -1 );
		},

		/**
		 * Handle left arrow key navigation (based on LTR/RTL direction)
		 */
		onLeftArrowKeypress(): void {
			if ( this.currentDirection === 'rtl' ) {
				this.next();
			} else {
				this.prev();
			}
		},

		/**
		 * Handle right arrow key navigation (based on LTR/RTL direction)
		 */
		onRightArrowKeypress(): void {
			if ( this.currentDirection === 'rtl' ) {
				this.prev();
			} else {
				this.next();
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
/* stylelint-disable no-descending-specificity */
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@max-width-tab: 16em;
@width-tabs-header-gradient: 24px;
@background-color-tabs-framed-tab--hover: rgba( 255, 255, 255, 0.3 );
@background-color-tabs-framed-tab--active: rgba( 255, 255, 255, 0.8 );
@line-height-component: unit( ( 20 / @font-size-browser / @font-size-base ), em );

.cdx-tabs {
	// Tabs header common styles.
	&__header {
		display: flex;
		align-items: flex-end;
		position: relative;

		// The tabs header as a whole receives focus (via tabindex="0"), rather
		// than individual label elements inside the header. Once the header
		// has focus, the user can move between tabs using next/previous arrow
		// keys. Styling for the active tab label will show an additional
		// visual outline if the header has focus (indicating that the user)
		// is using the keyboard to navigate between tabs.
		//
		// Since visual indication is applied to individual tabs when the header
		// is focused, the header's *own* focus style must be suppressed.
		&:focus {
			outline: @outline-base--focus;
		}
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
		z-index: 1;
		width: @width-tabs-header-gradient;
		height: @size-full;
		pointer-events: none;
	}

	&__prev-scroller::after {
		left: @size-full;
	}

	&__next-scroller::before {
		right: @size-full;
	}

	&__scroll-button {
		height: @size-full;
	}

	// Keyboard nav indicator on Tabs header focus for framed and quiet.
	& > &__header:focus .cdx-tabs__list__item--enabled.cdx-tabs__list__item--selected [ role='tab' ] {
		box-shadow: @box-shadow-inset-medium @border-color-progressive;
		// Clip link background color to border radius (framed).
		overflow: hidden;
	}

	// Tabs list common styles.
	&__list {
		display: flex;
		overflow-x: auto;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;

		&::-webkit-scrollbar {
			/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
			-webkit-appearance: none;
			display: none;
		}

		&__item {
			flex: 0 0 auto;
			// Override possible list item margins bleeding from the outside,
			// like MediaWiki skin Vector's default.
			margin: 0;

			// Single Tab common styles.
			// By default the `a` element.
			[ role='tab' ] {
				display: block;
				max-width: @max-width-tab;
				border-top-left-radius: @border-radius-base;
				border-top-right-radius: @border-radius-base;
				padding: @spacing-25 @spacing-75;
				font-weight: @font-weight-bold;
				line-height: @line-height-component;
				text-decoration: @text-decoration-none;
				.text-overflow( @visible: false );
				transition-property: @transition-property-base;
				transition-duration: @transition-duration-base;

				&:focus {
					border-top-left-radius: @border-radius-base;
					border-top-right-radius: @border-radius-base;
					outline: @outline-base--focus;
				}
			}

			&.cdx-tabs__list__item--selected [ role='tab' ] {
				cursor: @cursor-base;
			}
		}
	}

	// Increase Tabs list specificity to override selectors like MediaWiki's `.content ul`.
	// See T321873.
	& &__list {
		list-style: none;
		margin: 0;
		padding: 0;
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
			[ role='tab' ] {
				margin: @spacing-50 @spacing-25 0 @spacing-50;
			}

			&:last-child [ role='tab' ] {
				margin-right: @spacing-50;
			}

			&--enabled {
				// Single Framed Tab.
				/* stylelint-disable max-nesting-depth */
				[ role='tab' ] {
					// Clip link background color to border radius.
					overflow: hidden;

					&:link,
					&:visited {
						color: @color-base;
					}

					&:hover {
						background-color: @background-color-tabs-framed-tab--hover;
						color: @color-base;
					}

					&:active {
						background-color: @background-color-tabs-framed-tab--active;
						color: @color-base;
					}
				}

				&.cdx-tabs__list__item--selected [ role='tab' ],
				&.cdx-tabs__list__item--selected [ role='tab' ]:hover {
					background-color: @background-color-base;
				}
				/* stylelint-enable max-nesting-depth */
			}

			&--disabled [ role='tab' ] {
				background-color: @background-color-interactive;
				color: @color-disabled;
				cursor: @cursor-base--disabled;
			}
		}
	}

	// Quiet Tabs.
	&--quiet > &__header {
		background-color: @background-color-base;
		margin: 0 @spacing-25;
		// The border separating quiet Tabs header from Tab content.
		border-bottom: @border-width-base @border-style-base @border-color-base;

		.cdx-tabs__prev-scroller::after {
			background-image: linear-gradient( to right, @background-color-base 0, @background-color-transparent @size-full );
		}

		.cdx-tabs__next-scroller::before {
			background-image: linear-gradient( to left, @background-color-base 0, @background-color-transparent @size-full );
		}

		// Quiet Tabs List item.
		.cdx-tabs__list__item {
			[ role='tab' ] {
				margin: 0 @spacing-25;
			}

			&:first-child [ role='tab' ] {
				margin-left: 0;
			}

			&:last-child [ role='tab' ] {
				margin-right: 0;
			}

			&--enabled {
				// Single Quiet Tab.
				/* stylelint-disable max-nesting-depth */
				[ role='tab' ] {
					color: @color-base;

					&:hover {
						color: @color-progressive--hover;
						// TODO: Replace box shadow color with upcoming
						// `box-shadow-color*` tokens.
						box-shadow: @box-shadow-inset-medium-vertical @border-color-progressive--hover;
					}

					&:active {
						color: @color-progressive--active;
						// TODO: Replace box shadow color with upcoming
						// `box-shadow-color*` tokens.
						box-shadow: @box-shadow-inset-medium-vertical @border-color-progressive--active;
					}
				}
				/* stylelint-enable max-nesting-depth */

				/* stylelint-disable max-nesting-depth */
				&.cdx-tabs__list__item--selected {
					[ role='tab' ] {
						color: @color-progressive;
						// TODO: Replace box shadow color with upcoming
						// `box-shadow-color*` tokens.
						box-shadow: @box-shadow-inset-medium-vertical @border-color-progressive;
					}
				}
				/* stylelint-enable max-nesting-depth */
			}

			&--disabled {
				/* stylelint-disable max-nesting-depth */
				[ role='tab' ] {
					color: @color-disabled;
					cursor: @cursor-base--disabled;
				}
				/* stylelint-enable max-nesting-depth */
			}
		}
	}
}
</style>
<!-- eslint-enable max-len -->
