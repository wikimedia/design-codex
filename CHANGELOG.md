# 0.5.0 / 2023-01-31

## Features
- InfoChip, Message: Introduce InfoChip component and StatusType constant (Julia Kieserman)
- Icon: Add Less mixin for CSS-only icons (Anne Tomasevich)
- Message: Add CSS-only version (Anne Tomasevich)
- Checkbox, Radio: Add CSS-only versions (Anne Tomasevich)
- Select: Add CSS-only version (Anne Tomasevich)
- Message: Replace 'check' with 'success' icon on success type messages (Volker E)
- build: Build legacy versions of the Codex styles (Roan Kattouw)

## Styles
- build, tokens, styles: Introduce simple stylesheet unit transform (Roan Kattouw)
- tokens, styles: Introduce design-first `font-size` tokens (Volker E)
- tokens: Make `position-offset` token relative & replace offset SFC vars (Volker E)
- tokens: Rename icon token sizes keys according to design (Volker E)
- docs, binary inputs: Improve docs and use a token for label padding (Anne Tomasevich)
- binary input, styles: Use spacing token for padding (Volker E)
- binary input: Remove obsolete `size-icon-small` token (Volker E)
- styles, pending state: Replace relative font size SFCs with token (Volker E)

## Icons
- icons: Add 'success' (Volker E)
- icons: Add Wikimedia logos (Volker E)

## Code
- Combobox, Lookup: Add aria-controls attribute (Lucas Werkmeister)
- Tab: Expose disabled state with `aria-disabled` (Volker E)
- Icon: Don't add aria-hidden=false (Kosta Harlan)
- InfoChip: Follow-up fixes (Eric Gardner)
- InfoChip: Re-name component to InfoChip (Eric Gardner)
- build: Updating eslint to 8.31.0 (libraryupgrader)
- Add .idea (JetBrains IDEs) to .gitignore (Kosta Harlan)
- build: Use shared Vite config for the demos build (Roan Kattouw)
- build: Update 'eslint' dependency and its dependencies (Volker E)

## Documentation
- docs: Move SVGO preset JSON file to the public/ directory (Roan Kattouw)
- README: Add note about running unit tests for a workspace (Kosta Harlan)
- docs: Remove oversized relative size token demos from table (Volker E)
- docs: Improve documentation of CSS-only components (Anne Tomasevich)
- docs: Align Menu demos with keyboard navigation standards (Anne Tomasevich)
- docs: Update types and constants docs to reflect new StatusType (Anne Tomasevich)
- docs: Unify token headings (Volker E)
- docs: Add warning about CSS-only components (Anne Tomasevich)

# 0.4.3 / 2023-01-10

## Styles
- styles, Tabs: Increase specificity of list item margin rule (Anne Tomasevich)
- styles, Dialog: Set heading padding to 0 (Anne Tomasevich)
- ToggleSwitch, styles: Replace SFC absolute positioning var with token (Volker E)
- Card, styles: Remove wrongly applied SFC variable (Volker E)
- styles: Unify to `.cdx-mixin-` as used elsewhere (Volker E)
- tokens: Group absolute dimension and size tokens (Volker E)
- tokens: Add `accent-color` (Volker E)
- tokens: Rename drop shadow token to `box-shadow-drop-xx-large` (Volker E)
- tokens, styles: Add `min-width-medium` to TextInputs and Select (Volker E)
- tokens: Introduce small icon and min size component tokens (Volker E)
- tokens: Use calculated value instead of `calc()` (Volker E)

## Code
- build: Update typescript-eslint (Roan Kattouw)
- build: Add diff-release.sh for previewing release diffs (Roan Kattouw)
- build: Updating json5 to 2.2.2 (libraryupgrader)

## Documentation
- docs: Add mw.org update and thanking contributors to RELEASING.md (Anne Tomasevich)
- docs: Reorder “Designing…” navigation items (Volker E)
- docs: Fix slot binding docs (Anne Tomasevich)
- docs, tokens: Apply `line-height` tokens everywhere (Volker E)

# 0.4.2 / 2022-12-13

## Code
- build: Fix ID prefixing in icons (Roan Kattouw)

# 0.4.1 / 2022-12-13

## Features
- Lookup: Prevent the spacebar from opening the lookup dropdown menu, but only ever having the default behavior of adding a space character. (ddw)
- Combobox, TypeaheadSearch: Always allow default behavior of space key for menu components with text inputs. (ddw)

## Code
- build: Update SVGO to v3.0.2 (Volker E)
- build: Enable `transition-duration` token only linting (Volker E)
- build: Enable checkJs in the icons package (Roan Kattouw)
- build: Update TypeScript and vue-tsc (Roan Kattouw)

## Documentation
- docs: Add tokens package to releasing and Codex documentation (Volker E)
- docs: Update intro card icons (Volker E)
- docs: Add “Designing new components” documentation (Volker E)
- docs: Amend “Designing Icons” page with latest designer feedback (Volker E)
- docs: Add “Redesigning existing components” documentation (Volker E)
- docs: Add “Designing tokens” documentation (Volker E)
- docs: Expand Design System Design Tokens overview (Volker E)
- docs: Update design contribution docs for consistency (Anne Tomasevich)
- docs: Amend design tokens overview with latest comments (Volker E)
- docs: Put “Reset demo” button at bottom (Volker E)

# 0.4.0 / 2022-12-06

## Features
- MenuItem: Add supportingText prop (Anne Tomasevich)

## Styles
- Dialog: Prevent skins from breaking header styles (Eric Gardner)
- Menu: Remove -1px margin-top from menu (Anne Tomasevich)
- MenuItem, docs: Fix CSS workaround for Menu absolute positioning (Roan Kattouw)
- styles: Make mixin imports consistent (Roan Kattouw)
- tokens, styles: Add `animation-iteration-count*` tokens and apply (Volker E)
- tokens: Add `tab-size` token (Volker E)
- tokens: Add tests for getTokenType (Roan Kattouw)
- tokens: Amend Yellow 600 color option token and add Yellow 500 (Volker E)

## Icons
- icons: Optimize 'palette' icon's file size (Volker E)

## Code
- build, tokens: Rename index.json to theme-wikimedia-ui.json (Roan Kattouw)
- build: Add the design-tokens package to the RELEASING.md docs (Roan Kattouw)
- build: Correct file extension in tokens README (Anne Tomasevich)
- build: Correctly align "engine" requirements with Wikimedia CI (Roan Kattouw)
- build: Ensure build-demos script resolves token paths correctly (Eric Gardner)
- build: Remove 'dist/' from import paths for mixin and tokens files (Roan Kattouw)
- build: Updating decode-uri-component to 0.2.2 (libraryupgrader)

## Documentation
- docs, Dialog: Use normal configurable setup for Dialog demo (Anne Tomasevich)
- docs: Add banners for main branch and deployment previews (Anne Tomasevich)
- docs: Amending “Designing icons” (Volker E)
- docs: Demonstrate good TypeScript practices in LookupWithFetch example (Roan Kattouw)
- docs: Document the output of the tokens package, and add a README (Roan Kattouw)
- docs: Link to the latest docs site instead of the main branch one (Roan Kattouw)
- docs: Move SVGO preset JSON file out of assets/ directory (Roan Kattouw)
- docs: Prevent VitePress from treating the link to latest as internal (Roan Kattouw)
- docs: Spell out directions and improve radio controls (Anne Tomasevich)
- docs: Update VitePress to 1.0.0-alpha.29 (Roan Kattouw)
- docs: Update one more link to /main to /latest (Anne Tomasevich)

# 0.3.0 / 2022-11-22

## Features
- Menu, TypeaheadSearch: Dedicated sticky footer in the Menu component (Michael Große)
- ProgressBar: Add disabled state, refine styles and demos (Volker E)
- Treat submits with selected search result like clicks (Lucas Werkmeister)
- TextInput: Add error state to TextInput component (Julia Kieserman)
- Button: Unify active state behavior (Anne Tomasevich)
- ToggleButton: Unify active state behavior (Anne Tomasevich)
- Dialog: prepare basic Dialog for release (Eric Gardner)

## Styles
- Remove property with deprecated value `break-word` (Volker E)
- Tabs, styles: Make Tab list styles more specific (Volker E)
- Tabs, styles: Don't let external list item `margin`s bleed in (Volker E)
- Message, styles: Replace SFC variable with design token (Volker E)
- Link, docs: Apply design fixes (Volker E)
- styles: Replace SFC variables with design-first size tokens (Volker E)
- styles: Replace SFC variables with design-first spacing tokens (Volker E)
- Apply `line-height` design-first tokens (Volker E)
- MenuItem: Reset line-height to @line-height-x-small (Anne Tomasevich)
- Message: Replace SFC var and align content vertically (Volker E)
- CdxTextInput: error status uses progressive palette for focus (Julia Kieserman)
- styles, docs: Standardize Less mixin parameters naming (Volker E)
- styles: Replace and remove obsolete SFC variables (Volker E)
- styles, Menu: Move footer border-top to the Menu component (Anne Tomasevich)
- styles: Use consistently `list-style` shorthand (Volker E)
- styles: Remove `z-index` option token usage (Volker E)
- tokens, styles: Add `size` and `spacing` design-first tokens (Volker E)
- tokens: Amend design-first `line-height` tokens to latest (Volker E)
- tokens: Put deprecated tokens at the bottom of CSS/Less/Sass output (Roan Kattouw)
- tokens: Replace `max-width.breakpoint` token refs with `size.absolute-1` (Volker E)
- tokens, Button: Rename to `background-color-button-quiet*` tokens (Volker E)
- tokens: Add `spacing-400` token (Volker E)
- tokens: Add `spacing-30` and `spacing-35` decision tokens and apply (Volker E)
- tokens: Introduce `font-family` (legacy) tokens (Volker E)
- tokens: Don't output theme tokens in CSS/Less/Sass output (Roan Kattouw)

## Code
- Dialog: Defer access to window.innerHeight until mount time (Roan Kattouw)
- Dialog: Ensure border-box is used for layout (Eric Gardner)
- Icon, docs: Move `fill: currentColor` to CSS (Volker E)
- build: Support HMR for public mixins in the docs site (Roan Kattouw)
- build: Set Style Dictionary `basePxFontSize` to 16px for all web outputs (Volker E)
- Build: Bundle component demos using Vite library mode (Eric Gardner)
- build: Expand Stylelint 'properties-order' property list (Volker E)
- build: Update root '.editorconfig' and remove single package one (Volker E)
- build: Change Stylelint configuration file format to JS (Volker E)
- build, styles: Introduce 'stylelint-declaration-strict-value' plugin (Volker E)
- build: Updating stylelint to 14.14.0 (libraryupgrader)
- build: Actually eslint files in hidden directories (Roan Kattouw)
- build: Update codex package to TypeScript 4.8.2 (Roan Kattouw)
- build: Enable TypeScript in the tokens package (Roan Kattouw)
- build: Update 'stylelint-*' packages and 'postcss-html' (Volker E)
- build: Update 'node' and 'npm' versions in 'engine' (Volker E)
- Upgrade vue-tsc to a more recent version (Eric Gardner)

## Documentation
- docs, Link: Add page for the Link mixin (Anne Tomasevich)
- docs, Link: Add wrapper class to code sample (Anne Tomasevich)
- docs: Fix typo and expand abbreviations (Volker E)
- docs: Reset VitePress' opinionated anchor styles (Volker E)
- docs: Use <style lang="less">, not <style>, for Less blocks (Roan Kattouw)
- docs: Deduplicate results from Wikidata in demos (Michael Große)
- docs, Menu: Add more docs on the new footer prop (Anne Tomasevich)
- docs: Remove obsolete token comment in Thumbnail (Volker E)
- docs: Update opacity token demo (Volker E)
- docs: Expand explanation on component tokens (Volker E)
- docs: Replace calculation with spacing token (Volker E)
- docs: Add dir to controls, and apply to every component page (Anne Tomasevich)
- docs: Fix direction control for configurable Dialog demo (Anne Tomasevich)
- docs: Add extra padding to the bottom of the demo pane (Anne Tomasevich)
- docs, styles: Replace non-existent token for nav spacing (Anne Tomasevich)

# 0.2.2 / 2022-10-25
## Features
- Link: implement Codex link styles as Less mixins (Eric Gardner)
- Link: Make selectors flexible (Roan Kattouw)

## Styles
- Combobox, styles: Fix expand button icon size (Volker E.)
- Dialog, styles: Use design spec `transition` tokens (Volker E.)
- Tabs, styles: Remove obsolete `@text-decoration-none` SFC var (Volker E.)
- ToggleSwitch, styles: Fix disabled label color (Volker E.)
- ToggleButtonGroup, styles: Combine focus shadow and white border shadow (Roan Kattouw)
- styles, components: Replace falsely applied or deprecated tokens (Volker E.)
- styles: Use `outline` override on all of `:focus` (Volker E.)
- styles, docs: Apply `code` styling (Volker E.)
- styles, docs: Replace static `text-decoration` values with Codex tokens (Volker E.)
- tokens: Add comments to legacy opacity icon tokens on color equivalents (Volker E.)
- tokens: Amend `background-color-framed--active` (Volker E.)
- tokens: Add design-first `line-height` tokens (Volker E.)
- tokens: Deprecate component `background-color-primary*` tokens (Volker E.)
- tokens: Add design-first `text-decoration` tokens (Volker E.)
- tokens, docs: Replace deprecated background-color-primary token (Volker E.)
- tokens, docs: Replace deprecated design tokens (Volker E.)
- tokens: Use proper theme reference to `text-decoration` values & demo (Volker E.)
- tokens: Add design-first Dialog backdrop background color tokens (Volker E.)

## Code
- Combobox: bubble up the `load-more` event (Noa wmde)
- Dialog: Introduce Dialog component, useResizeObserver (Eric Gardner)
- Dialog, docs: Clarify Safari hack documentation (Volker E.)
- Dialog: MVP Design Fixes (Eric Gardner)
- LookupFetchDemo: refactor to be more extensible (Michael Große)
- Menu: Add configurable scroll behavior (Michael Große)
- Menu: Emit 'load-more' event when close to the end (Michael Große)
- Select: bubble up the `load-more` event (Noa wmde)
- TextInput: Suppress keydown events for Home/End (Roan Kattouw)
- TypeaheadSearch: adjust to support configurable scroll & load more (Noa wmde)
- TypeaheadSearch: Allow customization of autocapitalize attribute (Jon Robson)
- TypeaheadSearchWikidataDemo: refactor to make fetch more reusable (Michael Große)
- TypeaheadSearchWikidataDemo: add infinite scroll behavior (Michael Große)
- build: Allow async/await in TypeScript and Vue code (Roan Kattouw)
- build: Point docs tsconfig to lib-wip.ts, not the .d.ts file (Roan Kattouw)
- build: Disable Cypress tests for now (Roan Kattouw)
- build: Exclude WIP code from test coverage threshold (Roan Kattouw)
- build: Enable stylelint for Markdown files (Volker E.)
- build: Bump .nvmrc to node v16.16.0 (Volker E.)
- build: Move Vite plugin for copying mixins into its own file (Roan Kattouw)
- build: Restructure shared Vite config between codex and codex-search (Roan Kattouw)
- build: Convert Vite config files back to TypeScript (Roan Kattouw)
- tests: Add cypress browser test for Menu component scroll functionality (Michael Große)

## Documentation
- docs: Make top section headings consistent (Anne Tomasevich)
- docs: Add link to code review process (Anne Tomasevich)
- docs: Link to Codex docs on mediawiki.org (Anne Tomasevich)
- docs: Call out icons package in README (Anne Tomasevich)
- docs: Move generated components demos and add an overview page (Anne Tomasevich)
- docs: Fix WIP component detection in sidebar (Roan Kattouw)
- docs: Add links to “Maintainers” section (Volker E.)
- docs: Update WIP components docs (Roan Kattouw)
- docs: Add contact section to “About” (Volker E.)
- docs: Rename navigation label to “Architecture Decisions” (Volker E.)
- docs: Add note on what a 'breaking change' means (Volker E.)
- docs: Restructure Codex docs introduction page 'index.md' (Volker E.)
- docs: Use note for invisible label (Volker E.)
- docs: Unset link styles (Anne Tomasevich)
- docs, Menu: Separate menu scroll into its own demo (Anne Tomasevich)
- docs: Clean up Menu example files (Anne Tomasevich)
- docs, Menu: Improve display of number input (Anne Tomasevich)
- docs: Document types and constants (Anne Tomasevich)
- docs: Add “Designing Icons” to “Contributing” section (Volker E.)
- docs: Reposition deprecation “tag” of design tokens (Volker E.)
- docs, Dialog: Add Dialog types to docs page (Anne Tomasevich)
- docs: Add visibleItemLimit to MenuConfig docs (Anne Tomasevich)
- docs: Add more scrolling demos and load-more docs (Anne Tomasevich)
- docs: Add a link to usage bidirectionality support to all icons list (Volker E.)
- docs: Use Card styles (and its design tokens) on footer pager cards (Volker E.)

# 0.2.1 / 2022-09-13

## Styles
- tokens: Fix `background-color-quiet` and also deprecate (Volker E)

# 0.2.0 / 2022-09-13
## Features
- TypeaheadSearch: Expand input on menu open (Anne Tomasevich)
- TypeaheadSearch: Remove active class (Anne Tomasevich)

## Styles
- styles, docs: Use and document solely `--has-` and `--is-` prefixes (Volker E)
- tokens: Add 'maroon' color option token and Red Link component tokens (Volker E)

# Icons
- icons: Add 'palette' to collection (Volker E)
- icons: Minimize search icon (Thiemo Kreuz)

## Code
- build: Fix bug list steps to actually work (Roan Kattouw)
- build: Update TypeScript to 4.8 (Roan Kattouw)
- build: Update VitePress from 1.0.0-alpha.10 to 1.0.0-alpha.13 (Roan Kattouw)

## Documentation
- docs: ADR 04 - Visual styles as Less mixins (Eric Gardner)
- docs: Add `alt` attribute to docs logo (Volker E)
- docs: Add announcement to releasing docs (Anne Tomasevich)
- docs: Document WIP components and contribution pathways (Anne Tomasevich)
- docs: Fix landing page links (Anne Tomasevich)
- docs: Hide direction switcher (Anne Tomasevich)
- docs: Refactor site architecture (Anne Tomasevich)
- docs: Split contributing code docs into multiple pages (Anne Tomasevich)

# 0.1.1 / 2022-08-31

## Code
- build: Don't build .d.ts files for demos and WIP components (Roan Kattouw)
- build: Add bug list and LibraryUpgrader steps to RELEASING.md (Roan Kattouw)
- build: Skip diff-css.sh when not running in CI (Roan Kattouw)
- build: Upgrade Vite to v3.0.9 (Roan Kattouw)

# 0.1.0 / 2022-08-30

## Features
- Lookup: When input is empty, clear pending state, and don't reopen menu (Roan Kattouw)
- ButtonGroup: Use box-shadow instead of border between disabled buttons (Roan Kattouw)

## Styles
- ButtonGroup: Increase z-indexes to avoid using z-index: -1; (Roan Kattouw)
- styles, Tabs: Don't emphasise being clickable on already selected Tab (Volker E)
- styles, Card: Unset text-decoration on focus (Anne Tomasevich)
- styles, docs: Rename and clarify icon-wrapper-padding mixin (Volker E)
- styles, docs: Expand on pending-state mixin usage and replace vars (Volker E)
- styles, demo: Use Codex breakpoint token (Volker E)
- styles, docs: Improve more styles after the VitePress update (Anne Tomasevich)
- styles: Unify on `cdx-mixin-` Less mixin prefix (Volker E)
- tokens: Add small top and start box-shadow decision tokens (Volker E)
- tokens: Add design-first breakpoints tokens (Volker E)

## Code
- types: Export MenuState type, reorder types in lib.ts (Roan Kattouw)
- build: Add separate entry point for components in development (Roan Kattouw)
- tests: Reorganize Checkbox tests per new standards (Anne Tomasevich)
- tests: reorganize Lookup tests per new standards (Anne Tomasevich)

## Documentation
- docs, Thumbnail: Update "placeholder" language (Anne Tomasevich)
- docs: Don't error when a component-demos .md file doesn't exist (Roan Kattouw)
- docs: Use TypeScript for Vitepress config and theme files (Roan Kattouw)
- docs: Use better TypeScript types for vue-docgen templates (Roan Kattouw)
- docs: Use IconLookup component for Select's defaultIcon prop (Anne Tomasevich)
- docs: Flag development components, hide them in release docs (Roan Kattouw)
- docs: Standardize JEST unit test names and structure (Simone This Dot)
- docs, tokens: Show deprecated tag even if there is no token demo (Roan Kattouw)
- docs, tokens: Exclude breakpoint tokens from the size token docs (Roan Kattouw)
- docs: Reword alpha warning (Roan Kattouw)
- docs: Update VitePress (Anne Tomasevich)
- docs: Remove VitePress list style in the demo pane (Anne Tomasevich)

# 0.1.0-alpha.10 / 2022-08-16

## Features
- TypeaheadSearch: Open menu on new results, even if empty (Roan Kattouw)
- ButtonGroup: Initial implementation (Roan Kattouw)
- ToggleButtonGroup: Initial implementation (Roan Kattouw)
- DirectionSwitcher: Use ToggleButtonGroup now that it exists (Roan Kattouw)
- ButtonGroup: Add overflowing demo, fix styling (Roan Kattouw)
- ToggleButtonGroup: Add maximum example, icon-only example (Roan Kattouw)
- ButtonGroup, ToggleButtonGroup: Straighten white lines between buttons (Roan Kattouw)
- ButtonGroup: Apply rounded corners to groups, not buttons (Roan Kattouw)
- icons: Update icons to the latest optimizations (Volker E)
- CopyTextButton: Use Clipboard API when available to copy code (Abijeet Patro)
- icons: Update 'info' icon to newest design (Volker E)

## Styles
- styles, tokens: Replace SFC `border-color` tokens (Volker E)
- styles, tokens: Introduce `border-color-subtle` and replace SFC token (Volker E)
- styles: Remove SVG title from background image (Volker E)
- styles, Card: Add background color (Anne Tomasevich)
- tokens, styles: Add further cursor tokens on theme option and base level (Volker E)
- tokens, demos: Mark deprecated tokens loud and clear (Volker E)
- tokens: As demo features “Deprecated” prefix now, don't repeat yourself (Volker E)
- tokens, demos: Put deprecated tokens always at bottom (Volker E)
- tokens: Use design-first Color decision tokens (Volker E)
- tokens: Use design-first Border Color decision tokens (Volker E)
- tokens: Amend `color-notice` value (Volker E)
- tokens: Amend `modifier-gray200-translucent` value (Volker E)
- tokens: Use design-first Background Color decision tokens (Volker E)
- tokens, styles, ToggleSwitch: Cleanup tokens and styles applied (Volker E)

## Code
- Tabs: Improve tests (Roan Kattouw)
- Re-organize and improve component sandbox page (Eric Gardner)
- build: Update Vue from 3.2.33 to 3.2.37 (Roan Kattouw)
- build: Upgrade eslint to 0.23.0 and make pass (Roan Kattouw)
- build: Run build-all-if-missing in "npm coverage" (Roan Kattouw)
- build: Publish the sandbox alongside Netlify deployment previews (Roan Kattouw)
- build: Add script to generate a CSS diff for a change (Roan Kattouw)
- build: Run diff-css.sh in npm test (Roan Kattouw)
- build: Add "style" field to package.json (Roan Kattouw)
- build: Make Vite port configurable, listen on all IPs (Roan Kattouw)

## Documentation
- docs: Add links to task templates and explain component scoping process (Anne Tomasevich)
- docs, utils: factor out getIconByName() utility (DannyS712)
- docs: Clarify how search query highlighting works (Anne Tomasevich)
- docs, component demos: add getEventLogger() utility (DannyS712)
- docs, Controls: simplify splitting of props and slot controls (DannyS712)
- docs, tests: add relevant types, nonexistent keys Thumbnail objects (DannyS712)

# 0.1.0-alpha.9 / 2022-07-28

## Features
- Button: Add full support for icon-only buttons (Simone This Dot)
- Thumbnail: Add Thumbnail component (Anne Tomasevich)
- MenuItem: Use the Thumbnail component (Anne Tomasevich)
- icons: Add 'copy'/'cut'/'paste' (Volker E)
- TypeaheadSearch: Remove space when no-results slot is empty (Steven Sun)
- Card: Add initial Card component (Anne Tomasevich)
- Menu: Add Home/End keyboard button support (Simone This Dot)
- TypeaheadSearch: Remove border-top on footer when it's the only menu item (Steven Sun)
- Tabs: Make icon-only scroll buttons `aria-hidden` (Anne Tomasevich)

## Styles
- styles, ProgressBar: Fix border radius overflow in Safari (Anne Tomasevich)
- styles, Checkbox, ToggleSwitch: Simplify state styles hierarchy (Volker E)
- styles, TypeaheadSearch: Correct padding of footer's icon (Simone Cuomo)
- tokens: Introduce `box-shadow-color` decision tokens (Volker E)
- tokens: Replace legacy `@box-shadow` tokens with new combination tokens (Volker E)
- tokens: Add new typographic system fonts to stack (Volker E)

## Code
- MenuItem: Remove unused tokens (Anne Tomasevich)
- Thumbnail: clean up testThumbnail in tests (DannyS712)
- Button: Improve icon-only button detection, and add tests (Roan Kattouw)
- Button: Ignore whitespace-only text nodes when detecting icon-only-ness (Roan Kattouw)
- Button: Unify on “icon-only” label for that type (Volker E)
- build: Update 'style-dictionary' to latest v3.7.1 (Volker E)
- build: Update package-lock.json for style-dictionary upgrade (Roan Kattouw)
- build: Update 'less', 'postcss*' and 'autoprefixer' dependencies (Volker E)
- Build: Update netlify-cli, update minimist vulnerability (Eric Gardner)
- build: gitignore .vscode directory for settings files (Anne Tomasevich)
- build: Update netlify-cli to v10.10.2 (Roan Kattouw)

## Documentation
- docs: Clarify commit message category order (Volker E)
- docs: Expand on marking deprecating and breaking changes in commit msg (Volker E)
- docs, Controls: reduce duplication using `<component>` and `:is` (DannyS712)
- docs: Correct language about deprecating/breaking change prefix (Roan Kattouw)
- docs: Update CSS class names on tokens demos (Volker E)
- docs: Update border-radius-pill demo (Volker E)
- docs, composables: factor out useCurrentComponentName() composable (DannyS712)
- docs: Guide users to the repo (Kosta Harlan)
- docs: Separate search-no-results-text in TypeaheadSearch demo (Steven Sun)
- docs: Add step to releasing docs to document breaking changes (Anne Tomasevich)

# 0.1.0-alpha.8 / 2022-06-23

## Breaking changes
- refactor: Fix inconsistencies across components with menu items (Simone This Dot)

## Features
- Menu: Highlight the selected item when menu is opened (Anne Tomasevich)
- Menu, Typeahead: Apply MenuItem selected styles to Menu footer (Simone This Dot)
- TextInput: Remove focus tracking state, replace with --has-value class (Roan Kattouw)
- MenuItem: Remove highlighted and active styles on mouseleave (Anne Tomasevich)
- ToggleSwitch: Component is squashed when it has a long default label (Simone This Dot)
- Combobox: Apply `aria-hidden` on button (Volker E)
- MenuItem: Display placeholder thumbnails before images are loaded (Simone This Dot)
- MenuItem: Align icon and thumbnail to top with description (Anne Tomasevich)
- MenuItem: Reduce transition duration of thumbnail (Anne Tomasevich)
- Menu: Refine `active` binding of default slot (Anne Tomasevich)

## Styles
- styles, buttons: Unify whitespace and property order (Volker E)
- Select, TextInput, styles: Unify `outline` values (Volker E)
- styles, TextInput: Add border width to icon position offset values (Anne Tomasevich)
- Button, styles: Reorder and cleanup focus styles (Volker E)
- Button, styles: Removing default button `:active` selector (Volker E)
- styles, ToggleSwitch: Unify applying pointer `cursor` (Volker E)
- styles: Apply design-first `box-shadow` tokens (Volker E)
- styles, TextInput: Use `min-height-base` instead of `height-base` (Volker E)
- styles, TypeaheadSearch: Reduce footer font size (Anne Tomasevich)
- tokens: Fix quiet active background-color value (Volker E)
- tokens, styles: Use `transition-property-base` for ToggleSwitch focus (Volker E)
- tokens, styles: Replace `animation` property values with tokens (Volker E)
- tokens: Use design-first `box-shadow` tokens (Volker E)
- tokens: Add `transition-property-toggle-switch-grip` token and apply (Volker E)

## Code
- tests: Fix Tabs down arrow test by using `attachTo: 'body'` (Roan Kattouw)
- build: Lower target browsers to include Edge 18 (Volker E)
- build: Update Vue to 3.2.33 (Anne Tomasevich)

## Documentation
- docs: Tidy up CHANGELOG a bit (DannyS712)
- docs: Expand on using Vite (Volker E)
- docs: Add 'AUTHORS.txt' (Volker E)
- docs: Add `aria-label` to slot and prop `input`s (Volker E)
- docs: Update intro and contributing guidelines (Anne Tomasevich)
- docs, IconLookup: Add `aria-label` to icon lookup props and slots (Anne Tomasevich)

# 0.1.0-alpha.7 / 2022-06-09

## Features
- Button, ToggleButton: Text overflow from button is larger than max width (Simone This Dot)
- Combobox: Remove useless tabindex="0" on the input (Roan Kattouw)
- Lookup: Update menu items when item is selected (Simone This Dot)
- Select: Remove arrow indicator direction change when menu is expanded (Volker E)
- Tabs: Add scroll buttons (Roan Kattouw)
- TextInput: Allow clear and end icons to coexist (Anne Tomasevich)
- TypeaheadSearch: Remove hover effect from button (Roan Kattouw)

## Styles
- Style: Refactor icon positioning in TypeaheadSearch using mixin (Simone This Dot)
- styles, docs: Enforce specific CSS properties over shorthand (Volker E)
- Tabs, styles: Consistently apply margins to `<a>` elements (Roan Kattouw)
- styles: Use consistent border-bottom on item with dropdown menus (Simone This Dot)
- Select, styles: Introduce `.cdx-select--enabled` class and align states (Volker E)
- TypeaheadSearch, styles: Fix auto-expand distance (Anne Tomasevich)
- MenuItem, TypeaheadSearch, styles: Fix link style overrides (Anne Tomasevich)
- MenuItem - Fix style for Menu with custom menu item (Simone This Dot)
- SearchResultTitle, styles: remove properties for consistency with MenuItem label (Anne Tomasevich)
- Tabs, tokens, styles: Use `rgba()` over transparent for background color (Volker E)
- tokens: Follow new color palette naming scheme for design-first tokens (Volker E)
- tokens: Use design-first `border` tokens (Volker E)

## Code
- useGeneratedId: no need to return a reference (DannyS712)
- useStringHelpers: export helpers directly instead of in a function (DannyS712)
- codex, utils: create directory and rename utils.ts and useStringHelpers.ts (DannyS712)
- utils, tests: add tests for stringTypeValidator.ts (DannyS712)
- build: Add codex-search package to prepare-release.sh (Roan Kattouw)
- build: Add a new script to simplify the creation of snapshot (Simone This Dot)

## Documentation
- docs: Clarify that Vue needs to be installed to use Codex (Roan Kattouw)
- docs, Wrapper: simplify highlighting of generated code (DannyS712)
- docs, Tabs: Update Tabs demos (Anne Tomasevich)
- docs: add generic configurable component for using v-model (DannyS712)
- docs, ConfigurableGeneric: `<component>` can be self closing (DannyS712)
- docs, Wrapper: minor simplification and cleanup (DannyS712)
- docs, SlotIcon: avoid `as` for typescript type of iconsByName (DannyS712)
- docs, Wrapper: include v-model in generated code sample (DannyS712)
- docs: Restructure tokens overview documentation and inter-link (Volker E)
- docs, sidebar: fix design tokens order (DannyS712)
- docs, SizeDemo: document css property values, simplify (DannyS712)
- docs, codegen: default slot never requires `<template>` wrapper (DannyS712)
- docs, Button: remove a number of selection demo variations (DannyS712)
- docs, CdxDocsFontDemo: remove unneeded less import (DannyS712)
- docs, RELEASING: update explanation of creating tag patch (DannyS712)
- docs, tests: add tests for ConfigurableGeneric (DannyS712)
- docs: Remove link override styles for demos (Anne Tomasevich)
- docs: separate 'default' property values from initial values to use (DannyS712)
- docs: Expand “ADRs” menu label slightly (Volker E)
- docs, tokens: add generic CdxDocsTokenDemo for demonstrations (DannyS712)
- docs, tokens: deduplicate styles in CdxDocsTokenDemo (DannyS712)
- docs, MenuItem: add configurable menu item demo (DannyS712)
- docs: Add instructions for updating MediaWiki to RELEASING.md (Roan Kattouw)
- docs: Clarify browser support (Volker E)
- Combobox, docs: Add disabled demo (Roan Kattouw)

# 0.1.0-alpha.6 / 2022-05-12

## Features
- Lookup: Use pending and focus states to decide whether to open the menu (Roan Kattouw)
- Menu, TypeaheadSearch: Add inline progress bar (Anne Tomasevich)
- Menu, TypeaheadSearch: Remove selectHighlighted prop (Eric Gardner)
- Menu: Change footer slot to no-results (Anne Tomasevich)
- Menu: Fix keyboard navigation after expanding menu by click (Steven Sun)
- MenuItem: Reorganize and improve color styles (Anne Tomasevich)
- MenuItem: Support language attributes (Anne Tomasevich)
- Message: Update component to meet design spec (Anne Tomasevich)
- Message: Add auto-dismiss functionality and improve demos (Anne Tomasevich)
- ProgressBar: add progress bar component with indeterminate state (DannyS712)
- ProgressBar: add inline variant (Anne Tomasevich)
- Tabs: Introduce Tab and Tabs components, useIntersectionObserver (Eric Gardner)
- ToggleButton: add quiet type (DannyS712)

## Styles
- binary inputs, styles: Fix hover cursor behavior (Volker E)
- tokens, Button: Fix applied quiet progressive border token (Volker E)
- Checkbox: Don't apply checked styles to indeterminate inputs (Anne Tomasevich)
- Checkbox: Vertically center indeterminate icon (line) (Volker E)
- MenuItem: Update thumbnail styles (Anne Tomasevich)
- Message: Use opacity-transparent token now that it exists (Roan Kattouw)
- Message: Fix mobile padding and transition styles (Anne Tomasevich)
- ProgressBar: Update indeterminate animation (Anne Tomasevich)
- SearchInput: Fix border radius and button border behavior (Anne Tomasevich)
- Tabs: Fix broken header hover styles in Chrome (Eric Gardner)
- Tabs: Adjust styles to follow design and simplify selector logic (Volker E)
- Tabs: Apply correct borders on hover/active (Roan Kattouw)
- Tabs, styles: Add `frameless` variant CSS class (Volker E)
- Tabs, styles: Rename 'frameless' to 'quiet' (Volker E)
- TextInput: Update TextInput styles to match design spec (Anne Tomasevich)
- ToggleButton: Update quiet styles and make focusable (Roan Kattouw)
- Typeaheadsearch, style: Remove border-top for no-results text (Steven Sun)
- styles: Introduce `screen-reader-text()` mixin (Volker E)
- styles: Add `.text-overflow()` mixin and use in MenuItem (Volker E)
- styles: Add `hyphens` mixin and apply (Volker E)
- styles: Use CSS 3 notation for pseudo-elements (Volker E)
- styles: Don't use transition-duration: @transition-base (Roan Kattouw)
- styles: Use comment style consistently (Volker E)
- styles: Centralize "start icon padding" style logic (Simone This Dot)
- styles: Replace obsolete notation of keyframes (Volker E)
- tokens, ToggleSwitch: Remove `box-shadow-input-binary` (Volker E)
- tokens: Add token type to JSON attributes (Roan Kattouw)
- tokens: Don't refer to theme tokens in deprecation comments (Roan Kattouw)
- tokens: Use correct color in 'modifier-base80-translucent' (Volker E)
- tokens: Add legacy `opacity` tokens (Volker E)
- tokens: Add `0.30` valued opacity token and update naming (Volker E)
- tokens: Use 'user' as name for human initiated timing function token (Volker E)
- tokens: Update `border-radius` design-first tokens (Volker E)
- tokens: Add `@position-offset-border-width-base` (Anne Tomasevich)
- tokens: Remove conflicting token comment (Anne Tomasevich)
- tokens, styles: Add design-first transition tokens (Volker E)
- tokens: Add design-first animation tokens (Volker E)

## Code
- Button: simplify rootClasses definition (DannyS712)
- Combobox: simplify onInputBlur() logic (DannyS712)
- Combobox: don't retrieve the entire context for setup() (DannyS712)
- Checkbox, Radio: remove unneeded !! for boolean props (DannyS712)
- Menu: Add global event listener for mouseup to clear active (Anne Tomasevich)
- Menu: simplify handleKeyNavigation() cases (DannyS712)
- Menu: simplify highlightPrev() with early return (DannyS712)
- MenuItem: Only set active state on main mouse button mousedown (Anne Tomasevich)
- ProgressBar: Set height on root element (Anne Tomasevich)
- Select: Apply design review feedback (Simone This Dot)
- Select: document why `return undefined` is needed in computing start icon (DannyS712)
- TypeaheadSearch: Add snapshot for "no results" message (Anne Tomasevich)
- TypeaheadSearch: Don't use refs for timeout handles (Roan Kattouw)
- Components: don't retrieve the entire context for setup() (DannyS712)
- useIntersectionObserver: Make reactive to templateRef changing (Roan Kattouw)
- useIntersectionObserver: Don't observe elements before they're mounted (Roan Kattouw)
- useModelWrapper: Support typed event parameters (Roan Kattouw)
- build: Add shell script for preparing a release (Roan Kattouw)
- build: Add "npm run coverage" command (Roan Kattouw)
- build: Enable type checking rules for typescript-eslint (Roan Kattouw)
- build: Upgrade TypeScript 4.4.3 -> 4.6.2 (Roan Kattouw)
- build: Upgrade vue-tsc 0.28.3 -> 0.33.6 (Roan Kattouw)
- build: Disable "restrict-template-expressions" linting rule in tests (Eric Gardner)
- build: Upgrade postcss-rtlcss 3.5.1 -> 3.5.4 (Roan Kattouw)
- build: Check .js files with TypeScript in the Codex package (Roan Kattouw)
- build: Check .js with TypeScript in the codex-docs package (Roan Kattouw)
- build: Use rtlcss to generate codex.style-rtl.css, by running Vite twice (Roan Kattouw)
- build: Upgrade eslint and its plugins (Roan Kattouw)
- build: Upgrade @vue/test-utils and use VueWrapper correctly (Roan Kattouw)
- build: Type check the VitePress config (Roan Kattouw)
- build: Increase stylelint max-nesting-depth to 3 (Anne Tomasevich)
- build: Put icon type definitions in dist/types (Roan Kattouw)
- build: Use vue-tsc to generate type definitions (Roan Kattouw)
- build: Add the @wikimedia/codex-search package (Roan Kattouw)
- build: Update 'browserslist-config-wikimedia' to v0.4.0 (Volker E)
- build: Export all composables (Catrope)
- build: Enable stylelint in hidden directories (Roan Kattouw)
- build: Actually make stylelint work in the .vitepress/ directory (Roan Kattouw)
- build: Update 'stylelint' and 'stylelint-config-wikimedia' to latest (Volker E)
- build: Remove useless eslint-disable (Roan Kattouw)
- lib: Don't export the TabData type (Roan Kattouw)
- docs, tests: add dedicated tests for CopyTextButton (DannyS712)
- tests: add tests for flattenDesignTokensTree() method (DannyS712)

## Documentation
- docs, Wrapper: minor cleanup and organization (DannyS712)
- docs, CopyTextButton: improvements to success logic (DannyS712)
- docs: Add example usage of useComputedDir() (Roan Kattouw)
- docs: Add button examples with icons (Roan Kattouw)
- docs, TokensTable: import missing CdxDocsCursorDemo component (DannyS712)
- docs, Wrapper: Add dynamic sample code generation with controls (DannyS712)
- docs: Fix typo on `processKeyFrames` in postcss.config.js (Roan Kattouw)
- docs: Unbreak navigating away from component pages with generated code (Roan Kattouw)
- docs: Simplify breakpoint documenting sentences. (Volker E)
- docs, component.js: avoid unneeded template string interpolation (DannyS712)
- docs: avoid empty "Values" column for properties when unused (DannyS712)
- docs: Work around VitePress click handling behavior (Roan Kattouw)
- docs: Ensure generated code samples can handle self-closing tags (Anne Tomasevich)
- docs, Controls: don't show "slots" heading if there aren't any (Anne Tomasevich)
- TextInput: Add configurable demo (Anne Tomasevich)
- Wrapper: Revert changes to Wrapper styles (Eric Gardner)
- docs: Manually set link styles for Message demos (Anne Tomasevich)
- docs: Update CSS conventions (Anne Tomasevich)
- demo: Add ToggleButton, ToggleSwitch and Message to sandbox demo (Roan Kattouw)
- docs: Hide theme tokens in the tokens documentation (Roan Kattouw)
- docs: Use design tokens within codex-docs custom theme (Anne Tomasevich)
- docs, Wrapper: use ToggleButton for show/hide code (DannyS712)
- docs, changelog: Organize 'CHANGELOG.md' release notes (DannyS712)
- DirectionSwitcher: use ToggleButton for direction options (DannyS712)
- docs, codex: Remove 'wikimedia-ui-base' from codex package as well (Volker E)
- styles, docs: Use `lang="less" attribute for style block everywhere (Volker E)
- docs: Allow configuring placeholder text for TextInput demo (DannyS712)
- docs: Use v-bind for boolean `forceReset` prop (Anne Tomasevich)
- docs, Menu: Remove outdated slot (Anne Tomasevich)
- docs: Set VitePress text color to `color-base` (Anne Tomasevich)
- docs: Allow configuring icon properties and generate correct code (DannyS712)
- ToggleButton: Add icon-only demo (Roan Kattouw)
- docs: Allow configuring icons used as slot contents (DannyS712)
- docs: Add paragraph about dealing/organizing 'CHANGELOG.md' (Volker E)
- docs: move more code generation logic from Wrapper.vue to codegen.ts (DannyS712)
- docs, styles: Improve interaction of code button borders (Anne Tomasevich)


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
