<template>
	<table class="cdx-docs-all-icons-table">
		<thead>
			<tr>
				<th class="cdx-docs-all-icons-table__icon-name">
					Icon name
				</th>
				<th>Language</th>
				<th>LTR icon</th>
				<th>RTL icon</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="iconData in displayIcons" :key="`${iconData.iconName}/${iconData.langCode}`">
				<td>
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
	</table>
</template>

<script setup lang="ts">
import { CdxIcon } from '@wikimedia/codex';
import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';

const displayIcons : {
	iconName: string,
	icon: Icon,
	dirSpecific: boolean,
	langCode?: string,
	langLabel?: string
}[] = [];
for ( const iconName in allIcons ) {
	const icon = allIcons[ iconName as keyof typeof allIcons ];
	// Some of the exports are utility functions, filter those out
	if ( typeof icon === 'function' ) {
		continue;
	}
	if ( typeof icon !== 'string' && ( 'langCodeMap' in icon || 'shouldFlipExceptions' in icon ) ) {
		const langCodes = 'langCodeMap' in icon ? Object.keys( icon.langCodeMap ) : icon.shouldFlipExceptions || [];
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
</script>

<style>
.cdx-docs-all-icons-table__icon-name {
	text-align: left;
}

.cdx-docs-all-icons-table td[ dir ] {
	text-align: center;
}
</style>
