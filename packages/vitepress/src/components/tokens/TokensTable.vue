<template>
	<table class="vp-tokens-table">
		<thead>
			<tr>
				<th>Name</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="( token, key ) in flattenedTokens" :key="key">
				<td class="vp-tokens-table__name">
					<strong>{{ token.name }}</strong>
					<copy-text-button :copy-text="token.name" />
				</td>
				<td>
					<code class="vp-tokens-table__value">{{ token.value }}</code>
					<div v-if="hasTokenDemo" class="vp-tokens-table__demo">
						<component
							:is="tokenDemo"
							:token-value="token.value"
							:css-property="cssProperty"
						/>
					</div>
					<p>
						Defined in <code>{{ token.filePath }}</code>
					</p>
					<p
						v-for="referredTokenName in token.attributes.tokens"
						:key="referredTokenName"
					>
						Refers to <code>{{ referredTokenName }}</code>
					</p>
					<p v-if="token.comment">
						<em>{{ token.comment }}</em>
					</p>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { DesignTokensTree } from '../../types';
import { flattenDesignTokensTree } from '../../utils/tokens';
import AnimationDemo from './AnimationDemo.vue';
import BorderDemo from './BorderDemo.vue';
import BoxShadowDemo from './BoxShadowDemo.vue';
import ColorDemo from './ColorDemo.vue';
import FontDemo from './FontDemo.vue';
import OpacityDemo from './OpacityDemo.vue';
import PaddingDemo from './PaddingDemo.vue';
import PositionDemo from './PositionDemo.vue';
import SpacingDemo from './SpacingDemo.vue';
import SizeDemo from './SizeDemo.vue';
import TransitionDemo from './TransitionDemo.vue';
import CopyTextButton from './CopyTextButton.vue';

export default defineComponent( {
	name: 'TokensTable',
	components: {
		AnimationDemo,
		BorderDemo,
		BoxShadowDemo,
		ColorDemo,
		FontDemo,
		OpacityDemo,
		PaddingDemo,
		PositionDemo,
		SpacingDemo,
		SizeDemo,
		TransitionDemo,
		CopyTextButton
	},
	props: {
		/**
		 * The tokens to be displayed, one per table row.
		 */
		tokens: {
			type: Object as PropType<DesignTokensTree>,
			required: true
		},
		/**
		 * Name of the Vue component used to demonstrate the value of each token.
		 */
		tokenDemo: {
			type: String,
			default: ''
		},
		cssProperty: {
			type: String,
			default: ''
		}
	},
	setup( props ) {
		const hasTokenDemo = computed( () => !!props.tokenDemo );
		const flattenedTokens = computed( () =>
			flattenDesignTokensTree( props.tokens )
		);

		return {
			hasTokenDemo,
			flattenedTokens
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) 'design-tokens/dist/theme-wikimedia-ui.less';

// FIXME: Tech debt. To be removed as soon as Id58bb6ce050 is in.
@width-breakpoint-tablet: 720px;

.vp-tokens-table {
	// Undo VitePress style.
	display: table;

	// Undo GitHub-table-style alternate row striping.
	tr:nth-child( 2n ) {
		background-color: @background-color-base;
	}

	// Override VitePress's styles that add way too much whitespace around <p>s
	p {
		margin: 0 0 0.5em;
		line-height: 1.3;
	}

	&__value {
		color: @color-base--emphasized;
		display: inline-block;
		margin-bottom: 8px;
	}

	&__name {
		position: relative;

		@media screen and ( min-width: @width-breakpoint-tablet ) {
			min-width: 200px;
		}

		.vp-copy-text-button {
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 0.8em;
		}
	}

	&__demo {
		margin-bottom: 16px;
	}

	// Prevent long tokens from running off the page
	pre {
		white-space: pre-wrap;
	}
}
</style>
