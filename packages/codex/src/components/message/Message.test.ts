import { mount } from '@vue/test-utils';
import { Icon, cdxIconArticle } from '@wikimedia/codex-icons';
import { MessageType } from '../../types';
import { MessageTypes } from '../../constants';
import CdxMessage from './Message.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			type?: MessageType,
			inline?: boolean,
			dismissButtonLabel?: string,
			icon?: Icon
		},
		slot: string
	];

	const cases: Case[] = [
		[ 'Default props', {}, '<p>Message content</p>' ],
		// A snapshot for each message type.
		...MessageTypes.map( ( type ) : Case => [
			`${type} message`,
			{ type },
			'<p>Message content</p>'
		] ),
		[ 'Inline', { inline: true }, '<p>Message content</p>' ],
		[ 'Dismissable', { dismissButtonLabel: 'Close' }, '<p>Message content</p>' ],
		[ 'Custom icon', { icon: cdxIconArticle }, '<p>Message content</p>' ]

	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const wrapper = mount( CdxMessage, { props: props, slots: { default: slot } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'handles dismissal', () => {
	const wrapper = mount( CdxMessage, { props: { dismissButtonLabel: 'Close' } } );
	wrapper.get( 'button' ).trigger( 'click' );
	expect( wrapper.emitted().dismissed ).toBeTruthy();
	expect( wrapper.vm.dismissed ).toBeTruthy();
} );
