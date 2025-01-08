# ADR 11) Generation of Codex-compatible markup in PHP

## Status

Accepted

## Context

The Codex component library is primarily developed as a set of Vue.js
components, meaning that users must have JavaScript enabled in their browser in
order to get the full experience.  However, Codex will ultimately need to
support a variety of use-cases where JS is either not available at all, or at
least is not available immediately.

For these situations, our solution thus far has been to provide a collection of
[CSS-only components](./05-adr-css-components.md). Not every Codex component has
a CSS-only version, but most do. For components that support CSS-only usage, we
provide example markup that can be copied and pasted into a developer's
application (some adaption may be necessary). Ensuring visual parity here is key
because in some situations a user may receive an initial server-rendered
response which will then be replaced with the full Vue-based versions as soon as
JS initializes, and we want this experience to be as seamless as possible.

A solution which allowed programmatic generation of Codex-compatible markup would
be a big improvement over the current workflow.

## Considered actions

In the Vue.js ecosystem, the preferred way of pre-generating HTML for a
client-side application is known as *server-side rendering* (SSR). This process
involves running the V8 JS engine programmatically on the server and using that
to output markup that is suitable for consumption as stand-alone HTML. This is
usually done in a Node.js environment, but similar tools also exist in other
languages (including PHP).

A more MediaWiki-friendly way to generate Codex markup would be to expose a set
of classes and methods in PHP that developers could use directly from MW skins
and extensions. This is the approach that was taken by [OOUI][def].

## Decision

**We are going to provide a PHP-based interface to generate markup for Codex
CSS-only components.**

We will establish a new, stand-alone PHP library to house this code, and we will
vendor it into MediaWiki core using Composer. This is the same way that MediaWiki
consumes the OOUI PHP library.

Codex components will continue to be developed in a "Vue-first" way; we will
introduce PHP-versions of Codex components where appropriate but we are not aiming
for 100% coverage. We do not expect to ever implement PHP-first or PHP-only
components, but there will be Vue-only components.

Visual parity between PHP and JS versions is a requirement, just as it is for
CSS-only components currently. The generated markup will also be held to the
same accessibility standards as the existing code. In most cases the final
markup output between the JS and no-JS versions of a given component (whether
or not that markup was generated in PHP) should be very similar.

We will document the new Codex PHP codebase, but it may not integrate into the
existing Codex docs site right away (or ever). The new codebase should follow
MediaWiki's typical [best practices for PHP code][def2].

Finally, this effort would not be possible without the contributions of Doğu
Abaris, who provided the initial prototype of this codebase. The Design System
Team will maintain this code going forward, but we welcome community
contributions in this area.

## Consequences

At some point in the future, we may still explore true SSR in MediaWiki. This would
integrate better with many of the tools we are already using (Vue, Vite, etc), but
a lot of new technical infrastructure will need to be adopted in order for MediaWiki
(or even WMF projects) to be able to rely on such a feature.


[def]: https://github.com/wikimedia/oojs-ui/tree/master/php
[def2]: https://www.mediawiki.org/wiki/Manual:Coding_conventions/PHP