<template>
	<li class="cdx-demo-best-practice" :class="rootClasses">
		<cdx-icon
			class="cdx-demo-best-practice__icon"
			:icon="icon"
			size="small"
		/>
		<slot />
	</li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { cdxIconSuccess, cdxIconClear } from '@wikimedia/codex-icons';
import { CdxIcon } from '@wikimedia/codex';
import { BestPractice } from '../../types';

/**
 * Best practice with an icon indicating whether this is something you should or shouldn't do.
 */
export default defineComponent( {
	name: 'CdxDemoBestPractice',
	components: { CdxIcon },
	props: {
		/**
		 * Whether this is a "do" or a "dont".
		 */
		type: {
			type: String as PropType<BestPractice>,
			default: 'do'
		}
	},
	setup( props ) {
		const rootClasses = computed( () => ( {
			[ `cdx-demo-best-practice--${ props.type }` ]: true
		} ) );

		const icon = computed( () => props.type === 'dont' ? cdxIconClear : cdxIconSuccess );

		return {
			rootClasses,
			icon
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-best-practice {
	color: var( --color-base );
	display: flex;
	gap: @spacing-35;
	font-size: var( --font-size-small );

	// Slot content will get a `<p>` element wrapped around it if there's whitespace around it,
	// which is necessary to get markdown to also process things like links. Remove the extra
	// margins so the text aligns with the icon.
	p {
		margin: 0;
		line-height: @line-height-small;
	}

	.cdx-demo-best-practice__icon {
		flex-shrink: 0;
		// Setting the height of the icon to the line-height of the accompanying text
		// to ensure centering of the icon to text
		height: @line-height-small;
	}

	&--do {
		.cdx-demo-best-practice__icon {
			color: @color-icon-success;
		}
	}

	&--dont {
		.cdx-demo-best-practice__icon {
			color: @color-icon-error;
		}
	}
}
</style>
