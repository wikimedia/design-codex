<template>
	<a
		:href="item.url"
		class="cdx-list-tile"
	>
		<span
			v-if="!hideThumbnail && item.thumbnail"
			:style="{ backgroundImage: thumbnailBackgroundImage }"
			class="cdx-list-tile__thumbnail"
		/>
		<span
			v-else-if="!hideThumbnail"
			class="cdx-list-tile__thumbnail-placeholder"
		>
			<cdx-icon
				:icon="defaultThumbnailIcon"
				class="cdx-list-tile__thumbnail-icon"
			/>
		</span>

		<span class="cdx-list-tile__text">
			<cdx-list-tile-label
				:label="itemText"
				:search-query="searchQuery"
				:highlight-query="highlightQuery"
			/>
			<span
				v-if="!hideDescription && item.description"
				class="cdx-list-tile__description"
			>
				{{ item.description }}
			</span>
		</span>
	</a>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { cdxIconImageLayoutFrameless } from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';
import CdxListTileLabel from '../list-tile-label/ListTileLabel.vue';
import { SearchResult } from './../../types';

/**
 * Card component to display an item with optional thumbnail and description.
 *
 * Useful as a search result, with optional highlighting of the search query
 * within the label text.
 *
 * If the item has a `label` property, that label will display. Otherwise, the
 * item's `value` property will display.
 */
export default defineComponent( {
	name: 'CdxListTile',

	components: {
		CdxIcon,
		CdxListTileLabel
	},

	props: {
		/**
		 * The item to be displayed.
		 */
		item: {
			type: Object as PropType<SearchResult>,
			required: true
		},
		/**
		 * The current search query.
		 */
		searchQuery: {
			type: String,
			default: ''
		},
		/**
		 * Whether the query should be highlighted within the label.
		 */
		highlightQuery: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the thumbnail should be hidden.
		 */
		hideThumbnail: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the description should be hidden.
		 */
		hideDescription: {
			type: Boolean,
			default: false
		}
	},

	setup: ( props ) => {
		const itemText = computed( () => props.item.label || props.item.value );
		const thumbnailBackgroundImage = computed( () =>
			props.item.thumbnail ? `url(${props.item.thumbnail.url})` : ''
		);

		return {
			itemText,
			thumbnailBackgroundImage,
			defaultThumbnailIcon: cdxIconImageLayoutFrameless
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

// TODO: Tokenize.
@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;

@padding-vertical-list-tile: 8px;

// The size of the input icon container in the TypeaheadSearch component, thumbnail in the ListTile
// component, and footer icon container in the TypeaheadSearch component. We want these to be the
// same size so that these figures vertically line up nicely when they are used together in the
// TypeaheadSearch component.
@size-search-figure: unit( ( 36 / @font-size-browser / @font-size-base ), em );

@margin-end-list-tile-thumbnail: @padding-horizontal-base;
@border-color-list-tile-thumbnail: @color-base80;
@box-shadow-list-tile-thumbnail: 0 0 1px 1px @border-color-list-tile-thumbnail;

@background-color-list-tile-placeholder: @color-base90;
// Lighter than `@color-accessory`. See T286851.
@color-list-tile-thumbnail-placeholder-icon: @color-base30;
@font-size-list-tile-description: unit( ( 14 / @font-size-browser / @font-size-base ), em );

.cdx-list-tile {
	display: flex;
	align-items: center;
	padding: @padding-vertical-list-tile @padding-horizontal-base;
	// Unset line height provided by parent elements. This is particularly necessary when the list
	// tile exists within an Option component.
	line-height: normal;
	text-decoration: none;
	// stylelint-disable-next-line plugin/no-unsupported-browser-features
	hyphens: auto;
	// Progressive enhancement. Fine to override unsupported Android 4. See T280982.
	word-break: break-word;
	// Legacy `word-wrap`; IE 6-11, Edge 12+, Firefox 3.5+, Chrome 4+, Safari 3.1+, Opera 11.5+,
	// iOS 3.2+, Android 2.1+
	// `overflow-wrap` is W3 standard, but it doesn't seem as if browser vendors will abandon
	// word-wrap` (it has wider support), therefore no duplication.
	word-wrap: break-word;

	// &--active is supposed to be used both in `:hover` state
	// and when navigating with keyboard.
	&--active {
		background-color: @background-color-base--hover;
	}

	&__thumbnail-placeholder,
	&__thumbnail {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		// Prevent thumbnail width from shrinking when descriptions are long.
		flex-shrink: 0;
		width: @size-search-figure;
		height: @size-search-figure;
		margin-right: @margin-end-list-tile-thumbnail;
		border-radius: @border-radius-base;
		// Borders tend to cut into the border-radius and it makes the border-radius look smaller
		// on the inside of the box than the outside.
		// Using a box-shadow disguised as a border prevents that from happening.
		box-shadow: @box-shadow-list-tile-thumbnail;
	}

	&__thumbnail {
		display: inline-block;
	}

	&__thumbnail-placeholder {
		background-color: @background-color-list-tile-placeholder;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	&__thumbnail-icon {
		color: @color-list-tile-thumbnail-placeholder-icon;
	}

	&__text {
		overflow: hidden;

		.cdx-list-tile__description {
			color: @color-base--subtle;
			display: block;
			overflow: hidden;
			font-size: @font-size-list-tile-description;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
