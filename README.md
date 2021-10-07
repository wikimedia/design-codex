# Codex

Toolkit for the Wikimedia Design System. Contains Vue components, design tokens,
and documentation.

Proper README TBD

## Development Notes

This package is configured as a monorepo using Yarn 2. Some things to note:

* **Workspaces**: The project is set up to use Yarn's
  [workspaces](https://yarnpkg.com/features/workspaces) feature. Individual
  workspaces live in the `packages/` folder and are defined in the top-level
  `package.json` file. Subfolders in `packages/` each have their own `package.json`
  file to manage scripts, dependencies, etc. To add a dependency for a specific
  package, run `yarn workspace vue-components add -D eslint`. To run workspace-specific
  commands, use `yarn workspace components build`, etc.
* **Zero-installs**: The project also uses Yarn's
  [zero-installs](https://yarnpkg.com/features/zero-installs) feature. Contributors
  should be able to clone the repository and begin local development without needing
  to install dependencies themselves. All dependencies for all workspaces live in
  `.yarn/cache` and are checked in to source control. This includes the `yarn` binary
  itself. The `pnp.cjs` file in the root of the project enables Node to resolve packages
  locally. Running `yarn install` will update this file.
* `npm install` should never be used; similarly there should never be a `node_modules`
  directory, a `package-lock.json` file, etc.
