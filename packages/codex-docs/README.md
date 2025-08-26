# Codex docs

The Codex docs site is built with [VitePress](https://vitepress.vuejs.org/), a static site generator
built with [Vite](https://vitejs.dev/) as build tool and Vue 3. The code in this package is used to
build our live documentation site.

## Development site

In the root of the Codex monorepo, run:

```
npm run doc:dev
```

This will serve the VitePress Codex docs site locally at http://localhost:5173.

## Writing docs

General docs are located in the `docs/` directory. `docs/index.md` is the landing page of the static
site, and other docs are organized into folders.

Docs are written in Markdown, refer to the [VitePress docs](https://vitepress.vuejs.org/guide/markdown.html)
for details.

### Updating the sidebar

The sidebar is configured in docs/.vitepress/config.js.

### Component demos

Refer to the [developer docs](./docs/contributing/contributing-code.md#component-demos) for details about how to create and work with component demos. It's important to note that the files in `docs/components` are generated
by `vue-docgen-cli`; component demos are set up outside the `docs/` directory in `component-demos/`.

## Configuration

### VitePress config

General site information and sidebar configuration are housed in `docs/.vitepress/config.js`. Refer to the [VitePress docs](https://vitepress.vuejs.org/config/basics.html) or the
[`Config` type definition](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/config.ts)
for more info.

### Theme config

`docs/.vitepress/theme` contains the following:
1. `index.js`, which defines the theme (we're using the default theme) and any changes we want to
   make to it. For example, we can import custom components here, which will be available in all the
   docs.
2. `custom.css`, which contains theme variable overrides and global styles for the demo site.

### Vite config

VitePress uses Vite for building and serving the live Codex docs site. Configuration can be
overridden via `docs/vite.config.ts`. For example, you can add
[Vite plugins](https://vitejs.dev/plugins/) here.

### Standalone Demos

Vite is also used to build the component demos in a stand-alone mode, suitable for embedding them
in a MediaWiki environment (useful for QA-ing Codex components in a more production-like setup).

The Vite config used to build standalone demos lives in the workspace root: `vite.config.ts`.
Running `npm build-demos` in this workspace will output bundled JS and CSS files in `/dist` that
are suitable for importing into another project.
