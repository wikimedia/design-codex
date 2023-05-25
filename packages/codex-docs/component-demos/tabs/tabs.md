<script setup>
import { ref, onMounted } from 'vue';
import BasicTabs from '@/../component-demos/tabs/examples/BasicTabs.vue';
import ManyTabs from '@/../component-demos/tabs/examples/ManyTabs.vue';
import DynamicallyGeneratedTabs from '@/../component-demos/tabs/examples/DynamicallyGeneratedTabs.vue';

const controlsConfig = [
	{
		name: 'framed',
		type: 'boolean'
	}
];

const url = ref( null );
const currentCssTabId = ref( '' );

onMounted( () => {
	url.value = new URL( window.location.href );
	url.value.hash = 'css-only-version';
	const searchParams = new URLSearchParams( window.location.search );
	currentCssTabId.value = searchParams.get( 'tab' ) || 'form-tabs-1';
} );
</script>

## Demos
### Basic Example

Two stylistic variants are available, quiet (the default) and framed.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
<basic-tabs v-bind="propValues" />
</template>

<template v-slot:code>

<<< @/../component-demos/tabs/examples/BasicTabs.vue

</template>
</cdx-demo-wrapper>

### Header row scroll

When the width of the header row exceeds the width of its container, arrow buttons will appear to
enable scrolling through tab names.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
<many-tabs v-bind="propValues" />
</template>

<template v-slot:code>

<<< @/../component-demos/tabs/examples/ManyTabs.vue

</template>
</cdx-demo-wrapper>

### Dynamic replacement of slot content

The Tabs component will re-render if the provided slot content changes.
Clicking the button below will replace the initial tabs with a new set;
the header row will update to match.

<cdx-demo-wrapper>
<template v-slot:demo="{ propValues }">
<dynamically-generated-tabs v-bind="propValues" />
</template>

<template v-slot:code>

<<< @/../component-demos/tabs/examples/DynamicallyGeneratedTabs.vue

</template>
</cdx-demo-wrapper>

## CSS-only version

### Markup structure

This no-JS implementation of Tabs requires some logic on the server side to set the current tab:
- On the back end, look for a URL query param indicating the current tab. If there isn't one, choose
  a default tab.
- In the markup or template, set `aria-selected` attributes on the tab list items and `aria-hidden`
  on the tab sections based on the current tab. Codex styles will be applied according to these
  ARIA attributes.
- Add an `aria-activedescendant` attribute to the tabs list `<ul>` that equals the ID of the
  current tab
- Each tab list item contains a hidden form and submit input. When clicked, it will apply the
  specified URL query param, reload the page, and show the new tab.

To disable a tab:
- Add the `disabled` attribute to that tab's submit input

The tabs below have long labels, making the tab list too long for its container. When this happens,
you can horizontally scroll to reach the rest of the tabs list.

:::warning
Keyboard navigation between tabs can only be done via the Tab key. Arrow keys will not work here.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper div. -->
	<div class="cdx-tabs">
		<!-- Header with tab list. -->
		<div class="cdx-tabs__header">
			<!-- List of tabs. -->
			<ul class="cdx-tabs__list" role="tablist" :aria-activedescendant="currentCssTabId">
				<!-- Tab list item. -->
				<li id="form-tabs-1-label" class="cdx-tabs__list__item" role="presentation">
					<!-- Form with a hidden input. When the tab is clicked, the input will submit
					the form and add the tab name as a URL query param. -->
					<form method="get" :action="url">
						<!-- Submit input, which will be visually hidden via CSS. -->
						<input id="form-tabs-1-input" class="cdx-tabs__submit" type="submit" name="tab" value="form-tabs-1">
						<!-- Label with tab name. -->
						<label for="form-tabs-1-input" role="tab" :aria-selected="currentCssTabId === 'form-tabs-1'">
							Tab number one
						</label>
					</form>
				</li>
				<li id="form-tabs-2-label" class="cdx-tabs__list__item" role="presentation">
					<form method="get" :action="url">
						<input id="form-tabs-2-input" class="cdx-tabs__submit" type="submit" name="tab" value="form-tabs-2">
						<label for="form-tabs-2-input" role="tab" :aria-selected="currentCssTabId === 'form-tabs-2'">
							Tab number two with a longer label
						</label>
					</form>
				</li>
				<!-- Disabled tab's list item has the `cdx-tabs__list__item--disabled` class. -->
				<li id="form-tabs-3-label" class="cdx-tabs__list__item" role="presentation">
					<form method="get" :action="url">
						<!-- `disabled` attribute means this tab cannot be selected. -->
						<input id="form-tabs-3-input" class="cdx-tabs__submit" type="submit" name="tab" value="form-tabs-3" disabled>
						<label for="form-tabs-3-input" role="tab" :aria-selected="currentCssTabId === 'form-tabs-3'" :aria-disabled="true">
							Tab number three
						</label>
					</form>
				</li>
				<li id="form-tabs-4-label" class="cdx-tabs__list__item" role="tab">
					<form method="get" :action="url">
						<input id="form-tabs-4-input" class="cdx-tabs__submit" type="submit" name="tab" value="form-tabs-4">
						<label for="form-tabs-4-input" role="tab" :aria-selected="currentCssTabId === 'form-tabs-4'">
							Tab number four
						</label>
					</form>
				</li>
			</ul>
		</div>
		<!-- Tabs. -->
		<div class="cdx-tabs__content">
			<!-- <section> element for each tab, with any content inside. -->
			<section id="form-tabs-1" :aria-hidden="currentCssTabId !== 'form-tabs-1'" aria-labelledby="form-tabs-1-label" class="cdx-tab" role="tabpanel" tabindex="-1">
				Tab 1 content
			</section>
			<section id="form-tabs-2" :aria-hidden="currentCssTabId !== 'form-tabs-2'" aria-labelledby="form-tabs-2-label" class="cdx-tab" role="tabpanel" tabindex="-1">
				Tab 2 content
			</section>
			<section id="form-tabs-3" :aria-hidden="currentCssTabId !== 'form-tabs-3'" aria-labelledby="form-tabs-3-label" class="cdx-tab" role="tabpanel" tabindex="-1">
				Tab 3 content
			</section>
			<section id="form-tabs-4" :aria-hidden="currentCssTabId !== 'form-tabs-4'" aria-labelledby="form-tabs-4-label" class="cdx-tab" role="tabpanel" tabindex="-1">
				Tab 4 content
			</section>
		</div>
	</div>
</template>
<template v-slot:code>

```html-vue
<!-- Wrapper div. -->
<div class="cdx-tabs">
	<!-- Header with tab list. -->
	<div class="cdx-tabs__header">
		<!-- List of tabs. -->
		<ul
			class="cdx-tabs__list"
			role="tablist"
			aria-activedescendant="{{ currentCssTabId }}"
		>
			<!-- Tab list item. -->
			<li
				id="form-tabs-1-label"
				class="cdx-tabs__list__item"
				role="presentation"
			>
				<!-- Form with a hidden input. When the tab is clicked, the input will
				     submit the form and add the tab name as a URL query param. -->
				<form
					method="get"
					action="{{ url }}"
				>
					<!-- Submit input, which will be visually hidden via CSS. -->
					<input
						id="form-tabs-1-input"
						class="cdx-tabs__submit"
						type="submit"
						name="tab"
						value="form-tabs-1"
					>
					<!-- Label with tab name. -->
					<label
						for="form-tabs-1-input"
						role="tab"
						aria-selected="{{ currentCssTabId === 'form-tabs-1' }}"
					>
						Tab number one
					</label>
				</form>
			</li>
			<li
				id="form-tabs-2-label"
				class="cdx-tabs__list__item"
				role="presentation"
			>
				<form
					method="get"
					action="{{ url }}"
				>
					<input
						id="form-tabs-2-input"
						class="cdx-tabs__submit"
						type="submit"
						name="tab"
						value="form-tabs-2"
					>
					<label
						for="form-tabs-2-input"
						role="tab"
						aria-selected="{{ currentCssTabId === 'form-tabs-2' }}"
					>
						Tab number two with a longer label
					</label>
				</form>
			</li>
			<!-- Disabled tab's list item has the `cdx-tabs__list__item--disabled` class. -->
			<li
				id="form-tabs-3-label"
				class="cdx-tabs__list__item cdx-tabs__list__item--disabled"
				role="presentation"
			>
				<form
					method="get"
					action="{{ url }}"
				>
					<!-- `disabled` attribute means this tab cannot be selected. -->
					<input
						id="form-tabs-3-input"
						class="cdx-tabs__submit"
						type="submit"
						name="tab"
						value="form-tabs-3"
						disabled
					>
					<label
						for="form-tabs-3-input"
						role="tab"
						aria-selected="{{ currentCssTabId === 'form-tabs-3' }}"
					>
						Tab number three
					</label>
				</form>
			</li>
			<li
				id="form-tabs-4-label"
				class="cdx-tabs__list__item"
				role="presentation"
			>
				<form
					method="get"
					action="{{ url }}"
				>
					<input
						id="form-tabs-4-input"
						class="cdx-tabs__submit"
						type="submit"
						name="tab"
						value="form-tabs-4"
					>
					<label
						for="form-tabs-4-input"
						role="tab"
						aria-selected="{{ currentCssTabId === 'form-tabs-4' }}"
					>
						Tab number four
					</label>
				</form>
			</li>
		</ul>
	</div>
	<!-- Tabs. -->
	<div class="cdx-tabs__content">
		<!-- <section> element for each tab, with any content inside. -->
		<section
			id="form-tabs-1"
			aria-hidden="{{ currentCssTabId !== 'form-tabs-1' }}"
			aria-labelledby="form-tabs-1-label"
			class="cdx-tab"
			role="tabpanel"
			tabindex="-1"
		>
			Tab 1 content
		</section>
		<section
			id="form-tabs-2"
			aria-hidden="{{ currentCssTabId !== 'form-tabs-2' }}"
			aria-labelledby="form-tabs-2-label"
			class="cdx-tab"
			role="tabpanel"
			tabindex="-1"
		>
			Tab 2 content
		</section>
		<section
			id="form-tabs-3"
			aria-hidden="{{ currentCssTabId !== 'form-tabs-3' }}"
			aria-labelledby="form-tabs-3-label"
			class="cdx-tab"
			role="tabpanel"
			tabindex="-1"
		>
			Tab 3 content
		</section>
		<section
			id="form-tabs-4"
			aria-hidden="{{ currentCssTabId !== 'form-tabs-4' }}"
			aria-labelledby="form-tabs-4-label"
			class="cdx-tab"
			role="tabpanel"
			tabindex="-1"
		>
			Tab 4 content
		</section>
	</div>
</div>
```

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

// Override VitePress styles.
// TODO: remove this once T296106 is complete.
.cdx-demo-wrapper {
	:deep( li + li ) {
		margin-top: 0;
	}

	:deep( h2 ) {
		margin: 0 0 @spacing-150;
		border-top: 0;
		border-bottom: 1px solid #c8ccd1;
		padding-bottom: @spacing-25;
	}

	:deep( h3 ) {
		margin-top: 0;
	}

	/* stylelint-disable-next-line selector-class-pattern */
	:deep( .language-html code ) {
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		tab-size: 2;
	}
}
</style>
