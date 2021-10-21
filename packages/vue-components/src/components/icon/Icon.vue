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
import { defineComponent, PropType, ref, computed, onMounted } from 'vue';
import { Icon } from 'icons';
import { resolveIcon, shouldIconFlip } from 'icons';

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
			type: String as PropType<'ltr' | 'rtl' | null>,
			default: null
		}
	},
	emits: [ 'click' ],
	setup( props, { emit } ) {
		const rootElement = ref<HTMLSpanElement>();

		const ancestorDir = ref( '' );
		const ancestorLang = ref( '' );
		onMounted( () => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const root = rootElement.value!;

			// Get the direction and language that we inherited when we were mounted
			// For direction, we can compute the 'direction' CSS property
			const computedStyle = window.getComputedStyle( root );
			ancestorDir.value = computedStyle.direction || 'ltr';

			// There's no equivalent CSS property for language, so we have to traverse up the tree
			// until we find an ancestor with the 'lang' attribute set
			let ancestor : HTMLElement | null = root;
			while ( ancestor && ancestor.lang === '' ) {
				ancestor = ancestor.parentElement;
			}
			ancestorLang.value = ancestor ? ancestor.lang : '';
		} );

		// Use the dir and lang set in the props if they are set, or the ancestor ones otherwise
		const resolvedDir = computed( () => props.dir === null ? ancestorDir.value : props.dir );
		const resolvedLang = computed( () =>
			props.lang === null ? ancestorLang.value : props.lang
		);

		const rootClasses = computed( () => ( {
			'cdx-icon--flipped': shouldIconFlip( props.icon, resolvedLang.value ) && resolvedDir.value === 'rtl'
		} ) );

		const resolvedIcon = computed( () =>
			resolveIcon( props.icon, resolvedLang.value, resolvedDir.value )
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

<style lang="postcss">
/*
 * TODO: Remove references to wikimedia-ui-base once we have
 * the proper tokens in place
 */
@import 'wikimedia-ui-base/wikimedia-ui-base.css';

.cdx-icon {
	/* Set the default icon color; callers that want a different color should override this rule */
	color: var( --color-base );
	/*
	Maintain an inline outer element while using flexbox to center the SVG
	and avoid extra space around the image.
	*/
	display: inline-flex; /* stylelint-disable-line plugin/no-unsupported-browser-features */
	align-items: center;
	justify-content: center;
	/*  For inline, inline-block, and table layouts. */
	vertical-align: middle;
}

/* Horizontally flip icons that should be flipped for RTL languages. */
.cdx-icon--flipped svg {
	transform: scaleX( -1 );
}
</style>
