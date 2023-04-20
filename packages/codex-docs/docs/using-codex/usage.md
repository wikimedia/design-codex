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
Install the following packages from NPM:
- `@wikimedia/codex`
- `@wikimedia/codex-design-tokens`
- `@wikimedia/codex-icons`
```bash
npm install --save-dev @wikimedia/codex @wikimedia/codex-design-tokens @wikimedia/codex-icons
```
Some projects may not need the icons package, but most do.

You will also need to [install Vue.js](https://vuejs.org/guide/quick-start.html) in order to use
Codex components.

## Using components
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

## Using icons
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
For more information about icons, see [the icon documentation](../icons/overview.md), and
[the list of all icons](../icons/all-icons.md).

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
pages, use `codex.style-rtl.css`. Codex does not provide a single stylesheet using attribute
selectors like `[dir='rtl']` to set the right style for each direction, because of the significant
limitations of this approach.

Some Codex components detect the direction of the surrounding content, and adjust their behavior
accordingly, for example in how they respond to the left and right arrow keys. Icons also adjust
to the surrounding direction. For more information on how bidirectionality is handled for icons,
see [the icon documentation](../icons/overview.md#right-to-left-rtl-and-language-support).

For more information on this topic, see [the developer documentation on bidirectionality](../contributing/contributing-code/developing-components#bidirectional-script-support).

<style>
/* stylelint-enable selector-class-pattern */
</style>
