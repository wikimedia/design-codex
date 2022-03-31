<template>
	<div :dir="dir">
		<nav>
			Direction:
			<direction-switcher v-model="dir" />
		</nav>

		<header>
			<h1>Codex Demo</h1>
		</header>

		<main class="cdx-sandbox-main">
			<cdx-tabs v-model:active="activeTab" :framed="true">
				<cdx-tab name="combobox">
					<h2>Combobox</h2>
					<cdx-combobox
						v-model="selection"
						:menu-items="options"
						placeholder="Type or choose an option"
						:disabled="false"
						:clearable="true"
					/>
					<p>Selected value: {{ selection || '(none)' }}</p>
				</cdx-tab>

				<cdx-tab name="select">
					<h2>Select</h2>
					<cdx-select
						v-model="selection"
						:menu-items="options"
						default-label="Choose an option"
					/>
					<p>Selected value: {{ selection || '(none)' }}</p>
				</cdx-tab>

				<cdx-tab name="radio">
					<h2>Radios</h2>
					<cdx-radio
						v-for="option in options"
						:key="option.value"
						v-model="selection"
						:input-value="option.value"
					>
						{{ option.label }}
					</cdx-radio>
					<p>Selected value: {{ selection || '(none)' }}</p>
				</cdx-tab>

				<cdx-tab name="textinput">
					<h2>Text input</h2>
					Selected value: <cdx-text-input v-model="selection" clearable />
				</cdx-tab>

				<cdx-tab name="checkbox">
					<h2>Checkboxes</h2>
					<cdx-checkbox
						v-for="option in options"
						:key="option.value"
						v-model="multiSelection"
						:input-value="option.value"
					>
						{{ option.label }}
					</cdx-checkbox>
					<p>Selected values: {{ multiSelection.join( ', ' ) || '(none)' }}</p>
				</cdx-tab>

				<cdx-tab name="icon">
					<h2>Icons</h2>
					<p dir="rtl">
						<cdx-icon :icon="cdxIconArrowNext" /> next
					</p>
					<p lang="nl" dir="ltr">
						<cdx-icon :icon="cdxIconBold" /> Bold
					</p>
				</cdx-tab>

				<cdx-tab name="button">
					<h2>Button</h2>
					<table>
						<thead>
							<tr>
								<th />
								<th>Normal</th>
								<th>Primary</th>
								<th>Quiet</th>
								<th>undefined</th>
							</tr>
						</thead>
						<tbody>
							<template v-for="buttonAction in [ ...ButtonActions, undefined ]">
								<tr
									v-for="disabled in [ true, false ]"
									:key="`action-${buttonAction}-${Number( disabled )}`"
								>
									<th>
										{{ buttonAction || 'undefined' }}
										{{ disabled ? ' disabled' : '' }}
									</th>
									<td
										v-for="buttonType in [ ...ButtonTypes, undefined ]"
										:key="`type-${buttonType}`">
										<cdx-button
											:type="buttonType"
											:action="buttonAction"
											:disabled="disabled"
											@click="onClick">
											<cdx-icon :icon="cdxIconTrash" />
											Button
										</cdx-button>
									</td>
								</tr>
							</template>
						</tbody>
					</table>
				</cdx-tab>
				<cdx-tab name="toggles">
					<h2>ToggleButton and ToggleSwitch</h2>
					<cdx-toggle-button v-model="toggleValue">
						<cdx-icon :icon="toggleButtonIcon" />
						{{ toggleButtonLabel }}
					</cdx-toggle-button>

					<p>
						Playing:
						<cdx-toggle-switch v-model="toggleValue" />
					</p>
				</cdx-tab>
				<cdx-tab name="message">
					<h2>Message</h2>
					<cdx-message
						v-for="type in MessageTypes"
						:key="type"
						:type="type"
						dismiss-button-label="Dismiss"
					>
						{{ type }}
					</cdx-message>
				</cdx-tab>
				<cdx-tab
					name="Disabled"
					:disabled="true"
					label="This is a tab with a really really really really really long name"
				>
					<p>Content for disabled tab</p>
				</cdx-tab>
				<cdx-tab name="tabs">
					<h2>Tabs</h2>

					<cdx-tabs v-model:active="activeTabInner">
						<cdx-tab
							v-for="( tab, index ) in dynamicTabs"
							:key="index"
							:name="tab"
						>
							<p>Content for {{ tab }}</p>
						</cdx-tab>
					</cdx-tabs>

					<cdx-button @click="reverseTabs">
						Reverse tab order
					</cdx-button>
				</cdx-tab>
			</cdx-tabs>
		</main>
	</div>
</template>

<script lang="ts" setup>
import {
	CdxButton,
	CdxCheckbox,
	CdxCombobox,
	CdxIcon,
	CdxMessage,
	CdxRadio,
	CdxSelect,
	CdxTab,
	CdxTabs,
	CdxTextInput,
	CdxToggleButton,
	CdxToggleSwitch,
	HTMLDirection,
	MenuItemData
} from '../lib';

import { cdxIconArrowNext, cdxIconBold, cdxIconPause, cdxIconPlay, cdxIconTrash } from '@wikimedia/codex-icons';
import { ButtonActions, ButtonTypes, MessageTypes } from '../constants';
import { computed, ref } from 'vue';
import DirectionSwitcher from './DirectionSwitcher.vue';

const activeTab = ref( 'combobox' );
const activeTabInner = ref( 'tab1' );
const dynamicTabs = ref( [ 'tab1', 'tab2', 'tab3' ] );

function reverseTabs() {
	dynamicTabs.value.reverse();
}

const options: MenuItemData[] = [
	{ label: 'Apple', value: 'a' },
	{ label: 'Banana', value: 'b' },
	{ label: 'Canteloupe', value: 'c', disabled: true }
];

const dir = ref<HTMLDirection>( 'ltr' );
const selection = ref<string>();
const multiSelection = ref<string[]>( [] );
const toggleValue = ref( false );

const toggleButtonIcon = computed( () => toggleValue.value ? cdxIconPause : cdxIconPlay );
const toggleButtonLabel = computed( () => toggleValue.value ? 'Pause' : 'Play' );

function onClick( e: Event ) {
	// eslint-disable-next-line no-console
	console.log( e );
}
</script>

<style scoped>
.cdx-sandbox-main {
	max-width: 500px;
}

td {
	/* stylelint-disable-next-line unit-disallowed-list */
	padding: 1.5rem;
}

nav {
	float: right;
}
</style>
