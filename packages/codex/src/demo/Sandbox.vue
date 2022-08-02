<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		:key="dir"
		:dir="dir"
		class="cdx-sandbox"
	>
		<header class="cdx-sandbox__header">
			<h1>Codex Demo Sandbox</h1>
			<div class="cdx-direction-switcher">
				<direction-switcher v-model="dir" />
			</div>
		</header>

		<div class="cdx-sandbox__body">
			<main class="cdx-sandbox__content">
				<button-demo />
				<button-group-demo />
				<card-demo />
				<checkbox-demo />
				<combobox-demo />
				<icon-demo />
				<lookup-demo />
				<menu-demo />
				<menu-item-demo />
				<message-demo />
				<progress-bar-demo />
				<radio-demo />
				<search-input-demo />
				<select-demo />
				<tabs-demo />
				<text-input-demo />
				<thumbnail-demo />
				<toggle-button-group-demo />
				<toggle-demo />
				<typeahead-search-demo />
			</main>

			<nav class="cdx-sandbox__nav">
				<div class="cdx-sandbox__nav__inner">
					<ul>
						<li v-for="( section, index ) in demoSections" :key="index">
							<a :href="section.id">
								{{ section.name }}
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { HTMLDirection } from '../types';
import DirectionSwitcher from './DirectionSwitcher.vue';

import ButtonDemo from './ButtonDemo.vue';
import ButtonGroupDemo from './ButtonGroupDemo.vue';
import CardDemo from './CardDemo.vue';
import CheckboxDemo from './CheckboxDemo.vue';
import ComboboxDemo from './ComboboxDemo.vue';
import IconDemo from './IconDemo.vue';
import LookupDemo from './LookupDemo.vue';
import MenuDemo from './MenuDemo.vue';
import MenuItemDemo from './MenuItemDemo.vue';
import MessageDemo from './MessageDemo.vue';
import ProgressBarDemo from './ProgressBarDemo.vue';
import RadioDemo from './RadioDemo.vue';
import SearchInputDemo from './SearchInputDemo.vue';
import SelectDemo from './SelectDemo.vue';
import TabsDemo from './TabsDemo.vue';
import TextInputDemo from './TextInputDemo.vue';
import ThumbnailDemo from './ThumbnailDemo.vue';
import ToggleButtonGroupDemo from './ToggleButtonGroupDemo.vue';
import ToggleDemo from './ToggleDemo.vue';
import TypeaheadSearchDemo from './TypeaheadSearchDemo.vue';

const dir = ref<HTMLDirection>( 'ltr' );
const demoSections = [
	{ name: 'Button', id: '#cdx-button' },
	{ name: 'ButtonGroup', id: '#cdx-button-group' },
	{ name: 'Card', id: '#cdx-card' },
	{ name: 'CheckBox', id: '#cdx-checkbox' },
	{ name: 'Combobox', id: '#cdx-combobox' },
	{ name: 'Icon', id: '#cdx-icon' },
	{ name: 'Lookup', id: '#cdx-lookup' },
	{ name: 'Menu', id: '#cdx-menu' },
	{ name: 'MenuItem', id: '#cdx-menu-item' },
	{ name: 'Message', id: '#cdx-message' },
	{ name: 'ProgressBar', id: '#cdx-progress-bar' },
	{ name: 'Radio', id: '#cdx-radio' },
	{ name: 'SearchInput', id: '#cdx-search-input' },
	{ name: 'Select', id: '#cdx-select' },
	{ name: 'Tabs', id: '#cdx-tabs' },
	{ name: 'TextInput', id: '#cdx-text-input' },
	{ name: 'Thumbnail', id: '#cdx-thumbnail' },
	{ name: 'Toggle', id: '#cdx-toggle' },
	{ name: 'ToggleButtonGroup', id: '#cdx-toggle-button-group' },
	{ name: 'TypeaheadSearch', id: '#cdx-typeahead-search' }
];

</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

// Define some sandbox-specific values
@sandbox-breakpoint-tablet: 768px;
@sandbox-header-height: 2em;
@sandbox-sidebar-width: 20rem;

@sandbox-scroll-padding: @sandbox-header-height + ( @spacing-large *2 ) + @spacing-large;

html {
	scroll-behavior: smooth;
	scroll-padding-top: @sandbox-scroll-padding;
}

.cdx-sandbox {
	display: flex;
	flex-direction: column;
	font-family: @font-family-base;

	&__header {
		background-color: @background-color-base;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		top: 0;
		z-index: @z-index-1;
		height: @sandbox-header-height;
		border-bottom: @border-base;
		padding: @spacing-large;

		h1 {
			display: inline-flex;
			margin-top: 0;
			margin-bottom: 0;
		}

		.cdx-direction-switcher {
			display: inline-flex;
		}
	}

	&__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		padding: @spacing-large;

		@media ( min-width: @sandbox-breakpoint-tablet ) {
			flex-direction: row;
		}

		section {
			margin-bottom: @spacing-xx-large;

			h2 {
				margin-top: 0;
			}
		}
	}

	&__content {
		flex: 1;
	}

	&__nav {
		flex: 1;
		order: -1;
		margin-bottom: @spacing-xx-large;

		@media ( min-width: @sandbox-breakpoint-tablet ) {
			flex: 0 0 @sandbox-sidebar-width;
			flex-direction: row;
		}

		&__inner {
			position: sticky;
			top: @sandbox-scroll-padding;

			ul {
				list-style-type: none;
				margin: 0;
				padding: 0;
				line-height: @line-height-100;
			}
		}
	}
}
</style>
