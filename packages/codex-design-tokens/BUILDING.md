# Building from source

You will need to build the tokens in this package to be able to build the `codex`
and `codex-docs` packages, and to run their development modes.

To build the tokens, run
`npm run build` in the `packages/codex-design-tokens` directory (or run
`npm run -w @wikimedia/codex-design-tokens build` in the root directory).

## Build products

The build process outputs the following files in the `dist/` directory:
- `theme-wikimedia-ui.css`: The tokens as CSS variables (e.g. `--color-placeholder: #72777d;`)
- `theme-wikimedia-ui.less`: The tokens as Less variables (e.g. `@color-placeholder: #72777d;`)
- `theme-wikimedia-ui.scss`: The tokens as SASS variables (e.g. `$color-placeholder: #72777d;`)
- `theme-wikimedia-ui.json`: A JSON structure with detailed data about each token