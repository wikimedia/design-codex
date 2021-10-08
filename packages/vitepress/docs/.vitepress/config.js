module.exports = {
	lang: 'en-US',
	title: 'Codex',
	description: 'Toolkit for building user interfaces within the Wikimedia Design System',

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
					]
				},
				{
					text: 'Design Tokens',
					children: [
						{ text: 'Introduction', link: '/design-tokens/introduction' }
					]
				},
				{
					text: 'Components',
					children: [
						{ text: 'Button', link: '/components/button' }
					]
				},
				{
					text: 'ADRs',
					children: [
						{ text: 'Introduction', link: '/adrs/introduction' }
					]
				}
			]
		}
	}
}
