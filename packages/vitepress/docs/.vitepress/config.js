module.exports = {
	lang: 'en-US',
	title: 'Codex',
	description: 'Toolkit for building user interfaces within the Wikimedia Design System',
	base: '/codex/main',

	themeConfig: {
		repo: 'wikimedia/design-codex',
		docsDir: 'vitepress/docs',
		lastUpdated: 'Last updated',

		sidebar: {
			'/': [
			 	{
					text: 'Introduction',
					children: [
						{ text: 'About', link: '/' },
						{ text: 'Getting started', link: '/introduction/getting-started' }
					]
				},
				{
					text: 'Contributing',
					children: [
						{ text: 'Guidelines', link: '/contributing/guidelines' },
						{ text: 'Designing components', link: '/contributing/designing-components' },
						{ text: 'Contributing code', link: '/contributing/contributing-code' },
						{ text: 'Working with TypeScript', link: '/contributing/typescript' }
					]
				},
				{
					text: 'Design Tokens',
					children: [
						{ text: 'Overview', link: '/design-tokens/overview' }
					]
				},
				{
					text: 'Components',
					children: [
						{ text: 'Button', link: '/components/button' },
						{ text: 'Checkbox', link: '/components/checkbox' },
						{ text: 'Icon', link: '/components/icon' },
						{ text: 'Radio', link: '/components/radio' },
						{ text: 'TextInput', link: '/components/text-input' }
					]
				},
				{
					text: 'Icons',
					children: [
						{ text: 'Overview', link: '/icons/overview' },
						{ text: 'Icon directory', link: '/icons/directory' },
						{ text: 'Adding new icons', link: '/icons/adding-new' }
					]
				},
				{
					text: 'ADRs',
					children: [
						{ text: 'Overview', link: '/adrs/overview' },
						{ text: 'ADR 1 - Design Tokens', link: '/adrs/01-adr-design-tokens' },
						{ text: 'ADR 2 - Demo tool', link: '/adrs/02-adr-demo-tool' },
						{ text: 'ADR 3 - String types in TypeScript', link: '/adrs/03-adr-string-types' }
					]
				}
			]
		}
	}
}
