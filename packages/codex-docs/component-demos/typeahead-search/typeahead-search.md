<script setup>
import TypeaheadSearchWikipedia from '@/../component-demos/typeahead-search/examples/TypeaheadSearchWikipedia.vue';
import TypeaheadSearchWikidata from '@/../component-demos/typeahead-search/examples/TypeaheadSearchWikidata.vue';
import TypeaheadSearchInitialValue from '@/../component-demos/typeahead-search/examples/TypeaheadSearchInitialValue.vue';
import TypeaheadSearchPendingState from '@/../component-demos/typeahead-search/examples/TypeaheadSearchPendingState.vue';
import TypeaheadSearchNoResult from '@/../component-demos/typeahead-search/examples/TypeaheadSearchNoResult.vue';
</script>

::: tip TextInput props apply
This component contains a TextInput component. You can bind [TextInput props](./text-input.html#usage)
to this component and they will be passed to the TextInput within.
:::

::: tip Attributes passed to input
This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>`
element within the component.
:::

## Demos

### Search Wikipedia articles

This implementation of TypeaheadSearch fetches articles from English Wikipedia. Note that the input
expands on focus via the `autoExpandWidth` prop, thumbnails are enabled via the `showThumbnail`
prop, and the "search" button is added via the `buttonLabel` prop.  Open the console to see emitted
events.

<cdx-demo-wrapper>
<template v-slot:demo>
<typeahead-search-wikipedia />
</template>
<template v-slot:code>

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchWikipedia.vue

</template>
</cdx-demo-wrapper>

### Search Wikidata items

In this example, results are fetched from Wikidata. Thumbnails are disabled, and the input doesn't
expand on focus. There is no button, because the `buttonLabel` prop is not set. Open the console to
see emitted events.

<cdx-demo-wrapper>
<template v-slot:demo>
<typeahead-search-wikidata />
</template>
<template v-slot:code>

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchWikidata.vue

</template>
</cdx-demo-wrapper>

### With initial input value

The `initialInputValue` prop can be used to pass in the initial value of the TextInput. This is
useful when replacing a server-rendered UI where the user may have started typing a search query, or
for pre-populating the search term when a user navigates back to a page where they had previously
entered one.

On mount, TypeaheadSearch will fetch search results for the initial input value if it's provided.
After that, the input value is tracked internally and will be emitted up to the parent component
when the value changes.

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
<typeahead-search-initial-value initial-input-value="Color" />
</template>
<template v-slot:code>

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchInitialValue.vue

</template>
</cdx-demo-wrapper>

### Pending state

Pending state indicators, including an inline progress bar and a message stating that results are
pending, can be displayed to users with slower connections while search results are being fetched.
To enable this, provide content in the `search-results-pending` slot.

The pending state indicators will display when a search takes longer than half a second, so you may
need to throttle your connection to see them in the demo below.

<cdx-demo-wrapper>
<template v-slot:demo>
<typeahead-search-pending-state />
</template>
<template v-slot:code>

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchPendingState.vue

</template>
</cdx-demo-wrapper>

### No results message

A message prompt that no search results were found. To enable this, provide content in the
`search-no-results-text` slot.

<cdx-demo-wrapper>
<template v-slot:demo>
<typeahead-search-no-result />
</template>
<template v-slot:code>

<<< @/../component-demos/typeahead-search/examples/TypeaheadSearchNoResult.vue

</template>
</cdx-demo-wrapper>
