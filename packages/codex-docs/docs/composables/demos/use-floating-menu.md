# useFloatingMenu

Implements the `useFloating()` composable from [FloatingUI](https://floating-ui.com/docs/vue#usage)
for positioning [Menu](/components/demos/menu.html) overlays by taking in two refs: one for
the reference element and one for the Menu, plus
[middleware](https://floating-ui.com/docs/middleware) to track and update visible changes to the
Menu.

Updates the value of these CSS properties for the Menu: `visibility`, `position`, `top`, `right`,
`left`, `transform`, `width` and `max-height`.

This composable will:
- Ensure the menu is always visually attached to its triggering element
- Ensure the menu is always the same width as its triggering element
- Ensure the menu is positioned below the triggering element when there is enough space,
  and it positioned above the triggering element otherwise.
- Ensure the menu does not extend past the edge of the viewport
- Ensure the menu is hidden if the triggering element is scrolled out of view
- Ensure the menu and the reference element don't have rounded corners where they touch.
    - If you want the reference element to have rounded corners on the sides where it doesn't
      touch the menu, you must set a `border-radius` on *all* corners. This composable will
      then override the `border-radius` to 0 for the corners that should not be rounded.
      (If you're using a TextInput as the reference element, you don't have to do anything,
      because TextInput already sets a `border-radius` on all of its corners.)

## Usage

`useFloatingMenu()` takes in two arguments:
- The [template ref]( https://vuejs.org/guide/essentials/template-refs.html) of the element that the
menu is visually attached to
- The [ref](https://vuejs.org/api/reactivity-core.html#ref) of the menu which is an instance of
CdxMenu

```vue
<template>
    <div ref="handle">
        <cdx-menu ref="menu" />
    </div>
</template>
```

 ```js
const handle = ref(null);
const menu = ref(null);

 useFloatingMenu( handle, menu );
 ```

## Full example

In this example, the component is a TextInput with a Menu. The composable absolutely positions the
Menu to appear attached to the TextInput and share the same width.

When the Menu is not expanded, it's hidden using `visibility: hidden;`.

When the Menu is expanded, the Menu and its children components, MenuItems, are visible. Floating
UI's middleware hides the expanded Menu when the user has scrolled the TextInput out of view. This
is because the Menu is relative to the TextInput.

```vue
<template>
    <div class="cdx-docs-input-with-menu">
        <cdx-text-input
            ref="textInput"
            v-model="selectedValue"
            class="cdx-docs-input-with-menu__input"
            role="combobox"
            :aria-expanded="expanded"
            @click="onClick"
            @blur="expanded = false"
            @keydown="onKeydown"
        />
        <cdx-menu
            ref="menu"
            v-model:selected="selectedValue"
            v-model:expanded="expanded"
            :menu-items="menuItems"
        />
    </div>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, Ref, ref } from 'vue';
import { CdxMenu, CdxTextInput } from '@wikimedia/codex';
// import needed because useFloatingMenu is not being exported in lib yet
import useFloatingMenu from '../composables/useFloatingMenu';

const textInput = ref(null);
const menu = ref(null);

useFloatingMenu( textInput as Ref<ComponentPublicInstance>, menu );

const selectedValue = ref( '' );
const expanded = ref( false );
const menuItems = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2', disabled: true },
	{ label: 'Three', value: '3' },
	{ label: 'Four', value: '4' }
];

function onKeydown( event ) {
	// Delegate key events to the menu
	menu.value?.delegateKeyNavigation( event );
}

function onClick() {
	expanded.value = true;
}
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```
