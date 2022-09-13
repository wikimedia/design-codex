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
		logo: {
			src: '/logo-Wikimedia.svg', alt: 'Wikimedia'
		},

		nav: [
			{ text: 'Using Codex', link: '/using-codex/about', activeMatch: '/using-codex/' },
			{ text: 'Contributing', link: '/contributing/overview', activeMatch: '/contributing/' },
			{ text: 'Design Tokens', link: '/design-tokens/overview', activeMatch: '/design-tokens/' },
			// TODO: change this link to '/components/overview' once that page exists.
			{ text: 'Components', link: '/components/button', activeMatch: '/components/' },
			{ text: 'Icons', link: '/icons/overview', activeMatch: '/icons/' },
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/wikimedia/design-codex' }
		],

		sidebar: {
			'/using-codex/': [
				{
					text: 'Using Codex',
					items: [
						{ text: 'About Codex', link: '/using-codex/about' },
					]
				},
				// {
				// 	text: 'Designing',
				// 	items: [
				// 		{ text: 'Design principles', link: '/using-codex/design-principles' },
				// 		{ text: 'Design resources', link: '/using-codex/design-resources' },
				// 	]
				// },
				{
					text: 'Developing',
					items: [
						{ text: 'Usage', link: '/using-codex/usage' },
						{ text: 'Packages', link: '/using-codex/packages' }
					]
				},
				{

					text: 'Decisions – ADRs',
					items: [
						{ text: 'Overview', link: '/using-codex/adrs/overview' },
						{ text: 'ADR 1 - Design Tokens', link: '/using-codex/adrs/01-adr-design-tokens' },
						{ text: 'ADR 2 - Demo tool', link: '/using-codex/adrs/02-adr-demo-tool' },
						{ text: 'ADR 3 - String types in TypeScript', link: '/using-codex/adrs/03-adr-string-types' },
						{ text: 'ADR 4 - Visual Styles as Less Mixins', link: '/using-codex/adrs/04-adr-less-mixins' }
					]
				}
			],
			'/contributing/': [
				{
					text: 'Contributing',
					items: [
						{ text: 'Overview', link: '/contributing/overview' },
						// { text: 'Contribution workflow', link: '/contributing/contribution-workflow' },
					]
				},
				// {
				// 	text: 'Contributing design',
				// 	items: [
				// 		{ text: 'Designing tokens', link: '/contributing/contributing-code' },
				// 		{ text: 'Designing components', link: '/contributing/contributing-code' },
				// 		{ text: 'Designing icons', link: '/contributing/contributing-code' }
				// 	]
				// },
				{
					text: 'Contributing code',
					items: [
						{ text: 'Introduction', link: '/contributing/contributing-code/introduction' },
						{ text: 'Developing components', link: '/contributing/contributing-code/developing-components' },
						{ text: 'Testing components', link: '/contributing/contributing-code/testing-components' },
						{ text: 'Component demos', link: '/contributing/contributing-code/component-demos' },
						{ text: 'Working with TypeScript', link: '/contributing/contributing-code/typescript' }
					]
				}
			],
			'/design-tokens/': [
				{
					text: 'Design Tokens',
					items: [
						{ text: 'Overview', link: '/design-tokens/overview' }
					]
				},
				{
					text: '',
					items: [
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
				}
			],
			'/components/': [
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
						{ text: 'Tabs', link: '/components/tabs' },
						{ text: 'Tab', link: '/components/tab' },
						{ text: 'TextInput', link: '/components/text-input' },
						{ text: 'Thumbnail', link: '/components/thumbnail' },
						{ text: 'ToggleButton', link: '/components/toggle-button' },
						{ text: 'ToggleButtonGroup', link: '/components/toggle-button-group' },
						{ text: 'ToggleSwitch', link: '/components/toggle-switch' },
						{ text: 'TypeaheadSearch', link: '/components/typeahead-search' }
					] )

				}
			],
			'/icons/': [
				{
					text: 'Icons',
					items: [
						{ text: 'Overview', link: '/icons/overview' },
						{ text: 'List of all icons', link: '/icons/all-icons' },
						{ text: 'Adding new icons', link: '/icons/adding-new' }
					]
				}
			]
		}
	}
} );
