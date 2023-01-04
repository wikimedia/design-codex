<template>
	<section id="cdx-message">
		<h2>Message</h2>
		<cdx-message
			v-for="( type ) in StatusTypes"
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
import { StatusTypes } from '../constants';
</script>
