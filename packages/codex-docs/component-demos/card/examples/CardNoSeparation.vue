<template>
	<div class="cdx-docs-card-group-with-no-separation">
		<h4>Policies and guidelines</h4>
		<p>Check what is acceptable and expected on Wikipedia.</p>
		<div>
			<cdx-card
				v-for="( card, key ) in cards"
				:key="key"
				separation="none"
			>
				<template #title>
					{{ card.title }}
				</template>
				<template #description>
					{{ card.description }}
				</template>
				<template #supporting-text>
					<a :href="card.url">Examples</a>
				</template>
			</cdx-card>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

const cards = [
	{
		title: 'Neutral point of view',
		description: 'Content must represent significant views fairly, proportionately, and without bias.',
		url: 'https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view'
	},
	{
		title: 'No original research',
		description: 'Articles should summarize published sources, and not contain users\' own interpretations or knowledge.',
		url: 'https://en.wikipedia.org/wiki/Wikipedia:No_original_research'
	},
	{
		title: 'Verifiability',
		description: 'New additions should include a citation, providing the source of the information.',
		url: 'https://en.wikipedia.org/wiki/Wikipedia:Verifiability'
	},
	{
		title: 'Assume good faith',
		description: 'Remember that most users are trying to improve Wikipedia and not deliberately reduce its quality.',
		url: 'https://en.wikipedia.org/wiki/Wikipedia:Assume_good_faith'
	}
];

export default defineComponent( {
	name: 'CardGroupWithNoSeparation',
	components: { CdxCard },
	setup() {
		return {
			cards,
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-card-group-with-no-separation {
	h4 {
		margin: 0;
	}
}
</style>
