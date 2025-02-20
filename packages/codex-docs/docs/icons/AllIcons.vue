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
	</table>
</template>

<script setup lang="ts">
import { CdxIcon } from '@wikimedia/codex';
import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';

interface DisplayIcon {
	iconName: string,
	icon: Icon,
	dirSpecific: boolean,
	langCode?: string,
	langLabel?: string
}

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
</script>

<style lang="less">
.cdx-docs-all-icons-table {
	td[ dir ] {
		text-align: center;
	}

	&__icon-name {
		text-align: left;
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
