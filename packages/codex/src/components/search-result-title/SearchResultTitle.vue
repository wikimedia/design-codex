<template>
	<span class="cdx-search-result-title">
		<!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
		<!--eslint-disable-next-line max-len-->
		<bdi>{{ titleChunks[ 0 ] }}<span class="cdx-search-result-title__match">{{ titleChunks[ 1 ] }}</span>{{ titleChunks[ 2 ] }}</bdi>
	</span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { splitStringAtMatch } from '../../utils/stringHelpers';

/**
 * Title with highlighted search query.
 *
 * This component can be used to display the title of a search result with the
 * current search query visually differentiated within the title text.
 */
export default defineComponent( {
	name: 'CdxSearchResultTitle',

	props: {
		/**
		 * Title text.
		 */
		title: {
			type: String,
			required: true
		},
		/**
		 * The current search query.
		 */
		searchQuery: {
			type: String,
			default: ''
		}
	},

	setup: ( props ) => {
		// Splits the title into three chunks: the part before the search query, the part containing
		// the search query, and the part after the search query.
		const titleChunks = computed( () =>
			splitStringAtMatch( props.searchQuery, String( props.title ) ) );

		return {
			titleChunks
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-search-result-title {
	display: inline-block;
	font-weight: @font-weight-bold;

	&__match {
		font-weight: @font-weight-normal;
	}
}
</style>
