<template>
	<section
		id="cdx-toast"
		class="cdx-toast-demo"
	>
		<h2>Toast</h2>

		<h3>With auto-dismiss</h3>
		<div class="cdx-demo__content__sectioning">
			<cdx-button @click="showToast1 = true">
				Success (auto-dismiss 4s)
			</cdx-button>
			<cdx-toast
				v-if="showToast1"
				type="success"
				:auto-dismiss="true"
				@user-dismissed="showToast1 = false"
				@auto-dismissed="showToast1 = false"
			>
				Article published successfully.
				<a href="#">View article</a>
			</cdx-toast>
			<cdx-button @click="showToast2 = true">
				Notice + action, auto-dismiss
			</cdx-button>
			<cdx-toast
				v-if="showToast2"
				type="notice"
				action-button-label="Undo"
				:auto-dismiss="true"
				@user-dismissed="showToast2 = false"
				@auto-dismissed="showToast2 = false"
				@action-button-click="handleUndo"
			>
				Changes saved
			</cdx-toast>
			<cdx-button @click="showToast3 = true">
				Custom duration (2s)
			</cdx-button>
			<cdx-toast
				v-if="showToast3"
				type="success"
				:auto-dismiss="2000"
				@user-dismissed="showToast3 = false"
				@auto-dismissed="showToast3 = false"
			>
				Disappears in 2 seconds
			</cdx-toast>
			<cdx-button @click="showToast4 = true">
				Warning, auto-dismiss
			</cdx-button>
			<cdx-toast
				v-if="showToast4"
				type="warning"
				:auto-dismiss="true"
				@user-dismissed="showToast4 = false"
				@auto-dismissed="showToast4 = false"
			>
				Please review your changes
			</cdx-toast>
		</div>

		<h3>Without auto-dismiss</h3>
		<div class="cdx-demo__content__sectioning">
			<cdx-button @click="showToast5 = true">
				Notice (dismiss only)
			</cdx-button>
			<cdx-toast
				v-if="showToast5"
				type="notice"
				:auto-dismiss="false"
				@user-dismissed="showToast5 = false"
			>
				Stays until you close it
			</cdx-toast>
			<cdx-button @click="showToast6 = true">
				Error (dismiss only)
			</cdx-button>
			<cdx-toast
				v-if="showToast6"
				type="error"
				:auto-dismiss="false"
				@user-dismissed="showToast6 = false"
			>
				Failed to save changes
			</cdx-toast>
			<cdx-button @click="showToast7 = true">
				Error + action (Retry)
			</cdx-button>
			<cdx-toast
				v-if="showToast7"
				type="error"
				action-button-label="Retry"
				:auto-dismiss="false"
				@user-dismissed="showToast7 = false"
				@action-button-click="handleRetry"
			>
				Connection lost
			</cdx-toast>
		</div>

		<h3>With a lot of content</h3>
		<div class="cdx-demo__content__sectioning">
			<cdx-button @click="showToastLong = true">
				Toast with long content
			</cdx-button>
			<cdx-toast
				v-if="showToastLong"
				type="notice"
				:auto-dismiss="false"
				@user-dismissed="showToastLong = false"
			>
				<strong>Your draft has been saved.</strong>
				We've stored your changes so you can continue editing later.
				You can find this draft in your user page under "My drafts", or
				from the article's talk page. If you have questions, see the
				<a href="#">help page on drafts</a>.
			</cdx-toast>
		</div>

		<h3>Toast Container with useToast</h3>
		<p>
			ToastContainer works with the <code>useToast</code> composable to
			programmatically manage multiple toasts. Use the composable to add/remove
			toasts, and include
			<code>&lt;cdx-toast-container /&gt;</code> in your app to display them.
		</p>
		<div class="cdx-demo__content__sectioning">
			<p><strong>With auto-dismiss</strong></p>
			<cdx-button
				@click="toast.show( {
					type: 'success',
					message: 'Saved!',
					autoDismiss: true
				} )"
			>
				Success (4s)
			</cdx-button>
			<cdx-button
				@click="toast.show( {
					type: 'notice',
					message: 'Changes saved',
					autoDismiss: true
				} )"
			>
				Notice (4s)
			</cdx-button>
			<cdx-button
				@click="toast.show( {
					type: 'notice',
					message: 'Draft saved',
					autoDismiss: true,
					actionButton: { label: 'Undo', onClick: onContainerAction }
				} )"
			>
				Notice + Undo
			</cdx-button>
			<cdx-button
				@click="toast.show( {
					type: 'success',
					message: 'Gone in 2s',
					autoDismiss: 2000
				} )"
			>
				Custom 2s
			</cdx-button>
			<cdx-button
				@click="toast.show( {
					type: 'warning',
					message: 'Please review',
					autoDismiss: true
				} )"
			>
				Warning (4s)
			</cdx-button>
		</div>
		<div class="cdx-demo__content__sectioning">
			<p><strong>Without auto-dismiss</strong></p>
			<cdx-button
				@click="toast.show( {
					type: 'notice',
					message: 'Close when ready',
					autoDismiss: false
				} )"
			>
				Notice (dismiss only)
			</cdx-button>
			<cdx-button
				@click="toast.show( {
					type: 'error',
					message: 'Something failed',
					autoDismiss: false
				} )"
			>
				Error (dismiss only)
			</cdx-button>
			<cdx-button
				@click="toast.show( {
					type: 'error',
					message: 'Connection lost',
					autoDismiss: false,
					actionButton: { label: 'Retry', onClick: onContainerRetry }
				} )"
			>
				Error + Retry
			</cdx-button>
		</div>
		<div class="cdx-demo__content__sectioning">
			<cdx-button @click="toast.clear()">
				Clear all toasts
			</cdx-button>
			<cdx-toast-container />
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted } from 'vue';
import { CdxToast, CdxButton, useToast, CdxToastContainer } from '../lib';

const showToast1 = ref( false );
const showToast2 = ref( false );
const showToast3 = ref( false );
const showToast4 = ref( false );
const showToast5 = ref( false );
const showToast6 = ref( false );
const showToast7 = ref( false );
const showToastLong = ref( false );

const toast = useToast();

// Provide teleport target for ToastContainer
// Find the .cdx-demo element - it's created by DemoBaseLayout parent component
// Use a ref that will be populated after mount to ensure the element exists
const teleportTarget = ref<HTMLElement | string>( 'body' );
provide( 'CdxTeleportTarget', teleportTarget );

// Update teleport target to .cdx-demo element after mount
onMounted( () => {
	const demoElement = document.querySelector( '.cdx-demo' );
	if ( demoElement ) {
		teleportTarget.value = demoElement as HTMLElement;
	}
} );

function handleUndo() {
	// eslint-disable-next-line no-console
	console.log( 'Undo action' );
	showToast2.value = false;
}

function handleRetry() {
	// eslint-disable-next-line no-console
	console.log( 'Retry action' );
	showToast7.value = false;
}

function onContainerAction() {
	// eslint-disable-next-line no-console
	console.log( 'Container toast action clicked' );
}

function onContainerRetry() {
	// eslint-disable-next-line no-console
	console.log( 'Retry clicked' );
}
</script>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-toast-demo {
	.cdx-button {
		margin-bottom: @spacing-50;
	}
}
</style>
