# Typography

Wikimedia projects rely on writing and reading. Typography is a key component of their design.
Consider the typeface, size, style, and spacing of your text to achieve good [readability](https://en.wikipedia.org/wiki/Readability).
Our typographic choices make our content accessible, present it in a neutral way, and convey its
reliability.

![A screenshot of a page from English Wikipedia, demonstrating different typography styles](../assets/visual-styles/typography/01_Typography-India-Ink.png)

## Readability

Content should be readable by everyone, regardless of their circumstances. Color blindness or the sun on a device's screen should not be barriers to access.

### Contrast

When using text, make sure that it provides enough color contrast to be read comfortably. Check the
contrast between the colors used for the text and its background. Accessibility note: Provide at
least level AA sufficient contrast (4.5:1). The [color palette](./colors) provides the contrast
levels for pure white and black surfaces, but you need to ensure the contrast of other combinations.

<div class="cdx-docs-contrast">
	<div class="cdx-docs-contrast__demo cdx-docs-contrast__demo--do">
		<div class="cdx-docs-contrast__demo__text">
			Bento (弁当 bentō) is a single-portion take-out or home-packed meal common in Japanese cuisine.
		</div>
		<span class="cdx-docs-contrast__demo__info">
			<strong class="cdx-docs-do">Do:</strong> Contrast against the background
		</span>
	</div>
	<div class="cdx-docs-contrast__demo cdx-docs-contrast__demo--dont">
		<div class="cdx-docs-contrast__demo__text">
			Bento (弁当 bentō) is a single-portion take-out or home-packed meal common in Japanese cuisine.
		</div>
		<span class="cdx-docs-contrast__demo__info">
			<strong class="cdx-docs-dont">Don't:</strong> Low contrast below 4.5:1, especially at smaller sizes, makes text harder to read.
		</span>
	</div>
</div>

### Tracking and leading

**Text spacing:** How text is placed in space can affect its readability. Follow these considerations for text paragraphs:
- Line length for reading in English is ideally no longer than [75 characters](https://en.wikipedia.org/wiki/The_Elements_of_Typographic_Style).
- Line height should be 1.6 times the size of the font used. Internationalization note: Use a
  bigger line height in a relative size unit like rem or em, not in an absolute like px, to prevent
  clipping of some Indic scripts, for example Burmese.

### Dynamic text

Content will be available in multiple languages, and text length will vary for pieces of content across languages. Avoid designing interfaces that depend on certain expectations about text length.

<figure>
	<img src="../assets/visual-styles/typography/02_Dynamic-Text.png" alt="Text shown at different font sizes depending on its length" >
	<figcaption>Text shown at different font sizes depending on its length.</figcaption>
</figure>

Here are few ways to tackle dynamic text:
- **Uncrowded user interface.** Design with an eye for simplicity. Consider reducing the number of
  elements to ensure the remaining ones have enough room.
- **Dynamic layout.** Make containers expandable, so that they can fit the content.
- **Dynamic text.** Adjust the size depending on the content. Use a smaller font-size for long
  content.
- **Clipping.** Clip the text with an ellipsis, only if there is no risk of missing important
  information or the complete information is reachable through a clear alternative means.

## Typefaces

Text can be read in multiple languages on different devices. We recommend using the fonts already
available on each device and operating system. This keeps the experience simple and consistent with
the platform conventions and ensures widest language script support as provided by the operating
systems themselves. The following sections provide a selection criteria for choosing appropriate
typefaces, and how to apply it on different platforms.

### Font selection criteria

To select an appropriate font family for a given language script or device, follow these criteria:
- **Readability.** Fonts with a bigger x-height and open shapes are preferred.
- **Neutral aspect.** The font should work with many different kinds of content without adding a
  particular voice to it.
- **Simple shapes.** Fonts with less complex shapes work better at smaller sizes and on
  low-resolution devices.
- **Open.** Open source fonts are preferred to align with the open knowledge they deliver.

### Platform-specific fonts

We recommend relying on the operating system's default sans-serif typeface.[[1]](#ref1)[[2]](#ref2)

Most platforms have plenty of options for supporting latin-based languages, where the serif concept
makes sense. Among the different serif system fonts we recommend [Source Serif Pro](https://en.wikipedia.org/wiki/Source_Serif?useskin=vector)
(present in many operating systems).

Below you can see an example CSS code to support the default system fonts:

<style>
/* stylelint-disable font-family-name-quotes */
</style>
```css
/**
 * System font stack for sans-serif fonts
 *
 * `-apple-system` ('San Francisco' font) – Support Safari 9+ macOS and iOS, Firefox macOS
 * `BlinkMacSystemFont` ('San Francisco' font) – Chrome 48+ macOS and iOS
 * `Segoe UI` – Windows Vista & newer
 * `Roboto` – Android 4.0+
 * `Inter` – Wikimedia Design choice, OFL licensed
 * `Helvetica, Arial, sans-serif` – (Generic) Web fallback
 *
 * Note that standard `system-ui` value has resulted in unresolved
 * side-effects in certain OS/language combinations as of now and is
 * therefore not included.
 */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Lato, Helvetica, Arial, sans-serif;
```
<style>
/* stylelint-enable font-family-name-quotes */
</style>

Fonts are not always available for all scripts or all operating systems. For example, Helvetica
does not support the Korean script. Using the default font on the user device for Korean text seems
the safest choice, unless there is a better candidate based on the selection criteria described
above, and selected by someone familiar with the script.

### Platform-neutral fonts

In some cases you may be designing in a neutral-platform context. For example, creating mockups to
convey a general interface concept targeting multiple platforms, or contributing to this style
guide. In those cases, it is convenient to select free fonts that follow the above criteria.

We recommend Source Serif Pro and Inter when available in your language, as well as the Noto font
family for extended language support.
- **Source Serif Pro** is a serif typeface created by Frank Grießhammer for Adobe Systems. The
  typeface is inspired by the forms of [Pierre Simon Fournier](https://en.wikipedia.org/wiki/Pierre_Simon_Fournier)
  and is a complementary design to the [Source Sans](https://en.wikipedia.org/wiki/Source_Sans_Pro)
  family.
- **Inter** is a sans-serif typeface family designed for computer screens.
- The [**Noto family**](https://en.wikipedia.org/wiki/Noto_fonts) provides a great coverage of
  languages, providing good alternatives for both serif and sans-serif typefaces.


![Examples of the Source Serif Pro and Inter fonts](../assets/visual-styles/typography/03_fonts.png)

These fonts are provided as a reference, but you may select other free fonts using similar criteria
when the recommended ones are not available in your context.

## Use of styles

The recommended styles are intended to optimize readability of Wikipedia’s dense encyclopedic
content.

In our guidelines we use scale-independent pixels (sp). They can result in a different number of
actual pixels in the user screen due to screen density or user preferences. A 16 sp text is
rendered as 16 px in a 1x device at standard zoom level, but it becomes 21 px in a 2x device (or
when zoomed 200% on a 1x device).

Common text styles are based on the defined scale to clearly communicate the content hierarchy.
Color hints are guidance for general use case in a light mode theme.

<div class="cdx-docs-headings">
	<div class="cdx-docs-headings__heading">
		<h1>
			Heading 1<br>
			serif font, regular 28/35
		</h1>
	</div>
	<div class="cdx-docs-headings__heading">
		<h2>
			Heading 2<br>
			serif font, regular 24/30
		</h2>
	</div>
	<div class="cdx-docs-headings__heading">
		<h3>
			Heading 3<br>
			sans-serif font, bold 20/25
		</h3>
	</div>
	<div class="cdx-docs-headings__heading">
		<h4>
			Heading 4<br>
			sans-serif font, bold 18/22.5
		</h4>
	</div>
	<div class="cdx-docs-headings__heading">
		<h5>
			Heading 5<br>
			sans-serif font, bold 16/20
		</h5>
	</div>
	<div class="cdx-docs-headings__heading">
		<h6>
			Heading 6<br>
			sans-serif font, bold 14/22.4
		</h6>
	</div>
	<div class="cdx-docs-headings__footer">
		<p>
			All headings use color <strong>Black #000</strong>
			<span class="cdx-docs-headings__footer__color-swatch"></span>
		</p>
	</div>
</div>

<div class="cdx-docs-paragraphs">
	<div class="cdx-docs-paragraphs__example">
		<div class="cdx-docs-paragraphs__example__info">
			<p class="cdx-docs-paragraphs__example__info__label">
				Body Paragraph
			</p>
			<p>sans-serif font, regular</p>
			<p>16 sp in Gray700</p>
		</div>
		<div class="cdx-docs-paragraphs__example__demo">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis reprehenderit minima voluptates doloribus nemo, enim eius. Itaque laudantium, praesentium maiores distinctio! Voluptate ipsam consequatur corrupti inventore cum illo quae modi.</p>
		</div>
	</div>
	<div class="cdx-docs-paragraphs__example cdx-docs-paragraphs__example--complementary">
		<div class="cdx-docs-paragraphs__example__info">
			<p class="cdx-docs-paragraphs__example__info__label">
				Complementary
			</p>
			<p>sans-serif font, regular</p>
			<p>14 sp in Gray 500 or Gray700</p>
		</div>
		<div class="cdx-docs-paragraphs__example__demo">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis reprehenderit minima voluptates doloribus nemo, enim eius.</p>
		</div>
	</div>
	<div class="cdx-docs-paragraphs__example">
		<div class="cdx-docs-paragraphs__example__info">
			<p class="cdx-docs-paragraphs__example__info__label">
				Block quotation / citation
			</p>
		</div>
		<div class="cdx-docs-paragraphs__example__demo">
			<blockquote>
				<p>sans-serif font, italic 20sp, 4px border before in Gray200</p>
				<cite>— sans-serif font, regular 14 sp</cite>
			</blockquote>
		</div>
	</div>
	<div class="cdx-docs-paragraphs__example">
		<div class="cdx-docs-paragraphs__example__info">
			<p class="cdx-docs-paragraphs__example__info__label">
				Figure caption
			</p>
			<p>sans-serif font, italic</p>
			<p>12 sp in Gray500</p>
		</div>
		<div class="cdx-docs-paragraphs__example__demo">
			<figcaption>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis reprehenderit minima voluptates doloribus nemo, enim eius.</figcaption>
		</div>
	</div>
	<div class="cdx-docs-paragraphs__example cdx-docs-paragraphs__example--small-text">
		<div class="cdx-docs-paragraphs__example__info">
			<p class="cdx-docs-paragraphs__example__info__label">
				Small text
			</p>
			<p>sans-serif font, regular</p>
			<p>12 sp</p>
		</div>
		<div class="cdx-docs-paragraphs__example__demo">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis reprehenderit minima voluptates doloribus nemo, enim eius.</p>
		</div>
	</div>
	<div class="cdx-docs-paragraphs__example cdx-docs-paragraphs__example--placeholder">
		<div class="cdx-docs-paragraphs__example__info">
			<p class="cdx-docs-paragraphs__example__info__label">
				Placeholder
			</p>
			<p>sans-serif font, regular</p>
			<p>16 sp in Gray500</p>
		</div>
		<div class="cdx-docs-paragraphs__example__demo">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis reprehenderit minima voluptates doloribus nemo, enim eius.</p>
		</div>
	</div>
	<div class="cdx-docs-paragraphs__example">
		<div class="cdx-docs-paragraphs__example__info">
			<p class="cdx-docs-paragraphs__example__info__label">
				Unordered list
			</p>
			<p>sans-serif font, regular</p>
			<p>16 sp</p>
		</div>
		<div class="cdx-docs-paragraphs__example__demo">
			<ul>
				<li>list-style-type: disc; list-style-position: outside</li>
				<li>list-style-type: disc; list-style-position: outside</li>
				<li>list-style-type: disc; list-style-position: outside</li>
				<li>
					list-style-type: disc; list-style-position: outside
					<ul>
						<li>Nested list item, second order; list-style-type: circle</li>
						<li>
							Nested list item, second order; list-style-type: circle
							<ul>
								<li>Nested list item, third order; list-style-type: square</li>
								<li>Nested list item, third order; list-style-type: square</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<div class="cdx-docs-paragraphs__example">
		<div class="cdx-docs-paragraphs__example__info">
			<p class="cdx-docs-paragraphs__example__info__label">
				Ordered list
			</p>
			<p>sans-serif font, regular</p>
			<p>16 sp</p>
		</div>
		<div class="cdx-docs-paragraphs__example__demo">
			<ol>
				<li>list-style-position: outside</li>
				<li>list-style-position: outside</li>
				<li>list-style-position: outside</li>
				<li>
					list-style-position: outside
					<ol>
						<li>Nested list item</li>
					</ol>
				</li>
			</ol>
		</div>
	</div>
</div>

<style>
/* stylelint-disable declaration-property-unit-disallowed-list, scale-unlimited/declaration-strict-value */
</style>
```css
/**
 * System font stack for monospace fonts
 *
 * `Menlo` – macOS 10.6+
 * `Consolas` – Windows Vista & newer
 * `Liberation Mono` – Fedora, Ubuntu, … OFL licensed
 * `'Courier New', monospace` – (Generic) web font fallback
 */
font-family: 'Menlo', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
font-size: 14px; /* 14 sp equivalent */
```
<style>
/* stylelint-enable declaration-property-unit-disallowed-list, scale-unlimited/declaration-strict-value */
</style>

## References

1. <span id="ref1">For a historic reference on the former default platform-specific font families
  choice in 2014, a predecessor of current selection, see [Typography_refresh/Font_choice on MediaWiki](https://www.mediawiki.org/wiki/Typography_refresh/Font_choice)</span>
2. <span id="ref2">Find a selection of background information on fonts in our choice at [Font family stack article on MediaWiki](https://www.mediawiki.org/wiki/Wikimedia_User_Interface/Use_cases/Font_family_stack)</span>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-contrast {
	@media screen and ( min-width: @min-width-breakpoint-tablet ) {
		display: flex;
		gap: @spacing-12;
	}

	&__demo {
		&__text {
			background-color: @background-color-interactive;
			border-bottom-width: @spacing-25;
			border-bottom-style: @border-style-base;
			padding: @spacing-200;
		}

		&--do {
			margin-bottom: @spacing-100;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				margin-bottom: 0;
			}

			.cdx-docs-contrast__demo__text {
				border-bottom-color: @color-success;
			}
		}

		&--dont {
			.cdx-docs-contrast__demo__text {
				// Our design tokens are so good we don't even have a @color token that's bad
				// enough for this example.
				/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
				color: #a2a9b1;
				border-bottom-color: @color-error;
			}
		}
	}
}

.cdx-docs-headings {
	// Get rid of VitePress styles.
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
		border: 0;
		// Necessary to override VitePress's h2 styles.
		/* stylelint-disable-next-line declaration-no-important */
		padding: 0 !important;
	}

	// Make h2 font family and weight the same as onwiki.
	h2 {
		font-family: @font-family-serif;
		// Necessary to override VitePress's h2 styles.
		/* stylelint-disable-next-line declaration-no-important */
		font-weight: @font-weight-normal !important;
	}

	// Make h6 font size the same as onwiki.
	h6 {
		font-size: var( --font-size-small );
	}

	&__heading {
		border-bottom: @border-subtle;
		padding: @spacing-100 0;
	}

	&__footer {
		background-color: @background-color-interactive-subtle;
		margin-top: @spacing-100;
		padding: @spacing-100;

		p {
			margin: 0;
		}

		&__color-swatch {
			// This is a swatch of a color, not a background color.
			background-color: @color-emphasized;
			display: inline-block;
			width: @size-75;
			height: @size-75;
			margin-left: @spacing-25;
			border-radius: @border-radius-circle;
		}
	}
}

.cdx-docs-paragraphs {
	margin-top: @spacing-200;

	&__example {
		display: flex;
		border-bottom: @border-subtle;
		padding: @spacing-100 0;

		p {
			margin: 0;
		}

		&__info {
			background-color: @background-color-interactive-subtle;
			flex-shrink: 0;
			flex-basis: 50%;
			margin-right: @spacing-100;
			padding: @spacing-50;
			font-size: @font-size-small;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				flex-basis: @size-1600 + @size-200;
			}

			&__label {
				font-weight: @font-weight-bold;
			}
		}

		blockquote {
			// No border color token for this.
			border-left: @border-width-base * 4 @border-style-base #eaecf0;

			p {
				color: @color-base;
				font-family: @font-family-serif;
				font-size: @font-size-x-large;
				// FIXME: Add token.
				/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
				font-style: italic;
			}

			cite {
				font-family: @font-family-sans;
				font-size: @font-size-small;
				// FIXME: Add token.
				/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
				font-style: normal;
			}
		}

		figcaption {
			color: @color-placeholder;
			font-size: @font-size-x-small;
		}

		ul,
		ol {
			margin: 0;

			li,
			ul,
			ol {
				margin: 0;
			}
		}

		ol ol li {
			// FIXME: Add token.
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			list-style-type: lower-alpha;
		}

		ul ul li {
			// FIXME: Add token.
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			list-style-type: circle;

			li {
				// FIXME: Add token.
				/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
				list-style-type: square;
			}
		}

		&--complementary {
			.cdx-docs-paragraphs__example__demo p {
				color: @color-placeholder;
				font-size: @font-size-small;
			}
		}

		&--small-text {
			.cdx-docs-paragraphs__example__demo p {
				font-size: @font-size-x-small;
			}
		}

		&--placeholder {
			.cdx-docs-paragraphs__example__demo p {
				color: @color-placeholder;
			}
		}
	}
}
</style>