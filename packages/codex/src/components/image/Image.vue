<template>
	<div
		class="cdx-image"
		:class="rootClasses"
		:style="rootStyle"
	>
		<img
			v-if="src"
			v-bind="otherAttrs"
			:src="imageSrc"
			:alt="alt"
			:width="width"
			:height="height"
			:loading="loadingPriority"
			class="cdx-image__image"
			:class="imageClasses"
			@load="handleLoad"
			@error="handleError"
		>
		<div
			v-if="!src || ( !isLoaded && !isBroken )"
			class="cdx-image__placeholder"
			:class="placeholderClasses"
			:style="placeholderStyles"
		>
			<cdx-icon
				:icon="cdxIconImage"
				class="cdx-image__placeholder__icon"
				:class="[ iconSizeClass ]"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { cdxIconImage } from '@wikimedia/codex-icons';
import CdxIcon from '../../components/icon/Icon.vue';
import {
	imageAspectRatioValidator,
	ObjectPositions,
	imagePositionValidator,
	ObjectFitOptions,
	objectFitValidator
} from '../../constants';
import { ImageAspectRatio } from '../../types';
import useSplitAttributes from '../../composables/useSplitAttributes';

/**
 * Displays an image with optional aspect ratio and placeholder for loading or error states.
 */
export default defineComponent( {
	name: 'CdxImage',
	components: { CdxIcon },
	/**
	 * We want the image to inherit attributes, not the root element.
	 */
	inheritAttrs: false,
	props: {
		/**
		 * The source URL of the image.
		 */
		src: {
			type: String,
			default: ''
		},
		/**
		 * Alternative text for the image.
		 *
		 * Descriptive text must be provided unless the image is decorative or described elsewhere.
		 */
		alt: {
			type: String,
			required: true,
			default: ''
		},
		/**
		 * The aspect ratio of the image.
		 *
		 * Accepts one of the predefined aspect ratios.
		 */
		aspectRatio: {
			type: String as PropType<ImageAspectRatio>,
			validator: imageAspectRatioValidator,
			default: null
		},
		/**
		 * The object-position of the image when cropping with an aspect ratio.
		 *
		 * Accepts 'top', 'bottom', 'left', 'right', or 'center'.
		 */
		objectPosition: {
			type: String as PropType<typeof ObjectPositions[number]>,
			validator: imagePositionValidator,
			default: 'center'
		},
		/**
		 * Specifies how the image should be resized to fit its container.
		 * Accepts 'fill', 'contain', 'cover', 'none', or 'scale-down'.
		 */
		objectFit: {
			type: String as PropType<typeof ObjectFitOptions[number]>,
			validator: objectFitValidator,
			default: 'cover'
		},
		/**
		 * Image position on a page
		 */
		position: {
			type: String as PropType<
				| 'left'
				| 'center'
				| 'right'
			>,
			default: ''
		},
		/**
		 * The width of the image in pixels.
		 */
		width: {
			type: [ String, Number ],
			default: undefined
		},
		/**
		 * The height of the image in pixels.
		 */
		height: {
			type: [ String, Number ],
			default: undefined
		},
		/**
		 * The loading priority of the image.
		 *
		 * Accepts 'lazy' or 'eager'.
		 */
		loadingPriority: {
			type: String as PropType<'lazy' | 'eager'>,
			default: 'lazy'
		}
	},
	emits: [
		/**
		 * Emitted when an error occurs loading the image.
		 *
		 * @param {Event} event - The error event object.
		 */
		'error'
	],
	setup( props, { emit, attrs } ) {
		/**
		 * Tracks the currently displayed image source.
		 */
		const imageSrc = ref( props.src );

		/**
		 * Indicates whether the image has failed to load.
		 */
		const isBroken = ref( false );

		/**
		 * Indicates whether the image has successfully loaded.
		 */
		const isLoaded = ref( false );

		/**
		 * Computes the classes to apply to the image element.
		 * Includes the base class and conditional classes based on props and state.
		 */
		const imageClasses = computed( (): Record<string, boolean> => ( {
			[ `cdx-image__image--${ props.aspectRatio?.split( ':' ).join( '-' ) }` ]: !!props.aspectRatio,
			[ `cdx-image__image--object-position-${ props.objectPosition }` ]: !!props.objectPosition,
			[ `cdx-image__image--object-fit-${ props.objectFit }` ]: !!props.objectFit,
			'cdx-image__image--is-broken': isBroken.value,
			'cdx-image__image--is-loading': !isLoaded.value && !isBroken.value

		} ) );

		/**
		 * Dynamic classes for the root element.
		 */
		const internalRootClasses = computed( (): Record<string, boolean> => ( {
			[ `cdx-image--${ props.position }` ]: !!props.position
		} ) );

		/**
		 * Get helpers from useSplitAttributes.
		 */
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalRootClasses );

		const placeholderStyles = computed( () => ( {
			width: `${ props.width }px`,
			height: `${ props.height }px`
		} ) );

		/**
		 * Computes the aspect ratio classes to apply to the placeholder element.
		 * Includes conditional classes based on props.
		 */
		const placeholderClasses = computed( (): Record<string, boolean> => ( {
			[ `cdx-image__placeholder--${ props.aspectRatio?.split( ':' ).join( '-' ) }` ]: !!props.aspectRatio
		} ) );

		/**
		 * Handles image loading errors by marking the image as broken and
		 * emitting an error event to notify parent component of image load failures.
		 *
		 * @param event
		 */
		const handleError = ( event: Event ) => {
			isBroken.value = true;
			emit( 'error', event );
		};

		/**
		 * Handles successful image load by setting isLoaded to true.
		 */
		const handleLoad = () => {
			isLoaded.value = true;
		};

		/**
		 * Computes the CSS class for the placeholder icon size based on the image width.
		 *
		 * The mapping is as follows:
		 * — 0 to 32 px: `cdx-icon--size-smallest`
		 * — 33 to 180 px: `cdx-icon--size-small`
		 * — 181 to 280 px: `cdx-icon--size-medium`
		 * — 281 px and above: `cdx-icon--size-large`
		 *
		 * This applies predefined CSS classes to scale the icon, ensuring visual consistency.
		 */
		const iconSizeClass = computed( () => {
			const placeholderWidth = Number( props.width );
			return placeholderWidth <= 32 ?
				'cdx-image__placeholder__icon--size-smallest' :
				placeholderWidth <= 180 ?
					'cdx-image__placeholder__icon--size-small' :
					placeholderWidth <= 280 ?
						'cdx-image__placeholder__icon--size-medium' :
						'cdx-image__placeholder__icon--size-large';
		} );

		return {
			imageSrc,
			isBroken,
			isLoaded,
			imageClasses,
			rootClasses,
			rootStyle,
			otherAttrs,
			placeholderStyles,
			handleError,
			handleLoad,
			cdxIconImage,
			iconSizeClass,
			placeholderClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

@border-cdx-image-error: none;

.cdx-image {
	display: flex;
	align-items: center;
	position: relative;

	&--left {
		justify-content: flex-start;
	}

	&--center {
		justify-content: center;
	}

	&--right {
		justify-content: flex-end;
	}

	&__image {
		display: inline-block;
		flex-grow: 0;
		position: relative;
		min-width: @spacing-150;
		min-height: @spacing-150;
		margin: 0;
		border: @border-subtle;
		border-radius: @border-radius-base;
		font-size: @font-size-x-small;

		&--object-fit-fill {
			object-fit: fill;
		}

		&--object-fit-contain {
			object-fit: contain;
		}

		&--object-fit-cover {
			object-fit: cover;
		}

		&--object-fit-none {
			object-fit: none;
		}

		&--object-fit-scale-down {
			object-fit: scale-down;
		}

		&--object-position-top {
			object-position: top;
		}

		&--object-position-bottom {
			object-position: bottom;
		}

		&--object-position-left {
			object-position: left;
		}

		&--object-position-right {
			object-position: right;
		}

		&--object-position-center {
			object-position: center;
		}

		&--is-broken {
			border: @border-cdx-image-error;
		}

		&--is-loading {
			visibility: hidden;
		}
	}

	&__placeholder {
		background-color: @background-color-interactive-subtle;
		display: flex;
		align-items: center;
		justify-content: center;
		width: @size-full;
		border: @border-subtle;
		border-radius: @border-radius-base;

		&__icon {
			&--size-smallest {
				width: @size-75;
				height: @size-75;
			}

			&--size-small {
				width: @size-125;
				height: @size-125;
			}

			&--size-medium {
				width: @size-200;
				height: @size-200;
			}

			&--size-large {
				width: @size-250;
				height: @size-250;
			}
		}

		&__icon svg {
			fill: @color-placeholder;
		}
	}

	&__image + &__placeholder {
		position: absolute;
	}

	&__image,
	&__placeholder {
		&--16-9 {
			aspect-ratio: 16 / 9;
		}

		&--3-2 {
			aspect-ratio: 3 / 2;
		}

		&--4-3 {
			aspect-ratio: 4 / 3;
		}

		&--1-1 {
			aspect-ratio: 1 / 1;
		}

		&--3-4 {
			aspect-ratio: 3 / 4;
		}

		&--2-3 {
			aspect-ratio: 2 / 3;
		}
	}
}
</style>
