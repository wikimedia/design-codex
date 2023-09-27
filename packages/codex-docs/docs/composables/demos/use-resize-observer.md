# useResizeObserver

Returns the [ref](https://vuejs.org/api/reactivity-core.html#ref) object containing the current
"width" and "height" properties.

Sets up a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) which
attaches to the provided [template ref](https://vuejs.org/guide/essentials/template-refs.html) when
the component is mounted.

This composable only supports horizontal writing directions (left to right or right to left), not
vertical writing directions (e.g. top to bottom).

## Usage

Set a [template ref](https://vuejs.org/guide/essentials/template-refs.html) on the target element
that you want the ResizeObserver to watch. The `ref` attribute provides a direct reference to the
element and allows us to interact with the DOM element.

```vue
<template>
    <div ref="dialogBody"></div>
</template>
```

Pass the template ref to the composable.

```js
const dialogBody = ref(null); // dialog content
const bodyDimensions = useResizeObserver( dialogBody );
```

## Full example

In this example, the component has three sections: header, body, and footer. And we want to
determine whether or not to show border dividers between the three sections.

The composable gets the current height of the body. If the body's client height is smaller than the body's scroll height then a CSS class is dynamically added to show the border dividers.

``` vue
<template>
  	<div class="cdx-docs-container" :class="rootClasses">
    <header>
      	<h1 class="cdx-docs-title">Title</h1>
    </header>
    <p ref="bodyContent" class="cdx-docs-body">
		This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.This is the body content.This is the body content.This is the body
		content.
    </p>
    <footer class="cdx-docs-footer">
      	<cdx-button>Continue</cdx-button>
    </footer>
  	</div>
</template>
<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { CdxButton, useResizeObserver } from '@wikimedia/codex';

export default defineComponent({
  components: { CdxButton },
  setup() {
    const bodyContent = ref(null);
    const bodyDimensions = useResizeObserver( bodyContent );
    const currentBodyHeight = computed( () => bodyDimensions.value.height ?? 0 );

	const showDividers = ref( false );
    const rootClasses = computed( () => {
		return {
			'cdx-docs-container--dividers': showDividers.value
		};
	} );

    // Determine if content dividers should be displayed for overflowing content
    watch( currentBodyHeight, () => {
		if ( bodyContent.value ) {
			showDividers.value = bodyContent.value.clientHeight < bodyContent.value.scrollHeight;
		}
	} );

    return {
		bodyContent,
		rootClasses
    }
  }
});
</script>
<style>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
/* MediaWiki imports Codex design tokens differently
https://www.mediawiki.org/wiki/Codex#Using_Codex_design_tokens */

.cdx-docs-container {
	height: @size-half;
	border: @border-base;
}

.cdx-docs-title {
	margin-top: @spacing-25;
	margin-bottom: @spacing-25;
	margin-left: @spacing-50;
}

.cdx-docs-body {
	height: @size-400;
	margin-left: @spacing-50;
	padding-top: @spacing-75;
	padding-bottom: @spacing-75;
	overflow: auto;
	font-size: @font-size-base;
}

.cdx-docs-footer {
	padding-top: @spacing-75;

	& button {
		margin-left: @spacing-50;
	}
}

header {
	.cdx-docs-container--dividers & {
		border-bottom: @border-subtle;
	}
}

footer {
	.cdx-docs-container--dividers & {
		border-top: @border-subtle;
	}
}
</style>
```
