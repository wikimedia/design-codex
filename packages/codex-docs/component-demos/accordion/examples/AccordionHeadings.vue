<template>
	<cdx-accordion heading-level="h2" class="cdx-demo-accordion-heading-2">
		<template #title>
			Accordion with h2 title
		</template>
		Accordion content 1
	</cdx-accordion>
	<cdx-accordion heading-level="h2" class="cdx-demo-accordion-heading-2">
		<template #title>
			Accordion with h2 title
		</template>
		Accordion content 2
	</cdx-accordion>
	<cdx-accordion heading-level="h2" class="cdx-demo-accordion-heading-2">
		<template #title>
			Accordion with h2 title
		</template>
		Accordion content 3
	</cdx-accordion>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionHeadings',
	components: { CdxAccordion }
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-accordion-heading-2 {
	.cdx-accordion__header {
		font-size: @font-size-large;
	}
}
</style>
