<script setup>
import SimpleIcon from '@/../component-demos/icon/examples/SimpleIcon.vue';
import IconSizes from '@/../component-demos/icon/examples/IconSizes.vue';
</script>

See the [Icons section](../../icons/overview.md) for more information, including a
[list of all available icons](../../icons/all-icons.md).

## Demos

### Simple icon

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<simple-icon />
</template>

<template v-slot:code>

<<< @/../component-demos/icon/examples/SimpleIcon.vue

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

<<< @/../component-demos/icon/examples/IconSizes.vue

</template>
</cdx-demo-wrapper>

::: warning
`x-small` icon size is only intended for use in certain special cases.
Most components should use Icons in `small` or `medium` size.
:::

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

```less
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

```less
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon--trash {
	.cdx-mixin-css-icon( @cdx-icon-trash, @color-destructive );
}

```

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

```less
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

```less
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--article {
		.cdx-mixin-css-icon( @cdx-icon-article );
	}
}
```

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

```less
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	&--strikethrough {
		.cdx-mixin-css-icon( @cdx-icon-strikethrough );
	}
}
```

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
