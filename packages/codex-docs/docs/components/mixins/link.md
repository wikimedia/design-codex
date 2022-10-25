<script setup>
// Note that this file is temporarily located here so we can quickly get a page up documenting the
// link mixin. It will be moved to a more permanent location once we determine a final documentation
// structure for component mixins.
import { CdxIcon } from '@wikimedia/codex';
import { cdxIconLink, cdxIconLinkExternal } from '@wikimedia/codex-icons';
</script>

# Link

Styles for text used to navigate between sections or pages.

:::tip Less mixin
This component has been implemented as a [Less mixin](https://lesscss.org/features/#mixins-feature),
not a Vue component. See below for [usage information](#usage).
:::

## Demos

### Standard link

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
<p>Lorem ipsum <a class="cdx-docs-link" href="https://example.com">dolor sic</a> amet.</p>
</template>

<template v-slot:code>

```vue
<template>
	<p>Lorem ipsum <a class="cdx-docs-link" href="https://example.com">dolor sic</a> amet.</p>
</template>

<style lang="less">
@import ( reference ) '@wikimedia/codex/dist/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

</template>
</cdx-demo-wrapper>

### Underlined link

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
<p>Lorem ipsum <a class="cdx-docs-link is-underlined" href="#">dolor sic</a> amet.</p>
</template>

<template v-slot:code>

```vue
<template>
	<p>Lorem ipsum <a class="cdx-docs-link is-underlined" href="#">dolor sic</a> amet.</p>
</template>

<style lang="less">
@import ( reference ) '@wikimedia/codex/dist/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

</template>
</cdx-demo-wrapper>

### Link with icon

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
<p>Lorem ipsum <a class="cdx-docs-link" href="#"><cdx-icon :icon="cdxIconLink" /> dolor sic</a> amet.</p>
<p>Lorem ipsum <a class="cdx-docs-link is-underlined" href="#">dolor sic <cdx-icon :icon="cdxIconLinkExternal" /></a> amet.</p>
</template>

<template v-slot:code>

```vue
<template>
	<p>Lorem ipsum <a class="cdx-docs-link" href="#"><cdx-icon :icon="cdxIconLink" /> dolor sic</a> amet.</p>
	<p>Lorem ipsum <a class="cdx-docs-link is-underlined" href="#">dolor sic <cdx-icon :icon="cdxIconLinkExternal" /></a> amet.</p>
</template>

<style lang="less">
@import ( reference ) '@wikimedia/codex/dist/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();

	// stylelint-disable-next-line selector-class-pattern
	.cdx-icon {
		color: inherit;
	}
}
</style>
```

</template>
</cdx-demo-wrapper>

### Red link

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
<p>Lorem ipsum <a class="cdx-docs-link is-red-link" href="#">dolor sic</a> amet.</p>
</template>

<template v-slot:code>

```vue
<template>
	<p>Lorem ipsum <a class="cdx-docs-link is-red-link" href="#">dolor sic</a> amet.</p>
</template>

<style lang="less">
@import ( reference ) '@wikimedia/codex/dist/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

</template>
</cdx-demo-wrapper>

## Usage

### Default usage

To use standard, underlined, and red link styles, apply the `.cdx-mixin-link()` mixin to a link
class or to all anchor elements. This will automatically apply underline styles to links with the
`.is-underlined` class, and red link styles to links with the `.is-red-link` class.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
<p>Lorem ipsum <a class="cdx-docs-link" href="#">dolor sic</a> amet.</p>
<p>Lorem ipsum <a class="cdx-docs-link is-underlined" href="#">dolor sic</a> amet.</p>
<p>Lorem ipsum <a class="cdx-docs-link is-red-link" href="#">dolor sic</a> amet.</p>
</template>

<template v-slot:code>

```vue
<template>
	<p>Lorem ipsum <a class="cdx-docs-link" href="#">dolor sic</a> amet.</p>
	<p>Lorem ipsum <a class="cdx-docs-link is-underlined" href="#">dolor sic</a> amet.</p>
	<p>Lorem ipsum <a class="cdx-docs-link is-red-link" href="#">dolor sic</a> amet.<p>
</template>

<style lang="less">
@import ( reference ) '@wikimedia/codex/dist/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

</template>
</cdx-demo-wrapper>

### With custom CSS selectors

Alternately, you can apply sub-mixins directly to your own CSS selectors. The sub-mixins are:
- `.cdx-mixin-link-base()`
- `.cdx-mixin-link-underlined()`
- `.cdx-mixin-link-red()`

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
<div class="cdx-docs-link-wrapper">
<p>Lorem ipsum <a href="#">dolor sic</a> amet.</p>
<p>Lorem ipsum <a class="cdx-docs-link-with-underline" href="#">dolor sic</a> amet.</p>
<p>Lorem ipsum <a class="cdx-docs-red-link" href="#">dolor sic</a> amet.</p>
</div>
</template>

<template v-slot:code>

```vue
<template>
	<p>Lorem ipsum <a href="#">dolor sic</a> amet.</p>
	<p>Lorem ipsum <a class="cdx-docs-link-with-underline" href="#">dolor sic</a> amet.</p>
	<p>Lorem ipsum <a class="cdx-docs-red-link" href="#">dolor sic</a> amet.</p>
</template>

<style lang="less">
@import ( reference ) '@wikimedia/codex/dist/mixins/link.less';

.cdx-docs-link-wrapper {
	a {
		.cdx-mixin-link-base();
	}

	.cdx-docs-link-with-underline {
		.cdx-mixin-link-underlined();
	}

	.cdx-docs-red-link {
		.cdx-mixin-link-red();
	}
}
</style>
```

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex/dist/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();

	// stylelint-disable-next-line selector-class-pattern
	.cdx-icon {
		color: inherit;
	}
}

.cdx-docs-link-wrapper {
	a {
		.cdx-mixin-link-base();
	}

	.cdx-docs-link-with-underline {
		.cdx-mixin-link-underlined();
	}

	.cdx-docs-red-link {
		.cdx-mixin-link-red();
	}
}
</style>