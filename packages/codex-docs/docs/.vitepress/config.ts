import { defineConfigWithTheme, DefaultTheme } from 'vitepress';
import { existsSync } from 'fs';
import path from 'path';
import { CustomConfig } from './types';

// If this isn't a tag, branch deploy, or local dev, we're on the main branch. We'll pass this var
// to the theme config so we can use it to display a message.
const isMainBranch = process.env.CODEX_RELEASE === undefined &&
	process.env.CODEX_BRANCH_DEPLOY === undefined &&
	process.env.CODEX_DOC_DEV === undefined;
// If this is a branch deploy, we'll pass this var and the patch ID to the theme config so we can
// show a warning message linking to the patch.
const isBranchDeploy = process.env.CODEX_BRANCH_DEPLOY !== undefined;
const patchID = process.env.CODEX_PATCH_ID;

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
		const componentName = ( item.link ?? '' ).match( /^\/components\/(demos|directives)\/([^/]+)/ )?.[ 2 ];
		if ( componentName && isWIPComponent( componentName ) ) {
			return includeWIPComponents ?
				{ ...item, text: `${ item.text ?? '' } 🚧` } :
				[];
		}
		return item;
	} );
}

export default defineConfigWithTheme<CustomConfig>( {
	lang: 'en-US',
	// Tell VitePress not to set dir="ltr" on the <html> tag, as this breaks our
	// bidi hacks. We can't remove the dir attribute entirely, but setting it to
	// "auto" is good enough.
	dir: 'auto',
	title: 'Codex',
	description: 'Design system for Wikimedia',
	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
	base: process.env.CODEX_DOC_ROOT || '/',
	// Don't show the color mode switcher; we add our own in CustomLayout.vue.
	appearance: false,

	head: [
		[ 'link', { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon', sizes: '32x32' } ],
		[ 'link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' } ],
		[ 'link', { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png' } ]
	],

	markdown: {
		theme: 'dracula'
	},

	themeConfig: {
		isMainBranch,
		isBranchDeploy,
		patchID,

		logo: {
			light: '/logo-Codex-small.svg',
			dark: '/logo-Codex-small-inverted.svg',
			alt: 'Codex'
		},

		nav: [
			{ text: 'Using Codex', link: '/using-codex/accessing-codex', activeMatch: '/using-codex/' },
			{ text: 'Contributing', link: '/contributing/overview', activeMatch: '/contributing/' },
			{ text: 'Style Guide', link: '/style-guide/overview', activeMatch: '/style-guide/' },
			{ text: 'Toolkit', items: [
				{ text: 'Design Tokens', link: '/design-tokens/overview', activeMatch: '/design-tokens/' },
				{ text: 'Components', link: '/components/overview', activeMatch: '/components/' },
				{ text: 'Icons', link: '/icons/overview', activeMatch: '/icons/' },
				{ text: 'Composables', link: '/composables/overview', activeMatch: '/composables/' }
			] }
		],

		socialLinks: [
			// `as DefaultTheme.SocialLink` is needed because the type information from VitePress
			// doesn't include the ariaLabel property
			// Note: If we add more social links, we should undo the customization done for
			// T345982, which hides a flyout menu for social links on medium-size screens.
			{ icon: 'github', link: 'https://github.com/wikimedia/design-codex', ariaLabel: 'Codex on GitHub' } as DefaultTheme.SocialLink
		],

		search: {
			provider: 'local',
			options: {
				miniSearch: {
					searchOptions: {
						fuzzy: 0.2,
						prefix: true,
						boost: {
							title: 50,
							text: 2,
							titles: 1
						}
					}
				}
			}
		},

		sidebar: {
			'/using-codex/': [
				{
					text: 'Using Codex',
					items: [
						{ text: 'Accessing Codex', link: '/using-codex/accessing-codex' },
						{ text: 'Designing with Codex', link: '/using-codex/designing' },
						{ text: 'Developing with Codex', link: '/using-codex/developing' },
						{ text: 'Guiding principles', link: 'using-codex/guiding-principles' },
						{ text: 'Architecture decisions', link: '/using-codex/adrs/overview' },
						{ text: 'Contact', link: '/using-codex/contact' }
					]
				}
			],
			'/contributing/': [
				{
					text: 'Getting started',
					items: [
						{ text: 'How to contribute', link: '/contributing/overview' },
						{ text: 'Design basics', link: '/contributing/design-basics' },
						{ text: 'Development basics', link: '/contributing/development-basics' }
					]
				},
				{
					text: 'Contributions',
					items: [
						{ text: 'Documentation', link: '/contributing/contributing-documentation' },
						{ text: 'Design Tokens', link: '/contributing/contributing-tokens' },
						{ text: 'Icons', link: '/contributing/contributing-icons' },
						{
							text: 'Components',
							link: '/contributing/contributing-components',
							items: [
								{ text: 'Reporting and validating', link: '/contributing/reporting-and-validating' },
								{ text: 'Designing components', link: '/contributing/designing-components' },
								{ text: 'Developing components', link: '/contributing/developing-components' },
								{ text: 'Testing components', link: '/contributing/testing-components' },
								{ text: 'Component demos', link: '/contributing/component-demos' },
								{ text: 'Working with TypeScript', link: '/contributing/typescript' },
								{ text: 'Reviewing and documenting', link: '/contributing/reviewing-and-documenting' }
							]
						}
					]
				}
			],
			'/style-guide/': [
				{
					text: 'Style Guide',
					items: [
						{ text: 'Overview', link: '/style-guide/overview' },
						{ text: 'Statement of Purpose', link: '/style-guide/statement-of-purpose' }
					]
				},
				{
					text: 'Design Principles',
					items: [
						{ text: 'Overview', link: '/style-guide/design-principles-overview' },
						{ text: 'Accessibility', link: '/style-guide/accessibility' },
						{ text: 'Bidirectionality', link: '/style-guide/bidirectionality' }
					]
				},
				{
					text: 'Visual Styles',
					items: [
						{ text: 'Colors', link: '/style-guide/colors' },
						{ text: 'Typography', link: '/style-guide/typography' },
						{ text: 'Icons', link: '/style-guide/icons' },
						{ text: 'Images', link: '/style-guide/images' },
						{ text: 'Illustrations', link: '/style-guide/illustrations' },
						{ text: 'Data visualization', link: '/style-guide/data-visualization' }
					]
				},
				{
					text: 'Layout Guidelines',
					items: [
						{ text: 'Content overflow', link: '/style-guide/content-overflow' },
						{ text: 'Using links and buttons', link: '/style-guide/using-links-and-buttons' },
						{ text: 'Constructing forms', link: '/style-guide/constructing-forms' }
					]
				},
				{
					text: 'Content Guidelines',
					items: [
						{ text: 'Voice and tone', link: '/style-guide/voice-and-tone' },
						{ text: 'Writing for copy', link: '/style-guide/writing-for-copy' },
						{ text: 'Additional resources', link: '/style-guide/additional-resources' }
					]
				},
				{
					text: 'Platforms',
					items: [
						{ text: 'Wikipedia Apps', link: '/style-guide/wikipedia-apps' }
					]
				}
			],
			'/design-tokens/': [
				{
					text: 'Design Tokens',
					items: [
						{ text: 'Overview', link: '/design-tokens/overview' },
						{ text: 'Definition and structure', link: '/design-tokens/definition-and-structure' }
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
					items: [
						{ text: 'Overview', link: '/components/overview' },
						{ text: 'Types and constants', link: '/components/types-and-constants' }
					]
				},
				{
					text: '',
					items: [
						{
							text: 'Buttons',
							collapsed: true,
							items: filterComponents( [
								{ text: 'Button', link: '/components/demos/button' },
								{ text: 'ButtonGroup', link: '/components/demos/button-group' },
								{ text: 'MenuButton', link: '/components/demos/menu-button' },
								{ text: 'ToggleButton', link: '/components/demos/toggle-button' },
								{ text: 'ToggleButtonGroup', link: '/components/demos/toggle-button-group' }
							] )
						},
						{
							text: 'Form elements',
							collapsed: true,
							items: filterComponents( [
								{ text: 'Checkbox', link: '/components/demos/checkbox' },
								{ text: 'ChipInput', link: '/components/demos/chip-input' },
								{ text: 'Combobox', link: '/components/demos/combobox' },
								{ text: 'Field', link: '/components/demos/field' },
								{ text: 'Label', link: '/components/demos/label' },
								{ text: 'Lookup', link: '/components/demos/lookup' },
								{ text: 'MultiselectLookup', link: '/components/demos/multiselect-lookup' },
								{ text: 'Radio', link: '/components/demos/radio' },
								{ text: 'Select', link: '/components/demos/select' },
								{ text: 'TextArea', link: '/components/demos/text-area' },
								{ text: 'TextInput', link: '/components/demos/text-input' },
								{ text: 'ToggleSwitch', link: '/components/demos/toggle-switch' }
							] )
						},
						{
							text: 'Content & data',
							collapsed: true,
							items: filterComponents( [
								{ text: 'Accordion', link: '/components/demos/accordion' },
								{ text: 'Container', link: '/components/demos/container' },
								{ text: 'Card', link: '/components/demos/card' },
								{ text: 'Dialog', link: '/components/demos/dialog' },
								{ text: 'Menu', link: '/components/demos/menu' },
								{ text: 'MenuItem', link: '/components/demos/menu-item' },
								{ text: 'Popover', link: '/components/demos/popover' },
								{ text: 'Table', link: '/components/demos/table' },
								{ text: 'Tooltip', link: '/components/directives/tooltip' }
							] )
						},
						{
							text: 'Feedback',
							collapsed: true,
							items: filterComponents( [
								{ text: 'InfoChip', link: '/components/demos/info-chip' },
								{ text: 'Message', link: '/components/demos/message' },
								{ text: 'ProgressBar', link: '/components/demos/progress-bar' },
								{ text: 'ProgressIndicator', link: '/components/demos/progress-indicator' }
								// Skeleton
								// Toast
							] )
						},
						{
							text: 'Media',
							collapsed: true,
							items: filterComponents( [
								// Figure
								{ text: 'Icon', link: '/components/demos/icon' },
								{ text: 'Image', link: '/components/demos/image' },
								{ text: 'Thumbnail', link: '/components/demos/thumbnail' }
							] )
						},
						// Layout with Container and Divider
						{
							text: 'Navigation',
							collapsed: true,
							items: filterComponents( [
								{ text: 'Link', link: '/components/mixins/link' },
								{ text: 'Tabs', link: '/components/demos/tabs' },
								{ text: 'Tab', link: '/components/demos/tab' }
							] )
						},
						{
							text: 'Search',
							collapsed: true,
							items: filterComponents( [
								{ text: 'SearchInput', link: '/components/demos/search-input' },
								{ text: 'TypeaheadSearch', link: '/components/demos/typeahead-search' }
							] )
						}
					]
				}
			],
			'/icons/': [
				{
					text: 'Icons',
					items: [
						{ text: 'Overview', link: '/icons/overview' },
						{ text: 'List of all icons', link: '/icons/all-icons' }
					]
				}
			],
			'/composables/': [
				{
					text: 'Composables',
					items: [
						{ text: 'Overview', link: '/composables/overview' }
					]
				},
				{
					text: '',
					items: [
						{ text: 'useComputedDirection', link: '/composables/demos/use-computed-direction' },
						{ text: 'useComputedLanguage', link: '/composables/demos/use-computed-language' },
						{ text: 'useFloatingMenu', link: '/composables/demos/use-floating-menu' },
						{ text: 'useIntersectionObserver', link: '/composables/demos/use-intersection-observer' },
						{ text: 'useModelWrapper', link: '/composables/demos/use-model-wrapper' },
						{ text: 'useResizeObserver', link: '/composables/demos/use-resize-observer' }
					]
				}
			]
		}
	}
} );
