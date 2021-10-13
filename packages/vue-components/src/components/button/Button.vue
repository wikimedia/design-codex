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
import { defineComponent, PropType, computed } from 'vue';
import { ButtonActions, ButtonTypes } from '../../constants';
import { ButtonAction, ButtonType } from '../../types';
import { makeStringTypeValidator } from '../../utils';

const buttonTypeValidator = makeStringTypeValidator( ButtonTypes );
const buttonActionValidator = makeStringTypeValidator( ButtonActions );

/**
 * A button wrapping slotted content.
 */
export default defineComponent( {
	name: 'CdxButton',
	props: {
		action: {
			type: String as PropType<ButtonAction>,
			default: 'default',
			validator: buttonActionValidator
		},
		type: {
			type: String as PropType<ButtonType>,
			default: 'normal',
			validator: buttonTypeValidator
		}
	},
	emits: [ 'click' ],
	setup( props, { emit } ) {
		const rootClasses = computed( () => ( {
			'cdx-button--action-default': props.action === 'default',
			'cdx-button--action-progressive': props.action === 'progressive',
			'cdx-button--action-destructive': props.action === 'destructive',
			'cdx-button--type-primary': props.type === 'primary',
			'cdx-button--type-normal': props.type === 'normal',
			'cdx-button--type-quiet': props.type === 'quiet',
			'cdx-button--framed': props.type !== 'quiet'
		} ) );

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
