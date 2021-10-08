<template>
<div>
	<header>
		<h1>Codex Demo</h1>
	</header>

	<main>
		<cdx-button @click="onClick">
			Click me!
		</cdx-button>
	</main>
</div>
</template>

<script lang="ts" setup>
import { CdxButton } from './lib';

function onClick ( e: Event ) {
	console.log( e );
}
</script>
