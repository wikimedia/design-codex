# 05) CSS Components

Date: 2023-01-27

## Status

Accepted

## Context

The initial set of components built in the Codex design system were built with Vue.js. Since we
currently have no system for rendering Vue components on the server in MediaWiki, this means that
the Vue components can only be used client-side. This excludes server-side-only features and
features that are first rendered server-side then hydrated with JavaScript from using Codex
components. We wanted to develop a set of components, built only with markup and styles, that do not
require JavaScript and can be used anywhere. These components would also not require knowledge of
JavaScript or Vue.js to use, lowering the barrier to developing with Codex.

## Acceptance criteria

The following features were identified as critical for success:
- CSS components have complete visual parity with the Vue versions. This is important both for
  consistency of user experience and to ensure that the CSS version could be swapped out for the Vue
  version when JavaScript becomes available without the user noticing.
- CSS components are as simple and easy to use as possible
- We aim to load as little extra code on the page as possible to support these components

## Considered actions

We considered two main implementation paths for CSS components:

### The Less mixin approach

This involves exporting Less mixins that contain component styles. Developer users would apply
these Less mixins to their own markup in their own style files. This gives developer users more
flexibility in terms of markup: they can apply the mixins to whichever elements and selectors they
choose. However, it means that the same styles could be applied to many different selectors on a
page, increasing the overall size of the styles. It also requires use of Less, which is used in
MediaWiki but is not as popular elsewhere. Finally, it would require changes in the Codex library
to remove styles from Vue single file components (SFCs) and move them into separate mixin files,
which makes writing and maintaining component code more difficult both for library maintainers and
new contributors.

### The CSS class approach

This means keeping the styles as-is in the Vue SFCs, exporting the styles separately from the Vue
components (which we already do), and providing recommended markup and CSS classes for developer
users to copy. This is similar to how [Bootstrap](https://getbootstrap.com/docs/3.4/css/) works.
This allows us to keep the styles in the SFCs and is easy to use: you simply copy the markup we
recommend, or add the CSS classes to your own markup. One downside to this approach is that the
markup for some components can get fairly long and include things like ARIA attributes. To ease
this burden, we could add a markup generator in MediaWiki that could generate markup for a CSS
component based on provided parameters. This approach also currently means loading the CSS for all
components in MediaWiki since there is no concept of code splitting—in the future, a build step or
system for generating a dist CSS file with only some components would help.

## Decision

We decided to use the CSS class approach for its simplicity and maintainability. We'd like to
develop solutions for markup generation and code splitting to reduce some of the downsides of this
approach.

## Consequences

- We now have a set of easy-to-use CSS-only [components](../../components/overview.md) available in
  Codex that follow the design system and can be used anywhere
- We provide copy-able code samples on the Codex docs site (e.g. [Button](../../components/demos/button.md#css-only-version))
  for CSS components
- We need to consider markup generation in MediaWiki and code splitting

Further reading: https://phabricator.wikimedia.org/T323179
