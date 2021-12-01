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
			:aria-hidden="!iconLabel"
		>
			<title v-if="iconLabel">{{ iconLabel }}</title>
			<!-- eslint-disable vue/no-v-html -->
			<g
				v-if="iconSvg"
				fill="currentColor"
				v-html="iconSvg"
			/>
			<!-- eslint-enable vue/no-v-html -->
			<path
				v-else
				:d="iconPath"
				fill="currentColor"
			/>
		</svg>
	</span>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { Icon } from 'icons';
import { resolveIcon, shouldIconFlip } from 'icons';
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
// TODO: Remove references to wikimedia-ui-base once we have
// the proper tokens in place
@import 'wikimedia-ui-base/wikimedia-ui-base.less';

.cdx-icon {
	// Set the default icon color; callers that want a different color should override this rule.
	color: @color-base;
	// Maintain an inline outer element while using flexbox to center the SVG
	// and avoid extra space around the image.
	display: inline-flex; /* stylelint-disable-line plugin/no-unsupported-browser-features */
	align-items: center;
	justify-content: center;
	// Vertically align surrounding text in inline, inline-block, and table contexts. */
	vertical-align: text-bottom;

	// Horizontally flip icons that should be flipped for RTL languages.
	&--flipped svg {
		transform: scaleX( -1 );
	}
}
</style>
