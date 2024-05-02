<template>
	<cdx-table
		caption="Waves of Feminism"
		:columns="columns"
		:data="data"
		:use-row-headers="true"
	>
		<template #footer>
			Latest update: April 10, 2024
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxTable } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TableColumnWidth',
	components: { CdxTable },
	setup() {
		const columns = [
			{ id: 'wave', label: 'Wave', minWidth: '112px' },
			{ id: 'years', label: 'Years', minWidth: '112px' },
			{ id: 'overview', label: 'Overview', minWidth: '320px' },
			{ id: 'figures', label: 'Main figures', minWidth: '160px' }
		];

		const data = [
			{
				wave: 'First wave',
				years: 'Late 19th to early 20th century',
				overview: 'Focused on women\'s suffrage and legal rights, addressing inequalities in the public sphere.',
				figures: 'Susan B. Anthony, Elizabeth Cady Stanton'
			},
			{
				wave: 'Second wave',
				years: '1960s to 1980s',
				overview: 'Centered on women\'s liberation and social equality, addressing issues such as reproductive rights, workplace discrimination, and sexual liberation.',
				figures: 'Betty Friedan, Gloria Steinem, Simone de Beauvoir'
			},
			{
				wave: 'Third wave',
				years: '1990s to early 2000s',
				overview: 'Emphasized diversity and intersectionality, addressing issues of race, class, sexuality, and gender identity. Advocated for inclusivity and challenging stereotypes.',
				figures: 'bell hooks, Kimberlé Crenshaw, Judith Butler'
			},
			{
				wave: 'Fourth wave',
				years: 'Early 2010s to present',
				overview: 'Characterized by a focus on the empowerment of women through the use of internet tools, and intersectionality. The fourth wave seeks greater gender equality by focusing on gendered norms and the marginalization of women in society.',
				figures: 'Tarana Burke, Chimamanda Ngozi Adichie, Roxane Gay'
			}
		];

		return {
			columns,
			data
		};
	}
} );
</script>
