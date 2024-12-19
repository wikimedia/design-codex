# ADR 02) Demo tool

Date: 2021-10-06

## Status

Accepted

## Context

[Storybook](https://storybook.js.org/) has been the de facto standard for UI component demos and
documentation across projects at the Wikimedia Foundation and Wikimedia Deutschland. However,
Storybook has many downsides, particularly for Vue projects. As an alternative, we explored using
[VitePress](https://vitepress.vuejs.org/), a static site generator built specifically for Vue 3 with
Vite, for library documentation.

First, we considered what we need and want out of a demo tool:
- Realistic component demos with code samples that can be directly used by library users*
- Presentation of all components and icons, and all variants*
- Auto-generated component usage docs*
- Visualization of design tokens*
- Hot module replacement for component development
- Open source tool with a large dev community
- Similar underlying technology (Vue)
- Lightweight with few dependencies
- Plugins for accessibility testing, responsive viewport, visual deficiencies filter, measurements,
and themes (dark/light)
- Visual regression testing
- Easy to configure and add components
- Simple and reliable long-term maintenance
- On brand with the [Design Style Guide](https://design.wikimedia.org/style-guide/index.html)

*Indicates a critical feature

## Considered actions

### Storybook

#### Advantages

- Wide use and active development
- De facto standard across our organizations and in general
- Large plugin ecosystem offering a wide array of features
- Out-of-the-box visual regression testing with [Chromatic](https://www.chromatic.com/docs/), a tool
specifically built for Storybook

#### Downsides

- Large with many dependencies
- Built primarily for React, which results in various issues. The docs often don't cover Vue
usage, some addons only support React, and support for things like Vue 3 and Vite is new,
experimental, and buggy
- Component demos are "stories," written in a Storybook-specific way, not realistic implementations.
The resulting demos and code samples are not useful examples for library users.
- Configuration and story-writing are not straightforward or intuitive

### VitePress

#### Advantages

- Built specifically for Vue 3 and for Vite
- Component demos are just regular Vue components. End users see real-world examples and associated
code samples, and library developers use the components their building in realistic ways. Creating
component demos is easy and intuitive.
- Smaller and faster with fewer dependencies
- Easy configuration setup and maintenance
- Support for Vue components in markdown files
- Approachable visual design and formatting

#### Downsides

- New and experimental
- Departure from our current tool
- Will never be as fully-featured as Storybook
- Will require work up-front and long-term maintenance to support features like configurable
component demos, theming, etc.

## Decision

Codex will implement VitePress as its demo tool on an experimental basis. We will continue to
evaluate whether the maintenance costs outweigh the benefits. If we determine that they do, we will
switch back to Storybook.

To support the features we want, we will do the following:
- Build a custom Vue component that can be used in component demos to provide things like
formatting, a button that toggles code visibility, and configurable controls
- Consider building a theme switcher
- Consider building in tools for manual visual testing and inspection of components
- Set up automated accessibility and visual regression testing outside of the demo tool

## Consequences

We get to use a lighter, more intuitive, Vue-friendly tool to build our library documentation and
demos. This will require some work up-front and long-term to build and maintain the features we need
for effective component development and testing.
