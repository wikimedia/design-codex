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

Tabs consist of two or more tab items created for navigating between different sections of content.

<cdx-demo-wrapper :controls-config="controlsConfig" :allow-link-styles="true">
<template v-slot:demo="{ propValues }">
	<basic-tabs v-bind="propValues" />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/tabs/examples/BasicTabs.vue [NPM]

<<< @/../component-demos/tabs/examples-mw/BasicTabs.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Overview

### When to use Tabs

Use Tabs to navigate between different sections of content on the page. For
filtering information on the screen or switching between views, use a
[ToggleButtonGroup](./toggle-button-group.md) instead. Tabs can be visually
styled as framed or quiet (by default). Framed Tabs should only be used when
appearing within a box or module.

Avoid using Tabs to structure content meant to be consumed sequentially, like
the sections within an article page.

### About Tabs

The Tabs component always contains two or more [Tab](./tab.md) items. Each Tab
will display different sections within the same context. For example, Tabs can
display different edit views or topics.

Tabs includes the following elements.

#### Selected tab

Within the Tabs component, only one tab item can be selected at a time.

#### Unselected tab

The remaining tab items will remain unselected. Users can choose these tabs by
clicking on them or navigating to them via the keyboard’s arrow keys.

#### Scroll button(s)

When there are many tab items or limited space, arrow buttons will appear to
allow scrolling to all of the tab items.

## Examples

### Header row scroll

When the width of the header row exceeds the width of its container, arrow
buttons will appear to enable scrolling through Tab items.

<cdx-demo-wrapper>
<template v-slot:demo="{ propValues }">
	<many-tabs v-bind="propValues" />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/tabs/examples/ManyTabs.vue [NPM]

<<< @/../component-demos/tabs/examples-mw/ManyTabs.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Technical implementation

### Vue usage

One or more [Tab](./tab.md) components must be provided in the default slot of
the Tabs component. Each child Tab component must have a `name` property. By
default, the first tab will be active when the component renders.

#### Optional 2-way binding of active tab

Optionally, the active tab can be bound in the parent scope using `v-model:active`.
This is useful in situations where the Tabs need the ability to render with a Tab
other than the first in the active state and is recommended if tabs are meant to
respond to URL params. The value of `v-model:active` should correspond to the `name`
property of the active tab.

### CSS-only version

#### Markup structure

The non-JS version of the Tabs component should be seen as a navigational tool.
It relies on HTML form submission to trigger a change in the current active tab.
When the user clicks on a tab button (or hits <kbd>Enter</kbd> while tab button is focused),
the browser will load a new page.

##### Basic setup:

- The outermost element should be a `<div>` element with the class `"cdx-tabs"`.
- The `cdx-tabs__header` element should be a `<form>` with the following attributes:
  - `method="get"`: we will send the form with a GET request
  - `action="myURL"`: The value of `action` should be whatever URL the form data
	will be sent to; in this example it's simply the same URL as the page, but
	appended with a different URL query parameter based on the user's tab selection.
	In a real-world use-case, this might be a URL that can accept query parameters
	(say for performing a different kind of search based on which tab the user
	selects).
- Within the `tablist` element, every tab label is represented by a `<button>` element (this is
  the same as in the Vue version). However, since we are submitting the data as a form, each
  tab button must contain a `name` and a `value` attribute. In a real application, this might
  correspond to key-value pairs used for a given query parameter.
- The tab corresponding to the current view should contain the `aria-selected="true"` attribute.
  All other tabs should have `aria-selected="false"`. If you are using a server-side templating
  language like Mustache, this should be set there.
- Each tab should also have an `aria-controls` attribute  with a value of the ID
  of the corresponding `tabpanel`.
- Don't mess with `<button>` `tabindex` – since the CSS-only version of this component has no way to bind
  left and right arrow keys to handler methods, the user is going to need to rely on the mouse
  or the <kbd>tab</kbd> key to navigate between tabs.
- To disable a tab, simply add a `disabled` attribute to that tab's `<button>` in the tablist.

The Tabs below have long labels, making the tab list too long for its container. When this happens,
you can horizontally scroll to reach the rest of the Tabs list.

:::warning
Keyboard navigation between tabs can only be done via the <kbd>tab</kbd> key. Arrow keys will not work here.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
	<!-- Wrapper div. -->
	<div class="cdx-tabs">
		<!-- Header with tab list. -->
		<form class="cdx-tabs__header" method="get" :action="url">
			<!-- List of tabs. -->
			<div class="cdx-tabs__list" role="tablist">
				<!-- Tab list item. -->
				<button
					id="form-tabs-1-label"
					class="cdx-tabs__list__item"
					role="tab"
					:aria-selected="currentCssTabId === 'form-tabs-1'"
					aria-controls="form-tabs-1"
					value="form-tabs-1"
					name="tab"
				>
					Tab number one
				</button>
				<button
					id="form-tabs-2-label"
					class="cdx-tabs__list__item"
					role="tab"
					:aria-selected="currentCssTabId === 'form-tabs-2'"
					aria-controls="form-tabs-2"
					value="form-tabs-2"
					name="tab"
				>
					Tab number two with a longer label
				</button>
				<button
					id="form-tabs-3-label"
					class="cdx-tabs__list__item"
					role="tab"
					:aria-selected="currentCssTabId === 'form-tabs-3'"
					aria-controls="form-tabs-3"
					value="form-tabs-3"
					name="tab"
					disabled
				>
					Tab number three
				</button>
				<button
					id="form-tabs-4-label"
					class="cdx-tabs__list__item"
					role="tab"
					:aria-selected="currentCssTabId === 'form-tabs-4'"
					aria-controls="form-tabs-4"
					value="form-tabs-4"
					name="tab"
				>
					Tab number four
				</button>
			</div>
		</form>
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
		<!-- Header with tab buttons -->
		<form class="cdx-tabs__header" method="get" action="{{ url }}">
			<!-- List of tabs. -->
			<div class="cdx-tabs__list" tabindex="-1" role="tablist">
				<!-- Tab list item. -->
				<button
					id="form-tabs-1-label"
					class="cdx-tabs__list__item"
					role="tab"
					aria-selected="{{ currentCssTabId === 'form-tabs-1' }}"
					aria-controls="form-tabs-1"
					value="form-tabs-1"
					name="tab"
				>
					Tab number one
				</button>
				<button
					id="form-tabs-2-label"
					class="cdx-tabs__list__item"
					role="tab"
					aria-selected="{{ currentCssTabId === 'form-tabs-2' }}"
					aria-controls="form-tabs-2"
					value="form-tabs-2"
					name="tab"
				>
					Tab number two with a longer label
				</button>
				<button
					id="form-tabs-3-label"
					class="cdx-tabs__list__item"
					role="tab"
					aria-selected="{{ currentCssTabId === 'form-tabs-3' }}"
					aria-controls="form-tabs-3"
					value="form-tabs-3"
					name="tab"
					disabled
				>
					Tab number three
				</button>
				<button
					id="form-tabs-4-label"
					class="cdx-tabs__list__item"
					role="tab"
					aria-selected="{{ currentCssTabId === 'form-tabs-4' }}"
					aria-controls="form-tabs-4"
					value="form-tabs-4"
					name="tab"
				>
					Tab number four
				</button>
			</div>
		</form>
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

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next interactive element in tab order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous interactive element. |
| <kbd>Left arrow</kbd> / <kbd>Right arrow</kbd> | When focusing on a Tab item, the arrow keys navigate between the rest of Tab items. |