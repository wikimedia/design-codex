# ADR 10) Internationalization support for common strings in components

Date: 2024-06-25

## Status

Accepted

## Context

Several components contain text, either visible or for assistive technology, that supports user
experience and accessibility and is generally the same across features. Some examples:

- The Dialog component contains a visually-hidden "Close" label on the icon-only close button.
- The Table component contains visually-hidden checkbox labels when row-selection is enabled ("Select row X of Y", "Select all rows").
- The InputChip component used inside of the ChipInput has a visually-hidden `aria-description` which reads: "Press Enter to edit or Delete to remove".

Since many interfaces built with Codex must be translatable, and there is no
[internationalization](https://en.wikipedia.org/wiki/Internationalization_and_localization) (i18n)
system in Codex, we require that these strings be passed in as props. In MediaWiki, users can use
`mw.msg()` to pass in a translated message. Outside of MediaWiki, users must either provide a
translated string somehow, or pass in a hard-coded value.

This is problematic for a few reasons:
- The developer user must provide these props every time, when the messages are usually the same across
  features.
- The burden of ensuring that accessibility standards are met is placed upon the developer using Codex.
- Extra props are confusing and noisy.

We have also used some of these string props to implicitly enable certain features. For example, to
enable the Message component's dismiss button, you would think you'd use a boolean prop like
`allowDismiss`. Instead, if you provide the string prop `dismissButtonlabel`, the dismiss button is
enabled. This is counterintuitive.

## Considered actions

### Provide a solution that works inside MediaWiki

We could provide a solution that works inside MediaWiki by using MediaWiki's [Messages
API](https://www.mediawiki.org/wiki/Manual:Messages_API):
- In MediaWiki core, create an i18n directory of messages for these Codex component strings.
  Translations for these strings would be added via TranslateWiki.
- In Codex, build a plugin that injects a provided i18n function. MediaWiki core would provide
  `mw.msg()` as the i18n function.
- In Codex, update affected components to use the provided i18n function to get a translated string,
  with an English fallback.

The plugin could be a composable that looks like this:

```js
import { inject } from 'vue';

/**
 * Composable for using translatable messages in a component.
 *
 * @param messageKey Symbolic name of the message. Must be prefixed with cdx-
 * @param defaultValue Default value to use if there is no provided i18n function
 *   (or if it returns null). This can be a string, or a function that returns a string. You must
 *   pass a function if the message takes parameters, or if the default value needs to be reactive
 *   (e.g. is a prop value rather than a hardcoded string).
 * @param params Array of parameters to pass to the message. Parameters can be plain values or refs;
 *   refs will be unwrapped automatically, and will behave reactively. This is optional and can be
 *   omitted if the message doesn't take any parameters.
 * @return A computed property with the translated message. This computed property updates when the
 *   parameters change, or when reactive refs accessed by the provided i18n function change.
 */
export default function useI18n( messageKey, defaultValue, params ) {
	// Look for a provided i18n function.
	const providedI18nFunc = inject( 'CdxI18nFunction', undefined );

	return computed( () => {
		const unwrappedParams = params.map( unref );
		// If there's a provided function and it returns something for this message, return it.
		const fromProvidedFunc = providedI18nFunc?.( messageKey, ...unwrappedParams );
		if ( fromProvidedFunc !== undefined && fromProvidedFunc !== null ) {
			return fromProvidedFunc;
		}
		// Otherwise, return the default value
		return typeof defaultValue === 'function' ?
			defaultValue( ...unwrappedParams ) :
			defaultValue;
	} );
}
```

A Codex component would use it like this:

```js
// Use the i18n function to get a translated aria-description string,
// and pass in a default message as the fallback to be used in the template.

const ariaDescription = useI18n(
	'cdx-input-chip-aria-description',
	'Press Enter to edit or Delete to remove'
);
```

And the provided function in MediaWiki core would look like this:

```js
// MediaWiki's existing createMwApp() function, a wrapper around Vue.createApp().
Vue.createMwApp = function( ...args ) {
	const app = Vue.createApp( ...args );
	app.provide( 'CdxI18nFunction', mw.msg );
}
```

This would be lightweight to implement, but would only work inside MediaWiki. However, the plugin
could be open-ended enough to work with other provided i18n functions in the future.

### Extend this to work with other i18n functions

The solution described above could be extended to work outside of MediaWiki.
In environments where `mw.msg` is not available, a custom function could
be provided in the same way. A custom i18n function could also enable features
that `mw.msg` does not support, such as client-side language switching.

### Provide a solution in Codex itself

To support translating these strings everywhere outside of the box, we would need to build something
in Codex itself to store the translated strings and provide an i18n function. This would require
hooking Codex up to TranslateWiki or finding another way to translate the strings, and developing
our own i18n function that covers all necessary features (e.g. we already need to support
parameters, and may need things like plurals in the future).

## Decision

We have decided to proceed with the first solution, where Codex components can
rely on a provided i18n function. Our initial implementation of this solution will
only focus on the MediaWiki use-case, but in the future we will also explore ways
to improve internationalization support outside of MediaWiki. To enable this
sequential work, we will encapsulate the code inside MediaWiki core as much as
possible (e.g. creating a separate directory for Codex messages) and ensure that
the plugin is open-ended enough to work with a variety of i18n functions.

## Consequences

We will initially only support translating these strings inside MediaWiki, but leave the door open
for future work to support it outside of MediaWiki as well. Future work may require a more robust
solution in order to support different formats or configurations, and to ensure that the developer
experience of using the system remains straightforward.

We will be able to change or remove many of these props, and most users using Codex inside MediaWiki
will no longer need to provide them at all. For a time, we will need to support both APIs, because
removing/changing the props will be a breaking change.

## Further reading

1. [Epic task](https://phabricator.wikimedia.org/T345386)
