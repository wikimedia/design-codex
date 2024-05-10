---
outline: deep
---

# Contributing code

::: tip Before you dive into contributing code:
- Read the [general contribution guidelines](../overview.md)
- Check out the [code design principles](../../using-codex/about.md#code-design-patterns)
:::

## Get the code

Clone [the repository](https://gerrit.wikimedia.org/g/design/codex/):
`git clone ssh://gerrit.wikimedia.org:29418/design/codex`

::: tip First time using Gerrit?
See [the Gerrit tutorial on mediawiki.org](https://www.mediawiki.org/wiki/Gerrit/Tutorial) for a
detailed guide.
:::

## Code contribution workflow

### Task tracking

Tasks are tracked in Phabricator. We use three different Phabricator workboards, for three different purposes:

- [Codex](https://phabricator.wikimedia.org/tag/codex/): used to indicate that a task is related to
  Codex. We do not track task status here.
- [Design-System-Team](https://phabricator.wikimedia.org/tag/design-system-team/): used to
  triage, sort, prioritize, and refine tasks that the Design System Team and contributors will
  work on.
- [Design-System-Sprint](https://phabricator.wikimedia.org/project/board/5858/): find the current
  sprint on the DST workboard too, starting with "DST-Sprint". The sprint is used to track active
  works-in-progress from Research > Design > Development > Testing > Release. As a contributor,
  you are welcome to track your work related to the Design System on this board as well—just
  remember to keep the task in the appropriate column that reflects its status.

Create or claim a task as soon as you decide to work on it. This will help avoid overlapping
duplicate, or out-of-order work. Note that very minor contributions (like build asset updates or
icon code optimizations) do not require a corresponding task.

When adding a new component, developing the entire component to completely fulfill design criteria
may be too much for a single patch. Consider creating a parent task for that component with
sub-tasks for the minimum viable solution and additional features.

### Component addition process

The following list represents the full process of adding a component, from conception as a task to
a fully functional and documented component.

:::tip
These steps may be completed by a number of different contributors—a single developer does not need
complete all of these steps on their own. Read the [code contribution pathways section](#code-contribution-pathways)
below for more info on different levels of contribution.
:::

1. **Create a new component task in Phabricator.** New Codex components must have a
  corresponding task in Phabricator. Use this [new component task template][new-component-phab-template]
  to create the task, filling in as much information as you can.
2. **Work with the design team to create a scope of work.** Typically, a designated designer and
  developer work together to create a scope for the minimum viable product (MVP) version of the
  component. New tasks will be added for any other features that will be designed and developed
  after the MVP scope is complete.
3. **Await the Figma spec sheet.** Before a component can be implemented in Codex, the design team
  will create a specification sheet for it in the [Codex components Figma library](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/?node-id=1891%3A4420).
  A new component task is considered ready for development only once design specifications have
  been linked in the component task.
4. **Ready for development.** Once design specifications have been shared and the task has been
  refined by members of the Design System Team, the task will be moved to the "Codex Component
  Backlog" column on the [Design-System-Team](https://phabricator.wikimedia.org/tag/design-system-team/)
  workboard. This indicates that implementation work can begin. You can assign the task to yourself
  and move it to the 'In Development' column on the current Design-System-Sprint board linked from
  the DST workboard.
5. **Build the component.** Create the Vue component, applying the design tokens noted in the design
  specification. Visit [writing styles](./developing-components#writing-styles) for more details.
  As you build the component, add a simple demo to the [Vite Sandbox](./developing-components.md#vite-sandbox)
  for testing during development.
6. **Test the component.** Write unit tests for the new code. Visit the [unit tests](./testing-components#unit-tests) section for more details.
7. **Demo the component.** Create component demos in VitePress, following the specifications
  provided in the task and existing examples from other component demo pages. Visit the
  [component demos](./component-demos) section for more details. Also add a simple demo of the
  component to the [Vite Sandbox](./developing-components.md#vite-sandbox), if you didn't already
  do this during development.
8. **Handle feedback from design and product.** Relevant designers and product managers will review
  the new component, provide feedback, and eventually sign-off on the component. Developers will
  respond to the feedback and implement any necessary changes, or open tasks so those changes can
  be done in the future.

[new-component-phab-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=%5BComponentName%5D%3A%20Add%20%5BComponentName%5D%20component%20to%20Codex&description=%23%23%20Background%0D%0A%0D%0A%2F%2FNOTE%3A%20%20When%20creating%20a%20component%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A%23%23%23%20Description%0D%0A%0D%0A%2F%2FAdd%20a%20brief%20description%20of%20this%20component%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A%2F%2FAdd%20at%20least%20one%20user%20story.%2F%2F%0D%0A%0D%0A%23%23%23%20History%0D%0A%0D%0A%2F%2FDescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20component%2F%2F%0D%0A%0D%0A%23%23%23%20Known%20use%20cases%0D%0A%0D%0A%2F%2FDescribe%20known%20use%20cases%20for%20this%20component%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A%0D%0A%23%23%23%20Existing%20implementations%0D%0A%0D%0AThese%20artifacts%20are%20listed%20for%20historical%20context.%20The%20figma%20spec%2C%20linked%20below%2C%20is%20the%20source%20of%20truth%20for%20the%20new%20component.%0D%0A%0D%0A**Wikimedia%20community%3A**%0D%0A-%20**Design%20style%20guide%3A**%20%2F%2Fadd%20%5B%5B%20https%3A%2F%2Fdesign.wikimedia.org%2Fstyle-guide%2Findex.html%20%7C%20Design%20Style%20Guide%20%5D%5D%20link%2C%20if%20applicable%2F%2F%0D%0A-%20**OOUI%3A**%20%2F%2Fadd%20the%20relevant%20OOUI%20widget%20name(s)%20here%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fdoc.wikimedia.org%2Foojs-ui%2Fmaster%2Fdemos%2F%3Fpage%3Dwidgets%26theme%3Dwikimediaui%26direction%3Dltr%26platform%3Ddesktop%20%7C%20OOUI%20demos%20%5D%5D.%2F%2F%0D%0A-%20**Vue%3A**%20%2F%2Fadd%20any%20existing%20Vue%20implementations%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fwww.mediawiki.org%2Fwiki%2FVue.js%23Projects_using_Vue.js%20%7C%20Projects%20using%20Vue.js%20%5D%5D.%2F%2F%0D%0A%0D%0A**External%20libraries%3A**%0D%0A-%20%2F%2FAdd%20links%20to%20any%20examples%20from%20external%20libraries%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Codex%20implementation%0D%0A%0D%0A%23%23%23%20Component%20task%20owners%0D%0A%0D%0A-%20Designer%3A%20%2F%2Fadd%20the%20main%20designer's%20name%2F%2F%0D%0A-%20Developer%3A%20%2F%2Fadd%20the%20main%20developer's%20name%2F%2F%0D%0A%0D%0A%23%23%23%20Open%20questions%0D%0A%0D%0A-%20%2F%2FList%20any%20current%20open%20questions%20here%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%0D%0A%2F%2F%20Once%20a%20component%20spec%20sheet%20has%20been%20created%20in%20Figma%2C%20remove%20the%20note%20stating%20that%20the%20spec%20is%20missing%20and%20link%20to%20the%20spec%20below.%20%2F%2F%0D%0A%0D%0AA%20component%20spec%20sheet%20has%20not%20been%20created%20yet.%0D%0A%0D%0A%7C%20Component%20spec%20sheet%20%7C%0D%0A%0D%0A%23%23%23%23%20Anatomy%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20the%20structure%20and%20properties%20of%20the%20component.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Style%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20the%20visual%20features%20of%20the%20component.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Interaction%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20interaction%20specifications.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Documentation%0D%0A%0D%0A%2F%2FDesigner%20should%20describe%20how%20the%20component%20should%20be%20documented%2C%20including%20configurable%20and%20standalone%20demos.%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Acceptance%20criteria%0D%0A%0D%0A%23%23%23%20Minimum%20viable%20product%0D%0A%0D%0AThis%20task%20covers%20the%20minimum%20viable%20product%20(MVP)%20version%20of%20this%20component.%20MVP%20includes%20basic%20layout%2C%20default%20states%2C%20and%20most%20important%20functionality.%0D%0A%0D%0A**MVP%20scope**%0D%0A-%20%5B%5D%20%2F%2FList%20all%20parts%20of%20the%20MVP%20scope%20for%20this%20component%2F%2F%0D%0A%0D%0A**Design**%0D%0A-%20%5B%5D%20Design%20the%20Figma%20spec%20sheet%20and%20add%20a%20link%20to%20it%20in%20this%20task%0D%0A-%20%5B%5D%20Update%20the%20component%20in%20the%20%5BFigma%20library%5D(https%3A%2F%2Fwww.figma.com%2Ffile%2FKoDuJMadWBXtsOtzGS4134%2F%25E2%259D%2596-Codex-components%3Fnode-id%3D1891%253A4420%26viewport%3D287%252C338%252C0.28).%20%2F%2FThis%20step%20will%20be%20done%20by%20a%20DST%20member.%2F%2F%0D%0A%0D%0A**Code**%0D%0A-%20%5B%5D%20Implement%20the%20component%20in%20Codex%0D%0A%0D%0A%23%23%23%20Future%20work%0D%0A%0D%0A-%20%2F%2FIf%20applicable%2C%20list%20future%20work%20that%20should%20be%20done%20for%20this%20component%20after%20the%20MVP%20is%20implemented%20as%20part%20of%20this%20task.%20You%20should%20open%20new%2C%20standalone%20tasks%20for%20all%20future%20work.%2F%2F&projects=Codex

### Code contribution pathways

There are various options for contributing code for a new component based on the contributor's
experience with our technologies and available time.

To be ready for public consumption, a component must fully implement the design spec and include
unit tests, a simple demo in the Vite sandbox, and a demo page with a suite of comprehensive
demos. However, these items do not all need to be included at once. Components that are in
development but are not yet ready for public use are considered "work in progress" or "WIP"
components. Our [WIP components system](./developing-components.md#wip-components) allows
submission of partially-completed components, which are not yet included in the main library
distribution or on the live Codex docs site.

Here are some options based on different parts of the development process:

- **Component completeness:** You can build a component that implements every part of the
  design spec, or you can build part of a new component and submit it as a WIP component. More
  features can be added in subsequent patches by you or other developers.
- **Unit tests:** You can submit a new component without writing unit tests (although we do
  encourage at least adding [snapshot tests](./testing-components.md#snapshot-tests)), or you can
  help write unit tests for someone else's WIP component.
- **Component demos:** While a simple implementation of a component in the Vite Sandbox is required
  for all components, a full component demo page can be added later. Our component demo system is
  very specific to this project, so learning it might take more time than a contributor has to
  offer. You can submit a WIP component without adding a demo page, or you can help add a demo
  page for someone else's WIP component.
- **Design/product feedback:** While the original implementer of a new component can respond to
  feedback if they have the time and inclination, feedback can be handled by other developers, or
  added to the backlog to be completed later.

If you have questions about how you can contribute to a new component, or a proposal for how you
would like to contribute to one, please add a comment to that component's Phabricator task and we
will help develop a plan for who will do which parts of the component development process.

### Patch requirements

Patches for new components should include all of the following. Patches that introduce changes
should include or update the following as needed.

- **Commit message:** The first line of the commit message must be prefixed by the component name
(Button, Icon) or the type of work (build, tests, styles, docs, sandbox, etc.), e.g. `docs: Add
more docs.`
  If the commit covers multiple things, include them in a comma-delineated list, e.g.
  `styles, docs, Button: Fix Button styles and document new convention`.
  Deprecating and breaking changes are prefixed with `[DEPRECATING CHANGE]` or `[BREAKING CHANGE]`,
  e.g. `[BREAKING CHANGE] Button: Remove primary button functionality`.
  In general, Codex follows the [MediaWiki commit message guidelines](https://www.mediawiki.org/wiki/Gerrit/Commit_message_guidelines).
- **Documentation:** Each component should have a docblock describing what the component is and the
  basics of how it works. Props, slots, and events should be documented in the code. If a component
  would benefit from additional documentation to communicate how it can be used, include it on the
  demo page.
- **Vite Sandbox demo:** Each component should have a simple demo in the
  [Vite Sandbox](./developing-components.md#vite-sandbox) for testing the basic functionality of
  the component locally and within MediaWiki.
- **Jest snapshots:** Include snapshots for all variations of props and slots.
- **Unit tests (not required for WIP components):** Attempt to meet the established coverage
  threshold, which will be calculated and  output in the command line interface when you run tests.
- **Demos (not required for WIP components):** Each component should have a demo page on the
  VitePress site that shows realistic examples of different variations and uses of the component.

Every time a new version of Codex is released, the `CHANGELOG.md` file in the root directory is
updated with all the commit message subjects since the last release – separated in sections
titled "Breaking Changes", "Deprecating Changes", "Features", "Styles", "Code" and "Documentation".

A breaking change is a change that requires some code using Codex to be updated in order to keep
working, e.g. removing or renaming a component or function. Each breaking change must be preceded
by a deprecating change at least a minor version before. A deprecating change warns when using the
functionality that is about to be removed, and provides an alternative where applicable. The
breaking change is then released in the next major or minor version after.

### Code review

The Codex library adheres to the [Design System Team's general process for code review](https://www.mediawiki.org/wiki/Design_System_Team/Team_Processes#Code_review).
Please review this process before submitting or reviewing a patch for the first time.

## Development basics

### Requirements

- **Node:** see `.nvmrc` in the root of the repository. To install and use the required version of Node, run `nvm install "$(<.nvmrc)"` then `nvm use` in the root of the repository.
- **NPM:** v7.21 or greater is required to support workspaces; it is not included by default in older
versions of Node (prior to v15) and will need to be upgraded manually.

### Workspaces

The Codex codebase is configured as a monorepo using NPM. Sub-projects are defined in the
`packages/` directory with their own `package.json` and an appropriate `name`.

To run a command in a specific workspace, do the following:

```bash
# Run the "build" command in the "@wikimedia/codex" workspace
npm run build --workspace @wikimedia/codex

# Install a dependency for one workspace
npm install vite --workspace @wikimedia/codex --save-dev

# This can be shortened to -w
npm install vue -w @wikimedia/codex --save-peer
```

To run a command for all workspaces, do this instead:

```bash
# Run the "test" command in all workspaces
npm run test --workspaces

# This is equivalent
npm run test -ws
```

Note that the `lint` command is global; it has to be run in the root directory.
Running `npm test` in the root directory will lint everything and run the tests
in all workspaces.

### Directory structure
Each component has its own subdirectory in `packages/codex/src/components`, containing
the Vue single file component and unit tests.

Functions designed for use with the composition API ("composables") are in `src/composables`.
Composables should have a name starting with `use`, e.g. `useModelWrapper`. Each composable should
be in its own file, with the same name as the composable function, e.g. `src/composables/useModelWrapper.ts`.

There are some special files at the top level of the `src/` directory:
- `lib.ts`: The main entry point for the library. Only things that are exported here are accessible
  to external users of the library.
- `types.ts`: Contains type definitions that are shared across multiple components, or need to be
  exported. This file should not export any functions or constants, only types.
- `constants.ts`: Contains constants that need to be exported or that serve as the basis for types.
- `utils.ts`: Utility functions shared across components, or for use with the types or constants
  in `types.ts` or `constants.ts`.

### Linting
Codex uses the following lint tools:
- [ESLint](https://eslint.org/) for JavaScript and TypeScript
- [typescript-eslint](https://typescript-eslint.io/) for additional linting of TypeScript files
- [Stylelint](https://stylelint.io/) for CSS and Less
- [svglint](https://www.npmjs.com/package/svglint) for SVG files in the icons package

We use the Wikimedia coding conventions, and to enforce those we use
[eslint-config-wikimedia](https://npmjs.com/package/eslint-config-wikimedia) and
[stylelint-config-wikimedia](https://www.npmjs.com/package/stylelint-config-wikimedia) as the
starting point for our linter configuration. For Vue files, the Wikimedia coding conventions
follow the [Vue style guide](https://vuejs.org/style-guide/) closely. This means that HTML-like tags
in Vue templates sometimes don't follow the same rules as real HTML: for example, an empty div tag
is `<div />` not `<div></div>`.

In addition to those conventions, Codex-specific rules are enforced. These include:
- For most CSS properties, design tokens must be used, and raw values are forbidden. (For example,
  `padding-top: 16px;` is disallowed, use `padding-top: @spacing-100;` instead.)
- Every `.js`, `.ts` and `.vue` file must be captured by the `include` paths in one of the
  `tsconfig.json` files, otherwise typescript-eslint can't run properly.

#### Running the linters
You can use the following commands to run some or all of the lint checks. All of these commands
must be run in the root directory
- All lint checks: `npm run lint` (this runs all of the commands listed below)
- ESLint: `npm run lint:eslint`
- Stylelint: `npm run lint:stylelint`
- svglint: `npm run -w @wikimedia/codex-icons lint:svg`
- TypeScript checks: `npm run -w PACKAGENAME lint:ts`, where `PACKAGENAME` is one of
  `@wikimedia/codex`, `@wikimedia/codex-design-tokens`, `@wikimedia/codex-icons` or `codex-docs`

You should also consider setting up your IDE to run ESLint, Stylelint and TypeScript on the fly,
to catch linter violations in real time.

#### Disabling lint rules
The lint rules produce the desired outcome the vast majority of the time, but sometimes disabling
a lint rule is necessary. The preferred way of doing this is with a `disable-next-line` comment
that identifies the name of the rule to be disabled, like this:
```js
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
input.value!.click();
```
```vue-html
<!-- eslint-disable-next-line vue/no-v-html -->
<div v-html="foo" />
```
```css
/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
appearance: none;
```

Sometimes, a rule might have to be disabled for a block of multiple lines, either because it
appears multiple times in a row or because it's not possible to place a comment directly above
the offending line. To do this, use a `disable` comment for the specific rule, and then an
`enable` comment at the end of the block re-enabling the rule.

```js
/* eslint-disable no-multi-spaces */
const MODES = [
  '',             // default mode
  'rtl',          // RTL stylesheet
  'legacy',       // Legacy (14px base) stylesheet
  'legacy-rtl'    // RTL 14px base stylesheet
];
/* eslint-enable no-multi-spaces */
```
```vue-html
<!-- eslint-disable vue/no-v-html -->
<g
  v-if="iconSvg"
  v-html="iconSvg"
/>
<!-- eslint-enable vue/no-v-html -->
```
```css
/* stylelint-disable plugin/no-unsupported-browser-features */
-webkit-appearance: none;
-moz-appearance: textfield;
/* stylelint-enable plugin/no-unsupported-browser-features */
```

Some rules are disabled for an entire repository, workspace or directory in the relevant
`.eslintrc.json` or `.stylelintrc.json` file. This should not be done lightly, and is only
appropriate when the rule is not useful for a structural reason. For example, we disable the
`no-unsafe` group of rules from typescript-eslint in Vue files, because they cause lots of false
positives in Vue code.

### IDE setup

If you work on Codex using an editor not listed here, please feel free to submit a patch with
suggested configurations for optimal development for that editor!

#### Visual Studio Code

1. **Install extensions:** The Codex repository contains a list of recommended extensions for
   development in Visual Studio Code (VS Code). These extensions are defined in
   `vscode/extensions.json`. When you open Codex in VS Code, you should be prompted with a message
   to install recommended extensions. You can also go to the Extensions tab and search for
   '@recommended', then install the extensions you want.
2. **Configure settings for extensions:** Configure Stylelint to check your styles, rather
   than VS Code's built-in validators. Add the following to your `.vscode/settings.json` file:
```json
{
	"css.validate": false,
	"less.validate": false,
	"stylelint.snippet": [
		"css",
		"less",
		"postcss",
		"vue"
	],
	"stylelint.validate": [
		"css",
		"less",
		"postcss",
		"vue"
	]
}
```
Configure Rewrap to wrap at 100 characters column:
```json
{
	"rewrap.wrappingColumn": 100
}
```
