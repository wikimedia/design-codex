# Codex icons

This package contains the Codex icons, and utility functions needed to work with them.

## Using icons
To use an icon, import it from this package:
```
// If using ES modules:
import { cdxIconAlert } from 'icons';

// or, if using CommonJS:
const { cdxIconAlert } = require( 'icons' );
```
and pass it to the `CdxIcon` component from the `vue-components` package:
`<CdxIcon :icon="cdxIconAlert">`.

For more detailed usage information, see the documentation in the `vitepress` package.
<!-- TODO link to doc.wikimedia.org once that's up -->

## Building the icons
You will need to build the icons in this package in order to be able to build the `vue-components`
and `vitepress` packages, and to run their development modes. To build the icons, run
`npm run build` in the `packages/icons` directory (or run `npm run -w icons build` in the
root directory).

### Build products
The build process outputs the following files in the `dist/` directory:
- `codex-icons.cjs.js`: All icons and utility functions, in CommonJS format
- `codex-icons.es.js`: All icons and utility functions, in ES module format
- `codex-icons.json`: All icons, in JSON format
- `index.d.ts` and other `.d.ts` files: TypeScript type definitions
- `images/*.svg`: All icons as raw SVG files
