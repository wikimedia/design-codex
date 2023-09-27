# useComputedLanguage

Returns a [ref](https://vuejs.org/api/reactivity-core.html#ref) of the language code string,
or `null` if the component hasn't been mounted yet.

This composable traverses up the HTML tree until it finds an ancestor with a `lang` attribute. It
detects the language of the context surrounding a component. For example, if the component is
wrapped in `<div lang="ar">...</div>`, this composable detects that and returns `'ar'`.

Because this method must be run on a rendered DOM element, the composable will return `null` until
the component is mounted. Code using this composable should anticipate this, and check whether the
value is `null`.

## Usage

Create a [template ref](https://vuejs.org/guide/essentials/template-refs.html) that references the
root element of the component. The `ref` attribute provides a direct reference to the root element
and allows us to obtain the detected language by interacting with the DOM element's ancestors.

```vue
<template>
    <span ref="rootElement"></span>
</template>
```

Pass in a template ref to the composable.

```js
const rootElement = ref(null);
const computedLang = useComputedLanguage( rootElement );
```
When the component mounts, the computed language is updated.

## Full example

In this example, the component has different character limits based on the language code. If the
character limit is met or exceeded, the TextArea status prop will change from "default" to "error".
If the character limit has not been exceeded then the status is "default".

The composable determines the language code. With the language code, the character limit is
evaluated to determine the status of the TextArea. The status props, "default" and "error" dynamically
apply CSS styles to the TextArea.

``` vue
<template>
  <div lang="fr">
    <div ref="rootElement">
      <cdx-label input-id="user-request">
        Laissez-nous savoir comment nous pouvons vous aider.
      </cdx-label>
      <cdx-text-area
        id="user-request"
        v-model="textareaValue"
        :status="computedStatus"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxTextArea, CdxLabel, useComputedLanguage } from '@wikimedia/codex';
// this json file is not a real file but used for demo purposes
import characterLimits from './characterLimits.json';

export default defineComponent({
    components: { CdxTextArea, CdxLabel },
    setup() {
        const textareaValue = ref('');
        const rootElement = ref(null);
        const computedLang = useComputedLanguage( rootElement );

        // imported from characterLimits.json
        const characterLimit = {
            af: 110,
            de: 35,
            is: 80,
            fr: 50,
        }

        const computedStatus = computed(() => {
            return {
                textareaValue.value.length >= characterLimit[computedLang.value] ? 'error' : 'default';
            }
        });

        return {
            textareaValue,
            rootElement,
            computedStatus,
        };
  },
});
</script>
```
