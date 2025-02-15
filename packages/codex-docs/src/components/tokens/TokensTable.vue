<template>
	<cdx-table
		class="cdx-docs-tokens-table"
		:caption="caption"
		:columns="columns"
		:hide-caption="true"
	>
		<template #tbody>
			<tbody>
				<tr v-for="( token, key ) in flattenedTokens" :key="key">
					<!-- Needs dir="ltr" to make the bidirectional styles for CdxButton work -->
					<td
						:id="token.name"
						class="cdx-docs-tokens-table__name"
						dir="ltr"
					>
						<span class="cdx-docs-tokens-table__name__token-name">
							<code>
								{{ token.name }}
							</code>
							<cdx-docs-copy-text-button :copy-text="token.name" />
						</span>
						<div class="cdx-docs-tokens-table__name__meta">
							<p
								v-if="token.deprecated"
								class="cdx-docs-tokens-table__name__meta__deprecated"
							>
								<strong>deprecated</strong>
							</p>
						</div>
						<div
							v-if="hasTokenDemo"
							class="cdx-docs-tokens-table__demo"
							:class="[ demoClass, `${demoClass}--${tokenCategory}` ]"
						>
							<component
								:is="tokenDemo"
								:class="[ `${demoClass}__token`,
									`${demoClass}__token--${token.name}` ]"
								:token-value="token.value"
								:css-property="cssProperty"
								:style-target="styleTarget"
							/>
						</div>
						<p v-if="token.comment" class="cdx-docs-tokens-table__name__meta__comments">
							{{ token.comment }}
						</p>
					</td>
					<td class="cdx-docs-tokens-table__value">
						<span>
							<code class="cdx-docs-tokens-table__value__token-value">
								{{ token.value }}
							</code>
						</span>
						<div>
							<p
								v-for="referredTokenName in token.attributes.tokens"
								:key="referredTokenName"
							>
								<code>{{ referredTokenName }}</code>
							</p>
						</div>
					</td>
				</tr>
			</tbody>
		</template>
	</cdx-table>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { DesignTokensTree } from '../../types';
import { expandDeprecationMessage, flattenDesignTokensTree } from '../../utils/tokens';
import CdxDocsTokenDemo from './TokenDemo.vue';
import CdxDocsCursorDemo from './CursorDemo.vue';
import CdxDocsFontDemo from './FontDemo.vue';
import CdxDocsTransitionDemo from './TransitionDemo.vue';
import CdxDocsCopyTextButton from '../copy-text-button/CopyTextButton.vue';
import { CdxTable } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TokensTable',
	components: {
		CdxTable,
		CdxDocsTokenDemo,
		CdxDocsCursorDemo,
		CdxDocsFontDemo,
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
		const flattenedTokens = computed(
			() => flattenDesignTokensTree( props.tokens, props.excludeTokens )
				.filter( ( token ) => token.attributes.type !== 'theme' )
				.map( ( token ) => expandDeprecationMessage( token ) )
		);

		const caption = computed( () => `List of design token names, values and metadata for ${ props.cssProperty }` );
		const columns = [
			{ id: 'name', label: 'Name', width: '50%' },
			{ id: 'value', label: 'Value', width: '50%' }
		];

		return {
			hasTokenDemo,
			flattenedTokens,
			caption,
			columns
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

	&__name {
		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			min-width: @size-1600;
		}

		/* stylelint-disable-next-line selector-class-pattern */
		.cdx-docs-tokens-table.cdx-table &__token-name code {
			// Override VitePress style.
			font-size: @font-size-small;
		}

		// "deprecated" tag and token comments.
		&__meta {
			// Use small at `14px` equivalent `td` font size.
			// Inherited from `custom.css` `.vp-doc td`.
			line-height: @line-height-small;

			&__deprecated strong {
				background-color: @background-color-warning-subtle;
				padding: 0 @spacing-25;
			}

			&__comments {
				color: @color-subtle;
			}
		}
	}

	&__value {
		code.cdx-docs-tokens-table__value__token-value {
			background-color: inherit;
			display: inline-block;
			margin-bottom: @spacing-50;
		}
	}

	&__demo {
		margin-top: @spacing-100;
		margin-bottom: @spacing-125;
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
