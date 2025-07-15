# Codex

Codex is the design system for Wikimedia. The Codex repository contains four packages:

- **Components**: for building usable, accessible, translatable applications. Codex contains
[Vue 3](https://v3.vuejs.org/) components and CSS-only components
- **Design tokens**: for writing styles consistent with the [Codex Design Style Guide for Wikimedia](https://doc.wikimedia.org/codex/latest/style-guide/overview.html)
- **Icons**: a collection of icons with language and directionality variants
- **VitePress site**: for [Codex documentation, Vue component demos, and design token visualization](https://doc.wikimedia.org/codex/latest/)

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

For more information on how to set up and use the library, see the [usage documentation](https://doc.wikimedia.org/codex/latest/using-codex/developing.html).

### Development

Codex development requires the following:

- **Node:** the required version of Node is pinned in `.nvmrc`. To install and use the required version, run `nvm install "$(<.nvmrc)"` then `nvm use` in the root of the repository. **Node Version Manager (NVM)** is a handy tool that lets you install and switch between multiple versions of Node on your machine. This is especially useful when working on multiple projects that depend on different Node versions.<br>[Learn more about NVM on GitHub](https://github.com/nvm-sh/nvm).
- **npm:** version 7 or higher is required to support workspaces. You can install latest version of npm with nvm via `nvm install --latest-npm`.

Helpful commands:

- `npm install` in the root of the repository to install requirements for all workspaces
- `npm run doc:dev` to start the docs site
- `npm run dev` to start the Vite sandbox
- `npm run test:unit -w @wikimedia/codex` to run unit tests for e.g. the codex workspace. [Read more about testing.](https://doc.wikimedia.org/codex/latest/contributing/testing-components.html)

See the [contributing code](https://doc.wikimedia.org/codex/latest/contributing/development-basics.html) guidelines
for more information.

## Contributing

If you'd like to contribute, head over to the [contributing docs](https://doc.wikimedia.org/codex/latest/contributing/overview.html)
to learn about our processes and ways you can contribute.

## Maintainers

Codex is maintained by the [Design System Team](https://www.mediawiki.org/wiki/Design_System_Team)
of the Wikimedia Foundation. It is designed and developed by contributors from the [Wikimedia Foundation](https://wikimediafoundation.org/),
[Wikimedia Deutschland](https://www.wikimedia.de/), and the [Wikimedia](https://www.wikimedia.org/)
volunteer community.

To contact us or to learn more about current and future work, visit our [workboard](https://phabricator.wikimedia.org/project/board/5587/)
or the [Design System Team page](https://www.mediawiki.org/wiki/Design_System_Team) on
mediawiki.org.
