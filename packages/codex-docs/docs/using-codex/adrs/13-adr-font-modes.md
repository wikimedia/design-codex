# ADR 13) Support for Alternate Font Modes

Date: 2025-03-04

## Status

Accepted

## Context

Codex needs to support alternate sets of typography tokens to accommodate different user preferences and interface requirements. These "font modes" will function similarly to the color modes described in [ADR8](./08-adr-color-modes.md). Each font mode will define its own type scale based on a specific base font size (e.g., `16px` for default, `14px` for small). This will allow components to maintain proportional sizing relationships while adapting to different base sizes.

With the infrastructure to support modes already in place, the primary element to be solved in order to support font modes is the type scale, understanding how it shifts and what else changes as a result.

## Decision

To support the introduction of a "font modes" feature in MediaWiki skin architecture, we need to redefine the Codex type scale and restructure how the tokens described above are used.

### 1. Definition of key terms

- **Type scale**: In Codex, a type scale is a hierarchical set of text styles. Each text style is assigned a `font-size` and `line-height`. The type scale revolves around the base font size, typically used for body copy within a given interface, with headings and smaller text accompanying the base text style.

- **Font mode**: A set of typography tokens used to implement a specific type scale. We will start with two font modes: a default mode (base font size of `16px`) and a small mode (base font size of `14px`).

### 2. Type Scale Implementation

Each font mode defines its own type scale relative to its base font size:

- **Default mode**: Base font size of `16px` with proportionally scaled headings and other text elements.
- **Small mode**: Base font size of `14px` with all other elements scaled proportionally.

Implementation details:

- **Tokens**: The new font-size and line-height tokens will be defined in `px` values but will output `rem` values to respect a page's default sizing. Existing tokens will remain intact to maintain backward compatibility.

- **Naming**: The new font-size and line-height tokens will use numerical values instead of t-shirt sizing to avoid confusion across modes. This approach decouples values between modes, as what might be considered "small" in one mode could be "large" in another.

### 3. Typographic Mixins

We will create mixins that combine `color`, `font-size`, `line-height`, `font-family`, and `font-weight` tokens to produce consistent type styles. These mixins:

- Will follow semantic naming such as "title," "body," or "caption".
- Can be applied to specific sections of the page or globally to all relevant elements (`<h1>`, `<h2>`, `<p>`, etc.).
- Can be customized by adding property overrides after the mixin.

### 4. Technical Implementation

Font modes will be implemented as token overrides in dedicated files:

- Each mode (e.g., `small.json`) will live alongside existing token files.
- Mode files will contain only the specific decision tokens that need to be overridden.
- Build scripts will apply these overrides while leaving other tokens unchanged.
- Additional modes can be added as needed.

### 5. Component Adaptations

As font sizes and line heights change between modes:

- Component dimensions may need to adapt, especially for elements with dynamic heights.
- We'll make case-by-case decisions about whether elements should maintain fixed dimensions or scale with text.
- Components will use the new tokens to ensure consistent sizing across modes.
- Future work may include responsive sizing independent of font modes.

## Use Cases

Font modes can be applied independently to meet different needs:

- Using a smaller scale for specific interface sections that need to be more compact.
- Providing user preferences for text size across an entire application.
- Adapting content readability based on device or viewing context.

## Consequences

We may need to make changes to our current tokens and how they are rendered so that new tokens conform to the rules and definitions above, but no breaking changes in our current system should be required as a result of this ADR.

In the future we may introduce additional font modes, which might require us to reconsider certain calculations.
