# Designing new components

This page outlines the steps that collaborators should follow in order to contribute a new Codex component.

::: info
If you need support or have questions during the contribution process, reach out through one of the following channels:
- [Slack](https://wikimedia.enterprise.slack.com/archives/C03DKGSEPL2): If you're an internal contributor at the Wikimedia Foundation, join the Codex Slack channel for support and collaboration.
- [Telegram](https://t.me/+oeXgL95hvgZiMDgx): If you are an external contributor, join the Codex Telegram channel.
:::

## 1. Report and validate

### 1.1. File a task

If the task doesn’t already exist in the [Codex Phabricator board](https://phabricator.wikimedia.org/tag/codex/), create one using this [task template][new-component-task-template]. Make sure to file in as much information as possible in the predefined sections.

This task will cover the history, use cases, and overall design of the new component, although only
a "minimum viable product" (MVP) version of the component will be built initially. Other tasks can
be opened to cover component features that will be implemented after the MVP.

Once the task is validated and the need of this new component is clear, you’ll be able to start designing the new Codex component.

::: warning
Create a new component just if none of the [existing components](../components/overview.md) meet your need.
:::

### 1.2. Create an inventory

Create an initial inventory with the relevant use cases where this new component will be reused. You can check the following resources to collect relevant information:

- [Codex component demos](../components/overview.md) and [Codex Figma library](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?node-id=1891%3A4420): verify whether the needed component has already been implemented, or whether it can be designed based on any of the existing Codex ones.
- [OOUI demo site](https://doc.wikimedia.org/oojs-ui/master/demos/?page=widgets&theme=wikimediaui&direction=ltr&platform=desktop): check if this component exists in the OOUI demo.
- [Wikimedia web products](https://www.wikimedia.org/): detect current use cases of the component in the different Wikimedia products.

Designers should also compare components of the same category or elements with shared characteristics that can influence the design direction.

## 2. Design and implement

::: info
Duplicate this [component exploration template](https://www.figma.com/file/6hNSvvL4CoyfemXECihJD5/Exploration-File-(Template)?node-id=1%3A3627) to work on the component's design.
:::

### 2.1. Component’s architecture

Before designing, it's important to identofy the building blocks of the component. Ask yourself: Are they unique elements or existing components?

There are three possible scenarios:
1. **Standalone component**: Built from styled elements, but functions as a single unit (e.g. Button).
2. **Composite of existing components**: Combines components that already exist in Codex (e.g. Combobox is built with a combination of TextInput + Button).
3. **Composite with non existing components**: Includes components that don’t exist yet in Codex. In this case, each sub-component must includes its own task and follow its own design and implementation process.

### 2.2. Visual style and interaction

All Codex components should follow the visual guidelines defined in the [style guide](../style-guide/overview.html). Design tokens can help support the visual definition of components, as they represent pre-made systematic decisions. If you need to use a token that is not documented yet, or you need to apply it in a different context of use, please read the [Designing tokens](designing-tokens.md) guidelines.

You can also reuse the existing [system icons](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=20598-51338&node-type=canvas&t=plW1hmguHVWs3fWZ-11) and [illustration assets](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=20598-51408&node-type=canvas&t=plW1hmguHVWs3fWZ-11), or create new ones following Codex styles. If you need an icon that does not exist in Codex yet, you can contribute the design of a new icon following the [Designing icons](./designing-icons.md) guidelines.

::: info
You will need to enable the [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&node-type=canvas&t=plW1hmguHVWs3fWZ-11) in your Figma file to reuse the Codex’s styles and icons. Learn more about [how to enable Figma libraries](https://help.figma.com/hc/en-us/articles/360038743434#access).
:::

In order to provide a consistent experience, ensure the component's behavior and states align with Codex design principles.

When defining the interactive behavior of new components, make sure to include:

- **Internationalization**: to support different languages and reading directions. Refer to the [Bidirectionality](../style-guide/bidirectionality.md) guidelines for more details.
- **Responsiveness**: make sure to specify the appropriate behavior for the different [breakpoints](../design-tokens/breakpoint.md) and devices.
- **Accessibility**: follow the best practices established for each component and specify the keyboard navigation when the component includes interactive states. Read more about [accessibility principles and resources](../style-guide/accessibility.md).

### 2.3. Specification sheet

Once the component’s visual style and behavior are defined, create a specification sheet to document its functionality. This will guide developers during implementation. You can use this [component specification sheet template](https://www.figma.com/file/6hNSvvL4CoyfemXECihJD5/Component-spec-sheet-(exploration-file-template)?node-id=501%3A22874) to get started.

Make sure to document the following sections from the specification sheet template:

1. **Guides**: List all tokens and sub-components used to build the component.
2. **When to use**: Explain when and when not to use the component.
3. **Anatomy**: Define the component’s anatomy and optional elements.
4. **Limitations**: Define minimum and maximum constraints like element count or character limits.
5. **Bidirectionality**: Show how the component adapts to LTR and RTL reading directions.
6. **Properties or variants** (if needed): Detail the component’s variants and properties.
7. **Interaction states**: If the component includes interactive states, document all them.
8. **Best practices**: Offer guidance on optimal usage for each component, including both do and don't images with practical examples.
9. **Keyboard navigation** (if needed): Detail the keys for interacting with the component via keyboard. This section applies only to components with interactive states.

::: info
Before handoff, share the spec sheet in the Phabricator task to gather feedback. Iterate as needed, and consider testing the component in realistic scenarios if needed.
:::

### 2.4. Hand-off to development

Once the component’s design proposal has been discussed, iterated on (if needed) and finished, the designer will share the link to the final version in the Phabricator task so developers can start implementing the new component in Codex.

The following actions are required by the designer:

1. Link the design spec in the task's description.
2. Post a comment explaining that the task is ready to be implemented.
3. Move the task to the next relevant column in the board.

## 3. Review and document

Once the implementation has been completed, the designer will need to:

- **Design sign-off**: Confirm the new component was implemented correctly in Codex.
- **Publish in Figma**: Add the approved component to the [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&node-type=canvas&t=plW1hmguHVWs3fWZ-11) for reuse in design projects.

::: info
Due to [team permissions in Figma](https://help.figma.com/hc/en-us/articles/360039970673-Team-permissions), only designers in the Wikimedia Foundation in Figma can edit the library.
- If you are part of the team, create a Figma branch adding the new component before publishing.
- If you are not, someone from the team will handle the publishing for you.
:::

[new-component-task-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=%5BComponentName%5D%3A%20Add%20%5BComponentName%5D%20component%20to%20Codex&description=%23%23%20Background%0D%0A%0D%0A%2F%2FNOTE%3A%20%20When%20creating%20a%20component%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A%23%23%23%20Description%0D%0A%0D%0A%2F%2FAdd%20a%20brief%20description%20of%20this%20component%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A%2F%2FAdd%20at%20least%20one%20user%20story.%2F%2F%0D%0A%0D%0A%23%23%23%20History%0D%0A%0D%0A%2F%2FDescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20component%2F%2F%0D%0A%0D%0A%23%23%23%20Known%20use%20cases%0D%0A%0D%0A%2F%2FDescribe%20known%20use%20cases%20for%20this%20component%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A%0D%0A%23%23%23%20Existing%20implementations%0D%0A%0D%0AThese%20artifacts%20are%20listed%20for%20historical%20context.%20The%20design%20spec%2C%20linked%20below%2C%20is%20the%20source%20of%20truth%20for%20the%20new%20component.%0D%0A%0D%0A**Wikimedia%20community%3A**%0D%0A-%20**Codex%20Style%20guide%3A**%20%2F%2Fadd%20%5B%5B%20https%3A%2F%2Fdoc.wikimedia.org%2Fcodex%2Flatest%2Fstyle-guide%2Foverview.html%20%7C%20Codex%20Style%20Guide%20%5D%5D%20link%2C%20if%20applicable%2F%2F%0D%0A-%20**OOUI%3A**%20%2F%2Fadd%20the%20relevant%20OOUI%20widget%20name(s)%20here%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fdoc.wikimedia.org%2Foojs-ui%2Fmaster%2Fdemos%2F%3Fpage%3Dwidgets%26theme%3Dwikimediaui%26direction%3Dltr%26platform%3Ddesktop%20%7C%20OOUI%20demos%20%5D%5D.%2F%2F%0D%0A-%20**Vue%3A**%20%2F%2Fadd%20any%20existing%20Vue%20implementations%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fwww.mediawiki.org%2Fwiki%2FVue.js%23Projects_using_Vue.js%20%7C%20Projects%20using%20Vue.js%20%5D%5D.%2F%2F%0D%0A%0D%0A**External%20libraries%3A**%0D%0A-%20%2F%2FAdd%20links%20to%20any%20examples%20from%20external%20libraries%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Codex%20implementation%0D%0A%0D%0A%23%23%23%20Component%20task%20owners%0D%0A%0D%0A-%20Designer%3A%20%2F%2Fadd%20the%20main%20designer's%20name%2F%2F%0D%0A-%20Developer%3A%20%2F%2Fadd%20the%20main%20developer's%20name%2F%2F%0D%0A%0D%0A%23%23%23%20Open%20questions%0D%0A%0D%0A-%20%2F%2FList%20any%20current%20open%20questions%20here%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%0D%0A%2F%2F%20Once%20a%20component%20spec%20sheet%20has%20been%20created%20in%20Figma%2C%20remove%20the%20note%20stating%20that%20the%20spec%20is%20missing%20and%20link%20to%20the%20spec%20below.%20%2F%2F%0D%0A%0D%0A%7C%20Component%20spec%20sheet%20link%20%7C%0D%0A%0D%0A%23%23%23%23%20Anatomy%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20the%20structure%20and%20properties%20of%20the%20component.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Style%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20the%20visual%20features%20of%20the%20component.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Interaction%0D%0A%0D%0A%2F%2FDesigner%20should%20list%20interaction%20specifications.%2F%2F%0D%0A%0D%0A%23%23%23%23%20Documentation%0D%0A%0D%0A%2F%2FDesigner%20should%20describe%20how%20the%20component%20should%20be%20documented%2C%20including%20configurable%20and%20standalone%20demos.%2F%2F%0D%0A%0D%0A---%0D%0A%0D%0A%23%23%20Acceptance%20criteria%0D%0A%0D%0A%23%23%23%20Minimum%20viable%20product%0D%0A%0D%0AThis%20task%20covers%20the%20minimum%20viable%20product%20(MVP)%20version%20of%20this%20component.%20MVP%20includes%20basic%20layout%2C%20default%20states%2C%20and%20most%20important%20functionality.%0D%0A%0D%0A**MVP%20scope**%0D%0A-%20%5B%5D%20%2F%2FList%20all%20parts%20of%20the%20MVP%20scope%20for%20this%20component%2F%2F%0D%0A%0D%0A**Design**%0D%0A-%20%5B%5D%20Design%20the%20Figma%20spec%20sheet%20and%20add%20a%20link%20to%20it%20in%20this%20task%0D%0A-%20%5B%5D%20Update%20the%20component%20in%20the%20%5BCodex%20Figma%20library%5D(https%3A%2F%2Fwww.figma.com%2Ffile%2FKoDuJMadWBXtsOtzGS4134%2F%25E2%259D%2596-Codex-components%3Fnode-id%3D1891%253A4420%26viewport%3D287%252C338%252C0.28)%0D%0A%0D%0A**Code**%0D%0A-%20%5B%5D%20Implement%20the%20component%20in%20Codex%0D%0A%0D%0A%23%23%23%20Future%20work%0D%0A%0D%0A-%20%2F%2FIf%20applicable%2C%20list%20future%20work%20that%20should%20be%20done%20for%20this%20component%20after%20the%20MVP%20is%20implemented%20as%20part%20of%20this%20task.%20You%20should%20open%20new%2C%20standalone%20tasks%20for%20all%20future%20work.%2F%2F&projects=Codex