<style>
	/* stylelint-disable selector-class-pattern, function-url-quotes, scale-unlimited/declaration-strict-value, plugin/no-unsupported-browser-features */
</style>

# ADR 09) CSS icons

Date: 2024-02-29

## Status

Accepted

## Context

In January 2023, the Design System Team set out to create a "CSS-only" icon: an icon system that
could be used server-side with no JavaScript. In February 2024, the resulting system was updated to
support the use of color parameters provided as CSS custom properties. This ADR covers both
decisions and their results.

## Initial CSS-only icon system

### Considered actions

#### Icons as background-images

For this option, an icon SVG is included as a background-image of an empty `<span>`. This is how
OOUI icons work: classes can be added to an element to indicate the appropriate icon image
and color, and the `background-image` rules, language variants, and directionality variants are
handled in OOUI's CSS. Some limitations of this system are that it requires some work on the server
to generate the icon CSS, and it only supports a limited set of icon colors.

```html
<span class="cdx-icon cdx-icon--info-filled cdx-icon--small cdx-icon--progressive"></span>
```

```json
{
  "codexIcons": [
    "cdxInfoFilled"
  ]
}
```

```css
/* Generated CSS */
.cdx-icon--progressive.cdx-icon--info-filled {
	background-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" fill="#3366cc">...SVG markup...</svg>' );
}
```

We wanted to find a system that would enable the use of any color (like the Vue icon), that was
MediaWiki-agnostic, requiring no associated implementation server-side, and that could easily
output only the CSS for the icons needed by the feature. To this end, we explored the possibility of
creating a Less mixin that could generate the necessary styles for any icon variant.

```html
<span class="my-feature__icon-info-filled"></span>
```

```less
@import 'some/path/css-icon.less';

@my-custom-icon-color: @color-success;

.my-feature__icon-info-filled {
	.cdx-mixin-css-icon( 'info-filled', @size-icon-small, @my-custom-icon-color );
}
```

#### Icon SVG markup inserted server-side

For this option, users would need to insert SVG markup server-side, essentially doing what the Icon
component does in terms of determining which icon variant to show and outputting the markup. This
would be a major change from the OOUI system, and would require significant work on the server-side
to accomplish. It would also only work inside MediaWiki.

```php
$iconHtml = $this->useIcon( 'info-filled', 'medium', 'progressive');
```

```html
<!-- Output -->
<span class="cdx-icon">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#3366cc">
    <title>
      info
    </title>
    <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0M9 5h2v2H9zm0 4h2v6H9z"/>
  </svg>
</span>
```

### Decision

We opted to set icons as background-images via a Less mixin that takes in parameters and outputs
styles for the requested icon for the following reasons:
1. It's MediaWiki agnostic and requires no implementation work outside of Codex
2. It outputs only the CSS needed for the requested icon
3. It allows for use of any icon color
4. Less is already used throughout our ecosystem

#### Icon data

A new script transforms the icon data defined in the `codex-icons` package to a series of Less
variables. For each icon, this data includes:

1. The default icon path (a string)
2. Whether the icon should flip in RTL ('true' or 'false')
3. Exceptions to the flip rule ('false' or a selector string that will rule out languages)
4. RTL-specific icon path ('false' or the path string)
5. Whether the icon has language-specific variants ('true' or 'false')
6. (or more) If there are language-specific variants, they will be included as string pairs after
   the other icon data. The first item in the pair is a lang code and the second is the icon path
   for that language.

These variables are made available to Codex users and follow the naming pattern
`@cdx-icon-icon-name`.

#### Icon mixin

The icon mixin, `.cdx-mixin-css-icon`, takes in the following parameters:

1. `param-icon`: The Less variable representing the icon to show, e.g. `@cdx-icon-info-filled`
2. `param-fill-color`: The fill color of the icon (defaults to `@color-base`)
3. `param-size-icon`: The size of the icon (defaults to `@size-icon-medium`)
4. `param-is-button-icon`: Whether this icon is inside of a `<button>` element.

To create a CSS icon, the mixin is applied to an empty element:

```html
<!-- Create an empty span with a class. -->
<span class="my-feature__icon--trash"></span>
```

```less
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/css-icon.less';

.my-feature__icon {
	&--trash {
		// Use the mixin to set the icon and, optionally, color and size.
		.cdx-mixin-css-icon( @cdx-icon-trash, @color-destructive );
	}
}
```

The following CSS is generated by the mixin usage, including a `background-image` rule with the
appropriate icon SVG (accounting for any language or directionality variants) and the requested
fill color:

```css
.my-feature__icon--trash {
	background-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" fill="%23D73333"><path d="M17 2h-3.5l-1-1h-5l-1 1H3v2h14zM4 17a2 2 0 002 2h8a2 2 0 002-2V5H4z"/></svg>' );
	background-position: center;
	background-repeat: no-repeat;
	background-size: calc( max( 1.25em, 20px ) );
	display: inline-block;
	min-width: 20px;
	min-height: 20px;
	width: 1.25em;
	height: 1.25em;
	vertical-align: text-bottom;
}
```

The Less mixin approach means that only a single class and a single line of Less is needed to add
the icon. We preferred this approach over the use of CSS utility classes since it only requires
importing the mixin to work, and all of the customization is done in one place (via the mixin
parameters). This follows a common pattern in Codex in which we minimize the number of ways
there are to do something in order to provide a simpler, more streamlined developer experience.

#### Icons in buttons

Icons in buttons are special because they must change color depending on the button's action/weight
and state (e.g. hover). Using the mixin to set the background image wouldn't work because the fill
color must be changed in the Button code, depending on Button props and state.

Instead, special handling was added to the mixin to use [`mask-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image)
instead of `background-image` for the icon image when an icon appears in button. Then, the
`background-color` can be changed in the Button code to set the appropriate icon color for
different actions/weights and states.

We noted that `mask-image` is [not supported](https://caniuse.com/?search=mask-image) in the
earliest versions of Firefox that we support (v39-52), so as a fallback we show either a
`@color-base` icon or an inverted, light icon, whichever has more contrast. This way, the icon is
always at least visible, if not the most ideal color.

### Consequences

- We provided a lightweight way to add icons on the server-side using Less, which is already widely
  used in MediaWiki. Language and directionality variants are handled automatically.
- CSS icons can be any color.
- Only the CSS for the requested icon(s) is included.
- Developers must use the mixin to set the icon instead of the current procedure in MediaWiki, which
  is to define a list of needed OOUI icons and set them via CSS classes.
- Developers must use Less to take advantage of the CSS icon implementation. This means that Codex
  icons are only available when one is using either JavaScript (and Vue) or Less.

Further reading:
1. [Original task](https://phabricator.wikimedia.org/T325772)
2. [Front-end standards group discussion](https://etherpad.wikimedia.org/p/FrontEndStandardsGroup#magicdomid684)
3. [CSS-only icon documentation](https://doc.wikimedia.org/codex/latest/components/demos/icon.html#css-only-version)

## Updates to support CSS custom properties

Ahead of their project to implement night mode in MediaWiki, the Web team requested that the Codex
CSS-only icon system support the use of [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
as fill colors. This presented a challenge as CSS custom properties cannot be used in the `fill`
property of an SVG background-image since the SVG URL has no context of the property's current
value.

### Considered actions

#### Use `currentColor` for the SVG fill

We hoped we could simply set the `fill` attribute of the SVG to `currentColor` and then add a
`color` rule for the element, but this does not work for the same reason that using a CSS custom
property for the `fill` does not—the SVG URL has no idea what the `currentColor` is.

#### Use `mask-image` for all icons

We had previously used `mask-image` to set the icon image for icons within buttons, because we could
then set the `background-color` to different values depending on the button type and state. If we
did this for all icons, instead of using `background-image`, we could control the color via
`background-color`, which works with CSS custom properties.

This option has two downsides:
- Users of Firefox versions 52 and lower would no longer get the right icon color, and would have to
  experience the same fallback as they do for icons within buttons (either a dark or light icon
  depending on which has more contrast, but no more color granularity)
- This only works when the icon is placed within an empty element. For example, the CSS-only Select
  includes the icon on the `<select>` element, and using `mask-image` there disrupts the background
  of the entire element (see [T358513](https://phabricator.wikimedia.org/T358513)). Note that as
  part of that task, we developed a workaround where either a dark or inverted icon can be shown.

#### Redo the CSS icon system

Another option would be to remove the current mixin-based CSS icon system and instead build a new
system into MediaWiki in which developers can pass in which icon they want and get back actual SVG
markup, including a `fill` attribute for the color (or `currentColor`). In this context, a CSS
custom property would work.

This option has some downsides:
- It would be a breaking change
- It would require an entirely new system, built in PHP and in MediaWiki
- It would be Mediawiki-specific

### Decision

We decided to use `mask-image` for all CSS icons so we could continue to use the existing CSS icon
system with no breaking changes. Now, requesting a `@color-destructive` trash icon, as in the
example above, will yield the following CSS:

```css
.my-feature__icon--trash {
	background-color: #bf3c2c;
	mask-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" fill="%23000000"><path d="M17 2h-3.5l-1-1h-5l-1 1H3v2h14zM4 17a2 2 0 002 2h8a2 2 0 002-2V5H4z"/></svg>' );
	mask-position: center;
	mask-repeat: no-repeat;
	mask-size: calc( max( 1.25em, 20px ) );
	display: inline-block;
	min-width: 20px;
	min-height: 20px;
	width: 1.25em;
	height: 1.25em;
	vertical-align: text-bottom;
}
```

### Consequences

- The CSS icon mixin now supports colors provided as CSS custom properties, which will work with
  night mode.
- Users of old versions of Firefox have a slightly degraded experience (less color granularity).
- The CSS icon mixin no longer works unless it's applied to an empty element.
- There may be instances other than the bug we identified for the Select component where the updated
  mixin does not work.
- Less continues to be a hard requirement for the CSS icon system.

Further reading:
1. [Task](https://phabricator.wikimedia.org/T356540)

<style>
	/* stylelint-enable selector-class-pattern, function-url-quotes */
</style>
