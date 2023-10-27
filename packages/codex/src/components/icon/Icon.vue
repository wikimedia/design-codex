<template>
	<span
		ref="rootElement"
		class="cdx-icon"
		:class="rootClasses"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			:aria-hidden="iconLabel ? undefined : true"
		>
			<title v-if="iconLabel">{{ iconLabel }}</title>
			<!-- eslint-disable vue/no-v-html -->
			<g
				v-if="iconSvg"
				v-html="iconSvg"
			/>
			<!-- eslint-enable vue/no-v-html -->
			<path
				v-else
				:d="iconPath"
			/>
		</svg>
	</span>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { Icon, resolveIcon, shouldIconFlip } from '@wikimedia/codex-icons';
import useComputedDirection from '../../composables/useComputedDirection';
import useComputedLanguage from '../../composables/useComputedLanguage';
import { HTMLDirection, IconSize } from '../../types';

// Icon Sizes as types
import { IconSizes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
const iconSizeValidator = makeStringTypeValidator( IconSizes );

/**
 * A container for static SVG icon content.
 */
export default defineComponent( {
	name: 'CdxIcon',
	props: {
		/** The SVG path or an object containing that path plus other data. */
		icon: {
			type: [ String, Object ] as PropType<Icon>,
			required: true
		},
		/**
		 * Accessible label for the icon. If not included, the icon will be hidden from screen
		 * readers via `aria-hidden="true"`. Browsers also display this label as a tooltip when the
		 * user hovers over the icon. Note that this label is not rendered as visible text next
		 * to the icon.
		 */
		iconLabel: {
			type: String,
			default: ''
		},
		/**
		 * Explicitly set the language code to use for the icon. See
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang.
		 * Defaults to the lang attribute of the nearest ancestor at mount time.
		 */
		lang: {
			type: String as PropType<string | null>,
			default: null
		},
		/**
		 * Explicitly set the direction to use for the icon. See
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir.
		 * Defaults to the computed direction at mount time.
		 */
		dir: {
			type: String as PropType<HTMLDirection|null>,
			default: null
		},
		/**
		 * Specify icon size by choosing one of several pre-defined size
		 * options. See the type documentation for supported size options.
		 * The `medium` size is used by default if no size prop is provided.
		 */
		size: {
			type: String as PropType<IconSize>,
			default: 'medium',
			validator: iconSizeValidator
		}
	},
	setup( props ) {
		const rootElement = ref<HTMLSpanElement>();

		const computedDir = useComputedDirection( rootElement );
		const computedLang = useComputedLanguage( rootElement );
		const overriddenDir = computed( () => props.dir ?? computedDir.value );
		const overriddenLang = computed( () => props.lang ?? computedLang.value );

		const rootClasses = computed( () => {
			return {
				'cdx-icon--flipped': overriddenDir.value === 'rtl' && overriddenLang.value !== null &&
					shouldIconFlip( props.icon, overriddenLang.value ),
				[ `cdx-icon--${props.size}` ]: true
			};
		} );

		const resolvedIcon = computed( () =>
			resolveIcon( props.icon, overriddenLang.value ?? '', overriddenDir.value ?? 'ltr' )
		);
		const iconSvg = computed( () => typeof resolvedIcon.value === 'string' ? resolvedIcon.value : '' );
		const iconPath = computed( () => typeof resolvedIcon.value !== 'string' ? resolvedIcon.value.path : '' );

		return {
			rootElement,
			rootClasses,
			iconSvg,
			iconPath
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-icon {
	// Set the default icon color; callers that want a different color should override this rule.
	color: @color-base;
	// Maintain an inline outer element while using flexbox to center the SVG
	// and avoid extra space around the image.
	display: inline-flex;
	align-items: center;
	justify-content: center;
	// Vertically align surrounding text in inline, inline-block, and table contexts. */
	vertical-align: text-bottom;

	svg {
		// Note, that CSS is generally case-insensitive, so `currentColor` becomes `currentcolor`.
		// See also https://github.com/stylelint/stylelint/issues/5863.
		fill: currentcolor;
		// Ensure that baked-into SVG width and height is overridden to scale accordingly to
		// `.cdx-icon` rule.
		width: @size-full;
		height: @size-full;
	}

	&--x-small {
		min-width: @min-size-icon-x-small;
		min-height: @min-size-icon-x-small;
		width: @size-icon-x-small;
		height: @size-icon-x-small;
	}

	&--small {
		min-width: @min-size-icon-small;
		min-height: @min-size-icon-small;
		width: @size-icon-small;
		height: @size-icon-small;
	}

	&--medium {
		min-width: @min-size-icon-medium;
		min-height: @min-size-icon-medium;
		width: @size-icon-medium;
		height: @size-icon-medium;
	}

	// Horizontally flip icons that should be flipped for RTL languages.
	&--flipped svg {
		transform: scaleX( -1 );
	}
}
</style>
