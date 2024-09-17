<script setup>
import { version } from '../../../codex/package.json';
</script>

<style>
/* stylelint-disable selector-class-pattern */
</style>

# Usage

This page describes how to use the different NPM packages available as part of Codex. Read more about [the different packages and their contents](./packages.md).

::: tip Using Codex in MediaWiki?
Visit the [Codex docs on mediawiki.org](https://www.mediawiki.org/wiki/Codex) for more instructions
specific to use of the library within MediaWiki.
:::

## Installation

Install the [`@wikimedia/codex`](https://www.npmjs.com/package/@wikimedia/codex) package from NPM:

```bash
npm install @wikimedia/codex
```

This is the only required package to make use of [Codex CSS-only components](#css-only-components).

You may need to install other packages to use Codex in other ways:

- To use [Codex Vue 3 components](#vue-3-components), install [Vue.js](https://vuejs.org/guide/quick-start.html)
- To use Codex icons and icon utilities, install [`@wikimedia/codex-icons`](https://www.npmjs.com/package/@wikimedia/codex-icons) from NPM
- To use Codex CSS, Less, or Sass variables, install [`@wikimedia/codex-design-tokens`](https://www.npmjs.com/package/@wikimedia/codex-design-tokens) from NPM

## Using components

There are two types of components that you can import from the `@wikimedia/codex` package: [Vue 3 components](#vue-3-components) and [CSS-only components](#css-only-components).

Using either requires that you also load the compiled CSS from `@wikimedia/codex` so that styles are applied to imported Codex components. You can do that by:

- Import via JavaScript: `import '@wikimedia/codex/dist/codex.style.css'`, or
- Import via CSS: `@import '@wikimedia/codex/dist/codex.style.css'`

Styles only need to be loaded once per HTML page load from the server.

A [right-to-left (RTL) stylesheet variant](#bidirectionality-support) is also available.

### Vue 3 components

Import the components you need from the `@wikimedia/codex` package, and pass them into the
`components` setting of your component:
```vue
<template>
	<div>
		<cdx-button action="progressive" weight="primary">
			Click me!
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	components: {
		CdxButton
	},
	// ...
} );
</script>
```

Find documentation for individual components in the “Components” section. For example,
the documentation for `CdxButton` is at [“Button” page](../components/demos/button.md).

### CSS-only components

Output the HTML of the component with the appropriate CSS classes (see the component page's
"CSS-only version" section for details, e.g. for the [CSS-only Button](../components/demos/button.md#css-only-version)).

```html
<button class="cdx-button cdx-button--action-progressive cdx-button--weight-primary">
  Save
</button>
```

## Using icons

For more information about icons, see [the icon documentation](../icons/overview.md), and
[the list of all icons](../icons/all-icons.md).

### Vue 3 icons
Import the icons you need from the `@wikimedia/codex-icons` package, put them in your component's
`data`, then pass them to a Codex component as a prop:
```vue
<template>
	<div>
		<cdx-button action="destructive">
			<cdx-icon :icon="cdxIconTrash" /> Delete this item
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconTrash } from '@wikimedia/codex-icons';

export default defineComponent( {
	components: {
		CdxButton,
		CdxIcon
	},
	data: () => ( {
		cdxIconTrash
	} ),
	// ...
} );
</script>
```

For more information about the Icon component, see [the Icon demo page](../components/demos/icon.md).

### CSS-only icons
Import Codex design tokens and the CSS icon mixin. Then, apply the mixin to an empty `<span>`
element.

```html
<!-- Standalone icon. -->
<span class="my-icon-class--map-pin"></span>
<button class="cdx-button cdx-button--action-destructive">
	<!-- Icon inside a button. -->
	<span class="my-icon-class--trash"></span>
	Delete
</button>
```

```less
@import (reference) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import (reference) '@wikimedia/codex/mixins/css-icon.less';

.my-icon-class {
	&--map-pin {
		.cdx-mixin-css-icon( @cdx-icon-map-pin );
	}

	&--trash {
		.cdx-mixin-css-icon( @cdx-icon-trash, @param-is-button-icon: true );
	}
}
```

For more information about the CSS-only icon, see [the Icon demo page](../components/demos/icon.md#css-only-version).

## Using design tokens
Import the appropriate design tokens theme file in your CSS, Less, or SCSS code to access Codex
design tokens.

### Sample CSS usage

```css
@import '@wikimedia/codex-design-tokens/theme-wikimedia-ui.css';

.my-custom-element {
	background-color: var( --background-color-interactive );
	padding: var( --spacing-25 ) var( --spacing-50 );
}
```

### Sample Less usage

```less
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.my-custom-element {
	background-color: @background-color-interactive;
	padding: @spacing-25 @spacing-50;
}
```

### Sample Sass usage

```scss
@import '@wikimedia/codex-design-tokens/theme-wikimedia-ui.scss';

.my-custom-element {
	background-color: $background-color-interactive;
	padding: $spacing-25 $spacing-50;
}
```

For more information about design tokens, see the [design tokens overview](../design-tokens/overview.md)
and design tokens demo pages (e.g. [Color](../design-tokens/color.md)).

## Using Less mixins
Import the following in your Less code:
1. The appropriate design tokens theme file (this must be imported first for all Less mixins)
2. The Less mixin you want to use

```less
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.my-custom-link {
	.cdx-mixin-link();
}
```

## Dark Mode Support
Codex 1.5.0 introduced support for a "dark mode" color scheme. This is an optional feature
that can be used in several different ways. Typical usage will involve automatically switching
an application's colors to match the user's environment, and/or exposing a control that lets
the user toggle between light and dark color schemes manually.

### Automatic color-mode switching
To support automatic switching between light and dark colors in your application (to match
the user's browser or OS settings), follow these steps.

**Import both the light and dark design tokens as CSS variables into your application's
main stylesheet.** Please note that the exact file paths will depend on where you have
downloaded Codex; these examples assume that the library has been installed using NPM.

```css
@import url( ./node_modules/@wikimedia/codex-design-tokens/theme-wikimedia-ui-root.css );
@import url( /node_modules/@wikimedia/codex-design-tokens/theme-wikimedia-ui-mode-dark.css ) only screen and ( prefers-color-scheme: dark );
```

Alternatively, you can load these files as separate `<link>` tags in the head of your HTML
document:

  ```html
  <!-- The default light values will always be loaded -->
<link rel="stylesheet" href="./node_modules/@wikimedia/codex-design-tokens/theme-wikimedia-ui-root.css">
<!-- The dark values will only be loaded when needed -->
<link rel="stylesheet" href="./node_modules/@wikimedia/codex-design-tokens/theme-wikimedia-ui-mode-dark.css" media="( prefers-color-scheme: dark )">
  ```

Once you've done this, all Codex components will automatically use the correct light or dark
color tokens.

If you are writing custom CSS in your application and you want it to change as well, be sure
to reference the appropriate Codex color token instead of hardcoding values in your CSS.

```css
.my-custom-widget {
	background-color: var( --background-color-base );
}
```

## Versioning
Codex follows [the semantic versioning standard](https://semver.org/). The current version is
`{{ version }}`. Subsequent versions will continue to be numbered `0.x.y`, until Codex is stable
and mature enough to warrant a `1.0.0` release. If a release contains breaking changes, the
minor version number (the `x` in `0.x.y`) will be incremented, and the breaking changes will
be clearly documented in `CHANGELOG.md`.

## Bidirectionality support
Codex has limited support for [bidirectional text](https://en.wikipedia.org/wiki/Bidirectional_text).
It supports pages that are entirely in a left-to-right (LTR) script, or pages that are entirely
in a right-to-left (RTL) script. It does not support pages with a mix of LTR and RTL
content, or pages whose directionality changes at runtime, except in some special cases.

Codex provides two direction-specific stylesheets. On LTR pages, use `codex.style.css`; on RTL
pages, use `codex.style-rtl.css`.

::: tip Experimental Bidirectional Stylesheet
As of version `1.12.0`, the Codex package also includes a `codex.style-bidi.css` file. This is
an **experimental** stylesheet that supports client-side direction flipping via `[dir]` selectors.
See [Bidirectional script support](../contributing/contributing-code/developing-components#bidirectional-script-support)
for more information and caveats.
:::

Some Codex components detect the direction of the surrounding content, and adjust their behavior
accordingly, for example in how they respond to the left and right arrow keys. Icons also adjust
to the surrounding direction. For more information on how bidirectionality is handled for icons,
see [the icon documentation](../icons/overview.md#right-to-left-rtl-and-language-support).

For more information on this topic, see [the developer documentation on bidirectionality](../contributing/contributing-code/developing-components#bidirectional-script-support).

<style>
/* stylelint-enable selector-class-pattern */
</style>
