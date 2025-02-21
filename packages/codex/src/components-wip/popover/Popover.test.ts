import { mount, config, shallowMount } from '@vue/test-utils';
import CdxPopover from './Popover.vue';
import { cdxIconInfoFilled, Icon } from '@wikimedia/codex-icons';
import { ModalAction, PrimaryModalAction, PositionConfig } from '../../types';
import CdxToggleButton from '../../components/toggle-button/ToggleButton.vue';

describe( 'Popover', () => {
	// Ignore all "teleport" behavior for the purpose of testing Popover.
	// Refer to https://test-utils.vuejs.org/guide/advanced/teleport.html
	config.global.stubs = {
		teleport: true
	};

	const toggleButton = shallowMount( CdxToggleButton, {
		props: { modelValue: false },
		attachTo: 'body'
	} );

	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				title?: string,
				icon?: Icon,
				useCloseButton?: boolean,
				closeButtonLabel?: string,
				primaryAction?: PrimaryModalAction,
				defaultAction?: ModalAction,
				stackedActions?: boolean,
				target?: string,
				renderInPlace?: boolean,
				positionConfig?: PositionConfig
			},
			slots?: {
				header?: string,
				footer?: string
			}
		];
		const cases: Case[] = [
			[ 'Basic usage', {} ],
			[ 'With title', { title: 'Popover title' } ],
			[ 'With icon', { icon: cdxIconInfoFilled } ],
			[ 'With close button', { useCloseButton: true } ],
			[ 'With custom close button label', { useCloseButton: true, closeButtonLabel: 'Dismiss' } ],
			[ 'With primary action', { primaryAction: { label: 'Save', actionType: 'progressive' } } ],
			[ 'With default action', { defaultAction: { label: 'Cancel' } } ],
			[ 'With stacked actions', {
				primaryAction: { label: 'Save', actionType: 'progressive' },
				defaultAction: { label: 'Cancel' },
				stackedActions: true
			} ],
			[ 'With header and footer slots', {}, { header: 'Custom header text', footer: 'Custom footer text' } ]
		];

		test.each( cases )( 'Case %# %s', ( _, props, slots = {} ) => {
			const wrapper = mount( CdxPopover, {
				props: {
					anchor: toggleButton.vm.$el,
					renderInPlace: true, open: true,
					...props
				},
				slots: {
					default: 'Popover body content',
					...( slots.header === undefined ? {} : { header: slots.header } ),
					...( slots.footer === undefined ? {} : { footer: slots.footer } )
				}
			} );

			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );
} );
