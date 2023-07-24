<script setup>
import RadioGroup from '@/../component-demos/radio/examples/RadioGroup.vue';
import InlineRadios from '@/../component-demos/radio/examples/InlineRadios.vue';
import RadioGroupNoSelection from '@/../component-demos/radio/examples/RadioGroupNoSelection.vue';
import RadiosWithDescriptions from '@/../component-demos/radio/examples/RadiosWithDescriptions.vue';
import RadioGroupField from '@/../component-demos/radio/examples/RadioGroupField.vue';
</script>

## Demos

Open up the browser console to see events emitted on input.

### Label and description

Always include label text via the default slot. You can also add description text via the
`#description` slot.

This demo uses the [Field](./field.md) component—usage of this component is described in the next
section.

<cdx-demo-wrapper :force-controls="true">
<template v-slot:demo>
	<radios-with-descriptions />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/RadiosWithDescriptions.vue [NPM]

<<< @/../component-demos/radio/examples-mw/RadiosWithDescriptions.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Form field

When used in a form, a group of Radios can be wrapped in the Field component to add features like a
semantic label, description and help text, validation messages, and more. See the
[Field](./field.md) page for more information.

When building a Radio field, **always set `isFieldset` to `true`** to ensure proper accessibility
support. This wraps the group in a `<fieldset>` element and labels it with an associated `<legend>`.

If using a Radio group outside of a form, follow the instructions in the next demo.

<cdx-demo-wrapper>
<template v-slot:demo>
	<radio-group-field />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/RadioGroupField.vue [NPM]

<<< @/../component-demos/radio/examples-mw/RadioGroupField.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Radio group

For a group of radios, each Radio component's `v-model` will be bound to the same ref, which is
equal to the `inputValue` prop of the selected Radio. Use the same `name` prop for all of the Radio
components in a group.

This demo shows what to do when using a Radio group outside of a form:
1. Wrap the group in an element with `role="radiogroup"`
2. Connect the group with a label via the `aria-labelledby` attribute

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<radio-group />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/RadioGroup.vue [NPM]

<<< @/../component-demos/radio/examples-mw/RadioGroup.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### Inline radios

Use the `inline` prop to get an inline layout.

<cdx-demo-wrapper>
<template v-slot:demo>
	<inline-radios />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/InlineRadios.vue [NPM]

<<< @/../component-demos/radio/examples-mw/InlineRadios.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

### With no initial selection

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<radio-group-no-selection />
</template>

<template v-slot:code>

:::code-group

<<< @/../component-demos/radio/examples/RadioGroupNoSelection.vue [NPM]

<<< @/../component-demos/radio/examples-mw/RadioGroupNoSelection.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>

## CSS-only version

### Markup structure

The structure below can be used for most cases. If you need a description, see the section on that
feature below.

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

### With description

To add a description below the label:
- Add a span after the `<label>` element with an ID and class `cdx-label__description`. Include the
  description text here.
- Add class `cdx-label__label` to the `<label>` element
- Wrap the label and description in a div with classes `cdx-radio__label` and `cdx-label`
- Add an `aria-describedby` attribute to the `<input>` element with the value of the ID of the
  description

<cdx-demo-wrapper>
<template v-slot:demo>
	<fieldset class="cdx-demo-css-radio-group">
		<legend>Search completion</legend>
		<span class="cdx-radio">
			<input id="radio-group-css-only-description-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-1" checked>
			<span class="cdx-radio__icon"></span>
			<div class="cdx-radio__label cdx-label">
				<label for="radio-group-css-only-description-1" class="cdx-label__label">
					Default (recommended)
				</label>
				<span id="cdx-description-css-1" class="cdx-label__description">
					Corrects up to two typos. Removes redirects that are very similar to the main title.
				</span>
			</div>
		</span>
		<span class="cdx-radio">
			<input id="radio-group-css-only-description-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-2">
			<span class="cdx-radio__icon"></span>
			<div class="cdx-radio__label cdx-label">
				<label for="radio-group-css-only-description-2" class="cdx-label__label">
					Strict mode (advanced)
				</label>
				<span id="cdx-description-css-2" class="cdx-label__description">
					No typo correction. No accent folding. Strict matching.
				</span>
			</div>
		</span>
	</fieldset>
</template>
<template v-slot:code>

```html
<fieldset class="cdx-demo-css-radio-group">
	<legend>Search completion</legend>
	<span class="cdx-radio">
		<input id="radio-group-css-only-description-1" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-1" checked>
		<span class="cdx-radio__icon"></span>
		<div class="cdx-radio__label cdx-label">
			<label for="radio-group-css-only-description-1" class="cdx-label__label">
				Default (recommended)
			</label>
			<span id="cdx-description-css-1" class="cdx-label__description">
				Corrects up to two typos. Removes redirects that are very similar to the main title.
			</span>
		</div>
	</span>
	<span class="cdx-radio">
		<input id="radio-group-css-only-description-2" class="cdx-radio__input" type="radio" name="radio-group-css-only-description" aria-describedby="cdx-description-css-2">
		<span class="cdx-radio__icon"></span>
		<div class="cdx-radio__label cdx-label">
			<label for="radio-group-css-only-description-2" class="cdx-label__label">
				Strict mode (advanced)
			</label>
			<span id="cdx-description-css-2" class="cdx-label__description">
				No typo correction. No accent folding. Strict matching.
			</span>
		</div>
	</span>
</fieldset>
```

:::code-group

```less [NPM]
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-css-radio-group {
	// Reset fieldset styles.
	border: 0;
	padding: 0;

	legend {
		margin-bottom: @spacing-25;
		// Reset legend padding.
		padding: 0;
		font-weight: @font-weight-bold;
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-radio-group {
	// Reset fieldset styles.
	border: 0;
	padding: 0;

	legend {
		margin-bottom: @spacing-25;
		// Reset legend padding.
		padding: 0;
		font-weight: @font-weight-bold;
	}
}
```

:::

</template>
</cdx-demo-wrapper>

### Radio group

Native attributes of the `<input>` element can be used. For example:
- Add the `checked` attribute to the `<input>` element if it should be selected initially.
- Add the `disabled` attribute to the `<input>` element if it should be disabled.

Always include one of these two features for accessible grouping:
1. If using the Radio group in a field, wrap the group in a `<fieldset>` element and add a
  `<legend>` element with the group label. This method is demonstrated below and requires some
  style resets on `<fieldset>` and `<legend>`.
2. If using the Radio group outside of a field, wrap the group in a `<div>` with `role="group"`
  and `aria-labelledby` set to the ID of the group label. See an example of this
  [above](#radio-group) (you can just include a `<label>` element instead of using the Label
  component).

<cdx-demo-wrapper>
<template v-slot:demo>
	<fieldset class="cdx-demo-css-radio-group">
		<legend>
			CSS-only Radio group demo
		</legend>
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
	</fieldset>
</template>
<template v-slot:code>

```html
<fieldset class="cdx-demo-css-radio-group">
	<legend>
		CSS-only Radio group demo
	</legend>
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
</fieldset>
```

:::code-group

```less [NPM]
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-css-radio-group {
	// Reset fieldset styles.
	border: 0;
	padding: 0;

	legend {
		margin-bottom: @spacing-25;
		// Reset legend padding.
		padding: 0;
		font-weight: @font-weight-bold;
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-radio-group {
	// Reset fieldset styles.
	border: 0;
	padding: 0;

	legend {
		margin-bottom: @spacing-25;
		// Reset legend padding.
		padding: 0;
		font-weight: @font-weight-bold;
	}
}
```

:::

</template>
</cdx-demo-wrapper>

### Inline radios

Add the `cdx-radio--inline` class to the root element to get an inline layout.

<cdx-demo-wrapper>
<template v-slot:demo>
	<fieldset class="cdx-demo-css-radio-group">
		<legend>
			CSS-only inline Radio demo
		</legend>
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
	</fieldset>
</template>
<template v-slot:code>

```html
<fieldset class="cdx-demo-css-radio-group">
	<legend>
		CSS-only inline Radio demo
	</legend>
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
</fieldset>
```

:::code-group

```less [NPM]
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-css-radio-group {
	// Reset fieldset styles.
	border: 0;
	padding: 0;

	legend {
		margin-bottom: @spacing-25;
		// Reset legend padding.
		padding: 0;
		font-weight: @font-weight-bold;
	}
}
```

```less [MediaWiki]
@import 'mediawiki.skin.variables.less';

.cdx-demo-css-radio-group {
	// Reset fieldset styles.
	border: 0;
	padding: 0;

	legend {
		margin-bottom: @spacing-25;
		// Reset legend padding.
		padding: 0;
		font-weight: @font-weight-bold;
	}
}
```

:::

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

:deep( .cdx-demo-css-radio-group ) {
	// Reset fieldset styles.
	border: 0;
	padding: 0;

	legend {
		margin-bottom: @spacing-25;
		padding: 0;
		font-weight: @font-weight-bold;
	}
}
</style>
