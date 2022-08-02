<template>
	<section id="cdx-message">
		<h2>Message</h2>
		<cdx-message
			v-for="( type ) in MessageTypes"
			:key="type"
			:type="type"
			dismiss-button-label="Dismiss"
		>
			{{ type }}
		</cdx-message>
	</section>
</template>

<script lang="ts" setup>
import { CdxMessage } from '../lib';
import { MessageTypes } from '../constants';
</script>
