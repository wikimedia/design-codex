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
				<accordion-demo />
				<button-demo />
				<button-group-demo />
				<card-demo />
				<checkbox-demo />
				<combobox-demo />
				<dialog-demo />
				<icon-demo />
				<label-demo />
				<link-demo />
				<lookup-demo />
				<menu-demo />
				<menu-item-demo />
				<message-demo />
				<progress-bar-demo />
				<radio-demo />
				<search-input-demo />
				<select-demo />
				<tabs-demo />
				<text-area-demo />
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

import AccordionDemo from './AccordionDemo.vue';
import ButtonDemo from './ButtonDemo.vue';
import ButtonGroupDemo from './ButtonGroupDemo.vue';
import CardDemo from './CardDemo.vue';
import CheckboxDemo from './CheckboxDemo.vue';
import ComboboxDemo from './ComboboxDemo.vue';
import DialogDemo from './DialogDemo.vue';
import IconDemo from './IconDemo.vue';
import LabelDemo from './LabelDemo.vue';
import LookupDemo from './LookupDemo.vue';
import MenuDemo from './MenuDemo.vue';
import MenuItemDemo from './MenuItemDemo.vue';
import MessageDemo from './MessageDemo.vue';
import ProgressBarDemo from './ProgressBarDemo.vue';
import RadioDemo from './RadioDemo.vue';
import SearchInputDemo from './SearchInputDemo.vue';
import SelectDemo from './SelectDemo.vue';
import TabsDemo from './TabsDemo.vue';
import TextAreaDemo from './TextAreaDemo.vue';
import TextInputDemo from './TextInputDemo.vue';
import ThumbnailDemo from './ThumbnailDemo.vue';
import ToggleButtonGroupDemo from './ToggleButtonGroupDemo.vue';
import ToggleDemo from './ToggleDemo.vue';
import TypeaheadSearchDemo from './TypeaheadSearchDemo.vue';
import LinkDemo from './LinkDemo.vue';

const dir = ref<HTMLDirection>( 'ltr' );
const demoSections = [
	{ name: 'Accordion', id: '#cdx-accordion' },
	{ name: 'Button', id: '#cdx-button' },
	{ name: 'ButtonGroup', id: '#cdx-button-group' },
	{ name: 'Card', id: '#cdx-card' },
	{ name: 'CheckBox', id: '#cdx-checkbox' },
	{ name: 'Combobox', id: '#cdx-combobox' },
	{ name: 'Dialog', id: '#cdx-dialog' },
	{ name: 'Icon', id: '#cdx-icon' },
	{ name: 'Label', id: '#cdx-label' },
	{ name: 'Link', id: '#cdx-link' },
	{ name: 'Lookup', id: '#cdx-lookup' },
	{ name: 'Menu', id: '#cdx-menu' },
	{ name: 'MenuItem', id: '#cdx-menu-item' },
	{ name: 'Message', id: '#cdx-message' },
	{ name: 'ProgressBar', id: '#cdx-progress-bar' },
	{ name: 'Radio', id: '#cdx-radio' },
	{ name: 'SearchInput', id: '#cdx-search-input' },
	{ name: 'Select', id: '#cdx-select' },
	{ name: 'Tabs', id: '#cdx-tabs' },
	{ name: 'TextArea', id: '#cdx-text-area' },
	{ name: 'TextInput', id: '#cdx-text-input' },
	{ name: 'Thumbnail', id: '#cdx-thumbnail' },
	{ name: 'ToggleButton and ToggleSwitch', id: '#cdx-toggle' },
	{ name: 'ToggleButtonGroup', id: '#cdx-toggle-button-group' },
	{ name: 'TypeaheadSearch', id: '#cdx-typeahead-search' }
];

</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

// Sandbox-specific values.
@height-sandbox-header: 4rem;
@width-sandbox-sidebar: 20rem;

@scroll-padding-top-sandbox: calc( @height-sandbox-header + ( @spacing-100 * 2 ) + @spacing-200 );

html {
	scroll-behavior: smooth;
	scroll-padding-top: @scroll-padding-top-sandbox;
}

body {
	margin: 0;
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
		z-index: @z-index-sticky;
		box-sizing: @box-sizing-base;
		height: @height-sandbox-header;
		border-bottom: @border-base;
		padding: @spacing-100;

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
		padding: @spacing-100;

		@media ( min-width: @min-width-breakpoint-tablet ) {
			flex-direction: row;
		}

		section {
			margin-bottom: @spacing-200;

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
		margin-bottom: @spacing-200;

		@media ( min-width: @min-width-breakpoint-tablet ) {
			flex: 0 0 @width-sandbox-sidebar;
			flex-direction: row;
		}

		&__inner {
			position: sticky;
			top: @scroll-padding-top-sandbox;

			ul {
				list-style: none;
				margin: 0;
				padding: 0;
				line-height: @line-height-medium;
			}
		}
	}
}

// Button table.
/* stylelint-disable-next-line selector-max-id */
#cdx-button tr th:first-child {
	/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
	text-align: left;
}
</style>

<style lang="less" scoped>
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/public/link.less';

a {
	.cdx-mixin-link();
}
</style>
