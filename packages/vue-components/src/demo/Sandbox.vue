<template>
	<div :dir="dir">
		<nav>
			Direction:
			<direction-switcher v-model="dir" />
		</nav>

		<header>
			<h1>Codex Demo</h1>
		</header>

		<main class="sandbox-main">
			<h2>Combobox</h2>
			<cdx-combobox
				v-model="selection"
				:options="options"
				placeholder="Type or choose an option"
				:disabled="false"
				:clearable="true"
			/>
			<p>Selected value: {{ selection || '(none)' }}</p>

			<h2>Select</h2>
			<cdx-select
				v-model="selection"
				:options="options"
				default-label="Choose an option"
			/>
			<p>Selected value: {{ selection || '(none)' }}</p>

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

			<h2>Text input</h2>
			Selected value: <cdx-text-input v-model="selection" clearable />

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

			<h2>Icons</h2>
			<p dir="rtl">
				<cdx-icon :icon="cdxIconArrowNext" /> next
			</p>
			<p lang="nl" dir="ltr">
				<cdx-icon :icon="cdxIconBold" /> Bold
			</p>
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
		</main>
	</div>
</template>

<script lang="ts" setup>
import { CdxButton, CdxCheckbox, CdxCombobox, CdxIcon, CdxRadio, CdxSelect, CdxTextInput, HTMLDirection, MenuOption } from '../lib';
import { cdxIconArrowNext, cdxIconBold, cdxIconTrash } from 'icons';
import { ButtonActions, ButtonTypes } from '../constants';
import { ref } from 'vue';
import DirectionSwitcher from './DirectionSwitcher.vue';

const options: MenuOption[] = [
	{ label: 'Apple', value: 'a' },
	{ label: 'Banana', value: 'b' },
	{ label: 'Canteloupe', value: 'c' }
];

const dir = ref<HTMLDirection>( 'ltr' );
const selection = ref<string>();
const multiSelection = ref<string[]>( [] );

function onClick( e: Event ) {
	// eslint-disable-next-line no-console
	console.log( e );
}
</script>

<style scoped>
.sandbox-main {
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
