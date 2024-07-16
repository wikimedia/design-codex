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

## Guidelines

### When to use tabs

Each tab will display different sections within the same context. For example,
tabs can display different sections of an article, different topics or different
edit views.

Use Tabs to navigate between different sections of content on the page. For filtering information on the screen or switching between views, use a [ToggleButtonGroup](./toggle-button-group.md) instead.

### Specifications
The Tabs component always contains two or more [Tab](./tab.md) items.

![Specification of Tab items.](../../assets/components/tabs-specifications.svg)

Tabs include the following elements:
1. **Selected tab**<br>Within the tabs component, only one tab item can be selected at a time.
2. **Unselected tabs**<br>The remaining tab items will remain unselected. Users can choose these tabs by clicking on them or navigating to them via the keyboard’s arrow keys.
3. **Arrow button**<br>When tabs become scrollable, one or two icon-only buttons will appear. The number of buttons to scroll tabs will vary based on the tabs' scroll position. Users can utilize these buttons to navigate through the scrollable tabs.

#### Component limitations

Each Tabs component will contain a minimum of 2 tab items. There is no maximum limit to the number of tab items per Tabs.

The maximum width for each tab item is `@size-1600` (equivalent to `256px` in the default Codex theme), with an ellipsis appearing if the text exceeds this length.

When there is not enough space to display all tabs, scrolling will be activated. When the scroll is enabled, the positions of the tabs will be indicated by arrow
buttons:

1. **Initial position**: Due to the tabs being in the first position, only the end arrow button will be visible at the end to scroll the tabs.
2. **Middle position**: Both the start and end arrow buttons will be visible.
3. **End position**: As scrolling reaches the end, only the start arrow will be visible in order to scroll the tabs from the end to the beginning.

![Scrollable Tabs with arrows indicating scroll-ability.](../../assets/components/tabs-specifications-scroll.svg)

Refer to the [Tabs component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=4971-50287&mode=design&t=f8EVGD6DzdL13XdN-0).

### Types
Depending on the tabs' style and where they are employed, there are two types of tabs:

#### Quiet tabs
These tabs feature a transparent background with a Gray400 underline to
delineate the tabs base. The selected tab is highlighted in blue with a blue
line underneath. These tabs are intended for use on open white backgrounds, and
it is not recommended to use them within boxes or modules.

![Example of quiet Tabs.](../../assets/components/tabs-types-quiet.svg)

#### Framed tabs
These tabs have a Gray200 background, with the selected tab appearing in white.
They are designed to be used within boxes or modules, where the gray background
serves as a head for the box. It is not recommended to use framed tabs outside
of a box context; in such cases, use the quiet tabs instead.

![Example of framed Tabs.](../../assets/components/tabs-types-framed.svg)

### Interaction states
The Tabs component itself does not have distinct states. Instead, individual
states will be attributed to each Tab item.

![Tabs with the first tab item selected and the third one in a hover state.](../../assets/components/tabs-interaction-states.svg)

### Best practices

Consider the following recommendations when using Tabs.

<cdx-demo-rules>

<template #do-media>

![Tabs with its items navigating to related content.](../../assets/components/tabs-best-practices-do.svg)

</template>

<template #do-text>

- Use Tabs to navigate between various sections of related content.

</template>

<template #dont-media>

![Tabs with its items navigating to sections of the same page.](../../assets/components/tabs-best-practices-dont.svg)

</template>

<template #dont-text>

- Use Tabs to structure content meant to be consumed sequentially, like the sections within an article page.

</template>

</cdx-demo-rules>

<cdx-demo-rules>

<template #do-media>

![Tabs used to navigate the “Article” and “Talk” sections on the page.](../../assets/components/tabs-best-practices-usage-do.svg)

</template>

<template #do-text>

- Use Tabs to navigate between different sections of content on the page.

</template>

<template #dont-media>

![Tabs wrongly used to filter the list of items on the page into All items, Approved, or Pending.](../../assets/components/tabs-best-practices-usage-dont.svg)

</template>

<template #dont-text>

- Use Tabs to filter information on the screen or switch between views.

</template>

</cdx-demo-rules>

### Content

Tabs allow a reader to access contained, structured content blocks that make pages easier to read. To make the UI effective and consistent, keep tab names short and descriptive.

<cdx-demo-rules>
<template #do-media>

![Tabs conveying an example of short, concise titles for sections.](../../assets/components/tab-content-do.svg)

</template>
<template #do-text>

- Limit tab names to one or two words. [*Concise*](../../style-guide/writing-for-copy.html#is-this-concise) & [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</template>
<template #dont-media>

![Tabs conveying an example of mixing verbs and nouns.](../../assets/components/tab-content-dont.svg)

</template>
<template #dont-text>

- Mix verbs and nouns for the labels. [*Consistent*](../../style-guide/writing-for-copy.html#is-this-consistent) & [*Clear*](../../style-guide/writing-for-copy.html#is-this-clear)

</template>
</cdx-demo-rules>

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Tab</kbd> | It moves the focus to the next interactive element in tab order. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | It moves the focus to the previous interactive element. |
| <kbd>Left arrow</kbd> / <kbd>Right arrow</kbd> | When focusing on a Tab item, the arrow keys navigate between the rest of Tab items. |

## Demos

### Basic Example

Two stylistic variants are available, quiet (the default) and framed.

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

### Header row scroll

When the width of the header row exceeds the width of its container, arrow
buttons will appear to enable scrolling through tab names.

<cdx-demo-wrapper :controls-config="controlsConfig">
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

### Dynamic replacement of slot content

The Tabs component will re-render if the provided slot content changes.
Clicking the button below will replace the initial tabs with a new set;
the header row will update to match.

<cdx-demo-wrapper>
<template v-slot:demo="{ propValues }">
	<dynamically-generated-tabs v-bind="propValues" />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/tabs/examples/DynamicallyGeneratedTabs.vue [NPM]

<<< @/../component-demos/tabs/examples-mw/DynamicallyGeneratedTabs.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Vue usage

One or more [Tab](./tab.md) components must be provided in the default slot of the Tabs component.
Each child Tab component must have a `name` property. The Tabs component must have an `active` prop
that matches the name of one of the child Tab components in the slot.

In order for the active tabs to change, the `name` of the active tab must be bound in the parent
somehow, either using `v-model:active` or by manually binding the `active` prop and listening for
`update:active` events.

## CSS-only version

### Markup structure

The non-JS version of the Tabs component should be seen as a navigational tool.
It relies on HTML form submission to trigger a change in the current active tab.
When the user clicks on a tab button (or hits <kbd>Enter</kbd> while tab button is focused),
the browser will load a new page.

#### Basic setup:

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
  or the tab key to navigate between tabs.
- To disable a tab, simply add a `disabled` attribute to that tab's `<button>` in the tablist.

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
