# Contributing documentation

This page outlines how to contribute to the Codex documentation site.

::: info
We also welcome contributions to MediaWiki-specific documentation on mediawiki.org, such as the
[Codex](https://www.mediawiki.org/wiki/Codex) page.
:::

## Reporting and validating

### File a task

For very small documentation changes, such as updating a link or fixing a typo, you do not need to
create a Phabricator task—simply include the details of the change in the commit message of your
patch.

For all other contributions, we recommend creating a task on the
[Codex Phabricator board](https://phabricator.wikimedia.org/tag/codex/) explaining the background of
the change and the acceptance criteria. You can also find existing documentation-related tasks via
the [docs task filter](https://phabricator.wikimedia.org/project/board/5587/?filter=n7siiGzkv84H).

### Validate the task

Before starting the task, ensure it has a full list of acceptance criteria. This may require review
from a designer if the change involves significant updates to the visual design or user experience
of the documentation site.

Once the task is validated and the need is clearly established, you can move forward with the next
steps in the contribution process.

## Getting started

The Codex documentation site is built with [VitePress](https://vitepress.vuejs.org/). The code for
the site lives in `packages/codex-docs`:

- Most documentation pages can be found in `packages/codex-docs/docs`.
- Component demos can be found in `packages/codex-docs/component-demos`. Visit
[Component demos](./component-demos.md) to learn more about adding and updating these demos.
- Site configuration lives in `packages/codex-docs/docs/.vitepress/config.ts`, including the
definitions of the site navigation and sidebars.
- Custom components, composables, and utility functions built for the site can be found in `packages/codex-docs/src`.

### Setup

First, familiarize yourself with the [basics of developing Codex](./development-basics.md). You'll
need a Wikimedia developer account, the Codex code, and an understanding of the code review process.
If you need help getting set up for Codex development, [get in touch](../using-codex/contact.md)
with us.

## Development tips

### Markdown

Every page on the site is written in a [Markdown](https://www.markdownguide.org/) file. VitePress
provides several helpful [Markdown extensions](https://vitepress.dev/guide/markdown) that we use
extensively. For example, we use [syntax highlighting](https://vitepress.dev/guide/markdown#syntax-highlighting-in-code-blocks)
for code blocks and [custom containers](https://vitepress.dev/guide/markdown#custom-containers) to
highlight important information. [Vue components](https://vitepress.dev/guide/using-vue) can also be
used within Markdown files in VitePress.

### Custom components

We have a number of custom Vue components used throughout the site. For example, the Wrapper
component provides the interface for demoing components, with a code sample, reset button,
configuration controls, and more. We also have a suite of components used to demonstrate design
tokens. All custom components can be found in `packages/codex-docs/src` and generally follow the
same code quality and testing standards as Codex components.

### Miscellaneous

- Use simple, direct language to serve a global audience. Follow the
  [Voice and tone](https://doc.wikimedia.org/codex/main/style-guide/voice-and-tone.html) and
  [Writing for copy](https://doc.wikimedia.org/codex/main/style-guide/writing-for-copy.html)
  guidelines.
- Follow patterns established in other files. Familiarize yourself with the file you're working in
  and related pages, then follow the structure and syntax used there.
- Use relative links to pages within the site (e.g. `../using-codex/contact.md` instead of
  `https://doc.wikimedia.org/codex/latest/using-codex/contact.html`).
- Use imagery minimally, especially for things that may change over time like component design.

## Local development

Even when making simple changes to Markdown files, we recommend previewing the site to ensure your
changes look correct. Once you've cloned the Codex repository locally, `cd` to it and run the
following:

```bash
npm run doc:dev
```

This will serve the docs site at `http://localhost:5173`. As you make changes to Markdown files, Vue
components, or Codex components, design tokens, or icons, the site will automatically refresh.

### Troubleshooting

If you run into errors, try the following steps:

- Ensure you're using the correct version of Node. Refer to [Node requirements](./development-basics.md)
- Run `npm ci` to clear out and install node modules. This is often necessary after a build update
  is merged.
- Run `npm run build-all` to build all packages. This is sometimes necessary, e.g. when a new icon
  is added.

## Production sites

### Official site

The canonical, "official" Codex docs site is https://doc.wikimedia.org/codex/latest/. This site is
updated each time a new version of the Codex library is released. When communicating with Codex
users, you should always use this site to ensure they're getting the official and polished version
of the site.

### Staging site

Another version of the site is hosted at https://doc.wikimedia.org/codex/main/. This version of the
site is based on the `main` git branch, meaning any time a patch is merged, its changes will be
reflected on the main version of the site. This site is useful for seeing changes before a release,
and it includes [work in progress components](./developing-components.md#wip-components).

### Patch preview

For each open Gerrit patch, a Netlify deploy preview is launched with an iteration of the site
based on that patch. The preview will update each time a new patchset is pushed. This is done via
the `branchdeploy` CI job - if the preview is not displaying properly, you should check to see if
the CI job failed for some reason.

These previews are useful for testing changes on the site without having to pull the patch locally,
which can be helpful to those doing code review or people who do not have the site set up locally.

To view the preview for a patch:
- Add the patch number and two dashes to the beginning of the URL https://wikimedia-codex.netlify.app/.
- For example, for the patch https://gerrit.wikimedia.org/r/c/design/codex/+/1111342, the Netlify
preview is hosted at https://1111342--wikimedia-codex.netlify.app/.
- You can also view the development sandbox at https://1111342--wikimedia-codex.netlify.app/sandbox.
