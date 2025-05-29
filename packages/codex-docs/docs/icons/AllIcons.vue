<template>
	<cdx-table
		class="cdx-docs-all-icons-table vp-raw"
		caption="Codex icons"
		:show-vertical-borders="true"
		:columns="columns"
	>
		<template #header>
			<cdx-search-input
				v-model="searchInputValue"
				class="cdx-docs-all-icons__search"
				aria-label="Search icons"
				placeholder="Search icons"
			/>
		</template>
		<template v-if="filteredIcons.length > 0" #tbody>
			<tbody>
				<tr
					v-for="iconData in filteredIcons"
					:key="`${iconData.iconName}/${iconData.langCode}`"
				>
					<td>
						<a
							v-if="getIconId( iconData )"
							:id="getIconId( iconData )"
							class="cdx-docs-all-icons-table__anchor-link"
						/>
						{{ iconData.iconName }}
					</td>
					<td>
						{{ iconData.langLabel || '' }}
					</td>
					<td dir="ltr" :colspan="iconData.dirSpecific ? 1 : 2">
						<cdx-icon :icon="iconData.icon" :lang="iconData.langCode" />
					</td>
					<td v-if="iconData.dirSpecific" dir="rtl">
						<cdx-icon :icon="iconData.icon" :lang="iconData.langCode" />
					</td>
				</tr>
			</tbody>
		</template>
		<template v-else #empty-state>
			No matching icons.
		</template>
	</cdx-table>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { CdxIcon, CdxSearchInput, CdxTable } from '@wikimedia/codex';
import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';

interface DisplayIcon {
	iconName: string,
	icon: Icon,
	dirSpecific: boolean,
	langCode?: string,
	langLabel?: string
}

const columns = [
	{ id: 'name', label: 'Icon name', minWidth: '50%' },
	{ id: 'lang', label: 'Language' },
	{ id: 'ltr', label: 'LTR icon' },
	{ id: 'rtl', label: 'RTL icon' }
];

const displayIcons : DisplayIcon[] = [];
for ( const iconName in allIcons ) {
	const icon = allIcons[ iconName as keyof typeof allIcons ];
	// Some of the exports are utility functions, filter those out
	if ( typeof icon === 'function' ) {
		continue;
	}
	if ( typeof icon !== 'string' && ( 'langCodeMap' in icon || 'shouldFlipExceptions' in icon ) ) {
		const langCodes = 'langCodeMap' in icon ? Object.keys( icon.langCodeMap ) : icon.shouldFlipExceptions ?? [];
		for ( const langCode of langCodes ) {
			displayIcons.push( {
				iconName,
				icon,
				dirSpecific: false,
				langCode,
				langLabel: langCode
			} );
		}
		displayIcons.push( {
			iconName,
			icon,
			dirSpecific: 'ltr' in icon,
			langLabel: 'other'
		} );
	} else {
		displayIcons.push( {
			iconName,
			icon,
			dirSpecific: typeof icon !== 'string' && 'ltr' in icon
		} );
	}
}

function getIconId( iconData: DisplayIcon ) {
	let iconId = iconData.iconName;
	// Add language-specific variant if needed.
	iconId += ( 'langCode' in iconData ) ? `-${ iconData.langCode }` : '';
	return iconId;
}

const searchInputValue = ref( '' );
const filteredIcons = computed( () => displayIcons.filter(
	( displayIcon ) => displayIcon.iconName.toLowerCase().includes( searchInputValue.value )
) );
</script>

<style lang="less">
.cdx-docs-all-icons-table {
	td[ dir ] {
		text-align: center;
	}

	&__anchor-link {
		// Account for the fixed header.
		padding-top: var( --vp-nav-height );

		// Taller header on larger screens.
		@media screen and ( min-width: 960px ) {
			padding-top: calc( var( --vp-nav-height ) + var( --spacing-75 ) );
		}
	}
}
</style>
