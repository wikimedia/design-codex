import { shallowMount } from '@vue/test-utils';
import { Icon, cdxIconMapPin } from '@wikimedia/codex-icons';
import CdxLabel from './Label.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		labelText: string,
		props: {
			icon?: Icon,
			optionalFlag?: string,
			visuallyHidden?: boolean,
			isLegend?: boolean,
			inputId?: string,
			descriptionId?: string,
			disabled?: boolean
		},
		description?: string
	];
	const cases: Case[] = [
		[ 'Default', 'Label text', {} ],
		[ 'With icon', 'Label text', { icon: cdxIconMapPin } ],
		[ 'With optional flag', 'Label text', { optionalFlag: '(optional)' } ],
		[ 'With visually hidden label', 'Label text', { visuallyHidden: true } ],
		[ 'As legend', 'Label text', { isLegend: true } ],
		[ 'With input ID', 'Label text', { inputId: 'my-input-123' } ],
		[ 'Disabled', 'Label text', { disabled: true } ],
		[ 'With description and description ID', 'Label text', { descriptionId: 'my-description-123' }, 'Description text' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, labelText, props, description = undefined ) => {
		const wrapper = shallowMount( CdxLabel, { props, slots: {
			default: labelText,
			...( description === undefined ? {} : { description } )
		} } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
