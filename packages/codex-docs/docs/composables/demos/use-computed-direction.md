# useComputedDirection

Returns a [ref](https://vuejs.org/api/reactivity-core.html#ref) of the reading
directionality, or `null` if the component hasn't been mounted yet.

This composable uses
[Window.getComputedStyle()](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)
to get the computed direction attribute. For example, if the component is wrapped in
`<div dir="rtl">...</div>`, this composable detects that and returns `'rtl'`.

Because this method must be run on a rendered DOM element, the composable will return `null` until
the component is mounted. Code using this composable should anticipate this, and check whether the
value is `null`.

## Usage

Create a [template ref](https://vuejs.org/guide/essentials/template-refs.html) that references the
root element of the component. The `ref` attribute provides a direct reference to the root element
and allows us to obtain the detected direction by interacting with the DOM element.

```vue
<template>
    <div ref="rootElement"></div>
</template>
```

Pass the template ref to the composable.

```js
const rootElement = ref(null);
const computedDirection = useComputedDirection( rootElement );
```

When the component mounts, the computed direction is updated.

## Full example

In this example, the component is a Dialog that has a different image for LTR and RTL. The
composable is used to determine the reading directionaliy which can be either `null`, `'ltr'`, or
`'rtl'`. Based on the direction, a different image of the computer is displayed.

```vue
<template>
    <div ref="rootElement">
        <cdx-button @click="open = true"> Open Dialog </cdx-button>

        <client-only>
            <cdx-dialog
                v-model:open="open"
                title="Save changes"
                :use-close-button="true"
                :primary-action="primaryAction"
                :default-action="defaultAction"
                @primary="onPrimaryAction"
                @default="open = false"
            >
            <!-- bind the image source to a computed property -->
                <img
                    :src="computedImageSrc"
                    alt="image of computer"
                    width="223"
                    height="240"
                />
                <p>Do you want to save your changes?</p>
            </cdx-dialog>
        </client-only>
    </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxButton, CdxDialog, useComputedDirection } from '@wikimedia/codex';

export default defineComponent({
    name: 'DialogWithImage',
    components: {
        CdxButton,
        CdxDialog,
    },
    setup() {
        const open = ref(false);

        const primaryAction = {
            label: 'Save',
        actionType: 'progressive',
        };

        const defaultAction = {
            label: 'Cancel',
        };

        function onPrimaryAction() {
            open.value = false;
            console.log('Primary action taken');
        }

        const image = {
            "ltr": 'https://upload.wikimedia.org/wikipedia/commons/1/13/Personal_computer%2C_exploded_4.svg',
            "rtl": 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Personal_computer%2C_exploded.svg',
        };

        const rootElement = ref(null);
        const computedDirection = useComputedDirection(rootElement);
        const computedImageSrc = computed (() => {
            return image[computedDirection.value] || image.ltr;
        });

        return {
            open,
            primaryAction,
            defaultAction,
            onPrimaryAction,
            rootElement,
            computedImageSrc,
        };
    },
});
</script>
```
