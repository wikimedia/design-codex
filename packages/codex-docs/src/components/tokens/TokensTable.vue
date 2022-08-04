<template>
	<table class="cdx-docs-tokens-table">
		<thead>
			<tr>
				<th>Name</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="( token, key ) in flattenedTokens" :key="key">
				<!-- Needs dir="ltr" to make the bidirectional styles for CdxButton work -->
				<td class="cdx-docs-tokens-table__name" dir="ltr">
					<strong>{{ token.name }}</strong>
					<cdx-docs-copy-text-button :copy-text="token.name" />
				</td>
				<td class="cdx-docs-tokens-table__value">
					<code>{{ token.value }}</code>
					<div
						v-if="hasTokenDemo"
						class="cdx-docs-tokens-table__demo"
						:class="[ demoClass, `${demoClass}--${tokenCategory}` ]"
					>
						<component
							:is="tokenDemo"
							:class="[ `${demoClass}__token`, `${demoClass}__token--${token.name}` ]"
							:token-value="token.value"
							:css-property="cssProperty"
							:style-target="styleTarget"
						/>
						<strong
							v-if="token.deprecated"
							:class="`${demoClass}__token--deprecated`"
						>
							deprecated
						</strong>
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
					<p v-if="typeof token.deprecated === 'string'">
						<em>Deprecated: {{ token.deprecated }}</em>
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
import CdxDocsTokenDemo from './TokenDemo.vue';
import CdxDocsFontDemo from './FontDemo.vue';
import CdxDocsSpacingDemo from './SpacingDemo.vue';
import CdxDocsSizeDemo from './SizeDemo.vue';
import CdxDocsTransitionDemo from './TransitionDemo.vue';
import CdxDocsCopyTextButton from '../copy-text-button/CopyTextButton.vue';

export default defineComponent( {
	name: 'TokensTable',
	components: {
		CdxDocsTokenDemo,
		CdxDocsFontDemo,
		CdxDocsSpacingDemo,
		CdxDocsSizeDemo,
		CdxDocsTransitionDemo,
		CdxDocsCopyTextButton
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
		/**
		 * Name of the token category being demoed. Used to generate a special CSS class.
		 */
		tokenCategory: {
			type: String,
			required: true
		},
		cssProperty: {
			type: String,
			default: ''
		},
		/**
		 * Extra class to pass to CdxDocsTokenDemo
		 */
		demoClass: {
			type: String,
			default: 'cdx-docs-tokens-demo'
		},
		/**
		 * Extra option to pass to CdxDocsTokenDemo
		 */
		styleTarget: {
			type: String,
			default: ''
		}
	},
	setup( props ) {
		const hasTokenDemo = computed( () => !!props.tokenDemo );
		const flattenedTokens = computed( () =>
			flattenDesignTokensTree( props.tokens ).filter( ( token ) => token.attributes.type !== 'theme' )
		);

		return {
			hasTokenDemo,
			flattenedTokens
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-tokens {
	&-table {
		// Undo VitePress style.
		display: table;
		width: @size-full;

		// Undo GitHub-table-style alternate row striping.
		tr:nth-child( 2n ) {
			background-color: @background-color-base;
		}

		// Override VitePress's styles that add way too much whitespace around <p>s
		p {
			margin: 0 0 0.5em;
			line-height: 1.3;
		}

		&__name {
			position: relative;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				min-width: 200px;
			}

			.cdx-docs-copy-text-button {
				position: absolute;
				right: 0;
				bottom: 0;
				font-size: 0.8em;
			}
		}

		&__value {
			position: relative;

			code {
				color: @color-emphasized;
				display: inline-block;
				margin-bottom: 8px;
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

	&-demo__token--deprecated {
		background-color: @background-color-message-warning;
		display: inline-block;
		position: absolute;
		top: 8px;
		right: 12px;
		padding: 0 4px;
		font-weight: @font-weight-normal;
	}
}
</style>
