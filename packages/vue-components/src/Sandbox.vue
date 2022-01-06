<template>
	<div>
		<header>
			<h1>Codex Demo</h1>
		</header>

		<main class="sandbox-main">
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
						<th>Normal</th>
						<th>Primary</th>
						<th>Quiet</th>
						<th>null</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(buttonAction, actionIndex) in ButtonActions"
						:key="`action-${actionIndex}`">
						<td v-for="(buttonType, typeIndex) in ButtonTypes"
							:key="`type-${typeIndex}`">
							<cdx-button
								:type="buttonType"
								:action="buttonAction"
								@click="onClick">
								<cdx-icon :icon="cdxIconTrash" />
								Button
							</cdx-button>
							<br><br>
							<cdx-button
								disabled
								:type="buttonType"
								:action="buttonAction"
								@click="onClick">
								<cdx-icon :icon="cdxIconTrash" />
								Button
							</cdx-button>
						</td>

						<!-- No type provided -->
						<td>
							<cdx-button
								:action="buttonAction"
								@click="onClick">
								<cdx-icon :icon="cdxIconTrash" />
								Button
							</cdx-button>
							<br><br>
							<cdx-button
								disabled
								:action="buttonAction"
								@click="onClick">
								<cdx-icon :icon="cdxIconTrash" />
								Button
							</cdx-button>
						</td>
					</tr>

					<!-- No action provided -->
					<tr>
						<td v-for="(buttonType, typeIndex) in ButtonTypes"
							:key="`type-${typeIndex}`">
							<cdx-button
								:type="buttonType"
								@click="onClick">
								<cdx-icon :icon="cdxIconTrash" />
								Button
							</cdx-button>
							<br><br>
							<cdx-button
								disabled
								:type="buttonType"
								@click="onClick"
							>
								<cdx-icon :icon="cdxIconTrash" />
								Button
							</cdx-button>
						</td>

						<!-- No action or type provided -->
						<td>
							<cdx-button
								@click="onClick">
								<cdx-icon :icon="cdxIconTrash" />
								Button
							</cdx-button>
							<br><br>
							<cdx-button
								disabled
								@click="onClick">
								<cdx-icon :icon="cdxIconTrash" />
								Button
							</cdx-button>
						</td>
					</tr>
				</tbody>
			</table>
		</main>
	</div>
</template>

<script lang="ts" setup>
import { CdxButton, CdxCheckbox, CdxIcon, CdxRadio, CdxSelect, CdxTextInput } from './lib';
import { cdxIconArrowNext, cdxIconBold, cdxIconTrash } from 'icons';
import { ButtonActions, ButtonTypes } from './constants';
import { MenuOption } from './types';
import { ref } from 'vue';

const options: MenuOption[] = [
	{ label: 'Apple', value: 'a' },
	{ label: 'Banana', value: 'b' },
	{ label: 'Canteloupe', value: 'c' }
];

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
</style>
