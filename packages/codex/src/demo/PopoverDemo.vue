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
				:position-config="{ placement: 'top' }"
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
				:position-config="{ placement: 'right' }"
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
				:position-config="positionConfig"
			>
				This is the body of a Popover where text, inputs, or other elements can be.
			</cdx-popover>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, Ref, ref } from 'vue';
import { CdxPopover, CdxToggleButton } from '../lib-wip';
import { ModalAction, PrimaryModalAction, PositionConfig } from '../lib';

// Template ref for the reference element.
const toggleButton = ref<InstanceType<typeof CdxToggleButton>>() as Ref<ComponentPublicInstance>;

// Positioning configurations.
const positionConfig: PositionConfig = { placement: 'bottom' };

// Enable and disable the toggle button state and popover visibility.
const showPopover = ref( false );
const onUpdate = function ( value: boolean ) {
	// eslint-disable-next-line no-console
	console.log( 'update:modelValue event emitted with value: ' + value );
};

const defaultAction: ModalAction = { label: 'Cancel' };
const primaryAction: PrimaryModalAction = { label: 'Save', actionType: 'progressive' };

// Additional demos
const toggleButton2 = ref<InstanceType<typeof CdxToggleButton>>() as Ref<ComponentPublicInstance>;
const showPopover2 = ref( false );
const toggleButton3 = ref<InstanceType<typeof CdxToggleButton>>() as Ref<ComponentPublicInstance>;
const showPopover3 = ref( false );
const toggleButton4 = ref<InstanceType<typeof CdxToggleButton>>() as Ref<ComponentPublicInstance>;
const showPopover4 = ref( false );
</script>
