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

When adding a new icon, you should:
- Add the `.svg` file(s) for the icon to the `packages/codex-icons/src/images/` directory
- Add the icon definition to `packages/codex-icons/src/icons.ts`

## Icon naming
Icon names in `icons.ts` have the form `cdxIconFooBar`, (e.g. `cdxIconFullScreen`). The
corresponding icon files have the same name but in lowerCamelCase, e.g. `fooBar.svg` or
`fullScreen.svg`. If there are multiple SVG files for the same icon, those are named
`iconName-suffix.svg`, e.g. `imageAdd-rtl.svg` or `italic-i.svg`.

## Simple icons
For a simple icon that doesn't vary by directionality (LTR/RTL) or language, use a single `.svg`
file named in lowerCamelCase, e.g. `fullScreen.svg`. Add an icon definition to `icons.ts`
that looks like this:
```ts
import svgAdd from './images/add.svg';
export const cdxIconAdd = svgAdd;
```

## Automatically flipped icons
Automatically flipped icons are icons whose RTL version is a perfect mirror image of the LTR
version. For these icons, we only put the LTR version in the repository, and then tell the
browser to flip the icon horizontally in RTL contexts.

For example, `listBullet.svg ` contains the LTR version of the `listBullet` icon:
<cdx-icon :icon="cdxIconListBullet" />. In RTL contexts, the LTR version is displayed, but is
mirrored horizontally: <cdx-icon :icon="cdxIconListBullet" dir="rtl" />.

For these icons, use a single `.svg` file named in lowerCamelCase, e.g. `listBullet.svg`.
This file contains the LTR version of the icon (but despite that, it doesn't have a `-ltr` suffix).
Add an icon definition to `icons.ts` that looks like this:
```ts
import svgListBullet from './images/listBullet.svg';
export const cdxIconListBullet: IconFlipForRtl = {
	ltr: svgListBullet,
	shouldFlip: true
};
```

### Per-language exceptions to automatic flipping
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

## Icons with different LTR and RTL versions
For some icons, the RTL version isn't a simple mirror image of the LTR version. For example,
the `listNumbered` icon looks like <cdx-icon :icon="cdxIconListNumbered" /> in LTR. Flipping
it automatically would look wrong, because the numbers would be mirrored too:
<cdx-icon :icon="cdxIconListNumberedWronglyFlipped" dir="rtl" />. Instead, we need a separate
SVG file for the RTL version of the icon: <cdx-icon :icon="cdxIconListNumbered" dir="rtl" />.

For these icons, use two SVG files named with `-ltr` and `-rtl` suffixes, e.g. `listNumbered-ltr.svg`
and `listNumbered-rtl.svg`. Add an icon definition to `icons.ts` that looks like this:
```ts
import svgListNumberedLtr from './images/listNumbered-ltr.svg';
import svgListNumberedRtl from './images/listNumbered-rtl.svg';
export const cdxIconListNumbered: IconVariedByDir = {
	ltr: svgListNumberedLtr,
	rtl: svgListNumberedRtl
};
```

## Icons with different versions per language
Some icons look different in different languages, especially those based on letters. In many cases,
several languages share the same version of the icon. For example, the `bold` icon looks like
<cdx-icon :icon="cdxIconBold" lang="en" /> in Czech, English, Hebrew, Malayalam, Polish and Scottish,
but like <cdx-icon :icon="cdxIconBold" lang="ru" /> in Kirghiz, Russian and Ukranian, etc.

For these icons, use a separate SVG file for each version of the icon, each with a suffix that
describes the variant of the icon. For example, `bold-b.svg`, `bold-f.svg`, `bold-cyrl-zhe.svg`, etc.
There may be many variants; the `bold` icon has 16.

In the icon definition in `icons.ts`, first import all the variant files in alphabetical order,
then define which variant to use for which language, and the default variant to use for all other
languages.

```ts
import svgBoldA from './images/bold-a.svg';
import svgBoldB from './images/bold-b.svg';
import svgBoldCyrlZhe from './images/bold-cyrl-zhe.svg';
// ... many more ...

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
		// ... many more ...
	},
	// bold-a.svg will be used for all other languages not listed above
	default: svgBoldA
};

```