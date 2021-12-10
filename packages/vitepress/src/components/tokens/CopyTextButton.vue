<template>
	<CdxButton
		class="vp-copy-text-button"
		action="progressive"
		type="quiet"
		@click="handleCopyText"
	>
		{{ buttonText }}
		<transition name="vp-copy-text-button__transition-icon">
			<CdxIcon
				v-if="copySuccess"
				class="vp-copy-text-button__icon"
				:icon="cdxIconCheck"
			/>
		</transition>
	</CdxButton>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CdxButton from 'vue-components/src/components/button/Button.vue';
import CdxIcon from 'vue-components/src/components/icon/Icon.vue';
import { cdxIconCheck } from 'icons';

export default defineComponent( {
	name: 'WvuiCopytext',
	components: {
		CdxButton,
		CdxIcon
	},
	props: {
		/**
		 * The text to be copied.
		 */
		copyText: {
			type: String,
			required: true
		},

		buttonText: {
			type: String,
			default: 'Copy'
		}
	},
	setup( props ) {
		const copySuccess = ref( false );

		const handleCopyText = () => {
			const textarea = document.createElement( 'textarea' ),
				range = document.createRange();

			// Set the value of the textarea to our copytext.
			textarea.textContent = props.copyText;

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
			textarea.setSelectionRange( 0, props.copyText.length );

			// Set contenteditable to false just to be safe.
			textarea.contentEditable = 'false';

			// Try to copy the text.
			let copied = true;
			try {
				copied = document.execCommand( 'copy' );
			} catch ( e ) {
				copied = false;
			}

			if ( copied ) {
				copySuccess.value = true;
				setTimeout( () => {
					copySuccess.value = false;
				}, 500 );
			}

			// Remove the textarea element.
			document.body.removeChild( textarea );
		};

		return {
			handleCopyText,
			copySuccess,
			cdxIconCheck
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) 'design-tokens/dist/theme-wikimedia-ui.less';

.vp-copy-text-button {
	&__icon {
		width: 1.2em;
		height: 1.2em;
	}

	&__transition-icon {
		&-leave-active {
			/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
			transition: width 500ms, opacity 500ms, margin-left 500ms;
		}

		&-leave-to {
			opacity: 0;
			width: 0;
			margin-left: -0.2em;
		}
	}
}
</style>
