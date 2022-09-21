# Codex

Codex is a toolkit for building user interfaces within the Wikimedia Design System. Codex contains
four packages:

- **Vue 3 components**: for building usable, accessible, translatable [Vue 3](https://v3.vuejs.org/)
  applications
- **Design tokens**: for writing styles consistent with the [Wikimedia Design Style Guide](https://design.wikimedia.org/style-guide/components/links.html)
- **Icons**: a collection of icons with language and directionality variants
- **VitePress site**: for [Codex documentation, Vue component demos, and design token visualization](https://doc.wikimedia.org/codex/main/)

Codex features:
- Wide-ranging support for internationalization and global usage
- Web accessibility compliant (Web Content Accessibility Guidelines 2.1 level AA)
- Comprehensive browser and device support

## Quick start

### Usage
To install:
```sh
npm install --save-dev @wikimedia/codex @wikimedia/codex-icons
```

To use components:
```js
import { CdxButton, CdxTextInput } from '@wikimedia/codex';
```

To use icons:
```js
import { cdxIconAlert, cdxIconNewWindow } from '@wikimedia/codex-icons';
```

For more information on how to set up and use the library, see the [usage documentation](https://doc.wikimedia.org/codex/main/using-codex/usage.html).

### Development

Codex development requires the following:

- **Node:** the required version is pinned in `.nvmrc`. To install and use the required version of
Node, run `nvm install "$(<.nvmrc)"` then `nvm use` in the root of the repository.
- **npm:** version 7 or higher is required to support workspaces; it is not included by default in 
older versions of Node (prior to version 15) and will need to be upgraded manually. You can do this 
with nvm via `nvm install --latest-npm`.

To get started:

- Run `npm install` in the root of the repository to install requirements for all workspaces
- Run `npm run doc:dev` to start the docs site
- Or run `npm run dev` to start the Vite sandbox

See the [contributing code](https://doc.wikimedia.org/codex/main/contributing/contributing-code.html) guidelines
for more information.

## Contributing

If you'd like to contribute, head over to the [contributing docs](https://doc.wikimedia.org/codex/main/contributing/overview.html)
to learn about our processes and ways you can contribute.

## Maintainers

Codex is maintained by the [Design Systems Team](https://www.mediawiki.org/wiki/Design_Systems_Team)
of the Wikimedia Foundation. It is designed and developed by contributors from the [Wikimedia Foundation](https://wikimediafoundation.org/),
[Wikimedia Deutschland](https://www.wikimedia.de/), and the [Wikimedia](https://www.wikimedia.org/)
volunteer community.

To contact us or to learn more about current and future work, visit our [workboard](https://phabricator.wikimedia.org/project/board/5587/)
or the [Design Systems Team page](https://www.mediawiki.org/wiki/Design_Systems_Team) on
mediawiki.org.
