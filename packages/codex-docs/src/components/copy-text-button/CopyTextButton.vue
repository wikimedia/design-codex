<template>
	<cdx-button
		class="cdx-docs-copy-text-button"
		action="progressive"
		weight="quiet"
		@click="handleCopyText"
	>
		{{ buttonText }}
		<transition name="cdx-docs-copy-text-button__transition-icon">
			<cdx-icon
				v-if="copySuccess"
				class="cdx-docs-copy-text-button__icon"
				:icon="cdxIconCheck"
			/>
		</transition>
	</cdx-button>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRef, watch } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconCheck } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'CdxDocsCopyTextButton',
	components: {
		CdxButton,
		CdxIcon
	},
	props: {
		/**
		 * The text to be copied.
		 */
		copyText: {
			type: [ String, Object ] as PropType<string|HTMLElement>,
			required: true
		},

		buttonText: {
			type: String,
			default: 'Copy'
		}
	},
	setup( props ) {
		const copySuccess = ref( false );

		const getCopyText = () => {
			if ( typeof props.copyText === 'string' ) {
				return props.copyText;
			}
			const preNodes = Array.from( props.copyText.querySelectorAll( 'pre' ) );
			return preNodes
				// Some code samples use code groups where only one <pre> is visible at any time,
				// while the others are hidden. To support this, ignore hidden <pre> tags.
				.filter( ( pre ) => pre.clientHeight > 0 )
				.map( ( pre ) => pre.innerText )
				// If there are multiple code blocks visible, separate them with a double newline.
				// This happens e.g. for CSS-only code samples where there's an HTML block followed
				// by a Less block.
				.join( '\n\n' );
		};

		// Should be false for no current timeout, or the number returned from setTimeout()
		let currentTimeoutId: ReturnType<typeof setTimeout> | false = false;

		/**
		 * Delete the current pending timeout that will set copySuccess to false later.
		 * This is meant to be used when:
		 * - The text was copied again, and the delay should restart
		 * - The text to copy was changed, or a new copy command failed, in which case
		 *     the success indicator will be hidden immediately and the deferred hiding
		 *     is no longer needed, and may be incorrect if there is a successful copy
		 *     in the meanwhile
		 */
		const cancelCurrentTimeout = () => {
			if ( currentTimeoutId !== false ) {
				clearTimeout( currentTimeoutId );
				currentTimeoutId = false;
			}
		};

		const copyCodeViaExecCommand = () => {
			const textarea = document.createElement( 'textarea' ),
				range = document.createRange();

			// Set the value of the textarea to our copytext.
			const copyText = getCopyText();
			textarea.textContent = copyText;

			// Earlier iOS versions need contenteditable to be true.
			textarea.contentEditable = 'true';

			// Make sure the textarea isn't editable.
			textarea.readOnly = true;

			// Make the textarea invisible and add to the DOM.
			textarea.style.position = 'absolute';
			textarea.style.left = '-9999px';
			document.body.appendChild( textarea );

			// Use a range and a selection to grab the contents of the textarea.
			// In most modern browsers we could just do textarea.select(), but
			// iOS versions below 14 don't implement this.
			range.selectNodeContents( textarea );
			const selection = window.getSelection();
			selection?.removeAllRanges();
			selection?.addRange( range );
			// Set this to a huge number to make sure we're getting the entire
			// selection.
			textarea.setSelectionRange( 0, copyText.length );

			// Set contenteditable to false just to be safe.
			textarea.contentEditable = 'false';

			// Try to copy the text.
			let copied = true;
			try {
				copied = document.execCommand( 'copy' );
			} catch {
				copied = false;
			}

			// Remove any existing timeout that will hide the success icon, either
			// the copy worked and a new timeout begins, or it doesn't, in which case
			// the icon gets hidden immediately
			cancelCurrentTimeout();

			if ( copied ) {
				copySuccess.value = true;
				currentTimeoutId = setTimeout( () => {
					copySuccess.value = false;
				}, 2000 );
			} else {
				// Hide the icon immediately
				copySuccess.value = false;
			}

			// Remove the textarea element.
			document.body.removeChild( textarea );
		};

		const handleCopyText = () => {
			const clipboard = window.navigator.clipboard;

			// Clipboard is only available when the website uses HTTPS and hence will not work
			// during development unless we use a self signed certificate, so continue to use
			// document.execCommand( 'copy' ) for local development environment
			if ( clipboard ) {
				// Remove any existing timeout to hide the success icon
				cancelCurrentTimeout();
				clipboard.writeText( getCopyText() ).then(
					() => {
						copySuccess.value = true;
						currentTimeoutId = setTimeout( () => {
							copySuccess.value = false;
						}, 2000 );
					},
					() => {
						// Hide the icon immediately
						copySuccess.value = false;
					}
				);
			} else {
				copyCodeViaExecCommand();
			}
		};

		// Whenever the text to be copied changes, hide any existing success icon,
		// and then cancel the callback that will hide it later if there is one
		watch(
			toRef( props, 'copyText' ),
			() => {
				cancelCurrentTimeout();
				copySuccess.value = false;
			}
		);

		return {
			handleCopyText,
			copySuccess,
			cdxIconCheck
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-copy-text-button {
	&__transition-icon {
		&-leave-active {
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			transition-property: width, opacity, margin-left;
			transition-duration: @transition-duration-medium;
			transition-timing-function: @transition-timing-function-user;
		}

		&-leave-to {
			opacity: 0;
			width: 0;
			margin-left: calc( -1 * @spacing-25 );
		}
	}
}
</style>
