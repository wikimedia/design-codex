<template>
	<section id="cdx-popover" class="cdx-popover-demo">
		<h2>Popover</h2>
		<div class="cdx-demo__content__sectioning">
			<cdx-toggle-button
				ref="toggleButton"
				v-model="showPopover"
				@update:model-value="onUpdate"
			>
				Open Popover with long content
			</cdx-toggle-button>
			<cdx-popover
				v-model:open="showPopover"
				title="Popover demo"
				:default-action
				:primary-action
				:use-close-button="true"
				:render-in-place="true"
				:anchor="toggleButton"
				placement="top"
			>
				This is the body of a Popover where text, inputs, or other elements can be.
				This is the body of a Popover where text, inputs, or other elements can be.
				This is the body of a Popover where text, inputs, or other elements can be.
				This is the body of a Popover where text, inputs, or other elements can be.
				This is the body of a Popover where text, inputs, or other elements can be.
				This is the body of a Popover where text, inputs, or other elements can be.
				This is the body of a Popover where text, inputs, or other elements can be.
			</cdx-popover>
		</div>

		<div class="cdx-demo__content__sectioning">
			<cdx-toggle-button
				ref="toggleButton2"
				v-model="showPopover2"
				@update:model-value="onUpdate"
			>
				Open Popover
			</cdx-toggle-button>
			<cdx-popover
				v-model:open="showPopover2"
				title="Popover demo"
				:default-action
				:primary-action
				:use-close-button="true"
				:render-in-place="true"
				:anchor="toggleButton2"
			>
				This is the body of a Popover where text, inputs, or other elements can be.
			</cdx-popover>
		</div>

		<div class="cdx-demo__content__sectioning">
			<cdx-toggle-button
				ref="toggleButton3"
				v-model="showPopover3"
				@update:model-value="onUpdate"
			>
				Open Popover
			</cdx-toggle-button>
			<cdx-popover
				v-model:open="showPopover3"
				title="Popover demo"
				:default-action
				:primary-action
				:use-close-button="true"
				:render-in-place="true"
				:anchor="toggleButton3"
				placement="right"
			>
				This is the body of a Popover where text, inputs, or other elements can be.
			</cdx-popover>
		</div>

		<div class="cdx-demo__content__sectioning">
			<cdx-toggle-button
				ref="toggleButton4"
				v-model="showPopover4"
				@update:model-value="onUpdate"
			>
				Open Popover
			</cdx-toggle-button>
			<cdx-popover
				v-model:open="showPopover4"
				title="Popover demo"
				:default-action
				:primary-action
				:use-close-button="true"
				:render-in-place="true"
				:anchor="toggleButton4"
				placement="left"
			>
				This is the body of a Popover where text, inputs, or other elements can be.
			</cdx-popover>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, ref, useTemplateRef } from 'vue';
import { CdxPopover, CdxToggleButton, ModalAction, PrimaryModalAction } from '../lib';

// Template ref for the reference elements
const toggleButton = useTemplateRef<ComponentPublicInstance>( 'toggleButton' );
const toggleButton2 = useTemplateRef<ComponentPublicInstance>( 'toggleButton2' );
const toggleButton3 = useTemplateRef<ComponentPublicInstance>( 'toggleButton3' );
const toggleButton4 = useTemplateRef<ComponentPublicInstance>( 'toggleButton4' );

// Enable and disable the toggle button state and popover visibility.
const showPopover = ref( false );
const showPopover2 = ref( false );
const showPopover3 = ref( false );
const showPopover4 = ref( false );

const onUpdate = function ( value: boolean ) {
	// eslint-disable-next-line no-console
	console.log( 'update:modelValue event emitted with value: ' + value );
};

const defaultAction: ModalAction = { label: 'Cancel' };
const primaryAction: PrimaryModalAction = { label: 'Save', actionType: 'progressive' };

</script>
