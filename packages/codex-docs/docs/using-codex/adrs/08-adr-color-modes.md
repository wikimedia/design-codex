# 08) Support for Alternate Color Modes

Date: 2024-02-26

## Status

Accepted

## Context

The very first ADR adopted for Codex concerned the decision to use
[Design Tokens](./01-adr-design-tokens.md) as the elemental units of our
design system.

At this point in time, we want to expand our system's capabilities by
introducing a "night mode" that uses a dark color palette. In the future we may
introduce other modes as well.

In order to support alternate color modes for our system in an efficient and
maintainable way, we need to clarify our current structure and introduce some
additional rules for how tokens should be organized going forward.

Codex currently organizes design tokens in three different layers or tiers.

1. **Option Tokens**: Option tokens represent the universe of possible values for
  our system. Option tokens have descriptive names (`color-blue500`), and
  primitive values (i.e. `#36c`). By default, options tokens are not shipped to
  the user. This allows for the set of options tokens to be as comprehensive as
  necessary without worrying about negative performance impacts. Currently,
  options tokens are defined in a file called `theme-wikimedia-ui.json`.
  This file has the word "theme" in its name because in the future, we may wish
  to support an alternate "theme" for Codex with different brand colors, font
  choices, etc (an "Apex" or "Monobook" compatible build of Codex could be generated
  in this way).

2. **Decision Tokens**: Decision tokens map a particular option onto a specific
  use-case within the UI. Decision tokens have semantic names that correspond to
  their purpose in the application (`color-progressive`) and their values should
  refer back to the appropriate option token; they should not introduce new values
  directly. These tokens are shipped to the user. Currently, decision tokens
  are defined in a file called `codex-base.json`, since they can be thought of
  as the basic tokens that are used across different features and components.

3. **Component Tokens**: Component tokens represent component-specific values that
  do not get used elsewhere in the design system. Component tokens are defined
  in a file called `codex-components.json`.

## Decision

To support the introduction of a "night mode" feature in MediaWiki skin
architecture, we need to clarify and slightly amend the organizational structure
described above.

### 1. Definition of key terms

The concept of "color mode" is a new one within our system. The terms "theme"
and "mode" are sometimes used interchangeably, but we want to clearly distinguish
between them within Codex.

- **Theme**: In Codex, "theme" refers to a complete "look and feel" for the system.
  Font choices, accent colors, visual branding, etc. Currently Codex only supports
  a single theme, the "WikimediaUI" theme that aligns with the visual design of
  Wikimedia Foundation projects. Codex themes are defined at the *option tokens
  level*; if someone wanted to introduce an alternate Codex theme, they would start
  by providing a new set of option tokens that conveys the desired look and feel.
  Each new theme rebuilds Codex from the ground up.

- **Mode**: Modes in Codex are variations *within* a given theme. Modes in Codex
  are defined at the *decision token level*, and consist of a subset of decision
  tokens that have alternative values defined. The other tokens are unchanged.
  The alternative values should still draw from the theme's set of option tokens.

### 2. New rule governing token aliases

*Tokens should define their values by referencing other tokens which already exist
on the tier immediately below them.* In some cases it may also be appropriate for
tokens to reference other members of the same tier. Component-specific tokens
should reference decision tokens for their values; decision tokens should refer
to option tokens. Only option tokens should refer to primitive values. This rule
exists to ensure that component-level tokens can automatically integrate with
any alternate modes that may be defined, and that modes remain consistent with
the overall theme of the design system.

### 3. Mode-specific token files

*Modes in Codex should be represented as overrides to specific decision tokens, in
a dedicated file.* For example, a dark mode file should live alongside the existing
option tokens file, and it should have a name like `codex-dark.json`. This file
should only contain a limited set of decision tokens with values that refer to
alternative tokens that already exist in the options tier. When the build scripts
are run, these values will override the default decision token values; other tokens
will be left alone. Over time, additional modes may be introduced as needed.

## Consequences

We may need to make minor changes to our current tokens so that they conform to
the rules and definitions above, no drastic changes in our current system should
be required as a result of this ADR.

Organizing our tokens in this way will allow us to deliver some improvements in
the near future however. In particular, by leveraging CSS custom properties we
could allow users to switch between color modes in the browser without having to
re-load the entire set of tokens. A page could do something like this:

```css
:root {
    color-scheme: dark light;
}

/* These media queries could be defined in conditionally loaded files */
@media ( prefers-color-scheme: light ) {
    /* Light mode styles here */
    --color-base: #202122;
}

@media ( prefers-color-scheme: dark ) {
    /* Dark mode styles here */
    --color-base: #f8f9fa;
}

/* user-controlled mode toggle would apply this class to the body or html element,
   forcing all descendants to use dark mode from the media query above */
.dark {
    color-scheme: dark;
}
```

## References

The inspiration for this approach comes from two sources, adapted for the
specifics of our design system.

- [Creating Themeable Design Systems](https://bradfrost.com/blog/post/creating-themeable-design-systems/)
  by Brad Frost
- [Dark Mode with Style Dictionary](https://dbanks.design/blog/dark-mode-with-style-dictionary/)
  by Danny Banks (the creator of Style Dictionary, the tool we use to manage our tokens in Codex)
