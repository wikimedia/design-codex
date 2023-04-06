<template>
	<span class="cdx-thumbnail">
		<span
			v-if="!thumbnailLoaded"
			class="cdx-thumbnail__placeholder"
		>
			<cdx-icon
				:icon="placeholderIcon"
				class="cdx-thumbnail__placeholder__icon--vue"
			/>
		</span>
		<Transition name="cdx-thumbnail__image">
			<span
				v-if="thumbnailLoaded"
				:style="thumbnailStyle"
				class="cdx-thumbnail__image"
			/>
		</Transition>
	</span>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, onMounted } from 'vue';
import { cdxIconImageLayoutFrameless, Icon } from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';
import { Thumbnail } from '../../types';

/**
 * A small preview of an image.
 *
 * The placeholder icon will display until thumbnail image loads, or if a thumbnail image is not
 * provided.
 */
export default defineComponent( {
	name: 'CdxThumbnail',

	components: { CdxIcon },

	props: {
		/**
		 * Thumbnail data.
		 */
		thumbnail: {
			type: [ Object, null ] as PropType<Thumbnail|null>,
			default: null
		},

		/**
		 * Thumbnail placeholder icon.
		 */
		placeholderIcon: {
			type: [ String, Object ] as PropType<Icon>,
			default: cdxIconImageLayoutFrameless
		}
	},

	setup: ( props ) => {
		const thumbnailLoaded = ref( false );
		const thumbnailStyle = ref( {} );

		const preloadThumbnail = ( url: string ) => {
			const escapedUrl = url.replace( /([\\"\n])/g, '\\$1' );
			const image = new Image();
			image.onload = () => {
				thumbnailStyle.value = { backgroundImage: `url("${escapedUrl}")` };
				thumbnailLoaded.value = true;
			};
			image.onerror = () => {
				thumbnailLoaded.value = false;
			};
			image.src = escapedUrl;
		};

		onMounted( () => {
			if ( props.thumbnail?.url ) {
				preloadThumbnail( props.thumbnail.url );
			}
		} );

		return {
			thumbnailStyle,
			thumbnailLoaded
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';

.cdx-thumbnail {
	// `flex` prevents a descender from being added below the image; `inline` limits width of this
	// element to the width of the image.
	display: inline-flex;

	&__placeholder,
	&__image {
		background-position: @background-position-base;
		background-repeat: no-repeat;
		background-size: @background-size-search-figure;
		// Thumbnail should never shrink when it's in a flex layout with other elements.
		flex-shrink: 0;
		box-sizing: @box-sizing-base;
		// Values of thumbnail as declared within the MenuItem component, f.e. in TypeaheadSearch.
		min-width: @min-size-search-figure;
		min-height: @min-size-search-figure;
		width: @size-search-figure;
		height: @size-search-figure;
		border: @border-width-base @border-style-base @border-color-subtle;
		border-radius: @border-radius-base;
	}

	&__image {
		display: inline-block;

		// Fade in transition applied to the thumbnail on show.
		&-enter-active {
			transition-property: @transition-property-fade;
			transition-duration: @transition-duration-base;
		}

		&-enter-from {
			opacity: @opacity-transparent;
		}
	}

	&__placeholder {
		background-color: @background-color-interactive-subtle;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		&__icon {
			.cdx-mixin-css-icon( @cdx-icon-image-layout-frameless, @color-placeholder );

			&--vue {
				color: @color-placeholder;
			}
		}
	}
}
</style>
