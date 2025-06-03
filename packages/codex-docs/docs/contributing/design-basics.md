---
outline: [ 2, 3 ]
---

# Getting started with design

::: tip Before you dive into contributing design:
- Read the [general contribution guidelines](./overview.md)
- Check out our [guiding principles](../using-codex/guiding-principles.md)
:::

## Access the Codex Figma library

To begin contributing to design, ensure you have access to the [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=1891-4420&p=f&t=5az5IiFaITbzUgS0-11). Figma is the primary and officially maintained design library.

Depending on your Figma account type, access may vary. Refer to the [Designing with Codex](../using-codex/designing.md#enable-the-library) guidelines for more information on how to enable the Figma library.

## Types of contributions

Design contributions generally fall into two categories:

### Library updates

If you detect that something in the design library could be improved or fixed, feel free to contribute by proposing or making the necessary fix. Changes to the existing Codex library could include, among others:

- Updating components or tokens to match the latest code implementation.
- Adding missing variants or visual states.
- Fixing inconsistencies or bugs in existing components.
- Improving layout alignment.
- Renaming or reorganizing components to follow naming conventions.
- Cleaning up deprecated assets.

The Figma library is actively maintained by the Wikimedia design team. So, if you're contributing in Figma, you can make your updates by creating a new [branch](https://www.figma.com/best-practices/branching-in-figma/) that will be reviewed before publishing.

### Additions to Codex

Apart from making library updates, designers can also contribute to Codex by designing new tokens, icons, or components.

All design contributions should follow a structured and iterative process:

1. **Identify the need**: Determine whether the new component, token, or icon will be reused across different use cases or projects. If it’s intended for a single use, avoid creating it; if it can be used in multiple contexts, proceed with the contribution.
2. **Research and explore**: Review existing system elements, usage in products, and new projects needs. Consider doing a comparative analysis to understand how similar solutions are approached outside Wikimedia projects to gain perspective and identify best practices.
3. **Design**: Once the need is validated, start designing the new system element. Create clear and complete specification sheets so developers can implement it more easily.
4. **Review and iterate**: Share your design in the corresponding Phabricator task to gather feedback from Wikimedia designers and the community, and iterate the design as needed.
5. **Prepare for implementation**: Finalize designs and specifications and share them in the task so it's ready for implementation.
6. **Design sign-off**: Once the implementation is complete, verify that it matches the design.
7. **Publish and reuse**: Add and publish the approved system element in the design library to be reused by other designers.

For specific types of contributions, refer to:

- [Contributing tokens](contributing-tokens.md)
- [Contributing icons](contributing-icons.md)
- [Contributing components](contributing-components.md)