<template>
	<span
		ref="rootElement"
		class="cdx-icon"
		:class="rootClasses"
		@click="onClick"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
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
import { HTMLDirection } from '../../types';

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
		}
	},
	emits: [ 'click' ],
	setup( props, { emit } ) {
		const rootElement = ref<HTMLSpanElement>();

		const computedDir = useComputedDirection( rootElement );
		const computedLang = useComputedLanguage( rootElement );
		const overriddenDir = computed( () => props.dir || computedDir.value );
		const overriddenLang = computed( () => props.lang || computedLang.value );

		const rootClasses = computed( () => ( {
			'cdx-icon--flipped': overriddenDir.value === 'rtl' && overriddenLang.value !== null &&
				shouldIconFlip( props.icon, overriddenLang.value )
		} ) );

		const resolvedIcon = computed( () =>
			resolveIcon( props.icon, overriddenLang.value || '', overriddenDir.value || 'ltr' )
		);
		const iconSvg = computed( () => typeof resolvedIcon.value === 'string' ? resolvedIcon.value : '' );
		const iconPath = computed( () => typeof resolvedIcon.value !== 'string' ? resolvedIcon.value.path : '' );

		const onClick = ( event: Event ) => {
			emit( 'click', event );
		};

		return {
			rootElement,
			rootClasses,
			iconSvg,
			iconPath,
			onClick
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
	// Set the default icon size; callers that want a different size should override the
	// following rules.
	min-width: @min-size-icon;
	min-height: @min-size-icon;
	// Icons must scale with font size to maintain vertical alignment with the
	// first line of message text.
	width: @size-icon;
	height: @size-icon;
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

	// Horizontally flip icons that should be flipped for RTL languages.
	&--flipped svg {
		transform: scaleX( -1 );
	}
}
</style>
