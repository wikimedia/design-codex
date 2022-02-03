<template>
	<table>
		<thead>
			<tr>
				<th>Icon name</th>
				<th>Language</Th>
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
				<td dir="ltr">
					<cdx-icon :icon="iconData.icon" :lang="iconData.langCode" />
				</td>
				<td dir="rtl">
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

const displayIcons : { iconName: string, icon: Icon, langCode?: string, langLabel?: string }[] = [];
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
				langCode,
				langLabel: langCode
			} );
		}
		displayIcons.push( {
			iconName,
			icon,
			langLabel: 'other'
		} );
	} else {
		displayIcons.push( {
			iconName,
			icon
		} );
	}
}
</script>
