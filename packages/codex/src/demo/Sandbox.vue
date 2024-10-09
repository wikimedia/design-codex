<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<demo-base-layout class="cdx-sandbox">
		<template #header>
			Codex Demo Sandbox
		</template>
		<template #content>
			<accordion-demo />
			<button-demo />
			<button-group-demo />
			<card-demo />
			<checkbox-demo />
			<chip-input-demo />
			<combobox-demo />
			<dialog-demo />
			<field-demo />
			<icon-demo />
			<image-demo />
			<info-chip-demo />
			<label-demo />
			<link-demo />
			<lookup-demo />
			<multiselect-lookup-demo />
			<menu-demo />
			<menu-item-demo />
			<menu-button-demo />
			<message-demo />
			<popover-demo />
			<progress-bar-demo />
			<progress-indicator-demo />
			<radio-demo />
			<search-input-demo />
			<select-demo />
			<table-demo />
			<tabs-demo />
			<text-area-demo />
			<text-input-demo />
			<thumbnail-demo />
			<toggle-button-group-demo />
			<toggle-demo />
			<tooltip-demo />
			<typeahead-search-demo />
		</template>
		<template #sideNav>
			<ul>
				<li v-for="( section, index ) in demoSections" :key="index">
					<a :href="section.id">
						{{ section.name }}
					</a>
				</li>
			</ul>
		</template>
	</demo-base-layout>
</template>

<script lang="ts" setup>
import DemoBaseLayout from './DemoBaseLayout.vue';

import AccordionDemo from './AccordionDemo.vue';
import ButtonDemo from './ButtonDemo.vue';
import ButtonGroupDemo from './ButtonGroupDemo.vue';
import CardDemo from './CardDemo.vue';
import CheckboxDemo from './CheckboxDemo.vue';
import ChipInputDemo from './ChipInputDemo.vue';
import MultiselectLookupDemo from './MultiselectLookupDemo.vue';
import ComboboxDemo from './ComboboxDemo.vue';
import DialogDemo from './DialogDemo.vue';
import FieldDemo from './FieldDemo.vue';
import IconDemo from './IconDemo.vue';
import ImageDemo from './ImageDemo.vue';
import InfoChipDemo from './InfoChipDemo.vue';
import LabelDemo from './LabelDemo.vue';
import LookupDemo from './LookupDemo.vue';
import MenuDemo from './MenuDemo.vue';
import MenuItemDemo from './MenuItemDemo.vue';
import MenuButtonDemo from './MenuButtonDemo.vue';
import MessageDemo from './MessageDemo.vue';
import PopoverDemo from './PopoverDemo.vue';
import ProgressBarDemo from './ProgressBarDemo.vue';
import ProgressIndicatorDemo from './ProgressIndicatorDemo.vue';
import RadioDemo from './RadioDemo.vue';
import SearchInputDemo from './SearchInputDemo.vue';
import SelectDemo from './SelectDemo.vue';
import TableDemo from './TableDemo.vue';
import TabsDemo from './TabsDemo.vue';
import TextAreaDemo from './TextAreaDemo.vue';
import TextInputDemo from './TextInputDemo.vue';
import ThumbnailDemo from './ThumbnailDemo.vue';
import ToggleButtonGroupDemo from './ToggleButtonGroupDemo.vue';
import ToggleDemo from './ToggleDemo.vue';
import TooltipDemo from './TooltipDemo.vue';
import TypeaheadSearchDemo from './TypeaheadSearchDemo.vue';
import LinkDemo from './LinkDemo.vue';

const demoSections = [
	{ name: 'Accordion', id: '#cdx-accordion' },
	{ name: 'Button', id: '#cdx-button' },
	{ name: 'ButtonGroup', id: '#cdx-button-group' },
	{ name: 'Card', id: '#cdx-card' },
	{ name: 'CheckBox', id: '#cdx-checkbox' },
	{ name: 'ChipInput', id: '#cdx-chip-input' },
	{ name: 'Combobox', id: '#cdx-combobox' },
	{ name: 'Dialog', id: '#cdx-dialog' },
	{ name: 'Field', id: '#cdx-field' },
	{ name: 'Icon', id: '#cdx-icon' },
	{ name: 'Image', id: '#cdx-image' },
	{ name: 'InfoChip', id: '#cdx-info-chip' },
	{ name: 'Label', id: '#cdx-label' },
	{ name: 'Link', id: '#cdx-link' },
	{ name: 'Lookup', id: '#cdx-lookup' },
	{ name: 'MultiselectLookup', id: '#cdx-multiselect-lookup' },
	{ name: 'Menu', id: '#cdx-menu' },
	{ name: 'MenuItem', id: '#cdx-menu-item' },
	{ name: 'MenuButton', id: '#cdx-menu-button' },
	{ name: 'Message', id: '#cdx-message' },
	{ name: 'Popover', id: '#cdx-popover' },
	{ name: 'ProgressBar', id: '#cdx-progress-bar' },
	{ name: 'ProgressIndicator', id: '#cdx-progress-indicator' },
	{ name: 'Radio', id: '#cdx-radio' },
	{ name: 'SearchInput', id: '#cdx-search-input' },
	{ name: 'Select', id: '#cdx-select' },
	{ name: 'Table', id: '#cdx-table' },
	{ name: 'Tabs', id: '#cdx-tabs' },
	{ name: 'TextArea', id: '#cdx-text-area' },
	{ name: 'TextInput', id: '#cdx-text-input' },
	{ name: 'Thumbnail', id: '#cdx-thumbnail' },
	{ name: 'ToggleButton and ToggleSwitch', id: '#cdx-toggle' },
	{ name: 'ToggleButtonGroup', id: '#cdx-toggle-button-group' },
	{ name: 'Tooltip', id: '#cdx-tooltip' },
	{ name: 'TypeaheadSearch', id: '#cdx-typeahead-search' }
];

</script>

<style lang="less" scoped>
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/public/link.less';

a {
	.cdx-mixin-link();
}

section {
	margin-bottom: @spacing-200;

	h2 {
		margin-top: 0;
	}
}
</style>
