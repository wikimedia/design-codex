# Codex

Codex is a toolkit for building user interfaces within the Wikimedia Design System. Codex contains
three packages:

- **Vue 3 components**: for building usable, accessible, translatable [Vue 3](https://v3.vuejs.org/)
  applications
- **Design tokens**: for writing styles consistent with the [Wikimedia Design Style Guide](https://design.wikimedia.org/style-guide/components/links.html)
- **VitePress site**: for [Codex documentation, Vue component demos, and design token visualization](https://doc.wikimedia.org/codex/main/)

Codex features:
- Wide-ranging support for internationalization and global usage
- Web accessibility compliant (Web Content Accessibility Guidelines 2.1 level AA)
- Comprehensive browser and device support

## Quick start

### Usage

TODO: basic usage info, then link to further info in the docs

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

See the [contributing code](/packages/vitepress/docs/contributing/contributing-code.md) guidelines
for more information.

## Contributing

If you'd like to contribute, head over to the [contributing docs](/packages/vitepress/docs/contributing/guidelines.md)
to learn about our processes and ways you can contribute.

## Maintainers

Codex is maintained by the Design Systems Team of the Wikimedia Foundation. It is designed and
developed by contributors from the Wikimedia Foundation, Wikimedia Deutschland, and the Wikimedia
volunteer community.

To contact us or to learn more about current and future work, visit our [workboard](https://phabricator.wikimedia.org/project/board/5587/)
or the [Design Systems Team page](https://www.mediawiki.org/wiki/Design_Systems_Team) on
mediawiki.org.
