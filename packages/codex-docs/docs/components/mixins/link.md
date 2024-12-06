---
outline: [ 2, 3 ]
---

<script setup>
// Note that this file is temporarily located here so we can quickly get a page up documenting the
// link mixin. It will be moved to a more permanent location once we determine a final documentation
// structure for component mixins.
import { CdxIcon, CdxAccordion } from '@wikimedia/codex';
import { cdxIconLinkExternal } from '@wikimedia/codex-icons';
</script>

# Link
A Link navigates the user to another page, view or section, when the user presses it.

## Overview

### When to use Link

Use the Link component when you need to provide users with a clickable element to navigate to a different page, resource, or section in the same page.

Apart from links that navigate to other pages, there are the following different links:

- Links that open a modal instead of a new page (e.g. map links)
- Links that open a file instead of a web page (e.g. PDF or document links)
- Links that cause something to happen that the user would otherwise not expect (e.g. play a sound, like pronunciation links)
- Links that open a new website instead of just a new page [(external links)](https://en.wikipedia.org/wiki/Wikipedia:External_links)
- Links that open a non-web protocol URI (e.g. `mailto:`, `tel:` links)

Several Wikimedia Movement projects provide extensive [“manuals of style”](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Linking) for applying and designing for links, for example English Wikipedia.

Avoid using Link when the user needs to perform an action. In such cases, use
[Button](../demos/button.md) instead. Learn more about the [usage of links and buttons](../../style-guide/using-links-and-buttons.md).

### About Link

Link includes the following element.

#### Link text

The text that describes the link destination as clearly as possible.

By default, the Link text style is set to the base font in regular. However, it can be easily customized to other styles by applying any of the existing fonts, text sizes or formats defined in our [font design tokens](../../design-tokens/font.md).

<cdx-demo-best-practices>
<cdx-demo-best-practice>

Highlight only the phrase that indicates the link destination. [*Translatable*](../../style-guide/writing-for-copy.html#is-this-translatable)

</cdx-demo-best-practice>
<cdx-demo-best-practice type="dont">

Avoid using the words click, tap or here. Avoiding these terms makes things clear and precise, whether the reader is using an assistive device, a mobile device or a desktop experience. [*Accessible*](../../style-guide/writing-for-copy.html#is-this-accessible)

</cdx-demo-best-practice>
</cdx-demo-best-practices>

## Examples

Visit a link to see visited link styles.

### Base Link

Base Links signal to users the option to navigate to a different page, view, or resource.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<p>The cat (Felis catus) is a <a class="cdx-docs-link" href="https://en.wikipedia.org/wiki/Species">domestic species</a> of small <a class="cdx-docs-link" href="https://en.wikipedia.org/wiki/Carnivore">carnivorous mammal</a>.</p>
</template>

<template v-slot:code>

:::code-group

```vue [NPM]
<template>
	<p>
		The cat (Felis catus) is a <a class="cdx-docs-link" href="https://en.wikipedia.org/wiki/Species">domestic species</a>
		of small <a class="cdx-docs-link" href="https://en.wikipedia.org/wiki/Carnivore">carnivorous mammal</a>.
	</p>
</template>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

```vue [MediaWiki]
<template>
	<p>
		The cat (Felis catus) is a <a class="cdx-docs-link" href="https://en.wikipedia.org/wiki/Species">domestic species</a>
		of small <a class="cdx-docs-link" href="https://en.wikipedia.org/wiki/Carnivore">carnivorous mammal</a>.
	</p>
</template>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

:::

</template>
</cdx-demo-wrapper>

### Underlined Link

By default, Links are only underlined when they are interacted with (hover over or pressed). To suit user preferences and for accessibility reasons, Links can always be underlined.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<p>As a <a class="cdx-docs-link is-underlined" href="https://en.wikipedia.org/wiki/Predation">predator</a>, it is <a class="cdx-docs-link is-underlined" href="https://en.wikipedia.org/wiki/Crepuscular_animal">crepuscular</a>, i.e. most active at dawn and dusk.</p>
</template>

<template v-slot:code>

:::code-group

```vue [NPM]
<template>
	<p>
		As a <a class="cdx-docs-link is-underlined" href="https://en.wikipedia.org/wiki/Predation">predator</a>,
		it is <a class="cdx-docs-link is-underlined" href="https://en.wikipedia.org/wiki/Crepuscular_animal">crepuscular</a>,
		i.e. most active at dawn and dusk.
	</p>
</template>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

```vue [MediaWiki]
<template>
	<p>
		As a <a class="cdx-docs-link is-underlined" href="https://en.wikipedia.org/wiki/Predation">predator</a>,
		it is <a class="cdx-docs-link is-underlined" href="https://en.wikipedia.org/wiki/Crepuscular_animal">crepuscular</a>,
		i.e. most active at dawn and dusk.
	</p>
</template>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

:::

</template>
</cdx-demo-wrapper>

### External Link

The external link icon indicates that the link will take the user to a different website. This icon cannot be replaced with other icons.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<p>According to <a class="cdx-docs-link is-underlined" href="https://archive.org/details/completebookofca00behr/page/28/mode/2up">"Living with a Cat"<cdx-icon :icon="cdxIconLinkExternal" /></a>, cats are ready to go to new homes at about 12 weeks of age.</p>
</template>

<template v-slot:code>

:::code-group

```vue [NPM]
<template>
	<p>
		According to
		<a class="cdx-docs-link is-underlined" href="https://archive.org/details/completebookofca00behr/page/28/mode/2up">
			"Living with a Cat" <cdx-icon :icon="cdxIconLinkExternal" />
		</a>,
		cats are ready to go to new homes at about 12 weeks of age.
	</p>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import { cdxIconLinkExternal } from '@wikimedia/codex-icons';

export default {
	components: { CdxIcon },
	setup() {
		return {
			cdxIconLinkExternal
		};
	}
};
</script>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();

	// stylelint-disable-next-line selector-class-pattern
	.cdx-icon {
		color: inherit;
	}
}
</style>
```

```vue [MediaWiki]
<template>
	<p>
		According to
		<a class="cdx-docs-link is-underlined" href="https://archive.org/details/completebookofca00behr/page/28/mode/2up">
			"Living with a Cat" <cdx-icon :icon="cdxIconLinkExternal"></cdx-icon>
		</a>,
		cats are ready to go to new homes at about 12 weeks of age.
	</p>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconLinkExternal } = require( '@wikimedia/codex-icons' );

module.exports = defineComponent( {
	components: { CdxIcon },
	setup() {
		return {
			cdxIconLinkExternal
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link {
	.cdx-mixin-link();

	// stylelint-disable-next-line selector-class-pattern
	.cdx-icon {
		color: inherit;
	}
}
</style>
```

:::

</template>
</cdx-demo-wrapper>

### Red Link

[Red links](https://en.wikipedia.org/wiki/Wikipedia:Red_link#When_to_create_red_links) navigate to pages that do not exist yet.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<p>Websites for cat lovers include <a class="cdx-docs-link is-red-link" href="https://en.wikipedia.org/w/index.php?title=The_Catnip_Times">The Catnip Times</a> and <a class="cdx-docs-link is-red-link" href="https://en.wikipedia.org/w/index.php?title=Vanggy">Vanggy</a>.</p>
</template>

<template v-slot:code>

:::code-group

```vue [NPM]
<template>
	<p>
		Websites for cat lovers include <a class="cdx-docs-link is-red-link" href="https://en.wikipedia.org/w/index.php?title=The_Catnip_Times">The Catnip Times</a>
		and <a class="cdx-docs-link is-red-link" href="https://en.wikipedia.org/w/index.php?title=Vanggy">Vanggy</a>.
	</p>
</template>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

```vue [MediaWiki]
<template>
	<p>
		Websites for cat lovers include <a class="cdx-docs-link is-red-link" href="https://en.wikipedia.org/w/index.php?title=The_Catnip_Times">The Catnip Times</a>
		and <a class="cdx-docs-link is-red-link" href="https://en.wikipedia.org/w/index.php?title=Vanggy">Vanggy</a>.
	</p>
</template>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

:::

</template>
</cdx-demo-wrapper>

## Technical implementation

### Less mixin usage

:::tip Less mixin
This component has been implemented as a [Less mixin](https://lesscss.org/features/#mixins-feature),
not a Vue component. This mixin must be imported separately in your Less styles. See below for
[usage information](#usage).
:::

:::warning
Before importing the Link mixin, you must first import the design tokens. If you don't, you
will get errors that look like `variable @color-progressive is undefined`.
:::

### Default usage

To use base, underlined, and red Link styles, apply the `.cdx-mixin-link()` mixin to a link
class or to all anchor elements. This will automatically apply underline styles to links with the
`.is-underlined` class, and red link styles to links with the `.is-red-link` class.

<cdx-demo-wrapper :allow-link-styles="true">
<template v-slot:demo>
	<p>In <a class="cdx-docs-link" href="#">ancient Egypt</a>, cats were worshipped.</p>
	<p>In <a class="cdx-docs-link is-underlined" href="#">ancient Egypt</a>, cats were worshipped.</p>
	<p>In <a class="cdx-docs-link is-red-link" href="#">ancient Egypt</a>, cats were worshipped.</p>
</template>

<template v-slot:code>

:::code-group

```vue [NPM]
<template>
	<p>In <a class="cdx-docs-link" href="#">ancient Egypt</a>, cats were worshipped.</p>
	<p>In <a class="cdx-docs-link is-underlined" href="#">ancient Egypt</a>, cats were worshipped.</p>
	<p>In <a class="cdx-docs-link is-red-link" href="#">ancient Egypt</a>, cats were worshipped.</p>
</template>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

```vue [MediaWiki]
<template>
	<p>In <a class="cdx-docs-link" href="#">ancient Egypt</a>, cats were worshipped.</p>
	<p>In <a class="cdx-docs-link is-underlined" href="#">ancient Egypt</a>, cats were worshipped.</p>
	<p>In <a class="cdx-docs-link is-red-link" href="#">ancient Egypt</a>, cats were worshipped.</p>
</template>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

:::

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
		<p>The domestic cat is a <a href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
		<p>The domestic cat is a <a class="cdx-docs-link-with-underline" href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
		<p>The domestic cat is a <a class="cdx-docs-red-link" href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
	</div>
</template>

<template v-slot:code>

:::code-group

```vue [NPM]
<template>
	<div class="cdx-docs-link-wrapper">
		<p>The domestic cat is a <a href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
		<p>The domestic cat is a <a class="cdx-docs-link-with-underline" href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
		<p>The domestic cat is a <a class="cdx-docs-red-link" href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
	</div>
</template>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

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

```vue [MediaWiki]
<template>
	<div class="cdx-docs-link-wrapper">
		<p>The domestic cat is a <a href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
		<p>The domestic cat is a <a class="cdx-docs-link-with-underline" href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
		<p>The domestic cat is a <a class="cdx-docs-red-link" href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
	</div>
</template>

<style lang="less">
@import 'mediawiki.skin.variables.less';

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

:::

</template>
</cdx-demo-wrapper>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

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

### Keyboard navigation

| Key | Function |
| -- | -- |
| <kbd>Enter</kbd> | If the Link is focused, it opens the Link. |