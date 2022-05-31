/**
 * Entry point for the documentation site. Includes standard
 * components/composables/types plus any components that are still considered
 * "works in progress" in the components-wip directory; the latter are not
 * included in lib.ts and thus are not available to library consumers. WIP
 * component demos are displayed when the docs site is run in development mode
 * (`npm run doc:dev`).
 *
 * The alias for '@wikimedia/codex' in the demo site points to this file.
 */

export * from './lib';
// eslint-disable-next-line no-restricted-imports
export * from './components-wip';
