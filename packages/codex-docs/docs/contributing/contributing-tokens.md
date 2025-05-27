# Contributing tokens

This page outlines the steps that collaborators should follow to contribute a new Codex design token.

::: info
If you need support or have questions during the contribution process, reach out through one of the following channels:
- [Slack](https://wikimedia.enterprise.slack.com/archives/C03DKGSEPL2): If you're an internal contributor at the Wikimedia Foundation, join the Codex Slack channel for support and collaboration.
- [Telegram](https://t.me/+oeXgL95hvgZiMDgx): If you are an external contributor, join the Codex Telegram channel.
:::

## 1. Report and validate

### 1.1. File a task

If the task doesn’t already exist in the [Codex Phabricator board](https://phabricator.wikimedia.org/tag/codex/), create one using this [task template][token-creation-task-template]. Make sure to file in as much information as possible in the predefined sections.

Once the task is validated and the need of this new token is clear, you’ll be able to start designing the new Codex token.

::: warning
Create a new token just if none of the [existing Codex design tokens](../design-tokens/overview.md) meet your need.
:::

### 1.2. Create an inventory

Create an initial inventory with the relevant use cases where this new token will be reused. You can check the following resources to collect relevant information:

- [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&node-type=canvas&t=plW1hmguHVWs3fWZ-11): enable this library to reuse all the design tokens that were translated into Figma styles and variables.
- [Design tokens demo](../design-tokens/overview.md): check the current existing tokens in the Codex demo.
- [Wikimedia web products](https://www.wikimedia.org/): understand the Wikimedia products and their current styles.

## 2. Design and implement

### 2.1. Design the token

When creating new tokens, define the type of token based on the specific design need:

- **Option token**: create when you need to define a raw value — a value like a color (e.g., `#36c` defined as `color.blue700`), a spacing unit, or a font size — that doesn’t have a specific meaning yet and won’t be applied directly to components. Option tokens serve as the foundation for creating decision or component tokens.
- **Decision token**: create when the style will be reused across multiple components. Decision tokens are based on option tokens (e.g., the decision token `color-progressive` reuses the option token `color.blue700`), so make sure the required option token already exists, or create it first if necessary.
- **Component token**: create only in exceptional cases, when the style is specific to a single component and cannot be reused. Component tokens reuse option or decision tokens (e.g., the component token `color-link-red` reuses the decision token `color-destructive`), so ensure the necessary token exists, or create it first if needed.

Make sure the new token fits within the existing token scale, and use the appropiate naming based on its category. Learn more about the different [token typologies](../design-tokens/definition-and-structure.md).

::: warning
Make sure the new token fits into the existing scale.
:::

### 2.2. Hand-off to development

Once the token’s design proposal has been discussed, iterated on (if needed) and finished, the designer will share the link to the final version in the Phabricator task so developers can start implementing the new token in Codex.

The following actions are required by the designer:

1. Link the design spec in the task's description.
2. Post a comment explaining that the task is ready to be implemented.
3. Move the task to the next relevant column in the board.

TODO: include implementation info. This should be included:
Stylesheet specific token application rules:
- Tokens should follow [naming patterns established for MediaWiki](https://www.mediawiki.org/wiki/Manual:Coding_conventions/CSS#Variable_naming).
- Codex does not use shorthand properties `background`, `font`, `animation` and `transition` for
  simpler design token scoping and code modularization reasons. Only tokens of a category type are
  summarized into a shorthand token, e.g.
  ```json
  "text-decoration": {
		"none": {
			"value": "{ text-decoration.0 }"
		},
		"line-through": {
			"value": "{ text-decoration.150 }"
		},
		"underline": {
			"value": "{ text-decoration.200 }"
		}
  },
  ```

## 3. Review and document

Once the implementation has been completed, the designer will need to:

- **Design sign-off**: Confirm the token was implemented correctly in Codex.
- **Publish in Figma**: Add the approved token to the [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&node-type=canvas&t=plW1hmguHVWs3fWZ-11) for reuse in design projects.

::: info
Due to [team permissions in Figma](https://help.figma.com/hc/en-us/articles/360039970673-Team-permissions), only designers in the Wikimedia Foundation in Figma can edit the library.
- If you are part of the team, create a Figma branch and add the token before publishing.
- If you are not, someone from the team will handle the publishing for you.
:::

[token-creation-task-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=Add%20new%20%5BName%5D%20token%20in%20Codex&description=%23%23%20Background%0D%0A%0D%0ANOTE%3A%20%2F%2FWhen%20creating%20a%20token%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A-%20**Description%3A**%20%2F%2Fadd%20a%20brief%20description%20of%20this%20token%2F%2F%0D%0A-%20**History**%20(if%20needed)**%3A**%20%2F%2Fdescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20token%2F%2F%0D%0A-%20**Known%20use%20case(s)%3A**%20%2F%2Fdescribe%20known%20use%20cases%20for%20this%20token%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A-%20**Considerations%3A**%20%2F%2Flist%20any%20known%20challenges%20or%20blockers%2C%20or%20any%20other%20important%20information%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A%2F%2Fadd%20at%20least%20one%20user%20story%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%2F%2F%20Once%20the%20design%20spec%20has%20been%20created%2C%20remove%20this%20note%20and%20add%20the%20link%20to%20the%20design%20spec.%20%2F%2F%0D%0A%0D%0A%7C%20Design%20spec%20link%20%7C%0D%0A%0D%0A%23%23%23%20Open%20questions%0D%0A%2F%2F%20Add%20here%20the%20questions%20to%20be%20answered%20in%20order%20to%20design%20and%20implement%20the%20token%20%2F%2F%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%20(or%20Done)%0D%0A%0D%0A**Design**%0D%0A%5B%5D%20Design%20the%20token's%20specification%20and%20add%20it%20to%20this%20task%0D%0A%5B%5D%20Add%20the%20token%20as%20Figma%20style%2Fvariable%20in%20the%20%5B%5B%20https%3A%2F%2Fwww.figma.com%2Ffile%2FmRvSsFD2Kwh8AZNjlx7rIl%2F%25E2%259C%25A8-Design-Tokens-%255BWIP%255D%3Fnode-id%3D0%253A1%26viewport%3D486%252C353%252C0.25%20%7C%20library%20%5D%5D.%0D%0A%0D%0A**Code**%0D%0A%5B%5D%20Implement%20the%20token%20in%20Codex%0D%0A%5B%5D%20Update%20components%20that%20use%20this%20token%20(if%20needed)&projects=Codex