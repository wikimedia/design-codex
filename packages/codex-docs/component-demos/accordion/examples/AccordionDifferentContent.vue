<template>
	<cdx-accordion>
		<template #title>
			Accordion with an image
		</template>
		<img
			alt="mediawiki logo"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/MediaWiki-2020-logo.svg/1920px-MediaWiki-2020-logo.svg.png"
		>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			Accordion with a table
		</template>
		<table>
			<tr>
				<th>&nbsp;</th>
				<th>Rex</th>
				<th>Bella</th>
				<th>Max</th>
				<th>Lola</th>
			</tr>
			<tr>
				<th>Breed</th>
				<td>German Shepherd</td>
				<td>Golden Retriever</td>
				<td>Bulldog</td>
				<td>Nova Scotia</td>
			</tr>
			<tr>
				<th>Age</th>
				<td>5</td>
				<td>3</td>
				<td>7</td>
				<td>2</td>
			</tr>
			<tr>
				<th>Owner</th>
				<td>John</td>
				<td>Sarah</td>
				<td>Michael</td>
				<td>Emily</td>
			</tr>
			<tr>
				<th>Eating Habits</th>
				<td>Healthy appetite</td>
				<td>Picky eater</td>
				<td>Enjoys treats</td>
				<td>Loves homemade meals</td>
			</tr>
		</table>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			Accordion with a textarea
		</template>
		<cdx-text-area placeholder="Start typing..." />
	</cdx-accordion>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxAccordion, CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionDifferentContent',
	components: { CdxAccordion, CdxTextArea }
} );
</script>
