import { defineConfig, DefaultTheme } from 'vitepress';
import { existsSync } from 'fs';
import path from 'path';

const includeWIPComponents = process.env.CODEX_RELEASE === undefined;

function isWIPComponent( componentName: string ): boolean {
	return existsSync( path.join( __dirname, '/../../../codex/src/components-wip/', componentName ) );
}

/**
 * In release mode, filter out components that are in development. In
 * non-release mode, don't filter them out, but add a construction emoji
 * "🚧" to their description.
 *
 * @param items Array of sidebar items representing components
 * @return Filtered or modified array of sidebar items
 */
function filterComponents( items: DefaultTheme.SidebarItem[] ): DefaultTheme.SidebarItem[] {
	return items.flatMap( ( item ) => {
		const componentName = ( item.link ?? '' ).match( /^\/components\/([^\/]+)/ )?.[ 1 ];
		if ( componentName && isWIPComponent( componentName ) ) {
			return includeWIPComponents ?
				{ ...item, text: `${item.text} 🚧` } :
				[];
		}
		return item;
	} );
}

export default defineConfig( {
	lang: 'en-US',
	title: 'Codex',
	description: 'Toolkit for building user interfaces within the Wikimedia Design System',
	base: process.env.CODEX_DOC_ROOT || '/',
	// Disable dark mode.
	appearance: false,

	markdown: {
		theme: 'dracula'
	},

	themeConfig: {
		logo: '/logo-Wikimedia.svg',

		nav: [
			{ text: 'GitHub', link: 'https://github.com/wikimedia/design-codex' }
		],

		sidebar: {
			'/': [
				{
					text: 'Introduction',
					items: [
						{ text: 'About', link: '/' },
						{ text: 'Usage', link: '/introduction/usage' },
						{ text: 'Packages', link: '/introduction/packages' }
					]
				},
				{
					text: 'Contributing',
					items: [
						{ text: 'Guidelines', link: '/contributing/guidelines' },
						{ text: 'Designing components', link: '/contributing/designing-components' },
						{ text: 'Contributing code', link: '/contributing/contributing-code' },
						{ text: 'Working with TypeScript', link: '/contributing/typescript' }
					]
				},
				{
					text: 'Components',
					items: filterComponents( [
						{ text: 'Button', link: '/components/button' },
						{ text: 'ButtonGroup', link: '/components/button-group' },
						{ text: 'Card', link: '/components/card' },
						{ text: 'Checkbox', link: '/components/checkbox' },
						{ text: 'Combobox', link: '/components/combobox' },
						{ text: 'Icon', link: '/components/icon' },
						{ text: 'Lookup', link: '/components/lookup' },
						{ text: 'Menu', link: '/components/menu' },
						{ text: 'MenuItem', link: '/components/menu-item' },
						{ text: 'Message', link: '/components/message' },
						{ text: 'ProgressBar', link: '/components/progress-bar' },
						{ text: 'Radio', link: '/components/radio' },
						{ text: 'SearchInput', link: '/components/search-input' },
						{ text: 'Select', link: '/components/select' },
						{ text: 'Tab', link: '/components/tab' },
						{ text: 'Tabs', link: '/components/tabs' },
						{ text: 'TextInput', link: '/components/text-input' },
						{ text: 'Thumbnail', link: '/components/thumbnail' },
						{ text: 'ToggleButton', link: '/components/toggle-button' },
						{ text: 'ToggleButtonGroup', link: '/components/toggle-button-group' },
						{ text: 'ToggleSwitch', link: '/components/toggle-switch' },
						{ text: 'TypeaheadSearch', link: '/components/typeahead-search' }
					] )
				},
				{
					text: 'Icons',
					items: [
						{ text: 'Overview', link: '/icons/overview' },
						{ text: 'List of all icons', link: '/icons/all-icons' },
						{ text: 'Adding new icons', link: '/icons/adding-new' }
					]
				},
				{
					text: 'Design Tokens',
					items: [
						{ text: 'Overview', link: '/design-tokens/overview' },
						{ text: 'Animation', link: '/design-tokens/animation' },
						{ text: 'Border', link: '/design-tokens/border' },
						{ text: 'Box-shadow', link: '/design-tokens/box-shadow' },
						{ text: 'Box-sizing', link: '/design-tokens/box-sizing' },
						{ text: 'Breakpoint', link: '/design-tokens/breakpoint' },
						{ text: 'Color', link: '/design-tokens/color' },
						{ text: 'Cursor', link: '/design-tokens/cursor' },
						{ text: 'Font', link: '/design-tokens/font' },
						{ text: 'Opacity', link: '/design-tokens/opacity' },
						{ text: 'Outline', link: '/design-tokens/outline' },
						{ text: 'Padding', link: '/design-tokens/padding' },
						{ text: 'Position', link: '/design-tokens/position' },
						{ text: 'Size', link: '/design-tokens/size' },
						{ text: 'Spacing', link: '/design-tokens/spacing' },
						{ text: 'Transition', link: '/design-tokens/transition' },
						{ text: 'Z-Index', link: '/design-tokens/z-index' }
					]
				},
				{
					text: 'Decisions – ADRs',
					items: [
						{ text: 'Overview', link: '/adrs/overview' },
						{ text: 'ADR 1 - Design Tokens', link: '/adrs/01-adr-design-tokens' },
						{ text: 'ADR 2 - Demo tool', link: '/adrs/02-adr-demo-tool' },
						{ text: 'ADR 3 - String types in TypeScript', link: '/adrs/03-adr-string-types' }
					]
				}
			]
		}
	}
} );
