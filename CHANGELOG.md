# 0.1.0-alpha.5 / 2022-03-15
## Features
- Replace useMenu composable with Menu component (Roan Kattouw)
- MenuItem: Change Option to MenuItem (Anne Tomasevich)
- Menu, MenuItem: Add menuConfig, enable boldLabel & hideDescriptionOverflow (Anne Tomasevich)
- MenuItem: Merge in ListTile and reflect updated designs (Anne Tomasevich)
- ToggleButton: add ToggleButton component (DannyS712)
- SearchInput: Add the SearchInput component (Anne Tomasevich)
- build, tokens: Add deprecation functionality to tokens (Volker E.)

## Styles
- Button, styles: Replace attribute with `:enabled`/`:disabled` pseudo classes (Volker E.)
- Combobox, styles: Replace menu styles with `options-menu` mixin (Volker E.)
- Checkbox, Radio, styles: Unify enabled and disabled CSS logic and fix `:active` (Volker E.)
- Button, styles: Remove Button `:focus` outline reset (Volker E.)
- TextInput, styles: Replace attribute with `:enabled`/`:disabled` pseudo classes (Volker E.)
- ToggleSwitch, styles: Unify disabled and enabled CSS logic (Volker E.)
- ToggleSwitch, styles: Remove unused `margin-left` transition (Roan Kattouw)
- styles: Fix `transform` value on center aligned menu item (Volker E.)
- styles: Add button styles mixin to avoid style duplication (DannyS712)
- styles: Remove element selectors (Volker E.)
- Lookup, tokens: Make Lookup component use Codex tokens (Volker E.)
- Message, tokens: Make Message component use Codex tokens (Volker E.)
- Select, tokens: Make Select component use Codex tokens (Volker E.)
- Combobox, tokens: Make Combobox component use Codex tokens (Volker E.)
- Button, tokens: Make Button component use Codex tokens (Volker E.)
- TextInput, tokens: Use `transition-property-base` (Volker E.)
- ListTile, ListTileLabel, tokens: Make ListTile components use Codex tokens (Volker E.)
- Checkbox, Radio, tokens: Make binary input components use Codex tokens (Volker E.)
- ToggleSwitch, tokens: Make toggle switch component use Codex tokens (Volker E.)
- TypeaheadSearch, tokens: Make typeahead search component use Codex tokens (Volker E.)
- styles: Use common file for non-component specific mixins (Volker E.)
- styles: Fix fixed transform on Combobox use of 'menu-icon.less' (Volker E.)
- tokens: Add `transition-property.base` and `.icon` (Volker E.)
- tokens: Explain usage of `position.offset` tokens (Volker E.)
- tokens: Add `color` and `border-color` for message components & validation (Volker E.)
- tokens: Add `margin-top.options-menu` for Options menu (Volker E.)
- tokens: Add binary components specific tokens (Volker E.)
- tokens: Remove `border-radius-rounder` (Volker E.)
- tokens: Add `border-binary-input` shorthand (Volker E.)
- tokens: Add `cursor` property tokens (Volker E.)
- styles, tokens: Replace SFC `cursor` tokens with Codex design tokens (Volker E.)
- tokens: Convert remaining deprecated tokens to new style (Roan Kattouw)
- tokens: Move `color-primary` from base to components (Volker E.)
- tokens: Add `margin-offset-border-width-base` and remove menu component token (Volker E.)
- icons: Skew 'italic-arab-keheh-jeem' and bolden 'bold-arab-dad' icons (Volker E.)

## Code
- Combobox: Remove superfluos `aria-disabled` attribute (Volker E.)
- Select: Set `aria-multiselectable="false"` (Roan Kattouw)
- Lookup: Simplify code (Roan Kattouw)
- useMenu: Remove inputValue feature, replace with updateSelectionOnHighlight (Roan Kattouw)
- useMenu: Remove footerCallback feature (Roan Kattouw)
- TypeaheadSearch: Simplify input change handling (Anne Tomasevich)
- Menu: Fix selectedValue documentation rendering (Roan Kattouw)
- binary inputs: Remove `aria-disabled` overtaken by input's `disabled` (Volker E.)
- binary-input: Remove use of `[ class$='...' ]` selector (Roan Kattouw)
- build: Removing remaining references to 'WikimediaUI Base' and uninstall (Volker E.)
- build: Add "npm run build-all" command, clean up other commands (Roan Kattouw)
- build: Explicitly set stylelint to modern support (Volker E.)
- build: Require all CSS classes to start with `cdx-` (Roan Kattouw)
- build: Update Stylelint packages to latest (Volker E.)
- build: Update 'style-dictionary' to latest (Volker E.)
- build: Enable eslint in hidden directories (Roan Kattouw)
- build, tokens: Make style-dictionary config.js config-only (Roan Kattouw)

## Documentation
- docs: Make tokens table copy button quiet again (Anne Tomasevich)
- demo: Use ToggleSwitch for boolean props in controls (Anne Tomasevich)
- docs: Restructure and provide more details on SVG optimization (Volker E.)
- docs: Standardize on cdx-docs prefix (Anne Tomasevich)
- docs: Normalize component demo formatting and language (Anne Tomasevich)
- docs: Use kebab-case for component names in *.md files (Roan Kattouw)
- docs: Add import statement to imported code snippet example (Roan Kattouw)
- docs: Rename `<Wrapper>` to `<cdx-demo-wrapper>` (Roan Kattouw)
- docs: Replace WikimediaUI Base with Codex design tokens reference (Volker E.)
- docs: Overwrite VitePress theme default html, body font size to `initial` (Volker E.)
- docs: Improve generated events and methods docs (Anne Tomasevich)
- docs, Controls.vue: remove unneeded uses of `<template>` wrappers (DannyS712)
- docs: Use Special:MyLanguage for Code of Conduct link (DannyS712)
- docs: Change "a Code of Conduct" to "the Code of Conduct" (Roan Kattouw)
- docs: Improve demos of components that use menus (Anne Tomasevich)
- docs: Set dir="ltr" on all non-component docs pages (Roan Kattouw)
- docs, ToggleButton: remove unneeded `ref` import from markdown page (DannyS712)
- docs: Normalize to writing “Less” (Volker E.)
- docs, Wrapper: add a "reset" button (DannyS712)
- docs, Wrapper: add a "copy" button for code samples (DannyS712)


# v0.1.0-alpha.4 / 2022-02-18
## Styles
- tokens: Fix `background-color-framed--hover` to set to `#fff` (Volker E.)
- tokens: Update input padding token to match WMUI value (Anne Tomasevich)

## Code
- build: Add 'branch-deploy' npm script, for WMF CI to call (Roan Kattouw)
- build: Bump .nvmrc to 16.9.1 (Roan Kattouw)
- build, icons: Rename LICENSE-MIT to LICENSE (Roan Kattouw)

## Documentation
- docs: Set CODEX_DOC_ROOT default to '/' not '' (James D. Forrester)
- docs: Explain that icons are monochrome, add SVG conventions (Roan Kattouw)
- docs: Make CODEX_DOC_ROOT default to / instead of /codex/main (Roan Kattouw)
- docs: Make Vitepress base URL configurable as an environment variable (Roan Kattouw)
- docs: Explicitly set dir="ltr" on direction switcher (Roan Kattouw)

# v0.1.0-alpha.3 / 2022-02-17
## Features
- ToggleSwitch: Add ToggleSwitch component (Anne Tomasevich)
- TypeaheadSearch: Add `auto-expand-width` prop (Nicholas Ray)
- TypeaheadSearch: Add initial iteration of TypeaheadSearch (Anne Tomasevich)

## Styles
- TextInput, tokens: Make TextInput component use Codex tokens (Volker E.)
- tokens: Add 'input' and 'input-binary' component 'border-color' tokens (Volker E.)
- tokens: Fix `background-color-base--disabled` value (Volker E.)
- tokens: Add 'size-indicator' (Volker E.)
- icons, license: Set to MIT license (Volker E.)

## Code
- build: Change icons CJS build to UMD (Roan Kattouw)
- build, styles: Add further properties to 'stylelint-order' & align code (Volker E.)
- build: Update package-lock.json (Roan Kattouw)
- build: Enable safeBothPrefix for postcss-rtlcss (Roan Kattouw)
- build: Change browserslistrc to `modern-es6-only` (Lucas Werkmeister)
- build: Turn on 'lint:eslint' for JSON configuration files (Volker E.)
- build: Remove trailing whitespace from Codex's README.md (Roan Kattouw)
- build: Update 'package-lock.json' (Lucas Werkmeister)


# v0.1.0-alpha.2 / 2022-02-14
## Code
- build: Un-pin postcss, update to 8.4.6 (Roan Kattouw)
- build: Add LICENSE files to each package (Roan Kattouw)
- build: Copy SVGs to dist/images at the right time (Roan Kattouw)

## Documentation
- docs: Add a README.md file for the Codex package (Roan Kattouw)

# v0.1.0-alpha.1 / 2022-02-14
- Initial release
