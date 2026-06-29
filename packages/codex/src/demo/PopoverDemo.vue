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

		<div class="cdx-demo__content__sectioning">
			<cdx-toggle-button
				ref="toggleButton5"
				v-model="showPopover5"
				@update:model-value="onUpdate"
			>
				Popover as Bottom Sheet (Mobile Only)
			</cdx-toggle-button>
			<cdx-popover
				v-model:open="showPopover5"
				title="Popover demo"
				:default-action
				:primary-action
				:use-bottom-sheet="true"
				:stacked-actions="true"
				:use-close-button="true"
				:render-in-place="true"
				:anchor="toggleButton5"
				placement="left"
			>
				This is the body of a Popover as a Bottom Sheet on mobile where text,
				inputs, or other elements can be.
			</cdx-popover>
		</div>

		<div class="cdx-demo__content__sectioning">
			<cdx-toggle-button
				ref="toggleButton6"
				v-model="showPopover6"
				@update:model-value="onUpdate"
			>
				Popover as Bottom Sheet + long content (Mobile Only)
			</cdx-toggle-button>
			<cdx-popover
				v-model:open="showPopover6"
				title="Popover demo"
				:default-action
				:primary-action
				:use-bottom-sheet="true"
				:stacked-actions="true"
				:use-close-button="true"
				:render-in-place="true"
				:anchor="toggleButton6"
				placement="left"
			>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus
					augue eget placerat eleifend. Nulla eleifend ligula at accumsan
					ullamcorper. Maecenas pretium erat sit amet venenatis tincidunt. Nunc
					suscipit vel lacus eleifend euismod. Vivamus dui nisi, interdum sed
					sodales ut, consectetur quis ante. Nunc nec metus id lectus efficitur
					volutpat. Fusce luctus est quis faucibus eleifend. Etiam vel nisl in quam
					elementum tempor quis eu dui. Nulla facilisi. Vivamus rutrum ac lorem sed
					feugiat.
				</p>
				<p>
					Donec elementum sapien augue, et iaculis nisi scelerisque vitae. Nunc
					quis viverra quam. Nam maximus libero eget sodales maximus. Aenean in
					interdum elit. Sed ac elit gravida, tincidunt odio et, scelerisque turpis.
					Curabitur vel cursus diam. Praesent in mi sollicitudin, egestas erat eu,
					ornare ante. Mauris id dui lacinia, congue lectus a, dictum urna.
					Phasellus et quam blandit, vulputate leo ac, consequat mi. Nulla ut
					ornare sapien. Proin nec dui a tortor pretium interdum sit amet ac ex.
					Curabitur congue tempus mauris, in auctor urna egestas id. Sed vitae nunc
					nec tortor porta fermentum.
				</p>
				<p>
					Praesent venenatis, ipsum non gravida viverra, nibh ipsum dictum arcu,
					eget tincidunt nisl ex a lectus. Suspendisse ultrices tincidunt ipsum quis
					laoreet. Maecenas aliquet placerat urna auctor sagittis. Nullam et
					placerat purus. Aenean aliquam mollis diam ut scelerisque. Etiam rutrum
					tempor erat, quis commodo neque aliquet in. Sed id magna at libero dictum
					blandit id vehicula orci. Vivamus sollicitudin auctor consequat. Nullam
					pharetra mauris vitae tortor consequat mattis.
				</p>
			</cdx-popover>
		</div>

		<!-- Button pushed to the inline-end edge to exercise viewport-edge positioning.
			Only the button is wrapped in the flex container, so the in-place popover DOM
			isn't affected by the layout. -->
		<div class="cdx-demo__content__sectioning">
			<div class="cdx-popover-demo__aligned-button">
				<cdx-toggle-button
					ref="toggleButton7"
					v-model="showPopover7"
					@update:model-value="onUpdate"
				>
					Open Popover (aligned)
				</cdx-toggle-button>
			</div>
			<cdx-popover
				v-model:open="showPopover7"
				title="Popover demo"
				:default-action
				:primary-action
				:use-close-button="true"
				:render-in-place="true"
				:anchor="toggleButton7"
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
const toggleButton5 = useTemplateRef<ComponentPublicInstance>( 'toggleButton5' );
const toggleButton6 = useTemplateRef<ComponentPublicInstance>( 'toggleButton6' );
const toggleButton7 = useTemplateRef<ComponentPublicInstance>( 'toggleButton7' );
// Enable and disable the toggle button state and popover visibility.
const showPopover = ref( false );
const showPopover2 = ref( false );
const showPopover3 = ref( false );
const showPopover4 = ref( false );
const showPopover5 = ref( false );
const showPopover6 = ref( false );
const showPopover7 = ref( false );
const onUpdate = function ( value: boolean ) {
	// eslint-disable-next-line no-console
	console.log( 'update:modelValue event emitted with value: ' + value );
};

const defaultAction: ModalAction = { label: 'Cancel' };
const primaryAction: PrimaryModalAction = { label: 'Save', actionType: 'progressive' };

</script>

<style lang="less" scoped>
// Push the toggle button to the inline-end edge so the popover's
// viewport-edge positioning (Floating UI shift) can be exercised in the sandbox.
.cdx-popover-demo__aligned-button {
	display: flex;
	justify-content: flex-end;
}
</style>
