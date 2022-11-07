# Design tokens

**Design tokens are the smallest stylistic pieces of our design system** — specifically, they are
named entities that store visual design attributes to build components and patterns. We use them in
place of hard-coded values (such as hex values for color or pixel values for spacing) in order to
maintain a scalable and consistent visual system for user-interface (UI) development.

Tokens replace static values or single-use variables. Using tokens ensures that only systematic,
pre-made decisions are used to style components and other UI elements and layouts. Tokens prevent
deviations from the system’s visual and interactive rules, and make style modifications possible at
scale and from a single source of truth.

Design tokens help to:

1. Guide the definition of the visual style of components: Since tokens capture the system’s
stylistic pieces, they can provide guidance to designers working to define the styles (background
colors, colors, text formatting, sizes, spacing…) of new system components from scratch.

2. Create specifications for handover: Designers use them to specify all the visual and interactive
properties of a given component: this is how design decisions are literally embedded in system
components. For more details regarding the use of design tokens for specification, please refer to
the section dedicated to specification handover (LINK) in the Designing Components section.

Designers can copy them and use them while creating specifications for system components.
Please reach out to the Design Systems team in case you find that a specific token is missing,
incorrect or inconsistent.


## Token structure
### File organization
Codex token files are structured to cater to Wikimedia's multi-theme environment. Base tokens apply
the theme-agnostic named tokens from 'theme-*' JSON files across components and patterns. Single
component tokens also apply theme-agnostic named tokens.

1. **Theme tokens ('theme-*.json' files): Design options**<br>
Themes are defined in JSON files with theme-agnostic keys and theme-specific values.
Theme tokens are not meant to ever be directly applied in Codex stylesheet rules for components or
patterns. They are only the internal pool of design options for the decisions represented by base
and component tokens.

2. **Base tokens ('codex-base.json'): Design decisions**<br>
The base tokens 'codex-base.json' file and the component tokens 'codex-components.json' file are
featuring the design decisions. All token keys follow a more semantic, developer-friendly naming
scheme, where values from the design options token pool above are applied into decisions. Base
tokens are used across various components.

3. **Component tokens ('codex-components.json'): Design decisions**<br>
The component tokens 'codex-components.json' file collects only single-component design decisions,
that are not covered by the base tokens. All component tokens carry the single-file-component name
in their name after the token category, for example `background-color-button-quiet--hover`.<br>
Important reasons for separating component from base tokens are to support identifying consistency
gaps and emerging design patterns across components or to surface very close values for
combination later.

### Naming and definition structure
To create an extensible structure that is easily understood by humans, we follow these rules when
naming tokens:

- The JSON keys follow CSS property names for the sake of familiarity and readability. They follow
by and large [variable naming patterns established for MediaWiki](https://www.mediawiki.org/wiki/Manual:Coding_conventions/CSS#Variable_naming). For example, we use `{ font-weight.100 }`
instead of `{ font.weight.100 }`. There are a few category naming exceptions like `size` and
`spacing` tokens, in order to reuse them in different property contexts – as values in `width`,
`height`, `padding` and so on.
  - The name describing the CSS property or category value always comes first, which makes it obvious
when a token is improperly applied to a different property, e.g. ~~`color: @background-color-base`~~.
- Tokens with numerical values are centered around a default key of `100`. This is critical to
creating a structure that is flexible and theme-agnostic. For example, base size is defined by
`{ dimension.100 }`, which could be used to define a default theme base font size of
`16px`, or a theme-specific base font size of `14px`, depending on what theme the size token is set
to. Because the names of the design tokens do not refer to a specific value, they can be reused by
both the default and other themes.

## Further technical notes
- Note, that normalization and reset values like `0` or `none` are not tokenized as they aren't used
for design decisions.<br>
`box-shadow: none` or `z-index: 0` on the other hand are representing design decisions.
- We're not using [Style Dictionary's predefined transform groups](https://github.com/amzn/style-dictionary/blob/main/docs/transform_groups.md) for all stylesheet formats (CSS, Less
and Sass) in order to keep precise control over output. For cross-browser support, we rely on a
variety of output values for different applications (example: `transparent` over 'color/css' output
hexadecimal color `#00000000`) and also deliver small performance gems like hex color shorthands.

