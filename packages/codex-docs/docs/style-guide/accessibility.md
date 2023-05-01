# Accessibility

The web is fundamentally designed for humans to participate with the smallest possible limitations,
independent of their hardware, software, language, location, expertise or ability. Volunteers in
the Wikimedia Movement have been actively working and supporting inclusion and equal access for a
long time.[[1]](#ref1) Aligning to [Wikimedia's vision](https://meta.wikimedia.org/wiki/Vision)[[2]](#ref2)
and to our principle [“This is for everyone”](./design-principles-overview.md#this-is-for-everyone),
we aim for our interfaces to be accessible by design.

We'll introduce key accessibility concepts, illustrate how they are supported in the style guide,
and provide guidance for you when applying them.

## What and why accessibility?

Web accessibility methods ensure that people with impairments or disabilities can perceive,
understand, navigate, interact with, and contribute to the products we all create. Just as
importantly, many methods improve general usability, resulting in **easier-to-use interfaces that
are Perceivable, Operable, Understandable and Robust for everyone**.

These are the four principles of accessibility from the Web Content Accessibility Guidelines (WCAG)
standard[[3]](#ref3), version 2.0 onwards. They specify the success criteria for achieved levels of
conformance – A, AA and AAA.

In the style guide and its resources we aim for satisfying all level AA success criteria. Some AAA
criteria are not possible to be satisfied for entire websites as they are opposing each other. We
also try to balance requirements that enable the widest possible audience under reasonable
operation for our non-profit organization. Further, highly specific user group needs might be
better covered by specific software products than by the Foundation itself.

Note, that our principles mainly focus on designing for:
- Visual impairment needs
- Motor impairment needs

Other categories like speech impairments don't apply in our graphical user-interface focus; while
hearing and cognitive impairments are to be covered on a content level. See for example Simple
Wikipedia (English)[[4]](#ref4) for being inclusive to users with learning difficulties.

## Accessible by design

### Colors and color palette – Use of color

All [colors of our palette](./colors.md) feature level AA contrast ratio. We're following
color-related accessibility rules:
- Never use color as the only means of providing information or requesting an action.
- The combinations of text and its background color must not fall below the WCAG recommended
  threshold ratio of 4.5:1 for standard text and 3:1 for larger text.

### Fonts and typography – Legible and zoomable content

Choices of typeface, size, style, and spacing of text make it well readable in general and are a
must for some to be legible. [Our choices](./typography.md) advise on minimum font sizes. Those are
able to be overridden by user browser preferences – setting fonts in relative CSS units `em` or
`rem` to provide text zooming when needed.

### Touch and keyboard interaction – Ensure alternative input methods

Our components are designed to support different interaction mechanisms, including touch, pointing
devices and keyboard.

When touch screens are the main interface, our components' design ensures minimum touch target
sizes for happy human fingers. Additionally, users with motor impairments profit from minimum
target sizes for pointer inputs too. Our components feature a strong outline to indicate keyboard
focus state. This enables keyboard-bound users to easily navigate the interface.

### Icons and images – Provide text alternatives

When implementing icons and images, you have to define a textual description to enable assistive
technology to interpret it, as long as they are not solely used as decorative elements:

Icons have to be provided with SVG `title` attributes or with text nodes visible only for screen
readers when used in icon-only buttons. Images have to provide `alt` attributes with alternative
text. `title` attributes are part of the icons in [Codex design icons collection](https://www.figma.com/file/1lT9LKOK6wiHLnpraMjP3E/%E2%9D%96-Assets-(Icons%2C-Logos%2C-Illustrations)?node-id=3295-13631&t=tCnScN5seG6SsegW-11),
and [Codex code icons collection](../icons/all-icons.md).

## Markup – Follow standards

Markup for our components is provided in semantic HTML and follows Web Accessibility Initiative's
ARIA Authoring practices standard[[5](#ref5), [6](#ref6)]. This lets assistive technology software
identify them correctly. Additionally, it improves machine readability, resulting in better search
optimization or alternative content delivery, for example in popular voice interfaces.

## See also
Please have a look at further [documentation for developers in Wikimedia projects](https://www.mediawiki.org/wiki/Accessibility_guide_for_developers)
and [English Wikipedia's Manual of style for accessibility on content](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility).

## References

1. <span id="ref1">[English Wikipedia with first accessible manual of style, 2006](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility)</span>
2. <span id="ref2">[Wikimedia Foundation's vision](https://meta.wikimedia.org/wiki/Vision), dating back as far as [October 2006](https://meta.wikimedia.org/w/index.php?title=Vision&oldid=469703)</span>
3. <span id="ref3">[Introduction to Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html#introduction-fourprincs-head)</span>
4. <span id="ref4">[Simple Wikipedia (English) as inclusive entry point for users with cognitive impairments](https://simple.wikipedia.org/wiki/Main_Page)</span>
5. <span id="ref5">[W3C Web Accessibility Initiative](https://www.w3.org/WAI)</span>
6. <span id="ref6">[WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/)</span>
7. <span id="ref7">[WAVE – Web Accessibility Evaluation Tool (online)](https://wave.webaim.org/)</span>
8. <span id="ref8">[The A11Y Project](https://a11yproject.com/)</span>
9. <span id="ref9">[Are My Colours Accessible?](http://www.aremycoloursaccessible.com/)</span>
