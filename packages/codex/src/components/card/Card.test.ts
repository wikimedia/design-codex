import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import CdxCard from './Card.vue';
import { cdxIconUserAvatar, Icon } from '@wikimedia/codex-icons';
import { Thumbnail } from '../../types';

const testThumbnail: Thumbnail = {
	url: 'https://example.org/test/thumbnail.jpg'
};

const CardWithDynamicDescriptionSlot = defineComponent( {
	props: {
		passDescription: {
			type: Boolean,
			default: false
		}
	},
	components: { CdxCard },
	template: `
		<div>
			<cdx-card>
				<template #title>Card title</template>
				<template v-if="passDescription" #description>Description</template>
			</cdx-card>
		</div>
	`
} );

describe( 'Card', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			title: string,
			description?: string,
			supportingText?: string,
			icon?: Icon,
			thumbnail?: Thumbnail,
			forceThumbnail?: boolean,
			customPlaceholderIcon?: Icon,
			url?: string
		];

		const cases: Case[] = [
			[ 'Card with title and description', 'Title', 'Description' ],
			[ 'Card with supporting text', 'Title', 'Description', 'Supporting text' ],
			[ 'Card with icon', 'Title', '', '', cdxIconUserAvatar ],
			// Note that the thumbnail won't actually display since it never loads, so we can expect
			// to see the placeholder icon instead, but we need to test that the Thumbnail component
			// is used when a `thumbnail` prop is provided.
			[ 'Card with thumbnail', 'Title', '', '', undefined, testThumbnail ],
			[ 'Card with thumbnail placeholder', 'Title', '', '', undefined, undefined, true ],
			[ 'Card with custom placeholder icon', 'Title', '', '', undefined, undefined, true, cdxIconUserAvatar ],
			[ 'Card with link', 'Title', '', '', undefined, undefined, false, undefined, 'https://example.com' ]
		];

		test.each( cases )(
			'Case %# %s: (%p) => HTML',
			(
				_,
				title,
				description = undefined,
				supportingText = undefined,
				icon = undefined,
				thumbnail = undefined,
				forceThumbnail = false,
				customPlaceholderIcon = undefined,
				url = ''
			) => {
				const slots: { title: string, description?: string, [ 'supporting-text' ]?: string } = {
					title
				};
				if ( description ) {
					slots.description = description;
				}
				if ( supportingText ) {
					slots[ 'supporting-text' ] = supportingText;
				}

				const wrapper = mount( CdxCard, {
					props: { icon, thumbnail, forceThumbnail, customPlaceholderIcon, url },
					slots
				} );
				expect( wrapper.element ).toMatchSnapshot();
			} );
	} );

	describe( 'when a Card is title-only, then the description slot becomes populated', () => {
		it( 'removes the `cdx-card--title-only` class', async () => {
			const wrapper = mount( CardWithDynamicDescriptionSlot );
			expect( wrapper.findComponent( CdxCard ).element.classList ).toContain( 'cdx-card--title-only' );

			await wrapper.setProps( { passDescription: true } );
			expect( wrapper.findComponent( CdxCard ).element.classList ).not.toContain( 'cdx-card--title-only' );
		} );
	} );

	describe( 'when a Card is not title-only, then the description slot is removed', () => {
		it( 'adds the `cdx-card--title-only` class', async () => {
			const wrapper = mount( CardWithDynamicDescriptionSlot, {
				props: { passDescription: true }
			} );
			expect( wrapper.findComponent( CdxCard ).element.classList ).not.toContain( 'cdx-card--title-only' );

			await wrapper.setProps( { passDescription: false } );
			expect( wrapper.findComponent( CdxCard ).element.classList ).toContain( 'cdx-card--title-only' );
		} );
	} );
} );
