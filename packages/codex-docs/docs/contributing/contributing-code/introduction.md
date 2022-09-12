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

The following list represents the full process of adding a component, from conception as a task to
a fully functional and documented component. These steps may be completed by a number of different
contributors—a single developer does not need complete all of these steps on their own.

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
  specification. Visit [writing styles](./developing-components#writing-styles) for more details.
6. **Test the component.** Write unit tests for the new code. Visit the [unit tests](./testing-components#unit-tests) section for more details.
7. **Demo the component.** Create component demos in VitePress, following the specifications
  provided in the task and existing examples from other component demo pages. Visit the
  [component demos](./component-demos) section for more details.
8. **Handle feedback from design and product.** Relevant designers and product managers will review
  the new component, provide feedback, and eventually sign-off on the component. Developers will
  respond to the feedback and implement any necessary changes, or open tasks so those changes can
  be done in the future.

[epic-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=%5BEPIC%5D%20Add%20%5BComponentName%5D%20component%20to%20Codex&description=%23%23%20Background%0D%0A%0D%0ANOTE%3A%20%2F%2FWhen%20creating%20a%20component%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A-%20**Description%3A**%20%2F%2Fadd%20a%20brief%20description%20of%20this%20component%2F%2F%0D%0A-%20**History%3A**%20%2F%2Fdescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20component%2F%2F%0D%0A-%20**Known%20use%20case(s)%3A**%20%2F%2Fdescribe%20known%20use%20cases%20for%20this%20component%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A-%20**Considerations%3A**%20%2F%2Flist%20any%20known%20challenges%20or%20blockers%2C%20or%20any%20other%20important%20information%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A-%20%2F%2Fadd%20at%20least%20one%20user%20story%2F%2F%0D%0A%0D%0A%23%23%23%20Previous%20implementations%0D%0A%0D%0AThese%20artifacts%20are%20listed%20for%20historical%20context.%20The%20figma%20spec%2C%20linked%20below%2C%20is%20the%20source%20of%20truth%20for%20the%20new%20component.%0D%0A%0D%0A-%20**Design%20style%20guide%3A**%20%2F%2Fadd%20%5B%5B%20https%3A%2F%2Fdesign.wikimedia.org%2Fstyle-guide%2Findex.html%20%7C%20Design%20Style%20Guide%20%5D%5D%20link%2C%20if%20applicable%2F%2F%0D%0A-%20**OOUI%3A**%20%2F%2Fadd%20the%20relevant%20OOUI%20widget%20name%20here%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fdoc.wikimedia.org%2Foojs-ui%2Fmaster%2Fdemos%2F%3Fpage%3Dwidgets%26theme%3Dwikimediaui%26direction%3Dltr%26platform%3Ddesktop%20%7C%20OOUI%20demos%20%5D%5D.%2F%2F%0D%0A-%20**Vue%3A**%20%2F%2Fadd%20any%20existing%20Vue%20implementations%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fphabricator.wikimedia.org%2FT272885%20%7C%20Vue%20component%20inventory%20%5D%5D.%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Codex%20implementation%0D%0A%0D%0A%23%23%23%20Component%20task%20owners%0D%0A%0D%0A-%20Designer%3A%20%2F%2Fadd%20the%20main%20designer%27s%20name%2F%2F%0D%0A-%20Developer%3A%20%2F%2Fadd%20the%20main%20developer%27s%20name%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%0D%0A%2F%2F%20Once%20a%20component%20spec%20sheet%20has%20been%20created%20in%20Figma%2C%20remove%20the%20note%20stating%20that%20the%20spec%20is%20missing%20and%20link%20to%20the%20spec%20below.%20%2F%2F%0D%0A%0D%0AA%20component%20spec%20sheet%20has%20not%20been%20created%20yet.%0D%0A%0D%0A%7C%20Component%20spec%20sheet%20%7C%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Stage%201%3A%20Minimum%20viable%20product%20(MVP)%0D%0A%0D%0AMVP%20includes%20basic%20layout%2C%20default%20states%2C%20and%20most%20important%20functionality.%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%0D%0A%0D%0A-%20%5B%5D%20Determine%20what%20MVP%20includes%20for%20this%20component%20and%20document%20this%20in%20a%20subtask.%20Assign%20task%20to%20designer.%0D%0A-%20%5B%5D%20Design%20MVP.%20Once%20complete%2C%20assign%20task%20to%20developer.%0D%0A-%20%5B%5D%20Implement%20MVP%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Stage%202%3A%20Additional%20states%2C%20features%2C%20and%20variants%0D%0A%0D%0AThis%20might%20include%20a%20disabled%20state%2C%20framed%2Fframeless%20designs%2C%20transitions%2C%20supporting%20different%20use%20cases%2C%20etc.%2C%20which%20will%20be%20captured%20in%20separate%20subtasks.%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%0D%0A%0D%0A-%20%5B%5D%20Document%20design%20and%20implementation%20of%20additional%20states%20and%20features%20in%20individual%20subtasks%0D%0A-%20%5B%5D%20Complete%20each%20additional%20state%2Ffeature%20subtask%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Stage%203%3A%20Refinement%0D%0A%0D%0AThis%20stage%20includes%20any%20final%20touches%20or%20bug%20fixes%20needed%20before%20the%20component%20can%20be%20deemed%20complete%2C%20which%20will%20be%20captured%20in%20separate%20subtasks.%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%0D%0A%0D%0A-%20%5B%5D%20Finalize%20docs%3A%20open%20and%20complete%20a%20subtask%20for%20any%20additional%20demos%20that%20need%20to%20be%20added%20or%20documentation%20that%20needs%20work%0D%0A-%20%5B%5D%20Meet%20accessibility%20standards%3A%20open%20and%20complete%20a%20subtask%20for%20any%20necessary%20accessibility%20improvements%0D%0A-%20%5B%5D%20Meet%20internationalization%20standards%3A%20open%20and%20complete%20a%20subtask%20to%20fix%20any%20i18n%20bugs%0D%0A-%20%5B%5D%20Complete%20testing%3A%20open%20and%20complete%20a%20subtask%20for%20any%20additional%20unit%20or%20functional%20tests%20that%20are%20needed&projects=design-systems-team%2C%20codex%2C%20epic&priority=triage
[mvp-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=Design%20and%20build%20initial%20%5BComponentName%5D%20component%20(MVP)&description=**This%20task%20defines%20the%20minimum%20viable%20product%20(MVP)%20of%20the%20%5BComponentName%5D%20component.**%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Scope%0D%0A%0D%0A%2F%2FOptional%3A%20include%20a%20brief%20description%20of%20the%20MVP%2F%2F%0D%0A%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%0D%0A%2F%2FLink%20to%20the%20component%20spec%20sheet%20once%20it%20has%20been%20created.%2F%2F%0D%0A%0D%0A%7C%20Component%20spec%20sheet%20%7C%0D%0A%0D%0A%23%23%23%20Anatomy%0D%0A%0D%0AThe%20initial%20component%20will%20include%3A%0D%0A%0D%0A-%20%2F%2FAdd%20a%20list%20describing%20the%20anatomy%20of%20the%20MVP%20version%2C%20optionally%20include%20screenshots%20of%20designs%20or%20use%20cases%2F%2F%0D%0A%0D%0A%23%23%23%20Style%0D%0A%0D%0AThe%20initial%20component%20will%20present%20the%20following%20visual%20features%3A%0D%0A%0D%0A-%20%2F%2FAdd%20a%20list%20describing%20the%20styles%20included%20in%20the%20MVP%20version%2C%20optionally%20include%20screenshots%20of%20designs%20or%20use%20cases%2F%2F%0D%0A%0D%0A%23%23%23%20Interaction%0D%0A%0D%0AThe%20initial%20component%20will%20follow%20these%20interaction%20specifications%3A%0D%0A%0D%0A-%20%2F%2FAdd%20a%20list%20describing%20the%20interactive%20features%20and%20states%20covered%20by%20the%20MVP%20version%2C%20optionally%20include%20screenshots%20of%20designs%20or%20use%20cases%2F%2F%0D%0A%0D%0A%23%23%23%20Documentation%0D%0A%0D%0A-%20Structure%3A%20%2F%2FDescribe%20where%20the%20component%20will%20live%20in%20the%20sidebar%20hierarchy%2C%20e.g.%20a%20new%20sidebar%20item%20or%20within%20a%20group.%2F%2F%0D%0A-%20Content%3A%20%2F%2FDescribe%20the%20content%20of%20the%20demo%20page.%20Aim%20to%20use%20a%20configurable%20demo%20for%20as%20many%20features%20as%20possible%2C%20then%20add%20standalone%20demos%20where%20needed.%2F%2F%0D%0A%0D%0A%23%23%20Considerations%0D%0A%0D%0A-%20%2F%2FOptionally%20include%20any%20other%20information%20important%20to%20clarifying%20MVP%20scope%2C%20what%27s%20out%20of%20scope%2C%20other%20related%20tasks%20that%20should%20be%20created%2C%20etc.%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Acceptance%20criteria%0D%0A%0D%0AThis%20task%20will%20pass%20from%20the%20designer%20to%20the%20developer%20once%20the%20Figma%20spec%20is%20created.%0D%0A%0D%0A%5B%5D%20A%20Figma%20spec%20sheet%20is%20created%20for%20the%20component%20that%20includes%20the%20scope%20defined%20here.%20A%20link%20to%20the%20Figma%20spec%20sheet%27s%20MVP%20version%20has%20been%20added%20to%20this%20task%27s%20description.%0D%0A%5B%5D%20The%20initial%20component%20is%20implemented%20in%20Codex.&projects=design-systems-team%2C%20codex&priority=triage

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

- **Commit message:** The first line of the commit message has to be prefixed by the component name
(Button, Icon) or the type of work (build, tests, styles, docs, etc.), e.g. `docs: Add more docs.`
  If the commit covers multiple things, include them in a comma-delineated list, e.g.
  `styles, docs, Button: Fix Button styles and document new convention`.
  Special cases are deprecating and breaking changes, to be prefixed with `[DEPRECATING CHANGE]` or
  `[BREAKING CHANGE]`, e.g.
  `[BREAKING CHANGE] Button: Remove primary button functionality`.
  In general, Codex is following the [MediaWiki commit message guidelines](https://www.mediawiki.org/wiki/Gerrit/Commit_message_guidelines).
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

At a Codex release, but not at commit level, `CHANGELOG.md` file in the root folder is updated
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
