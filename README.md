# Codex

Toolkit for the Wikimedia Design System. Contains Vue components, design tokens,
and documentation.

Proper README TBD

## Development Notes

This package is configured as a monorepo using NPM. Sub-projects should be defined
in the `packages/` directory with their own `package.json` and an appropriate `name`.

To run a command in a specific workspace, do the following:

```
# Run the "build" command in the "vue-components" workspace
npm run build --workspace vue-components

# Install a dependency for one workspace
npm install vite --workspace vue-components --save-dev

# This can be shortened to -w
npm install vue -w vue-components --save-peer
```

To run a command for all workspaces, do this instead:

```
# Run the "test" command in all workspaces"
npm run test --workspaces

# this is equivalent
npm run test -ws
```

Note that the `lint` command is global, it has to be run in the root directory.
Running `npm test` in the root directory will lint everything and run the tests
in all workspaces.

NPM v7.0 or greater is required to support workspaces; it is not included by
default in older versions of Node (prior to v15) and will need to be upgraded
manually.
