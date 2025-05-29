---
outline: [2,3]
---

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

Codex contains a collection of {{ numberOfIcons }} monochrome icons that can be used to visually
convey actions or other information. Visit [all icons](./all-icons.md) a full list of available
icons per directionality and language.

If you're interested in adding a new icon to Codex, visit the contributing docs to learn about
[contributing new icons](../contributing/contributing-icons.md) in the
`@wikimedia/codex-icons` package.

## Using icons

Use icons through the [Icon component](../components/demos/icon.md) or through other components
that accept icons as props. You can also embed the icon component in another component's slot;
for example, you can use the icon component inside the button component to create a button with
an icon.

### NPM package

See the [installation](../using-codex/developing.html#installation) and [using icons](../using-codex/developing.html#using-icons) documentation for information about how to use Codex icons in
your application.

### In MediaWiki

Learn how to [use Codex icons in MediaWiki](https://www.mediawiki.org/wiki/Codex#Using_Codex_icons).

## Resources

- Learn how to [contribute or request an icon](../contributing/overview.html)
- Read about [adding new Codex icons](../contributing/contributing-icons.html)
