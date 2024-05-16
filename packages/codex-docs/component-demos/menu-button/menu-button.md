<script setup>
import { CdxMenuButton } from '@wikimedia/codex';
import MenuButtonBasic from '@/../component-demos/menu-button/examples/MenuButtonBasic.vue';
</script>

The MenuButton component is a ToggleButton that, when toggled on, displays a Menu with options.

## Demos
### Basic Usage

<cdx-demo-wrapper :force-reset="true">
<template v-slot:demo>
	<menu-button-basic />
</template>
<template v-slot:code>

:::code-group

<<< @/../component-demos/menu-button/examples/MenuButtonBasic.vue [NPM]

<<< @/../component-demos/menu-button/examples-mw/MenuButtonBasic.vue [MediaWiki]

:::

</template>
</cdx-demo-wrapper>


## Vue Usage
