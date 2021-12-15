<template>
	<div>
		<header>
			<h1>Codex Demo</h1>
		</header>

		<main>
			<h2>Icons</h2>
			<p dir="rtl">
				<cdx-icon :icon="cdxIconArrowNext" /> next
			</p>
			<p lang="nl">
				<cdx-icon :icon="cdxIconBold" /> Bold
			</p>
			<h2>Codex Button</h2>
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
								Button
							</cdx-button>
							<br><br>
							<cdx-button
								disabled
								:type="buttonType"
								:action="buttonAction"
								@click="onClick">
								Button
							</cdx-button>
						</td>

						<!-- No type provided -->
						<td>
							<cdx-button
								:action="buttonAction"
								@click="onClick">
								Button
							</cdx-button>
							<br><br>
							<cdx-button
								disabled
								:action="buttonAction"
								@click="onClick">
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
								Button
							</cdx-button>
							<br><br>
							<cdx-button
								disabled
								:type="buttonType"
								@click="onClick"
							>
								Button
							</cdx-button>
						</td>

						<!-- No action or type provided -->
						<td>
							<cdx-button
								@click="onClick">
								Button
							</cdx-button>
							<br><br>
							<cdx-button
								disabled
								@click="onClick">
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
import { CdxButton, CdxIcon } from './lib';
import { cdxIconArrowNext, cdxIconBold } from 'icons';
import { ButtonActions, ButtonTypes } from './constants';

function onClick( e: Event ) {
	// eslint-disable-next-line no-console
	console.log( e );
}
</script>

<style scoped>
td {
	/* stylelint-disable-next-line unit-disallowed-list */
	padding: 1.5rem;
}
</style>
