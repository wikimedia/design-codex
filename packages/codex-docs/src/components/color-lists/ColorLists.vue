<template>
	<ol class="cdx-docs-color-lists">
		<li
			v-for="set in colorSets"
			:key="set.category"
			class="cdx-docs-color-lists__list"
		>
			<!-- The ID here will add the heading to the outline menu. -->
			<h3 :id="set.category">
				{{ set.category }}
			</h3>
			<ol>
				<li
					v-for="item in set.items"
					:key="item.name"
					class="cdx-docs-color-lists__list__item"
					:style="{ backgroundColor: item.value }"
				>
					<code class="cdx-docs-color-lists__list__item__color-name">
						{{ item.name }}
					</code>
					<code class="cdx-docs-color-lists__list__item__color-code">
						{{ item.value }}
					</code>
				</li>
			</ol>
		</li>
	</ol>
</template>

<script lang="ts" setup>
import { defineExpose } from 'vue';
import { DesignTokensTree } from '../../types';
import optionTokens from '../../../../codex-design-tokens/src/themes/wikimedia-ui.json';
const colorTokens = optionTokens.color;

// Allowed color categories. If we add more color categories in the future, the category
// names should be added here.
const colorCategories = [ 'white', 'black', 'gray', 'red', 'orange', 'yellow', 'lime',
	'green', 'blue', 'purple', 'pink', 'maroon' ];

interface ColorItem {
	name: string,
	value: string
}

interface ColorSet {
	category: string,
	items: ColorItem[]
}

/**
 * Get sets of colors to output.
 *
 * @param tokens
 * @return {Object}
 * @public
 */
function getColorSets( tokens: DesignTokensTree ): ColorSet[] {
	return colorCategories.map( ( category ) => {
		const items: ColorItem[] = [];
		for ( const tokenName in tokens ) {
			const token = tokens[ tokenName ];
			// Do nothing if this is just a string (i.e. a comment).
			if ( typeof token === 'string' ) {
				continue;
			}

			// Add the token if its name starts with the current color category, it has
			// a string value, and its name does not contain '999' (those colors will be
			// removed eventually).
			if (
				tokenName.startsWith( category ) &&
				'value' in token &&
				typeof token.value === 'string' &&
				!tokenName.includes( '999' )
			) {
				items.push( {
					name: tokenName,
					value: token.value
				} );
			}
		}

		const capitalizedCategory = category[ 0 ].toUpperCase() + category.slice( 1 );
		return {
			category: capitalizedCategory,
			items
		};
	} ).filter(
		// Filter out sets with no items yet.
		( set ) => set.items.length > 0
	);
}
defineExpose( { getColorSets } );

const colorSets = getColorSets( colorTokens );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-color-lists {
	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		display: flex;
		flex-wrap: wrap;
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		column-gap: @spacing-100;
	}

	ol&,
	ol {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
	}

	li + li {
		margin: 0;
	}

	&__list {
		flex-basis: calc( 50% - @spacing-50 );

		h3 {
			margin-bottom: @spacing-25;
		}

		&__item {
			display: flex;
			justify-content: space-between;
			padding: @spacing-50;
		}

		// Give the white item a border.
		&:first-child {
			.cdx-docs-color-lists__list__item {
				border: @border-width-base @border-style-base @border-color-muted;
			}
		}
	}
}
</style>
