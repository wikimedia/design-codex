# Contributing code

- Task tracking and patch requirements
- Developer docs


## Contributing components

Before you dive into contributing code:
- Check the general contribution guidelines(./guidelines.md)
- Check the [code design principles](../index.md#code-design-patterns)
- Make sure your dev environment is working. Check the root `README.md` of the Codex repository for dev environment instructions and information

### Workflow

The following is a set of instructions on different topics that might come up during the process of developing a new component:

0. Gather relevant design tokens.
0. [Create the Vue component and write unit tests](#developing-components).
0. [Create component demo in VitePress](#demoing-components).
0. [Create browser tests if needed](#working-with-browser-tests).
0. Optionally, ask UX for a review.
0. Ask at least one fellow developer for a technical review.

## Developing components

The `vue-components` package uses [Vue 3](https://v3.vuejs.org/guide/introduction.html) and prefers the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) over the Options API.

TODO - more about using TypeScript and PostCSS

Developers can use the `Sandbox.vue` file in the `vue-components` package to test out components during development if desired.
`npm run dev` will spin up that page, provide HMR, etc.
This doesn't replace the use of `VitePress` for demo and documentation, it is more of a convenience during initial component development.

## Demoing components

TODO - how to create a demo that covers all states and what plugins/tools/utils to use

## Testing components

### Working with browser tests

TODO - possibly not needed if writing browser tests is a straightforward process

### Working with visual regression tests

TODO - how to create a base snapshot for the new component


