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

You can use icons in a no-JavaScript context via a Less mixin provided by the Codex library.

1. Import the mixin file, `@wikimedia/codex/mixins/css-icon.less`, with the
  [reference option](https://lesscss.org/features/#import-atrules-feature-reference).
  This will ensure your stylesheet only includes the icon variables that you actually use.
2. Apply the `.cdx-mixin-css-icon()` mixin to your icon. This includes background, display,
  sizing, and alignment styles for CSS-only icons. Try to apply this mixin to all of your CSS-only
  icons at once.
3. Apply the `.cdx-mixin-icon-background-image()` mixin with the icon you want to use passed in as
  a parameter. See the list of [all icons](../../icons/all-icons.md) for icon names. The syntax for
  the Less variable version of an icon name is `@cdx-icon-icon-name`, e.g. `@cdx-icon-info-filled`.
  These Less variables are provided by the mixin file.

<cdx-demo-wrapper>
<template v-slot:demo>
	<p>
		<span class="cdx-demo-css-icon cdx-demo-css-icon--tag"></span>
		Label
	</p>
	<p>
		<span class="cdx-demo-css-icon cdx-demo-css-icon--map-pin"></span>
		Map pin
	</p>
</template>

<template v-slot:code>

```html
<p>
	<span class="cdx-demo-css-icon cdx-demo-css-icon--tag"></span>
	Label
</p>
<p>
	<span class="cdx-demo-css-icon cdx-demo-css-icon--map-pin"></span>
	Map pin
</p>
```

```less
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	.cdx-mixin-css-icon();

	&--tag {
		.cdx-mixin-icon-background-image( @cdx-icon-tag );
	}

	&--map-pin {
		.cdx-mixin-icon-background-image( @cdx-icon-map-pin );
	}
}
```

</template>
</cdx-demo-wrapper>

### Setting the icon color

Use the second parameter of the `.cdx-mixin-icon-background-image()` to apply a hex code as the SVG
fill color.

<cdx-demo-wrapper>
<template v-slot:demo>
	<p>
		<span class="cdx-demo-css-icon cdx-demo-css-icon--trash"></span>
		Delete
	</p>
</template>

<template v-slot:code>

```html
<p>
	<span class="cdx-demo-css-icon cdx-demo-css-icon--trash"></span>
	Delete
</p>
```

```less
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	.cdx-mixin-css-icon();

	&--trash {
		.cdx-mixin-icon-background-image( @cdx-icon-trash, @color-destructive );
	}
}
```

</template>
</cdx-demo-wrapper>

### Bidirectionality

The CSS-only icons mixin supports icons that differ between the left-to-right (LTR) and
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
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	.cdx-mixin-css-icon();

	&--article {
		.cdx-mixin-icon-background-image( @cdx-icon-article );
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
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	.cdx-mixin-css-icon();

	&--strikethrough {
		.cdx-mixin-icon-background-image( @cdx-icon-strikethrough );
	}
}
```

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.cdx-demo-css-icon {
	.cdx-mixin-css-icon();

	&--tag {
		.cdx-mixin-icon-background-image( @cdx-icon-tag );
	}

	&--map-pin {
		.cdx-mixin-icon-background-image( @cdx-icon-map-pin );
	}

	&--trash {
		.cdx-mixin-icon-background-image( @cdx-icon-trash, @color-destructive );
	}

	&--article {
		.cdx-mixin-icon-background-image( @cdx-icon-article );
	}

	&--strikethrough {
		.cdx-mixin-icon-background-image( @cdx-icon-strikethrough );
	}
}
</style>
