<template>
	<table class="cdx-docs-tokens-table">
		<caption>
			<!-- Expose `table caption` content only to assistive technology users. -->
			<span class="cdx-docs-is-visually-hidden">
				List of design token names, values and metadata for <code>{{ cssProperty }}</code>
			</span>
		</caption>
		<thead>
			<tr>
				<th>Name</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="( token, key ) in flattenedTokens" :key="key">
				<!-- Needs dir="ltr" to make the bidirectional styles for CdxButton work -->
				<td
					:id="token.name"
					class="cdx-docs-tokens-table__name"
					dir="ltr"
				>
					<strong>{{ token.name }}</strong>
					<span class="cdx-docs-tokens-table__name__meta">
						<p v-if="token.deprecated" class="cdx-docs-tokens-table__name__deprecated">
							<strong>deprecated</strong>
						</p>
						<cdx-docs-copy-text-button :copy-text="token.name" />
					</span>
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
					</div>
					<div class="cdx-docs-tokens-table__value-meta">
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
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { DesignTokensTree } from '../../types';
import { expandDeprecationMessage, flattenDesignTokensTree } from '../../utils/tokens';
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
		 * Name of tokens or token groups to skip.
		 */
		excludeTokens: {
			type: Array as PropType<string[]>,
			default: () => []
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
			flattenDesignTokensTree( props.tokens, props.excludeTokens )
				.filter( ( token ) => token.attributes.type !== 'theme' )
				.map( ( token ) => expandDeprecationMessage( token ) )
		);

		return {
			hasTokenDemo,
			flattenedTokens
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-tokens-table {
	// Undo VitePress style.
	width: @size-full;

	// Undo GitHub-table-style alternate row striping.
	tr:nth-child( 2n ) {
		background-color: @background-color-base;
	}

	th,
	td {
		border-color: @border-color-base;
	}

	tbody td {
		border-right-color: @border-color-subtle;
	}

	&__name {
		position: relative;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			min-width: @size-1600;
		}

		// "deprecated" tag and copy button.
		&__meta {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			row-gap: @spacing-25;
			position: absolute;
			bottom: 0;
			left: 0;
			width: @size-full;
			// Use small at `14px` equivalent `td` font size.
			// Inherited from `custom.css` `.vp-doc td`.
			line-height: @line-height-small;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				flex-direction: row;
				justify-content: space-between;
				padding-left: @spacing-50;
			}
		}

		&__deprecated {
			background-color: @background-color-warning-subtle;
			padding: 0 @spacing-25;
		}
	}

	&__value {
		code {
			color: @color-emphasized;
			display: inline-block;
			margin-bottom: @spacing-50;
		}
	}

	&__demo {
		margin-top: @spacing-100;
		margin-bottom: @spacing-125;
	}

	&__value-meta {
		color: @color-subtle;
	}

	// Override VitePress's styles that add way too much whitespace around <p>s.
	p {
		margin: @spacing-50 0 0;
		text-decoration: @text-decoration-none;

		&:first-child {
			margin-top: 0;
		}
	}

	// Prevent long tokens from running off the page.
	pre {
		white-space: pre-wrap;
	}
}
</style>
