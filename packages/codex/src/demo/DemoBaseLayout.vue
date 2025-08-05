<template>
	<!--
		Output a wrapper `<div>` element. with the dir attribute. This has to be separate from the
		cdx-sandbox `<div>`, otherwise CSS styles don't work because the selector
		`[dir] .cdx-sandbox` doesn't match.
	-->
	<div
		:key="dir"
		:dir="dir"
	>
		<div
			class="cdx-demo"
			:class="rootClasses"
			v-bind="$attrs"
		>
			<header v-if="$slots.header" class="cdx-demo__header">
				<h1>
					<slot name="header" />
				</h1>
				<div class="cdx-dark-mode-toggle">
					<cdx-toggle-switch v-model="darkMode">
						Dark mode
					</cdx-toggle-switch>
				</div>
				<div class="cdx-direction-switcher">
					<direction-switcher v-model="dir" />
				</div>
			</header>
			<div class="cdx-demo__body">
				<main v-if="$slots.content" class="cdx-demo__content">
					<slot name="content" />
				</main>
				<nav v-if="$slots.sideNav" class="cdx-demo__nav">
					<div class="cdx-demo__nav__inner">
						<slot name="sideNav" />
					</div>
				</nav>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { HTMLDirection } from '../types';
import CdxToggleSwitch from '../components/toggle-switch/ToggleSwitch.vue';
import DirectionSwitcher from './DirectionSwitcher.vue';

defineOptions( {
	inheritAttrs: false
} );

// Start with dark mode off by default;
// or on by default if the ?darkmode query string param is set.
const darkMode = ref( new URLSearchParams( window.location.search ).has( 'darkmode' ) );
const dir = ref<HTMLDirection>( 'ltr' );

const rootClasses = computed( () => ( {
	'cdx-demo--dark': darkMode.value
} ) );

</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
// Import CSS vars
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui-root.css';
// Import dark mode mixin
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui-mixin-dark.less';
// Import typography mixin
@import ( reference ) '../codex/src/themes/mixins/public/typography.less';

// Apply dark mode variables if the dark mode toggle is enabled.
// Because dialogs are teleported outside of the cdx-demo div, apply the variables to the entire
// document, not just `div.cdx-demo`.
/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
:root:has( .cdx-demo--dark ) {
	.cdx-mode-dark();
}

@height-demo-header: 4rem;
@width-demo-sidebar: 20rem;
@scroll-padding-top-demo: calc( @height-demo-header + @spacing-100 );

// Apply typography mixin.
.cdx-mixin-typography();

html {
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
	scroll-behavior: smooth;
	scroll-padding-top: @scroll-padding-top-demo;
}

body {
	// Set background-color and color to base values so that they get inverted in dark mode.
	// Prevent RTLCSS from prefixing this selector with `[dir]`, which breaks it; for some reason
	// it does that for background-color even though that's not a direction-sensitive property.
	/* rtl:ignore */
	background-color: var( --background-color-base );
	color: var( --color-base );
	margin: 0;
}

.cdx-demo {
	display: flex;
	flex-direction: column;
	font-family: @font-family-base;

	&__header {
		background-color: @background-color-base;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: @spacing-100;
		position: sticky;
		top: 0;
		z-index: @z-index-sticky;
		box-sizing: @box-sizing-base;
		height: @height-demo-header;
		border-bottom: @border-base;
		padding: @spacing-100;

		h1 {
			display: inline-flex;
			flex-grow: 1;
			margin-top: 0;
			margin-bottom: 0;

			@media ( max-width: @max-width-breakpoint-mobile ) {
				font-size: @font-size-x-large;
				line-height: @line-height-large;
			}
		}

		.cdx-direction-switcher {
			display: inline-flex;
		}
	}

	&__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		padding: @spacing-100;

		@media ( min-width: @min-width-breakpoint-tablet ) {
			flex-direction: row;
		}
	}

	&__content {
		flex: 1;

		&__sectioning {
			margin-bottom: @spacing-100;
		}
	}

	&__nav {
		flex: 1;
		order: -1;
		margin-bottom: @spacing-200;

		@media ( min-width: @min-width-breakpoint-tablet ) {
			flex: 0 0 @width-demo-sidebar;
			flex-direction: row;
		}

		&__inner {
			position: sticky;
			top: @scroll-padding-top-demo;

			ul {
				list-style: none;
				margin: 0;
				padding: 0;
				line-height: @line-height-medium;
			}
		}
	}
}
</style>
