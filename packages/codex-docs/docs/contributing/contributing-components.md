# Contributing components

(TODO: update)

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
