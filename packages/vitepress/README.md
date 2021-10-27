# Codex docs

The Codex docs site is built with [VitePress](https://vitepress.vuejs.org/), a static site generator
built with Vite and Vue 3. The code in this package is used to build our live documentation site.

## Dev site

In the root of the Codex monorepo, run:

```
npm run doc:dev
```

This will serve the VitePress site locally at http://localhost:3000.

## Writing docs

General docs are located in the `docs/` directory. `docs/index.md` is the landing page of the static 
site, and other docs are organized into folders.

Docs are written in Markdown, see the [VitePress docs](https://vitepress.vuejs.org/guide/markdown.html)
for details.

### Updating the sidebar

The sidebar is configured in docs/.vitepress/config.js.

### Component demos

See the [developer docs](./docs/contributing/contributing-code.md#component-demos) for details about how to create and work with component demos. It's important to note that the files in `docs/components` are generated
by `vue-docgen-cli`; component demos are set up outside the `docs/` directory in `component-demos/`.

## Configuration

### VitePress config

General site information and sidebar configuration are housed in `docs/.vitepress/config.js`. See
the [VitePress docs](https://vitepress.vuejs.org/config/basics.html) or the
[`Config` type definition](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/config.ts)
for more info.

### Theme config

`docs/.vitepress/theme` contains the following:
1. `index.js`, which defines the theme (we're using the default theme) and any changes we want to
   make to it. For example, we can import custom components here, which will be available in all the
   docs.
2. `custom.css`, which contains theme variable overrides and global styles for the demo site.

### Vite config

Vitepress's Vite configuration can be overridden via `docs/vite.config.ts`. For example, you can add
Vite plugins here.
