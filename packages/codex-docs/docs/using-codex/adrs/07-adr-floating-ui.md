# 07) Floating UI

Date: 2023-09-22

## Status

Accepted

## Context

*See https://phabricator.wikimedia.org/T346099 for the current status of this work.*

Codex needs a comprehensive solution for handling the positioning and behavior
of various floating elements – drop-down menus, tooltips, dialogs, etc. We need
to ensure that these elements demonstrate the correct behavior in a variety of
circumstances (inside multiple scrolling parents, inside dialogs, in RTL
contexts, etc).

## Considered actions

We explored a variety of different solutions to this problem in
[T345116](https://phabricator.wikimedia.org/T345116). We considered the
following different options:

- Re-use/adapt OOUI's `ClippableElement` and `FloatableElement` mixins
- Develop our own custom solution relying on more modern browser APIs (resize
  and intersection observer, passive scroll listeners, etc.)
- Leverage an existing 3rd-party library (out of these,
  [Floating UI](https://floating-ui.com/) looked most promising)

We concluded that re-using the OOUI solutions verbatim was not really feasible
for Codex – OOUI is heavily reliant on jQuery (which Codex does not use) and the
browser landscape has also changed considerably in the last few years (we now
can safely rely on new APIs like intersection and resize observers, etc).

We also realized that re-writing a complete solution entirely from scratch would
take a considerable amount of time and effort, significantly delaying the
production-readiness of Codex.

## Decision

After some investigation (see
[T345116](https://phabricator.wikimedia.org/T345116)), we believe that the best
path forward is to leverage the [Floating UI library](https://floating-ui.com)
and avoid re-inventing the wheel ourselves.

Floating UI is the successor to [Popper.js](https://popper.js.org/), which was
incorporated into Bootstrap to solve similar problems. This new library is
similarly intended for this kind of low-level,
embedded-inside-another-UI-library usage, while making use of modern browser
capabilities and working well with frameworks like React and Vue.
Additionally, Floating UI's API includes a concept of "middleware" (chainable
plugins) which we can rely on if we need to customize the library's
behavior (for example, to provide specific RTL support).

Finally, Floating UI already includes a [Vue.js composable](https://floating-ui.com/docs/vue),
`useFloating`, which greatly simplified adoption efforts.

## Consequences

Adding a new runtime dependency to Codex is not something we do lightly.

DST engineers conducted a preliminary security review of Floating UI (see
[here](https://phabricator.wikimedia.org/T346097) for details). We will follow
up with a more formal discussion with the WMF security team to discuss ensuring
that Codex follows appropriate security practices for a library of its type.

[This task](https://phabricator.wikimedia.org/T346099) describes the inital work
that has been done to incorporate Floating UI into Codex.

Regarding RTL behavior, our [initial investigations](https://phabricator.wikimedia.org/T346100)
indicate that this approach is compatible with our current strategy for supporting
bi-directionality.

In the future, we may add additional behavior to our Menu components
(flipping/clipping based on available space, etc.). Fortunately the library's
modular concept of "middleware" makes it easy to introduce and fine-tune this
kind of added behavior.

