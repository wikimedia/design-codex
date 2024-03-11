<script setup>
import SimpleIcon from '@/../component-demos/icon/examples/SimpleIcon.vue';
import IconSizes from '@/../component-demos/icon/examples/IconSizes.vue';
</script>

An Icon is a graphical representation of an idea. Icons are used to give the
user additional context to aid in understanding the interface. This component
can be used inside other components, like a [Button](./button.md).

## Guidelines

### Using icons
Codex contains a [list of icons](/icons/all-icons.md).
Read more about how to [use and create Codex icons](/style-guide/icons.html).

![Example of different Codex Icons.](../../assets/components/icon-using.svg)

### Specifications

#### Size

![Icon in available sizes: 20px, 16px, and 12px.](../../assets/components/icon-specifications.svg)

Icon size can be 20px, 16px or 12px. Icon base size will be 20px, while 16px
will be used for small icons. We will use 12px just for a limited set of
specific use cases.

- **20px icons** should be used by default size, including in elements with a min-height of 32px (like the start icon within the TextInput).
- **16px icons** should be in elements with a height less than 32px (like the start icon within the InfoChip) or for controls in elements with a min-height of 32px (like the dropdown arrow’s icon in the Select).
- **12px icons** will only be used for a small set of specific cases, like the external-link icon, or for controls in elements with a height less than 32px (like the remove buttons for chips in the ChipInput).

#### Color

<div class="cdx-docs-col cdx-docs-col-start cdx-docs-col-m">

![Example of base-color icons being used within a Menu.](../../assets/components/icon-specfications-color-base.svg)

Icons will always use Gray750 if used individually, and not as part of another component.
</div>
<div class="cdx-docs-col cdx-docs-col-end cdx-docs-col-m">

![Example of icons with colors being used within a Button.](../../assets/components/icon-specfications-color-custom.svg)

Icons used within other components inherit the color of the accompanying label.
</div>

Refer to the [Icon component in Codex Figma](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?type=design&node-id=8381-79819&mode=design&t=2O0ceqiRfqCtnidq-11).

### Interaction states
Icons serve as both informative and decorative elements, so they do not
inherently exhibit states on their own. Instead, an icon will adopt the state of
the text or component it is placed within.

## Demos

### Simple icon

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<simple-icon />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/icon/examples/SimpleIcon.vue [NPM]

<<< @/../component-demos/icon/examples-mw/SimpleIcon.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Using icons in buttons
Icons can be used inside other components, like buttons. For demos of how to use icons inside
buttons, see [the Button documentation](./button#default-with-icon).

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
`x-small` icon size is only intended for use in certain special cases.
Most components should use Icons in `small` or `medium` size.
:::

## Vue usage

## CSS-only version

You can use icons in a no-JavaScript context via a the CSS icon Less mixin provided by the Codex
library. To use this mixin, import the mixin file and apply `.cdx-mixin-css-icon()` to an
empty `<span>` element. The parameters of the mixin are as follows:

| Param name | Description | Default |
| ---------- | ----------- | ------- |
| `@param-icon` <sup class="cdx-docs-required-indicator">(required)</sup> | The icon to use, in the form of a Less variable. These variables are also provided by the mixin file. The syntax for the Less variable version of an icon name is `@cdx-icon-icon-name`, e.g. `@cdx-icon-info-filled`. See the list of [all icons](../../icons/all-icons.md) for icon names. | |
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

### Icon color

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

### Icon sizes

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

### Bidirectionality

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

### Language support

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
}
</style>
