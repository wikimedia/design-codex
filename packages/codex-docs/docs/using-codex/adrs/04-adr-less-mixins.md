# ADR 04) Distribute Visual Styles as Less Mixins

Date: 2022-09-01

## Status

Accepted

## Context

Codex is an implementation of the Wikimedia Design System intended for building
web-based products and experiences. Each public release of Codex includes the
following types of assets:

* **Design Tokens** (represented in JSON data, and also published as CSS, Less,
  and Sass variables)
* **Icons** (SVG files)
* **Components** (written in Vue.js)

However, the underlying Wikimedia Design System also specifies certain [global
visual styles](https://design.wikimedia.org/style-guide/visual-style.html).
Rules for typographic styles or grid systems don't necessarily lend themselves
to implementation as JavaScript-based components, but they are too complex to be
represented as design tokens.

Codex needs a way to publish visual styles that do not necessarily correspond
with a particular JavaScript-based UI component.

## Considered actions

We considered publishing a global CSS stylesheet for Codex that applied
appropriate styling to base HTML elements (buttons, links, headings and
paragraphs, etc). We also considered providing a stylesheet that targeted
certain pre-defined classes (`.cdx-link`, `.cdx-heading-1`, etc).

However, we decided that both options here provided insufficient flexibility
for feature teams who will be using these styles. We don't want to introduce
new global styles inside of MediaWiki (where there is already a lot going on);
similarly, we don't want to make any assumptions about markup or class names
on the consumer side.

## Decision

With Less mixins, we can write styles that tie together all necessary design
tokens without making any assumptions about where that style should be applied.
All targeting decisions can be made by library consumers in a way that suits
their own projects. This approach seems like the best balance between design
consistency and flexibility. Less is supported throughout MediaWiki, so this
approach will not impose any additional technical requirements on users.

There are two kinds of circumstances where we will consider adding new public
Less mixins to Codex:

1) When we need to represent some kind of global visual style that doesn't
  map well onto a single Vue component (ex: typographic styles, grids,
  dividers).
2) When we want to implement a certain component without requiring JavaScript.
  The Link component is a good example of this – using a Vue.js component to
  represent a basic link element is overkill, and a Less mixin is sufficient
  here. We may provide similar mixins for simple button and input styles.

Decisions on whether to implement a design as a Less mixin will be handled
on a case-by-case basis.

## Consequences

The Codex documentation site may need to be reorganized to provide information
about Less mixins alongside the sections for tokens and JavaScript components.

In some cases we may offer both a JavaScript and Less implementation for a given
component (like Button). If so, we will need to clearly differentiate the docs
for each implementation since usage will differ.
