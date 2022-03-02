<script setup>
import ListTileDefault from './../../component-demos/list-tile/examples/ListTileDefault.vue';
import ListTileHideThumbnail from './../../component-demos/list-tile/examples/ListTileHideThumbnail.vue';
import ListTileList from './../../component-demos/list-tile/examples/ListTileList.vue';
import ListTileListGraphemes from './../../component-demos/list-tile/examples/ListTileListGraphemes.vue';
import ListTileLong from './../../component-demos/list-tile/examples/ListTileLong.vue';
</script>

## Demos

### Default

A ListTile can be used to display the thumbnail, label, and description of an item.

<Wrapper>
<template v-slot:demo>
<list-tile-default />
</template>
<template v-slot:code>

<<< @/../component-demos/list-tile/examples/ListTileDefault.vue

</template>
</Wrapper>

### Without thumbnail

<Wrapper>
<template v-slot:demo>
<list-tile-hide-thumbnail />
</template>
<template v-slot:code>

<<< @/../component-demos/list-tile/examples/ListTileHideThumbnail.vue

</template>
</Wrapper>

### With long title and default thumbnail

<Wrapper>
<template v-slot:demo>
<list-tile-long />
</template>
<template v-slot:code>

<<< @/../component-demos/list-tile/examples/ListTileLong.vue

</template>
</Wrapper>

### Within a list

<Wrapper>
<template v-slot:demo>
<list-tile-list />
</template>
<template v-slot:code>

<<< @/../component-demos/list-tile/examples/ListTileList.vue

</template>
</Wrapper>

### With graphemes

<Wrapper>
<template v-slot:demo>
<list-tile-list-graphemes />
</template>
<template v-slot:code>

<<< @/../component-demos/list-tile/examples/ListTileListGraphemes.vue

</template>
</Wrapper>

<style scoped>
.cdx-docs-wrapper :deep( ol ) {
	box-sizing: border-box;
	margin: 0 0 16px;
	padding: 0;
	border: solid 1px #a2a9b1;
	border-radius: 0 0 2px 2px;
	list-style-type: none;
}
</style>
