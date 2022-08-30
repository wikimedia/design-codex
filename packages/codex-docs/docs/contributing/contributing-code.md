# Contributing code

::: tip Before you dive into contributing code:
- Read the [general contribution guidelines](./guidelines.md)
- Check out the [code design principles](../index.md#code-design-patterns)
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
- [Design-Systems-Team](https://phabricator.wikimedia.org/tag/design-systems-team/): used to
  triage, sort, prioritize, and refine tasks that the Design Systems team and contributors will
  work on.
- [Design-Systems-Sprint](https://phabricator.wikimedia.org/project/view/5859/): used to track
  active works-in-progress from Research > Design > Development > Testing > Release. As a
  contributor, you are welcome to track your work related to the Design System on this board as
  well—just remember to keep the task in the appropriate column that reflects its status.

Create or claim a task as soon as you decide to work on it. This will help avoid overlapping
duplicate, or out-of-order work. Note that very minor contributions (like build asset updates or
icon code optimizations) do not require a corresponding task.

When adding a new component, developing the entire component to completely fulfill design criteria
may be too much for a single patch. Consider creating a parent task for that component with
sub-tasks for the minimum viable solution and additional features.

### Component addition process

1. **Create a new component task epic in Phabricator.** New Codex components must have a
corresponding epic task in Phabricator. Use this [component epic task template][epic-template]
  to create the task, filling in as much information as you can.
2. **Work with the design team to create a scope of work.** Typically, a designated designer and
  developer work together to create a scope for the minimum viable product (using the [component MVP
  task template][mvp-template]), which will be added as a subtask of the
  component epic. Subtasks will be added for any other features that will be designed and developed
  after the MVP scope is complete.
3. **Await the Figma spec sheet.** Before a component can be implemented in Codex, the design team
  will create a specification sheet for it in the [Codex components Figma library](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/?node-id=1891%3A4420).
  A new component task is considered ready for development only once design specifications have
  been linked in the component task.
4. **Ready for development.** Once design specifications have been shared and the task has been
  refined by members of the Design Systems Team, the task will be moved to the "Codex Component
  Backlog" column on the [Design-Systems-Team](https://phabricator.wikimedia.org/tag/design-systems-team/)
  workboard. This indicates that implementation work can begin. You can assign the task to yourself
  and move it to the 'In Development' column on the [Design-Systems-Sprint](https://phabricator.wikimedia.org/project/view/5859/)
  workboard.
5. **Build the component.** Create the Vue component, applying the design tokens noted in the design
  specification (visit [writing styles](#writing-styles) for more details), and write unit tests
  (visit the [unit tests](#unit-tests) section).
6. **Demo the component.** Create component demos in VitePress, following the specifications
  provided in the task and existing examples from other component demo pages. Visit the
  [component demos](#component-demos) section for more details.
7. **Open a patch for review.** Patches will be reviewed by developers, UX engineers, and designers.
  Once the patch is ready for review, move the component task to the "Code Review" column on the
  [Design-Systems-Sprint](https://phabricator.wikimedia.org/project/view/5859/) workboard. The
  Design Systems team and contributors will provide feedback in Gerrit or Phabricator. Once the
  patch is merged, the task will be moved to the "Design Review" column. If further work is needed,
  the task may be moved back to "Ready for Development", or a new task will be created to cover
  the outstanding work. Further work does not necessarily have to be done by the original patch
  author.

[epic-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=%5BEPIC%5D%20Add%20%5BComponentName%5D%20component%20to%20Codex&description=%23%23%20Background%0D%0A%0D%0ANOTE%3A%20%2F%2FWhen%20creating%20a%20component%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A-%20**Description%3A**%20%2F%2Fadd%20a%20brief%20description%20of%20this%20component%2F%2F%0D%0A-%20**History%3A**%20%2F%2Fdescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20component%2F%2F%0D%0A-%20**Known%20use%20case(s)%3A**%20%2F%2Fdescribe%20known%20use%20cases%20for%20this%20component%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A-%20**Considerations%3A**%20%2F%2Flist%20any%20known%20challenges%20or%20blockers%2C%20or%20any%20other%20important%20information%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A-%20%2F%2Fadd%20at%20least%20one%20user%20story%2F%2F%0D%0A%0D%0A%23%23%23%20Previous%20implementations%0D%0A%0D%0AThese%20artifacts%20are%20listed%20for%20historical%20context.%20The%20figma%20spec%2C%20linked%20below%2C%20is%20the%20source%20of%20truth%20for%20the%20new%20component.%0D%0A%0D%0A-%20**Design%20style%20guide%3A**%20%2F%2Fadd%20%5B%5B%20https%3A%2F%2Fdesign.wikimedia.org%2Fstyle-guide%2Findex.html%20%7C%20Design%20Style%20Guide%20%5D%5D%20link%2C%20if%20applicable%2F%2F%0D%0A-%20**OOUI%3A**%20%2F%2Fadd%20the%20relevant%20OOUI%20widget%20name%20here%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fdoc.wikimedia.org%2Foojs-ui%2Fmaster%2Fdemos%2F%3Fpage%3Dwidgets%26theme%3Dwikimediaui%26direction%3Dltr%26platform%3Ddesktop%20%7C%20OOUI%20demos%20%5D%5D.%2F%2F%0D%0A-%20**Vue%3A**%20%2F%2Fadd%20any%20existing%20Vue%20implementations%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fphabricator.wikimedia.org%2FT272885%20%7C%20Vue%20component%20inventory%20%5D%5D.%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Codex%20implementation%0D%0A%0D%0A%23%23%23%20Component%20task%20owners%0D%0A%0D%0A-%20Designer%3A%20%2F%2Fadd%20the%20main%20designer%27s%20name%2F%2F%0D%0A-%20Developer%3A%20%2F%2Fadd%20the%20main%20developer%27s%20name%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%0D%0A%2F%2F%20Once%20a%20component%20spec%20sheet%20has%20been%20created%20in%20Figma%2C%20remove%20the%20note%20stating%20that%20the%20spec%20is%20missing%20and%20link%20to%20the%20spec%20below.%20%2F%2F%0D%0A%0D%0AA%20component%20spec%20sheet%20has%20not%20been%20created%20yet.%0D%0A%0D%0A%7C%20Component%20spec%20sheet%20%7C%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Stage%201%3A%20Minimum%20viable%20product%20(MVP)%0D%0A%0D%0AMVP%20includes%20basic%20layout%2C%20default%20states%2C%20and%20most%20important%20functionality.%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%0D%0A%0D%0A-%20%5B%5D%20Determine%20what%20MVP%20includes%20for%20this%20component%20and%20document%20this%20in%20a%20subtask.%20Assign%20task%20to%20designer.%0D%0A-%20%5B%5D%20Design%20MVP.%20Once%20complete%2C%20assign%20task%20to%20developer.%0D%0A-%20%5B%5D%20Implement%20MVP%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Stage%202%3A%20Additional%20states%2C%20features%2C%20and%20variants%0D%0A%0D%0AThis%20might%20include%20a%20disabled%20state%2C%20framed%2Fframeless%20designs%2C%20transitions%2C%20supporting%20different%20use%20cases%2C%20etc.%2C%20which%20will%20be%20captured%20in%20separate%20subtasks.%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%0D%0A%0D%0A-%20%5B%5D%20Document%20design%20and%20implementation%20of%20additional%20states%20and%20features%20in%20individual%20subtasks%0D%0A-%20%5B%5D%20Complete%20each%20additional%20state%2Ffeature%20subtask%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Stage%203%3A%20Refinement%0D%0A%0D%0AThis%20stage%20includes%20any%20final%20touches%20or%20bug%20fixes%20needed%20before%20the%20component%20can%20be%20deemed%20complete%2C%20which%20will%20be%20captured%20in%20separate%20subtasks.%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%0D%0A%0D%0A-%20%5B%5D%20Finalize%20docs%3A%20open%20and%20complete%20a%20subtask%20for%20any%20additional%20demos%20that%20need%20to%20be%20added%20or%20documentation%20that%20needs%20work%0D%0A-%20%5B%5D%20Meet%20accessibility%20standards%3A%20open%20and%20complete%20a%20subtask%20for%20any%20necessary%20accessibility%20improvements%0D%0A-%20%5B%5D%20Meet%20internationalization%20standards%3A%20open%20and%20complete%20a%20subtask%20to%20fix%20any%20i18n%20bugs%0D%0A-%20%5B%5D%20Complete%20testing%3A%20open%20and%20complete%20a%20subtask%20for%20any%20additional%20unit%20or%20functional%20tests%20that%20are%20needed&projects=design-systems-team%2C%20codex%2C%20epic&priority=triage
[mvp-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=Design%20and%20build%20initial%20%5BComponentName%5D%20component%20(MVP)&description=**This%20task%20defines%20the%20minimum%20viable%20product%20(MVP)%20of%20the%20%5BComponentName%5D%20component.**%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Scope%0D%0A%0D%0A%2F%2FOptional%3A%20include%20a%20brief%20description%20of%20the%20MVP%2F%2F%0D%0A%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%0D%0A%2F%2FLink%20to%20the%20component%20spec%20sheet%20once%20it%20has%20been%20created.%2F%2F%0D%0A%0D%0A%7C%20Component%20spec%20sheet%20%7C%0D%0A%0D%0A%23%23%23%20Anatomy%0D%0A%0D%0AThe%20initial%20component%20will%20include%3A%0D%0A%0D%0A-%20%2F%2FAdd%20a%20list%20describing%20the%20anatomy%20of%20the%20MVP%20version%2C%20optionally%20include%20screenshots%20of%20designs%20or%20use%20cases%2F%2F%0D%0A%0D%0A%23%23%23%20Style%0D%0A%0D%0AThe%20initial%20component%20will%20present%20the%20following%20visual%20features%3A%0D%0A%0D%0A-%20%2F%2FAdd%20a%20list%20describing%20the%20styles%20included%20in%20the%20MVP%20version%2C%20optionally%20include%20screenshots%20of%20designs%20or%20use%20cases%2F%2F%0D%0A%0D%0A%23%23%23%20Interaction%0D%0A%0D%0AThe%20initial%20component%20will%20follow%20these%20interaction%20specifications%3A%0D%0A%0D%0A-%20%2F%2FAdd%20a%20list%20describing%20the%20interactive%20features%20and%20states%20covered%20by%20the%20MVP%20version%2C%20optionally%20include%20screenshots%20of%20designs%20or%20use%20cases%2F%2F%0D%0A%0D%0A%23%23%23%20Documentation%0D%0A%0D%0A-%20Structure%3A%20%2F%2FDescribe%20where%20the%20component%20will%20live%20in%20the%20sidebar%20hierarchy%2C%20e.g.%20a%20new%20sidebar%20item%20or%20within%20a%20group.%2F%2F%0D%0A-%20Content%3A%20%2F%2FDescribe%20the%20content%20of%20the%20demo%20page.%20Aim%20to%20use%20a%20configurable%20demo%20for%20as%20many%20features%20as%20possible%2C%20then%20add%20standalone%20demos%20where%20needed.%2F%2F%0D%0A%0D%0A%23%23%20Considerations%0D%0A%0D%0A-%20%2F%2FOptionally%20include%20any%20other%20information%20important%20to%20clarifying%20MVP%20scope%2C%20what%27s%20out%20of%20scope%2C%20other%20related%20tasks%20that%20should%20be%20created%2C%20etc.%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Acceptance%20criteria%0D%0A%0D%0AThis%20task%20will%20pass%20from%20the%20designer%20to%20the%20developer%20once%20the%20Figma%20spec%20is%20created.%0D%0A%0D%0A%5B%5D%20A%20Figma%20spec%20sheet%20is%20created%20for%20the%20component%20that%20includes%20the%20scope%20defined%20here.%20A%20link%20to%20the%20Figma%20spec%20sheet%27s%20MVP%20version%20has%20been%20added%20to%20this%20task%27s%20description.%0D%0A%5B%5D%20The%20initial%20component%20is%20implemented%20in%20Codex.&projects=design-systems-team%2C%20codex&priority=triage

### Patch requirements

Patches for new components should include all of the following. Patches that introduce changes
should include or update the following as needed.

- **Commit message:** The first line of the commit message has to be prefixed by the component name
(Button, Icon) or the type of work (build, tests, styles, docs, etc.), e.g. `docs: Add more docs.`
  If the commit covers multiple things, include them in a comma-delineated list, e.g.
  `styles, docs, Button: Fix Button styles and document new convention`.
  Special cases are deprecating and breaking changes, to be prefixed with `[DEPRECATING CHANGE]` or
  `[BREAKING CHANGE]`, e.g.
  `[BREAKING CHANGE] Button: Remove primary button functionality`.
  In general, Codex is following the [MediaWiki commit message guidelines](https://www.mediawiki.org/wiki/Gerrit/Commit_message_guidelines).
- **Unit tests:** Attempt to meet the established coverage threshold, which will be calculated and
  output in the command line interface when you run tests.
- **Jest snapshots:** Include snapshots for all variations of props and slots.
- **Demos:** Each component should have a demo page on the VitePress site that shows realistic examples
  of different variations and uses of the component.
- **Documentation:** Each component should have a docblock describing what the component is and the
  basics of how it works. Props, slots, and events should be documented in the code. If a component
  would benefit from additional documentation to communicate how it can be used, include it on the
  demo page.

At a Codex release, but not at commit level, CHANGELOG.md file in the root folder is updated
with all the commit message subjects since last release – separated in "Breaking Changes",
"Deprecating Changes", "Features", "Styles", "Code" and "Documentation" sections.

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

## Developing components

### Component basics

The `codex` package uses [Vue 3](https://v3.vuejs.org/guide/introduction.html) and prefers
the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) over the
Options API.

Codex is written in TypeScript: see the [Working with TypeScript](./typescript.md) section for
information about code conventions, solved problems, and potential pitfalls.

There are two environments available for testing components during development:

1. The `Sandbox.vue` file in the `codex` package. `npm run dev` will serve that page at
   `http://localhost:5173` , and automatically update it in the browser as you make changes to the code
   (hot module reloading). If you need it to be served on a different port, you can use
   `npm run dev --port=12345`. This doesn't replace the use of VitePress for demo and documentation,
   it is more of a convenience during initial component development.
2. The VitePress demo site. See the [component demos](#component-demos) section for details.

#### Conventions

- Export all components in `src/lib.ts` to make them available to library users.
- PascalCase multi-word component names are used per the Vue.js Style Guide. Component names should
be prefixed with "Cdx," e.g. `CdxButton`
- Slot names should be all lowercase. Use `kebab-case` for slot names with multiple words. This is
necessary to ensure support for environments that use DOM templates, including MediaWiki.

### Writing styles

Styles are written in [Less](https://lesscss.org/#) and are included in the single-file component
at the end in a `<style lang="less">` wrapped section. Codex design tokens are imported as Less
variables from the `@wikimedia/codex-design-tokens` package, using the default
`theme-wikimedia-ui` theme.

#### Conventions

**Design tokens**

See [tokens organization, naming and structure for a detailed overview](../design-tokens/overview.md).<br>
Stylesheet specific token application rules:
- If a component uses a value not represented by a Codex token yet, add a
  component-level Less variable in the `<style>` tag before the first selector.
- Tokens should follow [naming patterns established for MediaWiki](https://www.mediawiki.org/wiki/Manual:Coding_conventions/CSS#Variable_naming).
- Codex does not use shorthand properties `background`, `font`, `animation` and `transition` for
  simpler design token scoping and code modularization reasons. Only tokens of a category type are
  summarized into a shorthand token, e.g.
  ```
  "padding": {
		"base": {
			"value": "{ padding.vertical.base } { padding.horizontal.base }"
		}
  }
  ```

**Selectors and structure**
- A light version of [BEM](http://getbem.com/) is used for class naming structure:
  - The root element will have the class `.cdx-component-name`
  - A block within that root element would have the class `.cdx-component-name__block-name`
  - A variation of that block would have the class `.cdx-component-name__block-name--modifier-name`
  - There is no need to go deeper than 2 block levels in a class name; class names of further
    sub-elements can omit some of the blocks for the sake of brevity.
- If a style or selector isn't self-explanatory, add a comment above it in Less comment style `//`.
- Avoid HTML element selectors. The style rulesets should aim to be independent from specific
  element choices, which may change.
- Styles specific to a component's enabled or disabled state should be contained in a selector
  specific to that state. This structure allows us to avoid overriding enabled styles for the
  disabled state.
  - The pseudo-classes `&:enabled` and `&:disabled` can be used when available, otherwise
    `&--enabled` and `&--disabled` classes should be added (e.g. `.cdx-menu-item--enabled`).
    These are available to contain styles for the two states and for simpler styles orientation.
  - The stylelint `no-descending-specificity` rule can be disabled to maintain this structure (see
    sample code below).

**Linting**
- Codex uses [stylelint-order](https://github.com/hudochenkov/stylelint-order/) to order CSS/Less
  rules
- Enforce relying only on specific CSS properties over shorthands for `background`, `font`,
  `animation` and `transition`.
- Stylelint rules can be disabled/enabled and should be marked as CSS style comment `/* stylelint-disable-next-line rule-name */`.

Below are some sample styles for a component to demonstrate these conventions:

```less
<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-radio {
	line-height: @size-radio;

	// Custom-styled radio that's visible to the user.
	&__icon {
		width: @size-radio;
		height: @size-radio;
		border-radius: @border-radius-circle;
	}

	&--inline {
		// Avoid line break between icon and label text.
		white-space: nowrap;
	}

	&__input {
		&:enabled {
			// Only enabled radios should have this hover style.
			&:hover + .cdx-radio__icon {
				border-color: @border-color-input-binary--hover;
			}
		}

		/* stylelint-disable no-descending-specificity */
		&:disabled {
			// Only disabled radios should have a gray label.
			& ~ .cdx-radio__label-content {
				color: @color-disabled;
			}
		}
		/* stylelint-enable no-descending-specificity */
}
</style>
```

### Bidirectional script support
Codex has limited support for [bidirectional text](https://en.wikipedia.org/wiki/Bidirectional_text).
It supports pages that are entirely in a left-to-right (LTR) script, or pages that are entirely
in a right-to-left (RTL) script. It does not support pages with a mix of LTR and RTL
content, or pages whose directionality changes at runtime, except in some special cases.
At the time of this writing, it's virtually impossible to support those use cases without the
`:dir()` CSS pseudo-class, which is
[not yet supported by most browsers](https://caniuse.com/css-dir-pseudo).

There are tools (like postcss-rtlcss, see below) that generate bidirectional CSS using attribute
selectors like `[dir='ltr']`, but this technique is fragile. It breaks in confusing and ugly ways
on pages that don't have a `dir` attribute set, and on pages where a `dir="ltr"` element is nested
inside a `dir="rtl"` element or vice versa. Because of these significant limitations, bidirectional
stylesheets are only useful in very limited circumstances, and Codex does not provide one.

#### Flipping of direction-specific styles
Styles in Codex are written for left-to-right (LTR) environments. Codex uses
[RTLCSS](https://rtlcss.com/) to generate flipped versions of these styles for right-to-left (RTL)
environments. For example, a rule like `.foo { padding-left: 4px; }` will be changed to
`.foo { padding-right: 4px; }` in RTL. In the build, the LTR styles are placed in `codex.style.css`
and the RTL styles in`codex.style-rtl.css`.

In most cases, this automatic transformation should produce the correct result, but you should
always test style changes in both LTR and RTL. Both the sandbox (`npm run dev`) and the component
demos (`npm run doc:dev`) have direction switchers that allow you to switch between LTR and RTL
on the fly.

In some cases, the automatic flipping transformation doesn't produce the correct result. Override
directives can be used to address this. To prevent a rule from being flipped, put `/* rtl:ignore */`
on the line above it. To set a different value for a property in RTL, put the RTL value in
a comment like `/* rtl:4px */`. These two directives are the most important ones, but others exist;
see the postcss-rtlcss documentation on [control directives](https://rtlcss.com/learn/usage-guide/control-directives/)
and [value directives](https://rtlcss.com/learn/usage-guide/value-directives/)
for more information.

Below is an example that demonstrates these directives:
```less
.foo {
	// This rule isn't flipped. It uses float: left; in both LTR and RTL
	/* rtl:ignore */
	float: left;

	// This rule is flipped, because there is no rtl:ignore directive above it
	// It becomes padding-right: 12px; in RTL
	padding-left: 12px;
}

.bar {
	// This rule uses -100% in RTL, because that value is explicitly specified
	transform: translateX( 0 ) /* rtl:translateX( -100% ) */;

	// This rule is NOT flipped to margin-right, because an explicit RTL value is specified
	// In RTL, this rule becomes margin-left: 30px; (NOT margin-right: 30px;)
	margin-left: 12px /* rtl:30px */;
}
```

#### Direction-specific behavior in components
Some components need to adjust their behavior depending on the text direction. For example,
components that listen for the left and right arrow keys being pressed may need to react to those
key presses differently depending on the text direction.

To achieve this, components should use the `useComputedDirection()` composable, which detects the
direction of the surrounding context of the component at mount time. This works even on pages with
mixed or nested directionality; however it does not detect changes in directionality that happen
after the component is mounted.

Below is an example that demonstrates the use of the `useComputedDirection()` composable function:
```vue
<template>
	<!-- Set ref="rootElement" on the root element of your component -->
	<div
		ref="rootElement"
		class="cdx-my-component"
		@keydown.left.right="onKeydown"
	>
		<!-- ...component template goes here... -->
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import useComputedDirection from '../../composables/useComputedDirection';
// ...other imports...

export default defineComponent( {
	setup() {
		const rootElement = ref(); // If using TypeScript, use ref<HTMLDivElement>();
		const computedDir = useComputedDirection( rootElement );

		function onKeydown( e ) {
			if ( e.key === 'ArrowLeft' ) {
				// Left means "next" in RTL, "previous" in LTR
				navigate( computedDir.value === 'rtl' ? 'next' : 'previous' );
			} else if ( e.key === 'ArrowRight' ) {
				navigate( computedDir.value === 'ltr' ? 'previous' : 'next' );
			}
		}

		function navigate( prevOrNext ) {
			// ...
		}

		return {
			rootElement,
			onKeydown
		};
	}
} );
</script>
```

The [Icon component](../components/icon.md) also uses this composable to detect the text direction,
and allows the detected direction to be overridden through the `dir` prop. For more information about
how bidirectionality is handled for icons in particular, see
[the icon documentation](../icons/overview.md#right-to-left-rtl-and-language-support).

### Inheriting attributes

By default, components will place any attributes bound to them on the root element of the
component. Sometimes, though, we don't want this behavior. For example, for a component that
contains an `<input>` element, we may want to bind most of the attributes to that `<input>` element
rather than the root element.

Some attributes, however, should always be bound to the root element in order to provide expected
results for library users. This includes `class` and `style` attributes.

::: warning
Binding a `style` attribute to a component is highly discouraged as it could interfere with Design
System consistency and negatively impact performance. Nonetheless, if one is provided, it will be
bound to the root element of the component.
:::

To help achieve the desired behavior in components like this, we have a composable called
`useSplitAttributes`. It provides the following:
1. `rootClasses`: all CSS classes that should be bound to the root element, including those set via
the `class` attribute on the component and those that are internal to the component, like dynamic
and conditional classes
2. `rootStyle`: the `style` attribute bound to the component, should one be provided
2. `otherAttrs`: all other attributes, which can be bound to the desired child element

Below is sample usage from the TextInput component:

```vue
<template>
	<!-- Add rootClasses and rootStyle to the root element. -->
	<div
		class="cdx-text-input"
		:class="rootClasses"
		:style="rootStyle"
	>
		<!-- Bind otherAttrs to the input. -->
		<input
			v-bind="otherAttrs"
		>
	</div>
</template>

<script>
// Import the composable.
import useSplitAttributes from '../../composables/useSplitAttributes';

export default defineComponent( {
	name: 'CdxTextInput',
	// Set inheritAttrs to false.
	inheritAttrs: false,
	setup( props, context ) {
		// Define dynamic classes internal to the component, in Vue's object
		// syntax format.
		const internalClasses = computed( () => {
			return {
				'cdx-text-input--has-start-icon': !!props.startIcon,
				'cdx-text-input--has-end-icon': !!props.endIcon || props.clearable,
				'cdx-text-input--clearable': isClearable.value
			};
		} );

		// Get helpers from the composable.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( context.attrs, internalClasses );
	}
} );
</script>
```

### Unit tests

::: tip TL;DR
- Every component needs [Jest unit tests](#test-cases-pattern) and [snapshots](#snapshot-tests)
- Unit tests can utilize the [Vue test utils](#vue-test-utils) library
- To run unit tests: `npm run -w @wikimedia/codex test:unit`
- To update all snapshots: `npm run build-and-update-snapshots`
- To update a workspace specific snapshots: `npm run -w [workspace-name] update-snapshots` (For some packages a build may be required for the snapshots to be updated correctly)
:::

Every component should have Jest unit tests. For a component named `FooBar`, the tests should be
in the file `src/components/foo-bar/FooBar.test.ts`.

#### Test cases pattern
A common pattern in unit tests is to perform the same test multiple times with different parameters,
for example calling the same function with multiple different inputs and expecting different
outputs, or mounting the same component with different prop or slot values. We use the following
conventions when writing tests that use the test cases pattern.

First, define a **test case type** called `Case` that describes what a test case looks like. This
should be an array that begins with a string explaining the test case, then the inputs to your test,
then the expected output. For example, if we're testing a function that adds two numbers, our test
case type might look like this:
```typescript
type Case = [ msg: string, a: number, b: number, expected: number ];
```
When testing components that have many optional props, it often makes sense to express the props
as an object instead of as individual array elements:
```typescript
type Case = [
	msg: string,
	props: {
		label: string,
		value?: string,
		disabled?: boolean
	},
	/* ... */
];
```

Then, define an **array of test cases** called `cases` that contains all the input and outputs
for the test. Be sure to tell TypeScript that it's of type `Case[]`, so it can catch mistakes in
test cases and correctly type check how they're used.
```typescript
const cases: Case[] = [
	[ 'Simple addition: 1+1=2', 1, 1, 2 ],
	[ 'Bigger numbers: 23+42=65', 23, 42, 65 ],
	[ 'Negative and positive: -2+5=3', -2, 5, 3 ]
];
```

Finally, write the code that iterates over these test cases and executes them. This involves some
Jest boilerplate code that extracts the values from the test case, but other than that it should
be simple: call the function and check that the result is as expected.
```typescript
test.each( cases )( 'Case %# %s', ( _, a, b, expected ) => {
	expect( addNumbers( a, b ) ).toEqual( expected );
} );
```

#### Structuring unit tests
Unit tests should be used to test the behavior of a component, independently from other units
(libraries or components). This section defines some standards to ensure that test files can be
maintained and updated with minimal effort.

It is common for test files to get very large, making adding new tests or finding a specific test a
complex task. Defining patterns makes the tests easier to maintain and update.


**Start with a filename.**
The first `describe` block within a test file should be named for the component (or function) that
is being tested. This will improve the debugging experience by providing the component name in the
error message when a test fails.

```typescript
// MenuItem.test.ts

describe( 'MenuItem', () => {
	describe( 'matches the snapshots', () => {
	} );

	describe( 'descriptive test name', () => {
	} );
}
```

**Define names that describe a behaviour not an implementation.**
The name of a `describe` block should describe the behavior expected by the test, not how the the
test is implemented internally. This should start with words like "when", "with" or "without".

```typescript
// Bad
describe( 'has an expanded property of "true" ', () => {
} );

// Good
describe( 'when the dropdown is expanded', () => {
} );
```

**Use given-when-then notation.**
When writing a set of unit tests for your component, the test's collection of `describe` and `it`
blocks should compose sentences that resemble given-when-then notation. The block names do not have
to start with those exact words ("given", "when", "then"), but they should express the same meaning:

- **Given**: Some context on what is being tested. This is typically the component name
- **When/And**: One or more actions or scenarios that would set the test to the correct state
- **Then**: One or more consequences resulting from the above actions

```typescript
describe( 'Button', () => {
	describe( 'when clicked', () => {
		it( 'should notify its parent', () => {
		} );
	} );
} );
// Output -> Button, when clicked, should notify its parent
```

**Abstract common logic when possible.**
Writing tests using given-when-then notation provides opportunities to abstract common logic within
the various `describe` blocks. Doing so makes the individual tests simple to write and debug and
also reduces the risk of manual error.

A common use case is to set all the variables, properties, and mocks required for a specific action
to take place within the `beforeEach` hook, then cleaning them up using the `afterEach` hook.

```typescript
// Props, slots, and search results variables defined above...
describe( 'TypeaheadSearch', () => {
	describe( 'when there are search results', () => {
		let wrapper: VueWrapper<any>;
		let input: DOMWrapper<Element>;
		let menu: DOMWrapper<Element>;

		// Before each test, we'll set up a component wrapper, advance past the debounce
		// interval of the input handler, then set search results.
		beforeEach( async () => {
			jest.useFakeTimers( 'modern' );

			wrapper = mount( CdxTypeaheadSearch, {
				// Add in an initial input value so we don't have to simulate entering input.
				props: { initialInputValue: 'Co', searchFooterUrl, showThumbnail: true, ...propsData },
				slots: {
					default: defaultSlot,
					searchFooterText: searchFooterTextSlot
				}
			} );

			jest.advanceTimersByTime( DebounceInterval );
			await wrapper.setProps( { searchResults } );

			// Grab the input and menu, which we'll need for a few tests.
			input = wrapper.find( '.cdx-text-input__input' );
			menu = wrapper.find( '.cdx-menu' );
		} );

		// After each test, we'll reset timers.
		afterEach( () => {
			jest.useRealTimers();
		} );

		it( 'matches the snapshot', () => {
			expect( wrapper.element ).toMatchSnapshot();
		} );

		it( 'closes menu when input is cleared', async () => {
			await input.trigger( 'focus' );
			expect( menu.isVisible() ).toBe( true );
			await input.setValue( '' );
			jest.advanceTimersByTime( DebounceInterval );
			expect( menu.isVisible() ).toBe( false );
		} );
	} );
} );
```

::: warning
Even if it is possible to use the same variables and progressively change them in each layer of
the test, it is better to actually declare the complete required object in (or before) each test to
provide more visibility.
:::

#### Vue test utils
Tests in Codex use the Vue test utils to mount and interact with components. To learn how to use
this library, read the [Vue test utils guide](https://next.vue-test-utils.vuejs.org/guide/),
particularly the sections on [passing data to components](https://next.vue-test-utils.vuejs.org/guide/essentials/passing-data.html), [slots](https://next.vue-test-utils.vuejs.org/guide/advanced/slots.html) and
[testing emitted events](https://next.vue-test-utils.vuejs.org/guide/essentials/event-handling.html).

#### Snapshot tests
At minimum, each component should have snapshot tests for a representative set of prop values and
slot values. To write these, we use the [test cases pattern](#test-cases-pattern), except that
test cases in snapshot tests only have inputs, no outputs. Below is a simple example for a component
with two required props and no slots:
```typescript
import { mount } from '@vue/test-utils';
import CdxComponentName from './ComponentName.vue';

describe( 'ComponentName', () => {
	describe( 'matches the snapshot', () => {
		type Case = [ msg: string, num: number, label: string ];

		const cases : Case[] = [
			'Simple', 42, 'The answer',
			'Zero', 0, 'Nothing',
			'Empty string', 0, '',
			'Long string', 23, 'Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft'
		];

		test.each( cases )( 'Case %# %s', ( _, num, label ) => {
			const wrapper = mount( CdxComponentName, { props: { num, label } } );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	// ...other tests...
} );
```
When these snapshot tests are run for the first time, Jest will create a file called
`ComponentName.snap.ts` with the HTML resulting from each of these test cases. Verify that these are
as expected, then commit the file to the repository.

When the tests are run again later, Jest will check that the test cases still produce the same HTML,
and the tests will fail if they don't. If you made a change to the component that results in a
legitimate change in the snapshot output, run `npm run build-and-update-snapshots` to update
the snapshot file. Both the author and the code reviewers should review the changes to the snapshot
file to verify that they are as expected.

For more information on snapshot testing in Jest, see [the Jest documentation](https://jestjs.io/docs/snapshot-testing).

#### Type errors in Jest tests
If the type of one of the props in the `Case` type doesn't match the type of the prop as defined
in the component, or if a prop is otherwise passed into `mount()` with the wrong type, `vue-tsc`
will throw a lengthy and confusing error on the line where `mount()` is called, containing the
phrases `No overload matches this call`, `Types of property 'setup' are incompatible` and
`Types of parameters 'props and 'props' are incompatible`. Most IDEs don't surface these errors,
so they may not be discovered until `vue-tsc` is run (locally or in CI). To fix this error, make
sure that the types of the props passed into the mount function match the types that the component
expects. For more on how these errors happen and how to fix them, see
[the TypeScript guidelines](./typescript.md#wrong-types-for-props-in-jest-tests).

### Component demos

::: tip TL;DR
- Codex uses [VitePress](https://vitepress.vuejs.org/) to demo components
- Run `npm run doc:dev` to serve the demo site locally
- Each component should have a demo page. Demos should cover realistic use cases and variations of
  props and slots
- Demos are written in Markdown files in `packages/codex-docs/component-demos` then compiled to
  `packages/codex-docs/docs/components`
:::

Codex uses [VitePress](https://vitepress.vuejs.org/) to demo Vue components. Component demos should
provide working demonstrations and code samples for all realistic use cases of a component, plus all
variations of props and slots. Ideally, a user of the library could copy and paste a code sample
into their own code to use as a starting point.

#### Component page generation

Although most of the docs are simply markdown files within `packages/codex-docs/docs`, the component
page files in `packages/codex-docs/docs/components` are automatically generated by
[vue-docgen-cli](https://vue-styleguidist.github.io/docs/docgen-cli.html).

Component demos are written in markdown files outside of the `packages/codex-docs/docs` directory
(see below). vue-docgen-cli is configured to grab the demo file, add documentation that's generated
from the component's `.vue` file (page title, description, meta info, usage docs, etc.), and place
the generated file in `packages/codex-docs/docs/components`.


#### Dev site

To serve the VitePress site locally, run this command in the root of the Codex repository:

```bash
npm run doc:dev
```

This will both serve the VitePress site at `http://localhost:5173` and compile component usage docs.
If you need to serve the VitePress site on a different port, use `npm run doc:dev --port=12345`.
For ease of development, the site uses hot module reloading: changes to the source code are
immediately reflected in the browser, without needing to reload the page.

#### Creating a new component demo page

Once you have a `.vue` file for the component in `packages/codex`, you can add a demo
page for that component. This takes 2 steps:

1. Add a new directory for your component to `packages/codex-docs/component-demos`. This new
   directory should exactly match the machine name of the component. Add a file,
   `component-name.md`, to that directory.
2. Add a link to the page in the sidebar by editing VitePress config in
   `packages/codex-docs/docs/.vitepress/config.js`:

```js
// In packages/codex-docs/docs/.vitepress/config.js
module.exports = {
	themeConfig: {
		sidebar: {
			'/': [
			 	...
				{
					text: 'Components',
					items: [
						// Add more components here.
						{ text: 'Button', link: '/components/button' },
						{ text: 'Radio', link: '/components/radio' }
					]
				},
				...
			]
		}
	}
}
```

#### Importing components

You can import Codex components directly from the `@wikimedia/codex` package:

```js
<script setup>
import { CdxButton } from '@wikimedia/codex';
</script>
```

#### Formatting component demos

A `cdx-demo-wrapper` component is available in all markdown files that provides some formatting for
components demos and show code/hide code functionality. To use it, place the demo code inside the
`demo` slot, and the code sample inside the `code` slot. The code can either be a markdown code
block or an imported code snippet.

::: tip
Note that the whitespace before and after the code sample is required for the markdown to compile
properly.
:::


Example using a markdown code block:

````markdown
<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-button type="quiet">Click me</cdx-button>
</template>

<template v-slot:code>

```vue-html
<cdx-button>Click me</cdx-button>
```

</template>
</cdx-demo-wrapper>
````

Example using an imported code snippet:

````markdown
<script setup>
import RadioGroup from '@/../../component-demos/radio/examples/RadioGroup.vue';
</script>

<cdx-demo-wrapper>
<template v-slot:demo>
<radio-group />
</template>

<template v-slot:code>

<<< @/../../component-demos/radio/examples/RadioGroup.vue

</template>
</cdx-demo-wrapper>
````

Try to keep the code samples relevant to the library user. Remember that your code sample doesn't
actually have to match the code used in the demo: for example, you might display an example
component for the demo but include a simplified version of that example component to display as the
code snippet.

#### Configurable demos

If a component has several variations depending on prop and slot input, it may benefit from a
configurable demo that enables users to input different prop and slot values and see the results on
the fly. This can be achieved within the Wrapper component, which can take in configuration for prop
and slot controls, then provide the current values of those props and slots to the component demo
via a [scoped slot](https://v3.vuejs.org/guide/component-slots.html#scoped-slots).

To set this up, create an array of config objects, one for each prop or slot you want to allow
the user to control. The following control types are available:

- `radio`: for props with several known value options. Displays a radio for each provided value
option.
- `boolean`: For boolean props. Displays a true/false toggle that defaults to false.
- `text`: For props with string or number values. Displays a text input for the value.
- `slot`: For slots. Displays a text input for the slot content.

You can set a default value for each control (required for slots), otherwise the value will default
to the first option (for `radio` controls), `false` (for `boolean` controls), or an empty string
(for `text` controls)

See `packages/codex-docs/docs/utils/types.ts` for full details on control configuration, or check out
the configuration for the Button demo:

```js
const controlsConfig = [
	{
		name: 'action',
		type: 'radio',
		options: [ 'default', 'progressive', 'destructive' ],
	},
	{
		name: 'type',
		type: 'radio',
		options: [ 'normal', 'primary', 'quiet' ],
	},
	{
		name: 'disabled',
		type: 'boolean'
	},
	{
		name: 'default',
		type: 'slot',
		default: 'Click me'
	}
];
```

Next, set up the component demo. Pass the controls config to the Wrapper component via its
`controlsConfig` prop, then use the `demo` slot with `propValues` and `slotValues` bindings to wrap
your component demo. `propValues` is an object keyed on prop name with the current value of each
prop, and `slotValues` is an object keyed on slot name with the current content of each slot. This
is how the configurable Button demo is set up:

```vue-html
<cdx-demo-wrapper :controls-config="controlsConfig">
<template v-slot:demo="{ propValues, slotValues }">
<cdx-button v-bind="propValues">{{ slotValues.default }}</cdx-button>
</template>
</cdx-demo-wrapper>
```

#### Styling demo pages

Styles for a single demo page should be placed inside a `<style>` block in the markdown file.

Styles for example components should be scoped to ensure they only apply to that component.

### Working with browser tests

TODO - possibly not needed if writing browser tests is a straightforward process

### Working with visual regression tests

TODO - how to create a base snapshot for the new component
