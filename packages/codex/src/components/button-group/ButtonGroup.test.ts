import { shallowMount } from '@vue/test-utils';
import { cdxIconEdit, cdxIconSpeechBubble, cdxIconCheck, cdxIconTrash } from '@wikimedia/codex-icons';
import { ButtonGroupItem } from '../../types';
import CdxButtonGroup from './ButtonGroup.vue';
import CdxButton from '../button/Button.vue';

describe( 'ButtonGroup', () => {
	const simpleButtons = [
		{ value: 1, label: 'One' },
		{ value: 2, label: 'Two' },
		{ value: 3, label: 'Three', disabled: true },
		{ value: 4, label: 'Four' }
	];

	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				buttons: ButtonGroupItem[],
				disabled?: boolean,
			},
			slots?: Record<string, string>
		];

		const cases: Case[] = [
			[
				'Simple',
				{ buttons: simpleButtons }
			],
			[
				'Disabled',
				{ buttons: simpleButtons, disabled: true }
			],
			[
				'With icons',
				{ buttons: [
					{ value: 1, label: 'One', icon: cdxIconEdit },
					{ value: 2, label: 'Two', icon: cdxIconSpeechBubble },
					{ value: 3, label: 'Three', disabled: true, icon: cdxIconCheck },
					{ value: 4, label: 'Four', icon: cdxIconTrash }
				] }
			],
			[
				'Icon-only',
				{ buttons: [
					{ value: 1, label: null, icon: cdxIconEdit, ariaLabel: 'One' },
					{ value: 2, label: null, icon: cdxIconSpeechBubble, ariaLabel: 'Two' },
					{ value: 3, label: null, disabled: true, icon: cdxIconCheck, ariaLabel: 'Three' },
					{ value: 4, label: null, icon: cdxIconTrash, ariaLabel: 'Four' }
				] }
			],
			[
				'With slot',
				{ buttons: simpleButtons },
				{
					default: '<template #default="{ button }">{{ button.label }} <em>({{ button.value }})</em></template>'
				}
			]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, { buttons, disabled = false }, slots = {} ) => {
			const wrapper = shallowMount( CdxButtonGroup, {
				props: {
					buttons,
					disabled
				},
				slots,
				global: {
					stubs: {
						CdxButton: false
					}
				}
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when a button is clicked', () => {
		it( 'emits an event', async () => {
			const wrapper = shallowMount( CdxButtonGroup, {
				props: { buttons: simpleButtons },
				global: {
					stubs: {
						CdxButton: false
					}
				}
			} );
			await wrapper.findAllComponents( CdxButton )[ 1 ].trigger( 'click' );
			expect( wrapper.emitted( 'click' ) ).toEqual( [ [ simpleButtons[ 1 ].value ] ] );
		} );
	} );
} );
