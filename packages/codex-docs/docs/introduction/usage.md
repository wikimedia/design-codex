# Usage

## Quick start

### Installation

### Using components

### Versioning

### Different builds

Each release contains the following files:
- `codex.es.js`: ES module build of Codex, which uses ES6 `import` and `export` syntax.
- `codex.umd.js`: UMD build of Codex. Can be used in CommonJS or AMD environments, or to put
  the library in the global scope
  - If CommonJS is detected, it uses `require('vue')` and `exports.CdxButton = ...`
  - If AMD is detected, it uses `define(['exports', 'vue'], function(...) { ... })`
  - CommonJS nor AMD is detected, it puts Codex in the global scope at `window.codex`, and
    expects Vue to be at `window.Vue`.
- `codex.style.css`: Styles for all components, for use in left-to-right (LTR) languages
- `codex.style-rtl.css`: Styles for all components, for use in right-to-left (RTL) languages.
  For more information on right-to-left support, see [the section on bidirectionality](#bidirectionality-support)
- `index.d.ts`: Entry point for TypeScript type information; the actual types are defined in
  various `.d.ts` files in the `src/` directory

### Bidirectionality support
Codex has limited support for [bidirectional text](https://en.wikipedia.org/wiki/Bidirectional_text).
It supports pages that are entirely in a left-to-right (LTR) script, or pages that are entirely
in a right-to-left (RTL) script. It does not support pages with a mix of LTR and RTL
content, or pages whose directionality changes at runtime, except in some special cases.

Codex provides two direction-specific stylesheets. On LTR pages, use `codex.style.css`; on RTL
pages, use `codex.style-rtl.css`. Codex does not provide a single stylesheet using attribute
selectors like `[dir='rtl']` to set the right style for each direction, because of the significant
limitations of this approach.

Some Codex components detect the direction of the surrounding content, and adjust their behavior
accordingly, for example in how they respond to the left and right arrow keys. Icons also adjust
to the surrounding direction. For more information on how bidirectionality is handled for icons,
see [the icon documentation](../icons/overview.md#right-to-left-rtl-and-language-support).

For more information on this topic, see [the developer documentation on bidirectionality](../contributing/contributing-code.md#bidirectional-script-support).

## Components

## Design tokens
