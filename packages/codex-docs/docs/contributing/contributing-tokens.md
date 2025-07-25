---
outline: [ 2, 3 ]
---

# Contributing tokens

This page outlines the steps that collaborators should follow to contribute a new Codex design token.

::: info
If you need support or have questions during the contribution process, reach out through one of the following channels:
- [Telegram](https://t.me/+oeXgL95hvgZiMDgx): If you are an external contributor, join the Codex Telegram channel.
- [Slack](https://wikimedia.enterprise.slack.com/archives/C03DKGSEPL2): If you're an internal contributor at the Wikimedia Foundation, join the Codex Slack channel for support and collaboration.
:::

## Reporting and validating

### File a task

If the task doesn’t already exist in the [Codex Phabricator board](https://phabricator.wikimedia.org/tag/codex/), create one using this [task template][token-creation-task-template]. Make sure to file in as much information as possible in the predefined sections.

::: tip
Create a new token only if none of the [existing Codex design tokens](../design-tokens/overview.md) meet your need.
:::

### Create an inventory

Create an initial inventory with the relevant use cases where this new token will be reused. You can check the following resources to collect relevant information:

- [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&node-type=canvas&t=plW1hmguHVWs3fWZ-11): enable this library to reuse all the design tokens that were translated into Figma styles and variables.
- [Design tokens demo](../design-tokens/overview.md): check the current existing tokens in the Codex demo.
- [Wikimedia web products](https://www.wikimedia.org/): understand the Wikimedia products and their current styles.

### Validate the task

Make sure the task has been reviewed, validated, and approved before starting any work. This includes confirming that the new token is truly needed.

Once the task is validated and the need is clearly established, you can move forward with the next steps in the contribution process.

## Designing the token

### Design the token

When creating new tokens, define the type of token based on the specific design need:

- **Option token**: create when you need to define a raw value — a value like a color (e.g., `#36c` defined as `color.blue700`), a spacing unit, or a font size — that doesn’t have a specific meaning yet and won’t be applied directly to components. Option tokens serve as the foundation for creating decision or component tokens.
- **Decision token**: create when the style will be reused across multiple components. Decision tokens are based on option tokens (e.g., the decision token `color-progressive` reuses the option token `color.blue700`), so make sure the required option token already exists, or create it first if necessary.
- **Component token**: create only in exceptional cases, when the style is specific to a single component and cannot be reused. Component tokens reuse option or decision tokens (e.g., the component token `color-link-red` reuses the decision token `color-destructive`), so ensure the necessary token exists, or create it first if needed.

Make sure the new token fits within the existing token scale, and use the appropiate naming based on its category. Learn more about the different [token typologies](../design-tokens/definition-and-structure.md).

::: tip
Make sure the new token fits into the existing scale.
:::

### Name the token

Depending on the type of token being created, the naming of the token may vary.

- When creating an option token, the name should describe the purest form of the value it represents. For example, the `color.blue700` token is: 1) a color, 2) the color blue, and 3) the 700 level of the scale.
- When creating a decision token, the name should describe the general application of the token. For example, the `color-progressive` token can be used for progressive text elements, such as links or buttons.
- When creating a component token, the name should explicitly describe a single-purpose use. For example, the `link-red--visited` token is used specifically for [red links](../components/mixins/link.html#red-link) that have already been visited.

#### Naming structure

Follow these rules when naming tokens to maintain a consistent and extensible set of tokens:

- Token keys follow CSS property names for the sake of familiarity and readability. For example, we
  use `{ font-weight.100 }` instead of `{ font.weight.100 }`. There are some exceptions like `size`
  and `spacing` tokens, in order to reuse them in different property contexts – such as values in
  `width`, `height`, `padding`, etc.
- The name describing the CSS property or category value always comes first, which makes it obvious
  when a token is improperly applied to a different property, e.g.
  ~~`color: @background-color-base`~~.
- Tokens with numerical values are centered around a default key of `100`. For example, base size is
  defined by `{ dimension.100 }`, which could be used to define a default theme base font size of
  `16px`, or a theme-specific base font size of `14px`, depending on what theme the size token is
  set to.

### Prepare for implementation

Once the design proposal has been discussed, iterated on (if needed) and finished, the designer will share the link to the final version in the Phabricator task to prepare it for implementation.

## Implement the token

Once the token’s design proposal has been discussed, iterated on (if needed) and finished, the Phabricator task should be updated so the token can be implemented in Codex.

### File organization

Codex token files are structured to cater to Wikimedia's multi-theme, multi-mode environment. Note
that all filepaths listed below are located in the `@wikimedia/codex-design-tokens` package.

1. **Option tokens (`themes/*.json` files)**<br>
Themes are defined in JSON files with theme-agnostic keys and theme-specific values. Theme tokens
are not directly applied in Codex components or UI elements. They are only the internal pool of
design options for the decisions represented by decision and component tokens.

2. **Decision tokens (`application.json` and `modes/*.json`)**<br>
These tokens document design decisions. Token names are semantic and communicate the token's
intended use case. Mode-specific overrides live in `modes/*.json` files; these files contain a
subset of the decision tokens (using the same names) and provide new values (drawing from different
option tokens within the same theme).

3. **Component tokens (`components.json`)**<br>
These tokens represent single-component design decisions that are not covered by decision tokens.
Component token names contain the token category and component name, e.g.
`background-color-button-quiet--hover`.

### Adding the token

Add the new token(s) to the appropriate file(s) mentioned above. Ensure that:

- You're adding the token to the correct file.
- You're adding the new token in the proper place/order depending on the applicable token scale.
- You add a comment if the token is not self-explanatory or represents an exception.

### Testing the new token

#### Lint

Run `npm run lint -w @wikimedia/codex-design-tokens` in the root of the Codex repository.

#### Testing locally

To check the new token on the Codex docs site, run `npm run doc:dev` from the root of the Codex repository to serve the docs site. Then you can visit `http://localhost:5173/design-tokens/overview.html` to find and review the new token.

### Further technical notes

- Codex does not use shorthand properties `background`, `font`, `animation` and `transition` for
  simpler design token scoping and code modularization reasons.
- Note, that normalization and reset values like `0` or `none` are not tokenized as they aren't used
  for design decisions. `z-index: 0`, on the other hand, represents a design decision.
- We're not using [Style Dictionary's predefined transform groups](https://github.com/amzn/style-dictionary/blob/main/docs/transform_groups.md)
  for all stylesheet formats (CSS, Less and Sass) in order to keep precise control over output.

## Reviewing and documenting

Once the implementation has been completed, the following actions will need to be completed:

- **Design sign-off**: Confirm the new token was implemented correctly.
- **Publish in Figma**: Add the approved token to the [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&node-type=canvas&t=plW1hmguHVWs3fWZ-11) for reuse in design projects. Due to [team permissions in Figma](https://help.figma.com/hc/en-us/articles/360039970673-Team-permissions), only designers in the Wikimedia Foundation Figma team can edit the library. If you are part of the team, create a Figma branch adding the token before publishing; if you are not, someone from the team will handle the publishing for you.

[token-creation-task-template]: https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=Add%20new%20%5BName%5D%20token%20in%20Codex&description=%23%23%20Background%0D%0A%0D%0ANOTE%3A%20%2F%2FWhen%20creating%20a%20token%20task%2C%20please%20try%20to%20fill%20out%20the%20entire%20Background%20section.%20The%20rest%20of%20the%20task%20description%20can%20be%20populated%20later.%2F%2F%0D%0A%0D%0A-%20**Description%3A**%20%2F%2Fadd%20a%20brief%20description%20of%20this%20token%2F%2F%0D%0A-%20**History**%20(if%20needed)**%3A**%20%2F%2Fdescribe%20or%20link%20to%20prior%20discussions%20related%20to%20this%20token%2F%2F%0D%0A-%20**Known%20use%20case(s)%3A**%20%2F%2Fdescribe%20known%20use%20cases%20for%20this%20token%2C%20including%20the%20project%2C%20team%2C%20and%20timeline%2F%2F%0D%0A-%20**Considerations%3A**%20%2F%2Flist%20any%20known%20challenges%20or%20blockers%2C%20or%20any%20other%20important%20information%2F%2F%0D%0A%0D%0A%23%23%23%20User%20stories%0D%0A%0D%0A%2F%2Fadd%20at%20least%20one%20user%20story%2F%2F%0D%0A%0D%0A%23%23%23%20Design%20spec%0D%0A%2F%2F%20Once%20the%20design%20spec%20has%20been%20created%2C%20remove%20this%20note%20and%20add%20the%20link%20to%20the%20design%20spec.%20%2F%2F%0D%0A%0D%0A%7C%20Design%20spec%20link%20%7C%0D%0A%0D%0A%23%23%23%20Open%20questions%0D%0A%2F%2F%20Add%20here%20the%20questions%20to%20be%20answered%20in%20order%20to%20design%20and%20implement%20the%20token%20%2F%2F%0D%0A%0D%0A%23%23%23%20Acceptance%20criteria%20(or%20Done)%0D%0A%0D%0A**Design**%0D%0A%5B%5D%20Design%20the%20token's%20specification%20and%20add%20it%20to%20this%20task%0D%0A%5B%5D%20Add%20the%20token%20as%20Figma%20style%2Fvariable%20in%20the%20%5B%5B%20https%3A%2F%2Fwww.figma.com%2Ffile%2FmRvSsFD2Kwh8AZNjlx7rIl%2F%25E2%259C%25A8-Design-Tokens-%255BWIP%255D%3Fnode-id%3D0%253A1%26viewport%3D486%252C353%252C0.25%20%7C%20library%20%5D%5D.%0D%0A%0D%0A**Code**%0D%0A%5B%5D%20Implement%20the%20token%20in%20Codex%0D%0A%5B%5D%20Update%20components%20that%20use%20this%20token%20(if%20needed)&projects=Codex