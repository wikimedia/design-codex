<template>
	<span class="cdx-thumbnail">
		<span
			v-if="!thumbnailLoaded"
			class="cdx-thumbnail__placeholder"
		>
			<cdx-icon
				:icon="placeholderIcon"
				class="cdx-thumbnail__placeholder__icon"
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
 * Thumbnail background image or placeholder icon.
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
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

// TODO: This should be a common token shared between this component and others (MenuItem,
// TypeaheadSearch).
@size-search-figure: 40px;

.cdx-thumbnail {
	// `flex` prevents a descender from being added below the image; `inline` limits width of this
	// element to the width of the image.
	display: inline-flex;

	&__placeholder,
	&__image {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		// Thumbnail should never shrink when it's in a flex layout with other elements.
		flex-shrink: 0;
		width: @size-search-figure;
		height: @size-search-figure;
		// TODO: use token for border color. Currently, a token exists for this color called
		// `border-color-base--disabled`, but this token name will likely change and is also not
		// appropriate for this use case. For now, we'll directly use the color.
		border: @border-width-base @border-style-base @color-gray300;
		border-radius: @border-radius-base;
	}

	&__image {
		display: inline-block;

		// Fade in transition applied to the thumbnail on show
		&-enter-active {
			transition-property: @transition-property-fade;
			transition-duration: @transition-duration-base;
		}

		&-enter-from {
			opacity: @opacity-transparent;
		}
	}

	&__placeholder {
		// TODO: update to @background-color-interactive-subtle once available.
		background-color: @background-color-framed;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		&__icon {
			color: @color-placeholder;
		}
	}
}
</style>