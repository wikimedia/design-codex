<template>
	<div
		ref="rootElement"
		class="cdx-tabs"
		:class="rootClasses"
	>
		<div
			class="cdx-tabs__header"
			:class="headerClasses"
			tabindex="0"
			@keydown.right.prevent="onRightArrowKeypress"
			@keydown.down.prevent="onDownArrowKeypress"
			@keydown.left.prevent="onLeftArrowKeypress"
		>
			<ul
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
						@focus.prevent
					>
						{{ tab.label }}
					</a>
				</li>
			</ul>
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
						id: useGeneratedId( item.props.name ).value,
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

		// Display logic: framed vs unframed, gradient indicators
		const firstTabLabel = ref<Element>();
		const lastTabLabel = ref<Element>();
		const firstLabelVisible = useIntersectionObserver( firstTabLabel, { threshold: 0.95 } );
		const lastLabelVisible = useIntersectionObserver( lastTabLabel, { threshold: 0.95 } );

		/**
		 * Assign an element to the appropriate template ref if it is the first
		 * or last child of its parent. Used to determine whether gradient
		 * indicators need to be displayed at the start and/or end of the tabs
		 * list.
		 *
		 * @param templateRef
		 * @param index
		 */
		function assignTemplateRefIfNecessary(
			templateRef: Element | ComponentPublicInstance | null,
			index: number
		) {
			const el = templateRef as Element | null;
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
			return { 'cdx-tabs--framed': props.framed };
		} );

		const observerAvailable = computed( () => {
			if ( typeof window !== 'object' ) {
				return false;
			}

			return 'IntersectionObserver' in window &&
				'IntersectionObserverEntry' in window &&
				'intersectionRatio' in window.IntersectionObserverEntry.prototype;
		} );

		const headerClasses = computed( () => {
			return {
				'cdx-tabs__header--has-start-gradient': !firstLabelVisible.value && observerAvailable.value,
				'cdx-tabs__header--has-end-gradient': !lastLabelVisible.value && observerAvailable.value
			};
		} );

		// Scroll the active tab into view if it changes
		watch( activeTab, () => {
			if ( document && activeTabId.value ) {
				document.getElementById( `${activeTabId.value}-label` )?.scrollIntoView( {
					behavior: 'smooth',
					block: 'nearest',
					inline: 'nearest'
				} );
			}
		} );

		return {
			activeTab,
			activeTabIndex,
			activeTabId,
			currentDirection,
			rootElement,
			rootClasses,
			headerClasses,
			tabNames,
			tabsData,
			getLabelClasses,
			assignTemplateRefIfNecessary
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

<style lang="less">
/* stylelint-disable no-descending-specificity */
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

@max-width-tabs-label: 16em;
@margin-base-tabs: 6px;
@margin-tabs: @margin-base-tabs @margin-base-tabs 0 @margin-base-tabs;
@padding-tabs: @padding-vertical-menu @padding-horizontal-base;
@border-width-tabs-label: 2px;
@background-color-tabs-label-framed--hover: rgba( 255, 255, 255, 0.3 );
@background-color-tabs-label-framed--active: rgba( 255, 255, 255, 0.8 );
@box-shadow-tabs-label-framed: inset 0 0 0 @border-width-tabs-label @border-color-progressive;

// Derived values
@margin-offset-tabs-frameless: @border-width-base + @border-width-tabs-label;

.cdx-tabs {
	// General header styles
	&__header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;

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

		&--has-start-gradient {
			position: relative;

			&::before {
				content: '';
			}
		}

		&--has-end-gradient {
			position: relative;

			&::after {
				content: '';
			}
		}
	}

	// General list styles
	&__list {
		.list-unset();
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
			margin: @margin-tabs;
			transition-property: @transition-property-base;
			transition-duration: @transition-duration-base;
		}

		&__item a {
			.link-unset();
			.text-overflow( @visible: false );
			display: block;
			max-width: @max-width-tabs-label;
			padding: @padding-tabs;
			font-weight: @font-weight-bold;

			&:focus {
				outline: @outline-base--focus;
			}
		}
	}

	// Framed header styles
	&--framed > &__header {
		background-color: @background-color-tabs-framed;

		&--has-start-gradient::before {
			.gradient-indicator(
				@background-color-tabs-framed,
				@background-color-base--transparent,
				left
			);
		}

		&--has-end-gradient::after {
			.gradient-indicator(
				@background-color-tabs-framed,
				@background-color-base--transparent,
				right
			);
		}
	}

	// Framed label styles
	&--framed > &__header &__list__item {
		&--enabled a {
			border-top-left-radius: @border-radius-base;
			border-top-right-radius: @border-radius-base;
			overflow: hidden; // needed to clip link bg color to border radius

			&:hover {
				background-color: @background-color-tabs-label-framed--hover;
			}

			&:active {
				background-color: @background-color-tabs-label-framed--active;
			}
		}

		&:last-child a {
			margin-right: @margin-base-tabs;
		}

		&--selected a,
		&--selected a:hover {
			background-color: @background-color-base;
		}

		&--disabled a,
		&--disabled a:hover {
			background-color: @background-color-tabs-framed;
			color: @color-base--disabled;
			cursor: @cursor-base--disabled;
		}
	}

	// Framed keyboard nav indicator styles
	&--framed > &__header:focus &__list__item--selected {
		a {
			box-shadow: @box-shadow-tabs-label-framed;
		}
	}

	// Frameless header styles
	&:not( &--framed ) > &__header {
		background-color: @background-color-base;
		border-bottom: @border-base;

		&--has-start-gradient::before {
			.gradient-indicator(
				@background-color-base,
				@background-color-base--transparent,
				left
			);
		}

		&--has-end-gradient::after {
			.gradient-indicator(
				@background-color-base,
				@background-color-base--transparent,
				right
			);
		}
	}

	// Frameless label styles
	&:not( &--framed ) > &__header &__list__item {
		// The Frameless tab style relies on some border styling (one for the
		// header row and another for individual tab elements to indicate when
		// they are active, selected, hovered, etc. The total width of the
		// borders is 3px (1px for header border, 2px for item border).
		// To ensure final height of frameless tab header element matches that
		// of the framed version, we need to apply an offest equal to this value
		// which is being done here. The offset value is derived from the two
		// border width amounts (see top of the style block in this file).
		margin-top: @margin-base-tabs - @margin-offset-tabs-frameless;
		border-bottom: @border-width-tabs-label @border-style-base @border-color-transparent;

		&:first-of-type {
			margin-left: 0;
		}

		&:last-of-type {
			margin-right: 0;
		}

		&--enabled {
			&:hover {
				color: @color-progressive--hover;
				border-color: @border-color-progressive--hover;
			}

			&:active {
				color: @color-progressive--active;
				border-color: @border-color-progressive--active;
			}
		}

		&--selected {
			color: @color-progressive;
			border-color: @border-color-progressive;
		}

		&--disabled,
		&--disabled:hover {
			color: @color-base--disabled;
			border-color: @border-color-transparent;

			a {
				cursor: @cursor-base--disabled;
			}
		}
	}

	// Frameless keyboard nav indicator styles
	&:not( &--framed ) > &__header:focus &__list__item--selected {
		outline: solid @border-width-tabs-label @border-color-progressive;
		outline-offset: -@border-width-tabs-label;
	}
}
</style>
