<template>
	<section id="cdx-popover" class="cdx-popover-demo">
		<h2>Popover</h2>
		<cdx-toggle-button
			id="refElement"
			v-model="showPopover"
			@update:model-value="onUpdate"
		>
			Toggle
		</cdx-toggle-button>
		<cdx-popover
			id="popover"
			v-model:open="showPopover"
			title="Popover demo"
			:default-action
			:primary-action
			:use-close-button="true"
			:render-in-place="true"
		>
			This is the body of a Popover where text, inputs, or other elements can be.
		</cdx-popover>
	</section>
</template>

<script lang="ts" setup>
import { CdxPopover, CdxToggleButton } from '../lib-wip';
import { ModalAction, PrimaryModalAction } from '../lib';
import { ref } from 'vue';

// TODO: Add a template ref for the reference element.

// Enable and disable the toggle button state and popover visibility.
const showPopover = ref( false );
const onUpdate = function ( value: boolean ) {
	// eslint-disable-next-line no-console
	console.log( 'update:modelValue event emitted with value: ' + value );
};

const defaultAction: ModalAction = { label: 'Cancel' };
const primaryAction: PrimaryModalAction = { label: 'Save', actionType: 'progressive' };
</script>
