<script setup>
import * as allIcons from '@wikimedia/codex-icons';
import { cdxIconJournal, cdxIconBold, cdxIconTrash } from '@wikimedia/codex-icons';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import tokens from '@wikimedia/codex-design-tokens/theme-wikimedia-ui.json';

// Filter out util functions
const numberOfIcons = Object.keys( allIcons )
	.filter( ( iconName ) => iconName.startsWith( 'cdxIcon' ) )
	.length;
</script>

# Icons

Codex contains a collection of {{ numberOfIcons }} icons that can be used to convey actions
or other information visually. See [all icons](./all-icons.md) a full list of available icons per
directionality and language.

If you're interested in adding a new icon to Codex, visit the contributing docs to learn about
[designing new icons](../contributing/designing-icons.md) and
[implementing new icons](../contributing/contributing-code/adding-new-icons.md) in the
`@wikimedia/codex-icons` package.

## Using icons

Import icons from the `@wikimedia/codex-icons` package individually, like this:
```typescript
import { cdxIconAlert } from '@wikimedia/codex-icons';
```

Use icons through the [icon component](../components/demos/icon.md) or through other components
that accept icons as props. You can also embed the icon component in another component's slot;
for example, you can use the icon component inside the button component to create a button with
an icon. For complete code examples of how to use icons, see the [demos](../components/demos/icon.md#demos)
in the icon component documentation.

### Icon labels
When an icon appears without immediately adjacent text that makes it clear what the icon means,
you should provide an *icon label*. The icon label is used by screen readers and other assistive
technology as replacement text for the icon. Most browsers also display it as a tooltip when the
user hovers over the icon. If no icon label is set, the icon is hidden from assistive technology
using the `aria-hidden` attribute.

::: info Note
**The icon label is invisible**, it's not rendered as visible text next to the icon.
To render an icon followed by text, put the text outside of the icon component, like in the second
example below.
:::

You **have to** provide an icon label when there is no other text explaining what the icon means.
For example:
```vue-html
<cdx-button action="destructive">
	<cdx-icon :icon="cdxIconTrash" icon-label="delete" />
</cdx-button>
```
The code above displays <cdx-button action="destructive"><cdx-icon :icon="cdxIconTrash" icon-label="delete" /></cdx-button>,
which is read by assistive technology as `delete`.


You **should not** provide an icon label when there is other text explaining the same thing that
the icon does, and the icon text would be duplicative. For example:
```vue-html
<cdx-button action="destructive">
	<cdx-icon :icon="cdxIconTrash" /> Delete this file
</cdx-button>
```
The code above displays <cdx-button action="destructive"><cdx-icon :icon="cdxIconTrash" /> Delete this file</cdx-button>.
Assistive technology software skips over the icon and just read `Delete this file`, which still
makes it clear what the button does. If you added `icon-label="delete"` here, a screen reader would
read `delete Delete this file`, which is not a good experience for assistive technology users.

## Icon colors
All icons are *monochrome*, meaning the entire icon is the same color. By default, CdxIcon
components use the
base color (`{{ tokens.color.base.value }}`), but this can be overridden by changing the
`color` property of the `.cdx-icon` element in CSS. For example:
```css
.my-important-component .cdx-icon {
	color: #36c;
}
```
Note that the SVG inherits the CdxIcon `color` by applying `fill: currentColor`.<br>
Some components style their icons to match the surrounding text color. For example,
[CdxButton](../components/demos/button.md) features red icons matching the red
(`{{ tokens.color.destructive.value }}`) text in its destructive variant.

## Right-to-left (RTL) and language support
Many icons have different versions for left-to-right (LTR) and right-to-left (RTL) contexts.
For example, `cdxIconJournal` looks like <cdx-icon :icon="cdxIconJournal" dir="ltr" /> in
LTR, but looks like <cdx-icon :icon="cdxIconJournal" dir="rtl" /> in RTL. The icon component
automatically detects the direction of its environment, and chooses the correct icon accordingly.
For example, if `<cdx-icon :icon="cdxIconJournal" />` appears on a page that is RTL, or inside of
a `<div dir="rtl">` tag, the RTL version of the icon will be displayed.

<!--
	In the paragraph below, do not allow the <cdx-icon> tags to be at the start of the line!
	Icons at the start of a line are not inlined, but start a new paragraph, which we don't want.
-->
Similarly, some icons have different versions for different languages. For example, `cdxIconBold`
looks like <cdx-icon :icon="cdxIconBold" lang="en" /> in English, but looks
like <cdx-icon :icon="cdxIconBold" lang="fr" /> in French. The icon component also automatically
detects the language of its environment, so if for example `<cdx-icon :icon="cdxIconBold" />`
appears on a page that has `<html lang="fr">` at the root, or inside of a `<p lang="fr">`,
the French version of the icon will be displayed.

### Limitations and override
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