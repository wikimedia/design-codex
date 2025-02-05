<!-- eslint-disable vue/singleline-html-element-content-newline max-len -->
<template>
	<demo-base-layout class="cdx-demo-experiments">
		<template #header>
			Codex experiments
		</template>
		<template #content>
			<section id="rcf" class="cdx-demo-experiments__rcf">
				<h2>RCFilters experiments</h2>

				<h3 id="rcf-ml">MultiselectLookup with custom menu display</h3>

				<p>
					This demo uses the MultiselectLookup component to create an approximation of the
					filter selector in RCFilters. Some shortcomings include:
				</p>
				<ul>
					<li>Clicking a toggle button in the group above the input will close the menu.</li>
					<li>Buttons within the menu are not reachable via keyboard navigation.</li>
					<li>The hover color of quiet toggle buttons is the same as the background color of the hovered menu item.</li>
				</ul>

				<!-- Note that the menu will close when you click a toggle button, since the
				MultiselectLookup loses focus. -->
				<cdx-toggle-button-group v-model="currentMenu" :buttons="toggleButtons" />
				<cdx-multiselect-lookup
					v-model:input-chips="chipsHeader"
					v-model:selected="selectionHeader"
					class="multiselect-lookup-demo-header"
					:menu-items="menuItemsHeader"
					:menu-config="menuConfigHeader"
					aria-label="MultiselectLookup demo"
					@input="onInputHeader"
				>
					<!-- Use the menu-item slot, which has a binding for each menu item. -->
					<template #menu-item="{ menuItem }">
						<!-- Check for the header menu item value using v-if. -->
						<!-- Stop propagation of clicks to prevent selecting this item. -->
						<span
							v-if="menuItem.value === 'multiselect-lookup-menu-header'"
							class="multiselect-lookup-demo-header__menu-header"
							@click.stop
						>
							<span class="multiselect-lookup-demo-header__menu-header__title">
								<!-- Conditional rendering depending on which menu is showing. -->
								{{ getCurrentMenu() }}
							</span>
							<!-- Note that all of the interactive elements in menu items are not
							accessible via keyboard navigation. This is true of the current RCF UI,
							but is far from ideal. For this reason, we don't advertise that you can
							put buttons etc. inside menu items. -->
							<span class="multiselect-lookup-demo-header__menu-header__actions">
								<!-- Conditional rendering depending on which menu is showing. -->
								<cdx-toggle-button
									v-if="currentMenu !== 'filters'"
									v-model="excludeButton"
									:quiet="true"
								>
									Exclude selected
								</cdx-toggle-button>
								<cdx-toggle-button v-model="highlightButton" :quiet="true">
									<cdx-icon :icon="cdxIconHighlight" /> Highlight results
								</cdx-toggle-button>
							</span>
						</span>
						<!-- Custom display of actual menu items. -->
						<span v-else class="multiselect-lookup-demo-header__menu-item">
							{{ menuItem.label }}
							<span class="multiselect-lookup-demo-header__menu-item__actions">
								<!-- IRL, you'd need one v-model binding per menu item. -->
								<cdx-toggle-button
									v-if="selectionHeader.includes( menuItem.value )"
									v-model="isExcluded"
									:quiet="true"
									@click.stop
								>
									Exclude
								</cdx-toggle-button>
								<cdx-toggle-button
									v-model="openColorMenu"
									:quiet="true"
									@click.stop
								>
									<cdx-icon :icon="cdxIconHighlight" />
								</cdx-toggle-button>
							</span>
						</span>
					</template>
				</cdx-multiselect-lookup>
			</section>
		</template>
	</demo-base-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
	ChipInputItem,
	MenuItemData,
	MenuItemValue,
	MenuConfig,
	CdxMultiselectLookup,
	CdxIcon,
	CdxToggleButton,
	CdxToggleButtonGroup
} from '../lib';
import { cdxIconHighlight } from '@wikimedia/codex-icons';
import vegetableItems from 'codex-docs/component-demos/lookup/examples/data.json';
import DemoBaseLayout from './DemoBaseLayout.vue';

// RCFilters MultiselectLookup with custom menu display.
const chipsHeader = ref<ChipInputItem[]>( [] );
const selectionHeader = ref<MenuItemValue[]>( [] );
const menuItemsHeader = ref<MenuItemData[]>( [ { value: 'multiselect-lookup-menu-header' } ].concat( vegetableItems ) );
const menuConfigHeader: MenuConfig = {
	boldLabel: true,
	// Enable scroll.
	visibleItemLimit: 4
};
const excludeButton = ref( false );
const highlightButton = ref( false );
const isExcluded = ref( false );
const openColorMenu = ref( false );

const currentMenu = ref( 'filters' );
const toggleButtons = [
	{ value: 'filters', label: 'Filters' },
	{ value: 'namespaces', label: 'Namespaces' },
	{ value: 'tagged', label: 'Tagged edits' }
];

function getCurrentMenu() {
	return toggleButtons.find( ( button ) => button.value === currentMenu.value )?.label;
}

function onInputHeader( value: string ) {
	if ( value ) {
		menuItemsHeader.value = [ { value: 'multiselect-lookup-menu-header' } ].concat(
			vegetableItems.filter( ( item ) => item.label.includes( value ) )
		);
	} else {
		menuItemsHeader.value = [ { value: 'multiselect-lookup-menu-header' } ].concat( vegetableItems );
	}
}
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-experiments {
	&__rcf {
		max-width: @size-4000;
	}
}

.multiselect-lookup-demo-header {
	margin-top: @spacing-100;

	&__menu-header {
		display: flex;
		align-items: center;
		gap: @spacing-75;
		// Don't show pointer cursor, since only the buttons are interactive.
		cursor: @cursor-base;

		&__title {
			font-weight: @font-weight-bold;
		}

		&__actions {
			display: flex;
			gap: @spacing-25;
			margin-left: auto;
		}
	}

	&__menu-item {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&__actions {
			display: flex;
			gap: @spacing-25;
		}
	}

	.cdx-menu-item:first-child {
		// Don't show highlight color, since this menu item isn't interactive.
		background-color: @background-color-base;
		// Make the header item sticky.
		position: sticky;
		top: 0;
		// Make the menu item layer on top of all the others.
		z-index: @z-index-stacking-1;
		border-bottom: @border-subtle;
	}

	.cdx-menu-item:not( :first-child ) {
		// Ensure the header item displays on top of all other menu items.
		z-index: @z-index-stacking-0;
	}
}
</style>
