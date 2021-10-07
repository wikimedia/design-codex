<template>
<div>
	<header>
		<h1>Codex Demo</h1>
	</header>

	<main>
		<codex-button @click="onClick">
			Click me!
		</codex-button>
	</main>
</div>
</template>

<script lang="ts" setup>
import { Button as CodexButton } from './lib';

function onClick ( e: Event ) {
	console.log( e );
}
</script>
