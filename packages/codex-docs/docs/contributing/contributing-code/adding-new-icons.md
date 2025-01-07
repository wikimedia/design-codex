<script setup>
import { CdxIcon } from '@wikimedia/codex';
import {
	cdxIconListBullet,
	cdxIconListNumbered,
	cdxIconHelp,
	cdxIconBold
 } from '@wikimedia/codex-icons';

const cdxIconListNumberedWronglyFlipped = {
	ltr: cdxIconListNumbered.ltr,
	shouldFlip: true
};
</script>

# Adding new icons

This guide assumes you've already read through and designed your new icon according to the
style guide's [icon principles](../../style-guide/icons.md#principles),
the [visual style guidelines](../../style-guide/icons.md#visual-style)
and perhaps even followed the [template for creating](../../style-guide/icons.md#creating-icons) the
new one before arriving on this page.

## The basics

When adding a new icon, you should:
- Add the SVG file(s) for the icon to the `packages/codex-icons/src/images/` directory
- Optimize the SVG file(s)
- Add the icon definition to `packages/codex-icons/src/icons.ts`

## Internationalization and localization
In general, we aim to provide universal icons rather than culturally-specific ones. Nonetheless, in
order for the system to put the user into the center, Codex allows specific overrides in its icon
system to support directionality- or language-specific overrides to achieve great usability in many
languages. A few examples of such icons:

- Some icons are horizontally flipped between left-to-right (LTR) and right-to-left (RTL) contexts
- Some icons use different SVGs for LTR and RTL
- Some icons use different SVGs for different languages

This page contains instructions for adding all of these icon variants and more.

## Conventions

### Naming
The icon's name should describe the icon, not its application, e.g. `bell` instead of
`notification`.

Icon files should be named with the icon name in lowerCamelCase, e.g. `fooBar.svg` or
`articleAdd.svg`. If there are multiple SVG files for the same icon, those are named `iconName-suffix.svg`, e.g. `imageAdd-rtl.svg` or `italic-i.svg` (more on this below).

The variable name of the icon definition in `packages/codex-icons/src/icons.ts` should be in
lowerCamelCase and consist of the prefix `cdxIcon` followed by the icon name, e.g.
`cdxIconArticleAdd` for the `articleAdd` icon. Icon definitions in this file are in alphabetical
order.

### SVG conventions
Follow these conventions when crafting SVG files for icons:
- Icons must be 20x20 pixels. Set `width="20" height="20" viewbox="0 0 20 20"` on the `<svg>`
  tag.
- Icons should include a `<title>` tag with the name of the icon.
- Icons must be monochrome (only default black color), and should not hard-code this color. This
  means the `fill` attribute should not be used.

#### SVG optimization

Icons are also optimized using SVGO during the build process. Codex follows
[MediaWiki's SVG coding conventions](https://www.mediawiki.org/wiki/Manual:Coding_conventions/SVG),
which are captured in the `.svgo.config.js` configuration file in the `@wikimedia/codex-icons`
package root folder. Note that this optimization step *overwrites the icon files* in the
`src/images` directory, and removes any `<!-- comments -->` in the SVG files.

To optimize the new icon file(s), run `npm run minify:svg -w @wikimedia/codex-icons` in the root of
the `codex` repository. Be sure to commit the optimized file(s).

## How to add each type of icon

### Simple unidirectional icons
For a simple icon that doesn't vary by directionality (LTR/RTL) or language, add a single SVG
file named in lowerCamelCase, e.g. `articleAdd.svg`, to the `images/` directory. Add an icon
definition to `icons.ts` that looks like this:

```ts
import svgArticleAdd from './images/articleAdd.svg';
export const cdxIconArticleAdd = svgArticleAdd;
```

### Automatically flipped icons
Automatically flipped icons are icons whose RTL version is a perfect mirror image of the LTR
version. For these icons, we only put the LTR version in the repository, and then tell the
browser to flip the icon horizontally in RTL contexts.

<!--
	In the paragraph below, do not allow the <cdx-icon> tags to be at the start of the line!
	Icons at the start of a line are not inlined, but start a new paragraph, which we don't want.
-->
For example, `listBullet.svg ` contains the LTR version of the `listBullet` icon: <cdx-icon :icon="cdxIconListBullet" />.
In RTL contexts, the LTR version is displayed, but is mirrored horizontally: <cdx-icon :icon="cdxIconListBullet" dir="rtl" />.

For these icons, add a single SVG file named in lowerCamelCase, e.g. `listBullet.svg`, to the
`images/` directory. This file contains the LTR version of the icon (but despite that, it doesn't
have a `-ltr` suffix). Add an icon definition to `icons.ts` that looks like this:

```ts
import svgListBullet from './images/listBullet.svg';
export const cdxIconListBullet: IconFlipForRtl = {
	ltr: svgListBullet,
	shouldFlip: true
};
```

#### Per-language exceptions to automatic flipping
For some icons, certain RTL languages need to use the LTR version of an icon. For example, question
marks are flipped in most RTL languages, but not in Hebrew and Yiddish, so icons like `help`
(<cdx-icon :icon="cdxIconHelp" />) that depict a question mark should not be flipped in those
languages. To indicate this, list the RTL languages in which the icon shouldn't be flipped
in the `shouldFlipExceptions` property, like this:
```ts
import svgHelp from './images/help.svg';
export const cdxIconHelp: IconFlipForRtl = {
	ltr: svgHelp,
	shouldFlip: true,
	shouldFlipExceptions: [ 'he', 'yi' ]
};
```

### Icons with different LTR and RTL versions
<!--
	In the paragraph below, do not allow the <cdx-icon> tags to be at the start of the line!
	Icons at the start of a line are not inlined, but start a new paragraph, which we don't want.
-->
For some icons, the RTL version isn't a simple mirror image of the LTR version. For example,
the `listNumbered` icon looks like <cdx-icon :icon="cdxIconListNumbered" /> in LTR. Flipping
it automatically would look wrong, because the numbers would be mirrored too: <cdx-icon :icon="cdxIconListNumberedWronglyFlipped" dir="rtl" />.
Instead, we need a separate SVG file for the RTL version of the icon: <cdx-icon :icon="cdxIconListNumbered" dir="rtl" />.

For these icons, add two SVG files to the `images/` directory named with `-ltr` and `-rtl`
suffixes, e.g. `listNumbered-ltr.svg` and `listNumbered-rtl.svg`. Add an icon definition to
`icons.ts` that looks like this:
```ts
import svgListNumberedLtr from './images/listNumbered-ltr.svg';
import svgListNumberedRtl from './images/listNumbered-rtl.svg';
export const cdxIconListNumbered: IconVariedByDir = {
	ltr: svgListNumberedLtr,
	rtl: svgListNumberedRtl
};
```

### Icons with different versions per language
<!--
	In the paragraph below, do not allow the <cdx-icon> tags to be at the start of the line!
	Icons at the start of a line are not inlined, but start a new paragraph, which we don't want.
-->
Some icons look different in different languages, especially those based on letters. In many cases,
several languages share the same version of the icon. For example, the `bold` icon looks
like <cdx-icon :icon="cdxIconBold" lang="en" /> in Czech, English, Hebrew, Malayalam, Polish and
Scottish, but like <cdx-icon :icon="cdxIconBold" lang="ru" /> in Kirghiz, Russian and Ukrainian, etc.

For these icons, add a separate SVG file for each version of the icon to `images/`, each with a
suffix that describes the variant of the icon. For example, `bold-b.svg`, `bold-f.svg`,
`bold-cyrl-zhe.svg`, etc. There may be many variants; the `bold` icon has 16.

In the icon definition in `icons.ts`, first import all the variant files in alphabetical order,
then define which variant to use for which language, and the default variant to use for all other
languages.

```ts
import svgBoldA from './images/bold-a.svg';
import svgBoldB from './images/bold-b.svg';
import svgBoldCyrlZhe from './images/bold-cyrl-zhe.svg';
// … many more …

export const cdxIconBold: IconVariedByLang = {
	langCodeMap: {
		cs: svgBoldB,
		en: svgBoldB,
		he: svgBoldB,
		ml: svgBoldB,
		pl: svgBoldB,
		sco: svgBoldB,
		ky: svgBoldCyrlZhe,
		ru: svgBoldCyrlZhe,
		uk: svgBoldCyrlZhe,
		// … many more …
	},
	// 'bold-a.svg' will be used for all other languages not listed above.
	default: svgBoldA
};

```

## Testing the new icon

### Lint

After optimizing the SVG file(s), run `npm run lint -w @wikimedia/codex-icons` in the root of
the `codex` repository. This will run `svglint` and will check your additions to `icons.ts`.

### Testing locally

To view the new icon on the Codex docs site, run these commands from the root of the `codex`
repository:

```bash
# Build the icons package.
npm run build -w @wikimedia/codex-icons

# Serve the docs site.
npm run doc:dev
```

Then you can visit `http://localhost:5173/icons/all-icons.html` to view the list of all icons,
including your new one.
