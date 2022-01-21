<template>
	<span class="cdx-list-tile-label">
		<!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
		<!--eslint-disable-next-line max-len-->
		{{ labelChunks[ 0 ] }}<span class="cdx-list-tile-label__match">{{ labelChunks[ 1 ] }}</span>{{ labelChunks[ 2 ] }}
	</span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useStringHelpers from '../../composables/useStringHelpers';

/**
 * Label text with optional highlighting of a search query.
 *
 * This component can be used to display the label of a search result with the
 * current search query visually differentiated within the label text.
 */
export default defineComponent( {
	name: 'CdxListTileLabel',

	props: {
		/**
		 * Label text.
		 */
		label: {
			type: [ String, Number ],
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
		}
	},

	setup: ( props ) => {
		const { splitStringAtMatch } = useStringHelpers();

		// If highlighting is enabled, returns the label with the part that matches the query
		// highlighted. If highlighting is disabled, returns the unmodified label in a form
		// compatible with the template above.
		const labelChunks = computed( () => {
			if ( props.highlightQuery ) {
				return splitStringAtMatch( props.searchQuery, String( props.label ) );
			}

			return [ '', String( props.label ), '' ];
		} );
		return {
			labelChunks
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) 'wikimedia-ui-base/wikimedia-ui-base.less';

// TODO: add component-level token
@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@font-size-list-tile-label: unit( ( 16 / @font-size-browser / @font-size-base ), em );

.cdx-list-tile-label {
	color: @color-base;
	display: block;
	margin: 0 0 2px 0;
	font-size: @font-size-list-tile-label;
	font-weight: @font-weight-bold;

	&__match {
		font-weight: @font-weight-normal;
	}
}
</style>
