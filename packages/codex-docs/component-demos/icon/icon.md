<script setup>
import { CdxAccordion, CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconTrash, cdxIconJournal, cdxIconBold } from '@wikimedia/codex-icons';
import ConfigurableIcon from '@/../component-demos/icon/examples/ConfigurableIcon.vue';
import IconSizes from '@/../component-demos/icon/examples/IconSizes.vue';
import IconInButton from '@/../component-demos/icon/examples/IconInButton.vue';
import IconColor from '@/../component-demos/icon/examples/IconColor.vue';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';

const controlsConfig = [
	{
		name: 'icon',
		type: 'icon',
		default: 'cdxIconGlobe'
	},
	{
		name: 'size',
		type: 'radio',
		options: [ 'medium', 'small', 'x-small' ],
	},
		{
		name: 'language',
		type: 'text',
		default: 'en'
	}
];
</script>

An Icon is a graphical representation of an idea.

<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues }">
	<configurable-icon v-bind="propValues" />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/icon/examples/ConfigurableIcon.vue [NPM]

<<< @/../component-demos/icon/examples-mw/ConfigurableIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## Overview

### When to use Icon

Icons are used to give the user additional context for understanding the interface. This component
can be used inside other components, like a [Button](./button.md).

Codex contains a [list of icons](/icons/all-icons.md).
Read more about how to [use and create Codex icons](/style-guide/icons.html).

### About Icon

#### Size

Icons can be one of three sizes.

- **By default**, Icons use `@size-125` (equivalent to `20px` in the default Codex theme) known as medium.
- **In elements with a smaller height**, Icons should use `@size-100` (equivalent to `16px` in the default Codex theme) known as small.
- **In specific cases**, Icons should use `@size-75` (equivalent to `12px` in the default Codex theme) known as x-small.

#### Color

- **By default**, icons use `@color-base`.
- **Decorative icons** should use `@color-subtle`.
- **Icons in a placeholder state** should use `@color-placeholder`.
- **Status-conveying icons** should use their associated status color, either `@color-notice`, `@color-error`, `@color-warning`, or `@color-success`.
- **Icons as a part of an action or link** inherit the color of the accompanying label.

## Examples

### Basic usage

Icon can be used inside other components, like [Button](./button#with-icon). Note that the icon will
inherit the text color of that component—for instance, in a destructive primary button, the icon is
white, like the button label.

<cdx-demo-wrapper>
<template v-slot:demo>
	<icon-in-button />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/icon/examples/IconInButton.vue [NPM]

<<< @/../component-demos/icon/examples-mw/IconInButton.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Icon sizes

Icons support a few different pre-defined size options. Right now the supported sizes are:
`medium`, `small`, and `x-small`.

If no `size` property is provided, the `medium` size will be used by default.

<cdx-demo-wrapper>
<template v-slot:demo>
	<icon-sizes />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/icon/examples/IconSizes.vue [NPM]

<<< @/../component-demos/icon/examples-mw/IconSizes.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

::: warning
`x-small` Icon size is only intended for use in certain special cases.
Most components should use Icons in `small` or `medium` size.
:::

### Icon colors

All icons are monochrome, meaning the entire icon is the same color. By default, Icon uses the
base color (`{{ tokens.color.base.value }}`), but this can be overridden by changing the `color`
property of the `.cdx-icon` element in CSS.


<cdx-demo-wrapper>
<template v-slot:demo>
	<icon-color />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/icon/examples/IconColor.vue [NPM]

<<< @/../component-demos/icon/examples-mw/IconColor.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

Note that the SVG inherits the Icon `color` by applying `fill: currentColor`. Some components style
their icons to match the surrounding text color. For example, [Button](./button.md) features red
icons matching the red (`{{tokens.color.destructive.value }}`) text in its destructive variant.

</cdx-accordion>

### Internationalization

Many icons, like `cdxIconJournal`, have different versions for left-to-right (LTR) and right-to-left
(RTL) contexts. The Icon component automatically detects the direction of its environment, and
chooses the correct icon accordingly. For example, if the journal icon appears on a page that is
RTL, or inside of a `<div dir="rtl">` element, the RTL version of the icon will be displayed.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<cdx-icon :icon="cdxIconJournal" />
</template>

<template v-slot:code>

```vue-html
<cdx-icon :icon="cdxIconJournal" />
```

</template>
</cdx-demo-wrapper>

Similarly, some icons, like `cdxIconBold` have different versions for different languages. The icon
component also automatically detects the language of its environment, so if for example the bold
icon appears on a page that has `<html lang="fr">` at the root, or inside of a `<p lang="fr">`, the
French version of the icon will be displayed.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<p><cdx-icon :icon="cdxIconBold" /> Default</p>
	<p lang="en"><cdx-icon :icon="cdxIconBold" /> English</p>
	<p lang="fr"><cdx-icon :icon="cdxIconBold" /> French</p>
	<p lang="ar"><cdx-icon :icon="cdxIconBold" /> Arabic</p>
</template>

<template v-slot:code>

```vue-html
<p>
	<cdx-icon :icon="cdxIconBold" /> Default
</p>
<p lang="en">
	<cdx-icon :icon="cdxIconBold" /> English
</p>
<p lang="fr">
	<cdx-icon :icon="cdxIconBold" /> French
</p>
<p lang="ar">
	<cdx-icon :icon="cdxIconBold" /> Arabic
</p>
```

</template>
</cdx-demo-wrapper>

<cdx-accordion>
<template #title>Developer notes</template>

The automatic direction and language detection feature has limitations. It only detects the
direction and language of the surrounding context when the icon component is initially mounted.
If the surrounding context changes later, for example because the `lang` or `dir` attribute on the
parent/ancestor is changed, the icon will not notice these changes and will not update to reflect
them.

If you run into this limitation, or if the automatic direction/language detection isn't working
for other reasons, you can set the direction and/or language explicitly through the `dir` and
`lang` props:

```vue-html
Bold icon in German: <cdx-icon :icon="cdxIconBold" lang="de" />
Journal icon in RTL: <cdx-icon :icon="cdxIconJournal" dir="rtl" />
```

</cdx-accordion>

## Technical implementation

### Vue usage

#### CSS-only version

You can use icons in a no-JavaScript context via the CSS icon Less mixin provided by the Codex
library. To use this mixin, import the mixin file and apply `.cdx-mixin-css-icon()` to an
empty `<span>` element. The parameters of the mixin are as follows:

| Param name | Description | Default |
| -- | -- | ------- |
| `@param-icon` <sup class="cdx-docs-required-indicator">(required)</sup> | The icon to use, in the form of a Less variable. These variables are also provided by the mixin file. The syntax for the Less variable version of an icon name is `@cdx-icon-icon-name`, e.g. `@cdx-icon-info-filled`. Visit the list of [all icons](../../icons/all-icons.md) for icon names. To use a custom icon, set this to `'none'`, check [how to use a custom icon](#custom-icon) below. | |
| `@param-fill-color` | The hex code of the fill color of the icon | `@color-base` |
| `@param-size-icon` | The icon size | `@size-icon-medium` |
| `@param-is-button-icon` | Whether the icon is inside of a `<button>` element | `false` |

:::warning
Before importing the `css-icon` mixin, you must first import the design tokens. If you don't, you
will get errors that look like `variable @color-base is undefined`.
:::

:::tip
Visit the [Button docs](./button.md#with-css-icon) for details on using CSS icons within buttons.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
	<p>
		<span class="cdx-demo-css-icon--code"></span> Code
	</p>
	<p>
		<span class="cdx-demo-css-icon--map-pin"></span> Map pin
	</p>
</template>

<template v-slot:code>

```html
<p>
	<span class="cdx-demo-css-icon--code"></span>
	Code
</p>
<p>
	<span class="cdx-demo-css-icon--map-pin"></span>
	Map pin
</p>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--code {
		.cdx-mixin-css-icon( @cdx-icon-code );
	}

	&--map-pin {
		.cdx-mixin-css-icon( @cdx-icon-map-pin );
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon {
	&--code {
		.cdx-mixin-css-icon( @cdx-icon-code );
	}

	&--map-pin {
		.cdx-mixin-css-icon( @cdx-icon-map-pin );
	}
}
```

:::

</template>
</cdx-demo-wrapper>

#### Icon color

Use the second parameter of the `.cdx-mixin-css-icon()` mixin, `@param-fill-color`, to apply a hex
code as the SVG fill color.

<cdx-demo-wrapper>
<template v-slot:demo>
	<p>
		<span class="cdx-demo-css-icon--trash"></span>
		Delete
	</p>
</template>

<template v-slot:code>

```html
<p>
	<span class="cdx-demo-css-icon--trash"></span>
	Delete
</p>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--trash {
	.cdx-mixin-css-icon( @cdx-icon-trash, @color-destructive );
}

```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon--trash {
	.cdx-mixin-css-icon( @cdx-icon-trash, @color-destructive );
}

```

:::

</template>
</cdx-demo-wrapper>

#### Icon sizes

Use the third parameter of the `.cdx-mixin-css-icon()` mixin, `@param-size-icon`, to use one of the pre-defined size options (`@size-icon-medium`, `@size-icon-small`, or `@size-icon-x-small`).

<cdx-demo-wrapper>
<template v-slot:demo>
	<p>
		<span class="cdx-demo-css-icon--bookmark"></span>
		Bookmark (medium)
	</p>
	<p>
		<span class="cdx-demo-css-icon--bell"></span>
		Bell (small)
	</p>
	<p>
		<span class="cdx-demo-css-icon--arrow-next"></span>
		Arrow next (extra-small)
	</p>
</template>
<template v-slot:code>

```html
<p>
	<span class="cdx-demo-css-icon--bookmark"></span>
	Bookmark (medium)
</p>
<p>
	<span class="cdx-demo-css-icon--bell"></span>
	Bell (small)
</p>
<p>
	<span class="cdx-demo-css-icon--arrow-next"></span>
	Arrow next (extra-small)
</p>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--bookmark {
		// No size parameter added, so default size of medium will be used.
		.cdx-mixin-css-icon( @cdx-icon-bookmark );
	}

	&--bell {
		// Size parameter included via a named parameter.
		.cdx-mixin-css-icon( @cdx-icon-bell, @param-size-icon: @size-icon-small );
	}

	&--arrow-next {
		.cdx-mixin-css-icon( @cdx-icon-arrow-next, @param-size-icon: @size-icon-x-small );
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon {
	&--bookmark {
		// No size parameter added, so default size of medium will be used.
		.cdx-mixin-css-icon( @cdx-icon-bookmark );
	}

	&--bell {
		// Size parameter included via a named parameter.
		.cdx-mixin-css-icon( @cdx-icon-bell, @param-size-icon: @size-icon-small );
	}

	&--arrow-next {
		.cdx-mixin-css-icon( @cdx-icon-arrow-next, @param-size-icon: @size-icon-x-small );
	}
}
```

:::

</template>
</cdx-demo-wrapper>

#### Bidirectionality

The CSS icon mixin supports icons that differ between the left-to-right (LTR) and
right-to-left (RTL) reading directions. To take advantage of this behavior, in RTL contexts, one of
the following is required:

- A `dir="rtl"` attribute set **on the `<html>` element**.
- A `dir="rtl"` attribute set **directly on the icon span**.

:::warning
In RTL contexts, ensure that a `dir="rtl"` attribute is set either on the `<html>` element or on the
icon element itself.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
	<p>
		<span dir="ltr" class="cdx-demo-css-icon cdx-demo-css-icon--article"></span>
		Article (LTR)
	</p>
	<p>
		<span dir="rtl" class="cdx-demo-css-icon cdx-demo-css-icon--article"></span>
		Article (RTL)
	</p>
</template>

<template v-slot:code>

```html
<p>
	<span dir="ltr" class="cdx-demo-css-icon cdx-demo-css-icon--article"></span>
	Article (LTR)
</p>
<p>
	<span dir="rtl" class="cdx-demo-css-icon cdx-demo-css-icon--article"></span>
	Article (RTL)
</p>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--article {
		.cdx-mixin-css-icon( @cdx-icon-article );
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon {
	&--article {
		.cdx-mixin-css-icon( @cdx-icon-article );
	}
}
```

:::

</template>
</cdx-demo-wrapper>

#### Language support

The CSS-only icons mixin supports icons with language-specific variants.

<cdx-demo-wrapper>
<template v-slot:demo>
	<p lang="de">
		<span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough"></span>
		Strikethrough (German)
	</p>
	<p lang="en">
		<span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough"></span>
		Strikethrough (English)
	</p>
	<p lang="fi">
		<span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough"></span>
		Strikethrough (Finnish)
	</p>
</template>

<template v-slot:code>

```html
<p lang="de">
	<span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough"></span>
	Strikethrough (German)
</p>
<p lang="en">
	<span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough"></span>
	Strikethrough (English)
</p>
<p lang="fi">
	<span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough"></span>
	Strikethrough (Finnish)
</p>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--strikethrough {
		.cdx-mixin-css-icon( @cdx-icon-strikethrough );
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon {
	&--strikethrough {
		.cdx-mixin-css-icon( @cdx-icon-strikethrough );
	}
}
```

:::

</template>
</cdx-demo-wrapper>

#### Custom icon
To use a custom icon:
- Set the first parameter of the `.cdx-mixin-css-icon()` mixin to `'none'`
- Set `mask-image` and `-webkit-mask-image` to a URL that points to the icon image (this can be a
  data URL)

:::warning
You must set both `mask-image` and `-webkit-mask-image`, because many browsers only respect the
latter. This may happen automatically if you use a tool like Autoprefixer.
:::

<cdx-demo-wrapper>
<template v-slot:demo>
	<p>
		<span class="cdx-demo-css-icon--custom"></span>
		Custom icon
	</p>
</template>

<template v-slot:code>

```html
<p>
	<span class="cdx-demo-css-icon--custom"></span>
	Custom icon
</p>
```

:::code-group

```less [NPM]
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--custom {
	.cdx-mixin-css-icon( 'none', @color-progressive );
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features,function-url-quotes */
	-webkit-mask-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><mask id="inner"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="6" fill="black"/></mask><circle cx="10" cy="10" r="10" fill="black" mask="url(%23inner)"/></svg>' );
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features,function-url-quotes */
	mask-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><mask id="inner"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="6" fill="black"/></mask><circle cx="10" cy="10" r="10" fill="black" mask="url(%23inner)"/></svg>' );
}

```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-icon--custom {
	.cdx-mixin-css-icon( 'none', @color-progressive );
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features,function-url-quotes */
	-webkit-mask-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><mask id="inner"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="6" fill="black"/></mask><circle cx="10" cy="10" r="10" fill="black" mask="url(%23inner)"/></svg>' );
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features,function-url-quotes */
	mask-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><mask id="inner"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="6" fill="black"/></mask><circle cx="10" cy="10" r="10" fill="black" mask="url(%23inner)"/></svg>' );
}

```

:::

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--code {
		.cdx-mixin-css-icon( @cdx-icon-code );
	}

	&--map-pin {
		.cdx-mixin-css-icon( @cdx-icon-map-pin );
	}

	&--trash {
		.cdx-mixin-css-icon( @cdx-icon-trash, @color-destructive );
	}

	&--bookmark {
		.cdx-mixin-css-icon( @cdx-icon-bookmark );
	}

	&--bell {
		.cdx-mixin-css-icon( @cdx-icon-bell, @param-size-icon: @size-icon-small );
	}

	&--arrow-next {
		.cdx-mixin-css-icon( @cdx-icon-arrow-next, @param-size-icon: @size-icon-x-small );
	}

	&--article {
		.cdx-mixin-css-icon( @cdx-icon-article );
	}

	&--strikethrough {
		.cdx-mixin-css-icon( @cdx-icon-strikethrough );
	}

	&--custom {
		.cdx-mixin-css-icon( 'none', @color-progressive );
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features,function-url-quotes */
		-webkit-mask-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><mask id="inner"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="6" fill="black"/></mask><circle cx="10" cy="10" r="10" fill="black" mask="url(%23inner)"/></svg>' );
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features,function-url-quotes */
		mask-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><mask id="inner"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="6" fill="black"/></mask><circle cx="10" cy="10" r="10" fill="black" mask="url(%23inner)"/></svg>' );
	}
}
</style>
