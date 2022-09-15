---
sidebarDepth: 3
---
# Packages

## `@wikimedia/codex`
This package contains Vue components – as building blocks for complex user interfaces.
These components are written for [Vue 3](https://v3.vuejs.org/), and do not work with Vue 2.
Documentation for individual components can be found in the “Components” section.
For example, the documentation for `CdxButton` is at [“Button” page](../components/demos/button.md).

### Exports
The components package exports the following things:
- Vue components. These are named `CdxFooBar` (e.g. `CdxButton`, `CdxTextInput`)
- Composables, which are functions designed to be used with the composition API. These are named
  `useFooBar` (e.g. `useComputedDirection`, `useModelWrapper`).
- TypeScript type definitions used for component props. These don't follow any particular naming
  pattern, but always start with a capital letter (e.g. `ButtonType`, `HTMLDirection`)
    - Note that the `Icon` type, which is used by some components, is not exported here.
      It lives in the [icons package](#wikimedia-codex-icons) instead.

### Files
Releases of the components package contain the following files:
- `codex.es.js`: ES module build of Codex, which uses ES6 `import` and `export` syntax.
- `codex.umd.js`: UMD build of Codex. Can be used in CommonJS or AMD environments, or to put
  the library in the global scope.
  - If CommonJS is detected, it uses `require('vue')` and `exports.CdxButton = ...`
  - If AMD is detected, it uses `define(['exports', 'vue'], function(...) { ... })`
  - If neither CommonJS nor AMD is detected, it puts Codex in the global scope at `window.codex`,
    and expects Vue to be at `window.Vue`.
- `codex.style.css`: Styles for all components, for use in left-to-right (LTR) languages
- `codex.style-rtl.css`: Styles for all components, for use in right-to-left (RTL) languages.
  For more information on right-to-left support, see [the section on bidirectionality](./usage.md#bidirectionality-support)
- `index.d.ts`: Entry point for TypeScript type information; the actual types are defined in
  various `.d.ts` files in the `src/` directory

## `@wikimedia/codex-icons`
This package contains icons that can be used with the components from the Vue components package,
or in other contexts. More detailed information can be found in the
[the icon documentation](../icons/overview.md).

Because the icons package is large, and most applications use a relatively small subset of all icons,
web applications should not send the entire icon package to the browser. Instead, use a bundler that
performs tree shaking (i.e. extracting only those icons used in the application) or some other
technique that minimizes the number of unused icons being sent to the browser.

### Exports
The icons package exports the following things:
- Icons, which are SVG strings or objects wrapping SVG strings. These are named `cdxIconFoo`
  (e.g. `cdxIconAlert`, `cdxIconArrowNext`). See [the list of all icons](../icons/all-icons.md)
  for a complete list of icon names.
- Utility functions for working with icon objects. These are used by the Icon component in the
  components package, but can also be used by any other code that needs to work with icons. To
  distinguish them from icons, the names of these functions do not start with `cdxIcon` (they are
  named `resolveIcon` and `shouldIconFlip`).
- TypeScript type definitions for the `Icon` type and related types

### Files
Releases of the icons package contain the following files:
- `codex-icons.es.js`: ES module build, which uses ES6 `import` and `export` syntax.
- `codex-icons.umd.js`: UMD build. Can be used in CommonJS or AMD environments, or to put the
  icons in the global scope.
  - If CommonJS is detected, it `exports.cdxIconAlert = ...`
  - If AMD is detected, it uses `define(['exports'], function(...) { ... })`
  - If neither CommonJS nor AMD is detected, it puts the icons in the global scope at
    `window['codex-icons']`
- `codex-icons.json`: JSON file with all icon strings and objects, to facilitate use of the icons
  in languages other than JavaScript
- `index.d.ts`: Entry point for the TypeScript type information; refers to `icons.d.ts`, `types.d.ts`
  and `util.d.ts` for the actual type definitions

## `@wikimedia/codex-design-tokens`
The design tokens package is not yet ready for external use at this time.
