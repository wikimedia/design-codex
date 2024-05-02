<template>
	<cdx-table
		v-model:selected-rows="selectedRows"
		class="cdx-docs-table-with-selection"
		caption="Tests"
		:columns="columns"
		:data="data"
		:use-row-selection="true"
	>
		<template #header>
			<div class="cdx-docs-table-with-selection__header">
				<span>
					{{ selectedRows.length }} items selected
				</span>
				<cdx-button @click="handleRerun">
					Rerun
				</cdx-button>
				<cdx-button @click="handleDisconnect">
					Disconnect
				</cdx-button>
			</div>
		</template>

		<template #item-name="{ item }">
			<a :href="item.url">{{ item.label }}</a>
		</template>

		<template #item-status="{ item }">
			<cdx-info-chip :status="item ? 'success' : 'warning'">
				{{ item ? 'Connected' : 'Disconnected' }}
			</cdx-info-chip>
		</template>

		<template #item-result="{ item }">
			<cdx-icon
				:class="getIconClass( item )"
				:icon="item ? cdxIconCheck : cdxIconClose"
			/>
			{{ item ? 'Passed' : 'Failed' }}
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTable, CdxButton, CdxInfoChip, CdxIcon } from '@wikimedia/codex';
import { cdxIconCheck, cdxIconClose } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TableWithSelection',
	components: { CdxTable, CdxButton, CdxInfoChip, CdxIcon },
	setup() {
		// eslint-disable-next-line jsdoc/valid-types
		/** @type {import('vue').Ref<number[]>} */
		const selectedRows = ref( [] );

		const columns = [
			{ id: 'name', label: 'Name', minWidth: '200px' },
			{ id: 'status', label: 'Status' },
			{ id: 'result', label: 'English verb to agent noun' }
		];

		const data = ref( [
			{
				name: {
					label: '"illustrate" -> "illustrator"',
					url: 'https://www.wikifunctions.org/view/en/Z11401'
				},
				status: true,
				result: false
			},
			{
				name: {
					label: '"listen" -> "listener"',
					url: 'https://www.wikifunctions.org/view/en/Z11405'
				},
				status: true,
				result: true
			},
			{
				name: {
					label: '"swim" -> "swimmer"',
					url: 'https://www.wikifunctions.org/view/en/Z11404'
				},
				status: true,
				result: false
			},
			{
				name: {
					label: '"mentor" -> "mentor"',
					url: 'https://www.wikifunctions.org/view/en/Z11402'
				},
				status: true,
				result: true
			}
		] );

		/**
		 * Rerun the test. In this simple example, this just changes any failing
		 * tests to passing.
		 */
		function handleRerun() {
			for ( const index of selectedRows.value ) {
				data.value[ index ].result = true;
			}
		}

		/**
		 * Disconnect selected tests.
		 */
		function handleDisconnect() {
			for ( const index of selectedRows.value ) {
				data.value[ index ].status = false;
			}
		}

		function getIconClass( result ) {
			const iconClassModifier = result ? 'pass' : 'fail';
			return {
				[ `cdx-docs-table-with-selection__icon--${ iconClassModifier }` ]: true
			};
		}

		return {
			selectedRows,
			columns,
			data,
			handleRerun,
			handleDisconnect,
			getIconClass,
			cdxIconCheck,
			cdxIconClose
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-table-with-selection {
	&__header {
		display: flex;
		align-items: flex-end;
		flex-direction: column;
		gap: @spacing-50;

		@media ( min-width: @min-width-breakpoint-tablet ) {
			align-items: center;
			flex-direction: row;
		}
	}

	& &__icon {
		&--pass {
			color: @color-success;
		}

		&--fail {
			color: @color-error;
		}
	}
}
</style>
