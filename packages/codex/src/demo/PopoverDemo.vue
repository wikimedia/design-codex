<template>
	<section id="cdx-popover" class="cdx-popover-demo">
		<h2>Popover</h2>
		<cdx-toggle-button
			id="refElement"
			ref="reference"
			v-model="showPopover"
			@update:model-value="onUpdate"
		>
			Open Popover
		</cdx-toggle-button>
		<cdx-popover
			id="popover"
			v-model:open="showPopover"
			title="Popover demo"
			:default-action
			:primary-action
			:use-close-button="true"
			:render-in-place="true"
			:anchor="reference"
			:position-config="positionConfig"
		>
			This is the body of a Popover where text, inputs, or other elements can be.
		</cdx-popover>
	</section>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, Ref, ref } from 'vue';
import { CdxPopover, CdxToggleButton } from '../lib-wip';
import { ModalAction, PrimaryModalAction, PositionConfig } from '../lib';

// Template ref for the reference element.
const reference = ref<InstanceType<typeof CdxToggleButton>>() as Ref<ComponentPublicInstance>;

// Positioning configurations.
const positionConfig: PositionConfig = { placement: 'bottom-start' };

// Enable and disable the toggle button state and popover visibility.
const showPopover = ref( false );
const onUpdate = function ( value: boolean ) {
	// eslint-disable-next-line no-console
	console.log( 'update:modelValue event emitted with value: ' + value );
};

const defaultAction: ModalAction = { label: 'Cancel' };
const primaryAction: PrimaryModalAction = { label: 'Save', actionType: 'progressive' };
</script>
