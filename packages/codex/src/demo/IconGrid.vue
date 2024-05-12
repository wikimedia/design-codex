<template>
	<demo-base-layout class="cdx-icon-grid">
		<template #header>
			Codex Icon Grid
		</template>
		<template #content>
			<section id="cdx-icon">
				<h2>Icon</h2>
				<table class="cdx-demo-icon-table">
					<caption>All icons</caption>
					<tr>
						<th>Icon name (language)</th>
						<th colspan="4">
							Default size, default color
						</th>
						<th colspan="4">
							Medium size, red color
						</th>
						<th colspan="4">
							Small size, default color
						</th>
						<th colspan="4">
							Extra small size, blue color
						</th>
					</tr>
					<tr>
						<th aria-hidden="true" />
						<th>Vue LTR</th>
						<th>Vue RTL</th>
						<th>CSS-only LTR</th>
						<th>CSS-only RTL</th>
						<th>Vue LTR</th>
						<th>Vue RTL</th>
						<th>CSS-only LTR</th>
						<th>CSS-only RTL</th>
						<th>Vue LTR</th>
						<th>Vue RTL</th>
						<th>CSS-only LTR</th>
						<th>CSS-only RTL</th>
						<th>Vue LTR</th>
						<th>Vue RTL</th>
						<th>CSS-only LTR</th>
						<th>CSS-only RTL</th>
					</tr>
					<tr v-for="iconData in displayIcons" :key="iconData.iconName">
						<th>
							{{ iconData.iconName }}
							<template v-if="iconData.langLabel">
								({{ iconData.langLabel }})
							</template>
						</th>
						<!-- eslint-disable max-len -->
						<template v-for="{ size, color } in sizesAndColors" :key="`${size}-${color}`">
							<td v-for="dir in directions" :key="dir">
								<cdx-icon
									:class="{ [ `cdx-demo-icon-vue-icon--color-${color}` ]: !!color } "
									:icon="iconData.icon"
									:lang="iconData.langCode"
									:dir="dir"
									:size="size"
								/>
							</td>
							<td
								v-for="dir in directions"
								:key="dir"
								:lang="iconData.langCode"
							>
								<span :class="`cdx-demo-icon-css-icon--${iconData.cssIconName}${size ? `--size-${size}` : ''}${color ? `--color-${color}` : ''}`" :dir="dir" />
							</td>
						</template>
						<!-- eslint-enable max-len -->
					</tr>
				</table>
			</section>
		</template>
	</demo-base-layout>
</template>

<script lang="ts" setup>
import { CdxIcon, HTMLDirection, IconSize } from '../lib';
import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';
import DemoBaseLayout from './DemoBaseLayout.vue';

const directions: HTMLDirection[] = [ 'ltr', 'rtl' ];

const sizesAndColors: { size?: IconSize, color?: string }[] = [
	{},
	{ size: 'medium', color: 'red' },
	{ size: 'small' },
	{ size: 'x-small', color: 'blue' }
];

// TODO most of this is copied from AllIcons.vue in the docs package; it would be nice to find a way
// to deduplicate this
const displayIcons : {
	iconName: string,
	cssIconName: string,
	icon: Icon,
	langCode?: string,
	langLabel?: string
}[] = [];
for ( const iconName in allIcons ) {
	const icon = allIcons[ iconName as keyof typeof allIcons ];
	// Some of the exports are utility functions, filter those out
	if ( typeof icon === 'function' ) {
		continue;
	}
	const cssIconName = iconName
		.replace( /^cdxIcon/, '' )
		.replace( /[A-Z]/g, ( letter ) => `-${ letter.toLowerCase() }` )
		.replace( /^-/, '' );

	if ( typeof icon !== 'string' && ( 'langCodeMap' in icon || 'shouldFlipExceptions' in icon ) ) {
		const langCodes = 'langCodeMap' in icon ? Object.keys( icon.langCodeMap ) : icon.shouldFlipExceptions ?? [];
		for ( const langCode of langCodes ) {
			displayIcons.push( {
				iconName,
				cssIconName,
				icon,
				langCode,
				langLabel: langCode
			} );
		}
		displayIcons.push( {
			iconName,
			cssIconName,
			icon,
			langLabel: 'other'
		} );
	} else {
		displayIcons.push( {
			iconName,
			cssIconName,
			icon
		} );
	}
}
</script>

<style lang="less">
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/public/css-icon.less';

.cdx-demo-icon {
	&-table {
		th {
			font-weight: @font-weight-normal;

			&:first-child {
				text-align: left;
			}
		}

		td {
			text-align: center;
		}
	}

	&-vue-icon {
		&--color-red {
			color: @color-destructive;
		}

		&--color-blue {
			color: @color-progressive;
		}
	}

	each( @codexIconNames, {
		@icon-name-selector: replace( @value, '^cdx-icon-', '' );
		&-css-icon--@{icon-name-selector} {
			.cdx-mixin-css-icon( @@value );

			&--size-medium--color-red {
				.cdx-mixin-css-icon( @@value, @color-destructive, @size-icon-medium );
			}

			&--size-small {
				.cdx-mixin-css-icon( @@value, @param-size-icon: @size-icon-small );
			}

			&--size-x-small--color-blue {
				.cdx-mixin-css-icon( @@value, @color-progressive, @size-icon-x-small );
			}
		}
	} );
}

</style>
