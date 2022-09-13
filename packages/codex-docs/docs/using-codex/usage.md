<script setup>
import { version } from '../../../codex/package.json';
</script>

# Usage
:::warning
Codex is incomplete and still under active development. It's ready for production use, but some
commonly needed components and features have not been implemented yet.
:::

::: tip Using Codex in MediaWiki?
Visit the [Codex docs on mediawiki.org](https://www.mediawiki.org/wiki/Codex) for more instructions
specific to use of the library within MediaWiki.
:::

## Installation
Install the `@wikimedia/codex` and `@wikimedia/codex-icons` packages from NPM:
```
npm install --save-dev @wikimedia/codex @wikimedia/codex-icons
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
    <cdx-button action="progressive" type="primary">
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
the documentation for `CdxButton` is at [“Button” page](../components/button.md).

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
The design tokens are not yet ready for external use at this time.

Read more about [the different packages and their contents](./packages.md).
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
