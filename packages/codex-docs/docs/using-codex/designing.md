---
outline: [ 2, 3 ]
---

# Designing with Codex

This page describes how to use Codex as a design tool.

## Figma library

### Enable the library

Figma is the primary design tool used by the Wikimedia design team. It provides access to standardized components, tokens, icons, and styles.

Depending on your role and access level, you can access the [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&p=f&t=5az5IiFaITbzUgS0-11) in the following ways:

- **Wikimedia Foundation designers:** Use the shared library via the main team file to reuse any component, style, or asset. Updates will sync automatically.
- **External designers with paid accounts:** Duplicate the main library and publish the copy as a library in your workspace. You can use the [swap functionality](https://help.figma.com/hc/en-us/articles/4404856784663-Swap-style-and-component-libraries#swap) to easily replace the components or styles in your file. Make sure to keep the duplicated library updated to the latest published version.
- **External designers with free accounts:** Publishing libraries requires a paid plan. If you have a free account, the most efficient way to reuse Codex components is to copy and paste them directly from the main library into your Figma files.

### Using components

Once the Codex library is enabled in your Figma file, you can access all components via the "Assets" tab. To insert a component, search for the name of the component or browse through the library, then drag and drop it onto your canvas. You can also find a component using the <kbd>Shift</kbd> + <kbd>I</kbd> command.

You should always use [instances](https://help.figma.com/hc/en-us/articles/360039150173-Create-and-insert-component-instances) of the main components in your designs. Avoid using local components, groups, or frames that are not linked to the library. This ensures consistency and makes it easier to apply updates when the system evolves.

If a required component is not implemented in Codex yet, refer to the [Contributing components](../contributing/contributing-components.md) guidelines to work on it.

#### Customizing components

After inserting a component, you can customize it by adjusting its variants and properties in the properties panel. This lets you adapt the component to your specific use case without detaching it from the library.

#### Detaching components

Only detach components from the main library in specific cases, such as:
- Exploring design alternatives during early ideation.
- Representing a state not yet supported in the current library.
- Customizing complex components that typically require flexibility, such as Tables or Dialogs.

::: info
Make sure to always reattach or replace with official Codex components once updates are available.
:::

### Using icons

You can add Codex icons to your designs just like components, either by dragging them from the "Assets" panel or using the <kbd>Shift</kbd> + <kbd>I</kbd> command to quickly search and insert them.

Icons should be used as decorative elements. If the icon performs an action (e.g. edit, delete), wrap it within a button to ensure accessibility and expected interaction behavior.

If a required icon is not implemented in Codex yet, refer to the [Contributing icons](../contributing/contributing-icons.md) guidelines to include it.

### Using variables and styles

Codex design tokens are documented in Figma as [variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma). Variables allow for consistent alignment between design and implementation , as well as automatic adaptation across [modes](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables).

Use variables instead of hardcoded values to keep designs aligned with the system. If you need to use a variable that is not implemented in Codex as token yet, please refer to the [Contributing tokens](../contributing/contributing-tokens.md) guidelines.

Due to Figma's limitations, variables are used for color, spacing, size, and border radius, while styles are applied to text and shadows as they typically involve combinations of variables.

### Using modes

Codex supports multiple visual modes, and they are fully integrated into the Figma library. You can apply them directly in your designs switching the mode in the "Appearance" panel.

Use them to preview how your designs behave across different modes without needing to design separate versions.

#### Color modes

Codex currently supports two color modes:

- **Light** (default mode)
- **Dark**

All color tokens are predefined and available in both modes. So when you switch modes using the "Appearance" panel in Figma, these tokens update automatically to reflect the selected theme.

#### Text modes

As color, text is prepared to work for different modes. Each mode is based on a text size:

- **Small** (14px)
- **Medium** (16px)
- **Large** (18px)
- **Extra-large** (20px)

Text modes automatically adjust when changed from the "Appearance" panel. Designers do not need to manually restyle text when switching modes. Icon sizes also adapt to match each text mode.

### Using grids

For guidance in structuring your design projects and ensuring consistency with other Wikimedia layouts, use the Grid styles provided in the Codex Figma library.

To apply them, open the "Layout grid" section in the right panel. There is a grid style created for each screen size.

- **Desktop-wide**: Use it on 1680px or bigger screens.
- **Desktop**: Use it on screens between 1120px – 1679px.
- **Tablet**: Use it on screens between 640px – 1119px.
- **Mobile**: Use it on screens between 320px – 639px.

## Other design tools

While Codex is officially supported in Figma, you can adapt it for use in other tools.

If you're working in other design tools, you'll need to manually import assets from the Figma library and replicate them in those tools.