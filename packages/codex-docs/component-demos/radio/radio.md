<script setup>
import RadioGroup from '@/../component-demos/radio/examples/RadioGroup.vue';
import InlineRadios from '@/../component-demos/radio/examples/InlineRadios.vue';
</script>

## Demos

### Radio group

<cdx-demo-wrapper :force-reset="true" :force-controls="true">
<template v-slot:demo>
	<radio-group />
</template>

<template v-slot:code>

<<< @/../component-demos/radio/examples/RadioGroup.vue

</template>
</cdx-demo-wrapper>

### Inline radios

<cdx-demo-wrapper>
<template v-slot:demo>
	<inline-radios />
</template>

<template v-slot:code>

<<< @/../component-demos/radio/examples/InlineRadios.vue

</template>
</cdx-demo-wrapper>

## CSS-only version

### Markup structure

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-radio">
		<input id="radio-css-only-1" class="cdx-radio__input" type="radio" name="radio-css-only">
		<span class="cdx-radio__icon"></span>
		<label class="cdx-radio__label" for="radio-css-only-1">
			Radio 1
		</label>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-radio">
	<!-- <input> element with id, type, name, and any other necessary
	attributes. The actual input is visually hidden. -->
	<input id="radio-css-only-1" class="cdx-radio__input" type="radio" name="radio-css-only">
	<!-- Empty span that will be styled to look like a radio input. -->
	<span class="cdx-radio__icon"></span>
	<!-- Label with `for` attribute matching the input's id. -->
	<label class="cdx-radio__label" for="radio-css-only-1">
		Radio 1
	</label>
</span>
```

</template>
</cdx-demo-wrapper>

### Radio group

Native attributes of the `<input>` element can be used. For example:
- Add the `checked` attribute to the `<input>` element if it should be selected initially.
- Add the `disabled` attribute to the `<input>` element if it should be disabled.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-radio">
		<input id="radio-group-css-only-1" class="cdx-radio__input" type="radio" name="radio-group-css-only">
		<span class="cdx-radio__icon"></span>
		<label class="cdx-radio__label" for="radio-group-css-only-1">
			Radio 1
		</label>
	</span>
	<span class="cdx-radio">
		<input id="radio-group-css-only-2" class="cdx-radio__input" type="radio" 	name="radio-group-css-only" checked>
		<span class="cdx-radio__icon"></span>
		<label class="cdx-radio__label" for="radio-group-css-only-2">
			Radio 2 (initially selected)
		</label>
	</span>
	<span class="cdx-radio">
		<input id="radio-group-css-only-3" class="cdx-radio__input" type="radio" name="radio-group-css-only">
		<span class="cdx-radio__icon"></span>
		<label class="cdx-radio__label" for="radio-group-css-only-3">
			Radio 3, which has a very long label that spans onto a second line to
			demonstrate what happens when text wraps
		</label>
	</span>
	<span class="cdx-radio">
		<input id="radio-group-css-only-4" class="cdx-radio__input" type="radio" 	name="radio-group-css-only"	disabled>
		<span class="cdx-radio__icon"></span>
		<label class="cdx-radio__label" for="radio-group-css-only-4">
			Radio 4 (disabled)
		</label>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-radio">
	<input id="radio-group-css-only-1" class="cdx-radio__input" type="radio" name="radio-group-css-only">
	<span class="cdx-radio__icon"></span>
	<label class="cdx-radio__label" for="radio-group-css-only-1">
		Radio 1
	</label>
</span>
<span class="cdx-radio">
	<input id="radio-group-css-only-2" class="cdx-radio__input" type="radio" 	name="radio-group-css-only" checked>
	<span class="cdx-radio__icon"></span>
	<label class="cdx-radio__label" for="radio-group-css-only-2">
		Radio 2 (initially selected)
	</label>
</span>
<span class="cdx-radio">
	<input id="radio-group-css-only-3" class="cdx-radio__input" type="radio" name="radio-group-css-only">
<span class="cdx-radio__icon"></span>
	<label class="cdx-radio__label" for="radio-group-css-only-3">
		Radio 3, which has a very long label that spans onto a second line to
		demonstrate what happens when text wraps
	</label>
</span>
<span class="cdx-radio">
	<input id="radio-group-css-only-4" class="cdx-radio__input" type="radio" 	name="radio-group-css-only"	disabled>
	<span class="cdx-radio__icon"></span>
	<label class="cdx-radio__label" for="radio-group-css-only-4">
		Radio 4 (disabled)
	</label>
</span>
```

</template>
</cdx-demo-wrapper>

### Inline radios

Add the `cdx-radio--inline` class to the root element to get an inline layout.

<cdx-demo-wrapper>
<template v-slot:demo>
	<span class="cdx-radio cdx-radio--inline">
		<input id="radio-group-css-only-inline-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline">
		<span class="cdx-radio__icon"></span>
		<label class="cdx-radio__label" for="radio-group-css-only-inline-1">
			Radio 1
		</label>
	</span>
	<span class="cdx-radio cdx-radio--inline">
		<input id="radio-group-css-only-inline-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline" checked>
		<span class="cdx-radio__icon"></span>
		<label class="cdx-radio__label" for="radio-group-css-only-inline-2">
			Radio 2
		</label>
	</span>
</template>
<template v-slot:code>

```html
<span class="cdx-radio cdx-radio--inline">
	<input id="radio-group-css-only-inline-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline">
	<span class="cdx-radio__icon"></span>
	<label class="cdx-radio__label" for="radio-group-css-only-inline-1">
		Radio 1
	</label>
</span>
<span class="cdx-radio cdx-radio--inline">
	<input id="radio-group-css-only-inline-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-inline" checked>
	<span class="cdx-radio__icon"></span>
	<label class="cdx-radio__label" for="radio-group-css-only-inline-2">
		Radio 2
	</label>
</span>
```

</template>
</cdx-demo-wrapper>
