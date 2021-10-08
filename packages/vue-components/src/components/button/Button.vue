<template>
	<button
		class="cdx-button"
		:class="rootClasses"
		@click="onClick"
	>
		<slot />
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

// TODO maybe move this stuff to a separate file and export it?
type ButtonAction = 'default' | 'progressive' | 'destructive';
type ButtonType = 'normal' | 'primary' | 'quiet';

function isButtonAction( s: unknown ): s is ButtonAction {
	// TODO upstream eslint-config-wikimedia needs a mode that allows ES2016+ syntax in Vue files
	// eslint-disable-next-line no-restricted-syntax
	return typeof s === 'string' && [ 'default', 'progressive', 'destructive' ].includes( s );
}

function isButtonType( s: unknown ): s is ButtonType {
	// eslint-disable-next-line no-restricted-syntax
	return typeof s === 'string' && [ 'normal', 'primary', 'quiet' ].includes( s );
}

/**
 * A button wrapping slotted content.
 */
export default defineComponent( {
	name: 'CdxButton',
	props: {
		action: {
			type: String as PropType<ButtonAction>,
			default: 'default',
			validator: isButtonAction
		},
		type: {
			type: String as PropType<ButtonType>,
			default: 'normal',
			validator: isButtonType
		}
	},
	emits: [ 'click' ],
	setup( props, { emit } ) {
		const rootClasses = () => ( {
			'cdx-button--action-default': props.action === 'default',
			'cdx-button--action-progressive': props.action === 'progressive',
			'cdx-button--action-destructive': props.action === 'destructive',
			'cdx-button--type-primary': props.type === 'primary',
			'cdx-button--type-normal': props.type === 'normal',
			'cdx-button--type-quiet': props.type === 'quiet',
			'cdx-button--framed': props.type !== 'quiet'
		} );

		const onClick = ( event: Event ) => {
			emit( 'click', event );
		};

		return {
			rootClasses,
			onClick
		};
	}
} );
</script>

<style lang="postcss">
/* TODO set up CSS infrastructure, then put styles here */
@import 'design-tokens/dist/_variables.css';
</style>
