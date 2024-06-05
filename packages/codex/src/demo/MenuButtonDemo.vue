<template>
	<section id="cdx-menu-button">
		<h2>Menu Button</h2>
		<div class="cdx-docs-menu-button">
			<cdx-menu-button
				v-model:selected="selected"
				:menu-items="menuItems"
				:menu-config="menuConfig"
				aria-label="Change option value"
			>
				<template #default>
					<cdx-icon :icon="cdxIconEllipsis" />
				</template>
			</cdx-menu-button>
			<p>
				Selected: {{ selected }}
			</p>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxMenuButton, CdxIcon } from '../lib-wip';
import { cdxIconEllipsis } from '@wikimedia/codex-icons';

const selected = ref<string|number|null>( null );
const menuItems = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2' },
	{ label: 'Three', value: '3' }
];
const menuConfig = {
};
</script>
