<template>
	<section id="cdx-button-group">
		<h2>
			ButtonGroup
		</h2>
		<cdx-button-group
			:buttons="buttons"
			@click="onClick"
		/>
	</section>
</template>

<script lang="ts" setup>
import { CdxButtonGroup, ButtonGroupItem } from '../lib';

const buttons: ButtonGroupItem[] = [
	{ value: 1, label: 'One' },
	{ value: 2, label: 'Two' },
	{ value: 3, label: 'Three' },
	{ value: 4, label: 'Four' },
	{ value: 5, label: 'Five' }
];

const onClick = function ( value: string ) {
	// eslint-disable-next-line no-console
	console.log( 'click event emitted with value:', value );
};
</script>
