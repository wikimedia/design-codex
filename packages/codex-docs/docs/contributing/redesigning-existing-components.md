# Redesigning existing components

This page outlines the steps that collaborators should follow to contribute to the redesign of an existing Codex component.

::: info
If you need support or have questions during the contribution process, reach out through one of the following channels:
- [Slack](https://wikimedia.enterprise.slack.com/archives/C03DKGSEPL2): If you're an internal contributor at the Wikimedia Foundation, join the Codex Slack channel for support and collaboration.
- [Telegram](https://t.me/+oeXgL95hvgZiMDgx): If you are an external contributor, join the Codex Telegram channel.
:::

## 1. Report and validate

### 1.1. Define the purpose and scope of this redesign

The redesign of a component should be clearly justified and scoped. There are several scenarios that can motivate the need to redesign a particular component:

1. **A new component variant or property is required**. In this scenario, we may need to create a new component variant or property in order to expand the use cases of the original component (e.g. Message needs a close button to make it dismissable).
2. **The component’s visual style needs to be updated**. In this scenario, we may need to change the visual style of the component in order to improve it, or to make it consistent with other system elements (e.g. Message paddings need to be updated).
3. **The component’s behavior needs to be improved**. We may want to update the component behaviors for well-justified reasons to improve user-experience (e.g. allow the component to grow in height to accommodate longer text).

### 1.2. File a task

Once the purpose of the component redesign has been defined, a new Phabricator task will need to be created. Use this [component task template][component-task-template] to create the new ticket. Fill in as much information as possible in the predefined sections.

Once the task is validated and the need to update the component is clear, you can start redesigning the component.

### 1.3. Create an inventory

Create an inventory with the relevant use cases where this component is being reused. You can check the following resources to collect relevant information:

- [Codex component demos](../components/overview.md) and [Codex Figma library](https://www.figma.com/file/KoDuJMadWBXtsOtzGS4134/%E2%9D%96-Codex-components?node-id=1891%3A4420): check the current component behaviors and interactions.
- [Wikimedia web products](https://www.wikimedia.org/): detect current use cases of the component in the different Wikimedia products.

Designers should also compare components of the same category or elements with shared characteristics that can influence the design direction.

## 2. Design and implement

::: info
Duplicate this [component exploration template](https://www.figma.com/file/6hNSvvL4CoyfemXECihJD5/Exploration-File-(Template)?node-id=1%3A3627) to work on the component's design. You can also find the existing component exploration file in [this Figma folder](https://www.figma.com/files/project/44938429) and create a new version's tab with the component's updates.
:::

### 2.1. Visual style and interaction

All Codex components should follow the visual guidelines defined in the [style guide](../style-guide/overview.html). Design tokens can help support the visual definition of components, as they represent pre-made systematic decisions. If you need to use a token that is not documented yet, or you need to apply it in a different context of use, please read the [Designing tokens](designing-tokens.md) guidelines.

You can also reuse the existing [system icons](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=20598-51338&node-type=canvas&t=plW1hmguHVWs3fWZ-11) and [illustration assets](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=20598-51408&node-type=canvas&t=plW1hmguHVWs3fWZ-11), or create new ones following Codex styles. If you need an icon that does not exist in Codex yet, you can contribute the design of a new icon following the [Designing icons](./designing-icons.md) guidelines.

::: info
You will need to enable the [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&node-type=canvas&t=plW1hmguHVWs3fWZ-11) in your Figma file to reuse the Codex’s styles and icons. Learn more about [how to enable Figma libraries](https://help.figma.com/hc/en-us/articles/360038743434#access).
:::

In order to provide a consistent experience, ensure the component's behavior and states align with Codex design principles.

When redesigning components, make sure to include:

- **Internationalization**: to support different languages and reading directions. Refer to the [Bidirectionality](../style-guide/bidirectionality.md) guidelines for more details.
- **Responsiveness**: make sure to specify the appropriate behavior for the different [breakpoints](../design-tokens/breakpoint.md) and devices.
- **Accessibility**: follow the best practices established for each component and specify the keyboard navigation when the component includes interactive states. Read more about [accessibility principles and resources](../style-guide/accessibility.md).

### 2.2. Specification sheet

Once the component’s visual style and behavior are defined, document them in its specification sheet. This will guide developers during implementation. You can use this [component specification sheet template](https://www.figma.com/file/6hNSvvL4CoyfemXECihJD5/Component-spec-sheet-(exploration-file-template)?node-id=501%3A22874) to get started or find the existing component exploration file in [this Figma folder](https://www.figma.com/files/project/44938429) to create a new version's tab with the component's updates.

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

### 2.3. Hand-off to development

Once the component’s design proposal has been discussed, iterated on (if needed) and finished, the designer will share the link to the final version in the Phabricator task so developers can start implementing the new component in Codex.

The following actions are required by the designer:

1. Link the design spec in the task's description.
2. Post a comment explaining that the task is ready to be implemented.
3. Move the task to the next relevant column in the board.

## 3. Review and document

Once the implementation has been completed, the designer will need to:

- **Design sign-off**: Confirm the component updates were implemented correctly in Codex.
- **Publish in Figma**: Update the component in the [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&node-type=canvas&t=plW1hmguHVWs3fWZ-11) for reuse in design projects.

::: info
Due to [team permissions in Figma](https://help.figma.com/hc/en-us/articles/360039970673-Team-permissions), only designers in the Wikimedia Foundation in Figma can edit the library.
- If you are part of the team, create a Figma branch updating the component before publishing.
- If you are not, someone from the team will handle the publishing for you.
:::

[component-task-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=Update%20%5BComponentName%5D%20component%20in%20Codex&description=%23%23%20Background%0D%0A%0D%0ANOTE%3A%20%2F%2FWhen%20creating%20a%20component%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A-%20**Description%3A**%20%2F%2Fadd%20a%20brief%20description%20of%20this%20component%2F%2F%0D%0A-%20**History%3A**%20%2F%2Fdescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20component%2F%2F%0D%0A-%20**Known%20use%20case(s)%3A**%20%2F%2Fdescribe%20known%20use%20cases%20for%20this%20component%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A-%20**Considerations%3A**%20%2F%2Flist%20any%20known%20challenges%20or%20blockers%2C%20or%20any%20other%20important%20information%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A%2F%2Fadd%20at%20least%20one%20user%20story%2F%2F%0D%0A%0D%0A%23%23%23%20Previous%20implementations%0D%0A%0D%0A-%20**Codex%20demo%3A**%20%2F%2Fadd%20%5B%5B%20https%3A%2F%2Fdoc.wikimedia.org%2Fcodex%2Fmain%2Fcomponents%2Foverview.html%20%7C%20Codex%20demo%20%5D%5D%20current%20component%20link%2F%2F%0D%0A-%20**OOUI%3A**%20%2F%2Fadd%20the%20relevant%20OOUI%20widget%20name%20here%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fdoc.wikimedia.org%2Foojs-ui%2Fmaster%2Fdemos%2F%3Fpage%3Dwidgets%26theme%3Dwikimediaui%26direction%3Dltr%26platform%3Ddesktop%20%7C%20OOUI%20demos%20%5D%5D.%2F%2F%0D%0A-%20**Vue%3A**%20%2F%2Fadd%20any%20existing%20Vue%20implementations%2C%20if%20applicable.%20See%20%5B%5B%20https%3A%2F%2Fphabricator.wikimedia.org%2FT272885%20%7C%20Vue%20component%20inventory%20%5D%5D.%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%0D%0A%2F%2F%20Once%20a%20component%20spec%20sheet%20has%20been%20created%20in%20Figma%2C%20remove%20the%20note%20stating%20that%20the%20spec%20is%20missing%20and%20link%20to%20the%20spec%20below.%20%2F%2F%0D%0A%0D%0A%7C%20Component%20spec%20sheet%20link%20%7C%0D%0A%0D%0A%23%23%23%20Open%20questions%0D%0A%0D%0A%2F%2F%20Add%20here%20the%20questions%20to%20be%20answered%20in%20order%20to%20design%20and%20implement%20the%20component%20%2F%2F%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%20(or%20Done)%0D%0A%0D%0A**Design**%0D%0A-%20%5B%5D%20Design%20the%20Figma%20spec%20sheet%20and%20add%20a%20link%20to%20it%20in%20this%20task%0D%0A-%20%5B%5D%20Update%20the%20main%20component%20in%20the%20%5BCodex%20Figma%20library%5D(https%3A%2F%2Fwww.figma.com%2Ffile%2FKoDuJMadWBXtsOtzGS4134%2F%25E2%259D%2596-Codex-components%3Fnode-id%3D1891%253A4420%26viewport%3D287%252C338%252C0.28).%20%2F%2FThis%20step%20will%20be%20done%20by%20a%20DST%20member.%2F%2F%0D%0A%0D%0A**Code**%0D%0A%5B%5D%20Implement%20the%20component%20changes%20in%20Codex&projects=Codex
