<template>
	<h1>Did you know?</h1>
	<ul>
		<li>
			... that in 1994
			<a
				:ref="el => triggerElements[ 0 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Kazuyoshi_Akiyama"
				title="Kazuyoshi Akiyama"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Kazuyoshi Akiyama
			</a>
			conducted the
			<a
				:ref="el => triggerElements[ 1 ] = el"
				class="cdx-docs-link"
				href="https://en.wikipedia.org/wiki/Tokyo_Symphony_Orchestra"
				title="Tokyo Symphony Orchestra"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Tokyo Symphony Orchestra
			</a>
			in the first performance of Schoenberg's
			<a
				:ref="el => triggerElements[ 2 ] = el"
				class="cdx-docs-link cdx-docs-link-italic"
				href="https://en.wikipedia.org/wiki/Moses_und_Aron"
				title="Moses und Aron"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Moses und Aron
			</a>
			with Japanese musicians?
		</li>

		<li>
			... that the impact of the
			<a
				:ref="el => triggerElements[ 3 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Charlottetown_meteorite"
				title="Charlottetown meteorite"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Charlottetown meteorite
			</a>
			was the first to be recorded on video and audio?
		</li>

		<li>
			... that the
			<a
				:ref="el => triggerElements[ 4 ] = el"
				class="cdx-docs-link"
				href="https://en.wikipedia.org/wiki/Fun_Lounge_police_raid"
				title="Fun Lounge police raid"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Fun Lounge police raid
			</a>
			is considered the main cause for the formation of
			<a
				:ref="el => triggerElements[ 5 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Mattachine_Midwest"
				title="Mattachine Midwest"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Mattachine Midwest
			</a>
			, a gay rights group in Chicago?
		</li>

		<li>
			... that
			<a
				:ref="el => triggerElements[ 6 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/The_8-Bit_Big_Band"
				title="The 8-Bit Big Band"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				the 8-Bit Big Band
			</a>
			won Nintendo their first Grammy Award?
		</li>

		<li>
			... that a person required intensive care after being
			<a
				:ref="el => triggerElements[ 7 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Salt_water_aspiration_syndrome"
				title="Salt water aspiration syndrome"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				splashed with salt water
			</a>
			by a beluga whale?
		</li>

		<li>
			... that
			<a
				:ref="el => triggerElements[ 8 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Alia_Fischer"
				title="Alia Fischer"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Alia Fischer
			</a>
			led the first women's college basketball team to achieve back-to-back
			undefeated seasons?
		</li>
	</ul>

	<cdx-popover
		v-model:open="isOpen"
		:anchor="currentTrigger"
		:render-in-place="true"
		:title="currentTitle"
	>
		{{ currentPreview }}
	</cdx-popover>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxPopover } from '@wikimedia/codex';
import articlePreviews from './article-previews.json';

export default defineComponent( {
	name: 'PopoverArticlePreview',
	components: {
		CdxPopover
	},
	setup() {
		// Provide a template ref for the trigger element to properly position the Popover.
		// Store multiple template refs for anchor tags.
		const triggerElements = ref( [] );
		// Currently hovered anchor tag.
		const currentTrigger = ref( null );
		const currentTitle = ref( '' );
		const currentPreview = ref( '' );

		// Control popover's visibility.
		const isOpen = ref( false );

		// Open the Popover on hover/focus.
		const openPopover = function ( event ) {
			// eslint-disable-next-line no-console
			console.log( 'The title hovered or focused is:', event.target.title );
			const title = event.target.title;
			const foundArticle = articlePreviews.find( ( article ) => article.title === title );
			currentTrigger.value = event.target;
			currentTitle.value = foundArticle.title;
			currentPreview.value = foundArticle.preview;
			isOpen.value = true;
		};

		const closePopover = function () {
			isOpen.value = false;
		};

		return {
			isOpen,
			triggerElements,
			openPopover,
			closePopover,
			currentTitle,
			currentPreview,
			currentTrigger
		};
	}
} );
</script>

<style lang="less" scoped>
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();

	&-bold {
		font-weight: @font-weight-bold;
	}

	&-italic {
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		font-style: italic;
	}
}

h1 {
	margin: @spacing-50 0;
	border: @border-base;
	padding: @spacing-12 @spacing-35;
	font-size: @font-size-x-large;
	font-weight: @font-weight-bold;
}
</style>
