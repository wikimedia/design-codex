import { mount } from '@vue/test-utils';
import Controls from './Controls.vue';
import { ControlConfigWithValue } from './../../types';

const menuItems = [
	{ value: 1, label: 'Option 1' },
	{ value: 2 },
	{ value: 3, label: 'Option 3' }
];

const expectedPropControls: ControlConfigWithValue[] = [
	{ name: 'radioControl', type: 'radio', options: [ 'Option 1', 'Option 2', 'Option 3' ], value: 'Option 2' },
	{ name: 'booleanControl', type: 'boolean', value: true },
	{ name: 'textControl', type: 'text', value: 'blah' },
	{ name: 'selectControl', type: 'select', menuItems, value: 3 }
];
const expectedSlotControls: ControlConfigWithValue[] = [
	{ name: 'slotOne', type: 'slot', value: 'Hello world' },
	{ name: 'slotTwo', type: 'slot', value: 'Another string' }
];
const controlsWithValues = expectedPropControls.concat( expectedSlotControls );

describe( 'Controls', () => {
	it( 'properly separates prop and slot controls', () => {
		const wrapper = mount( Controls, { props: { controlsWithValues } } );
		expect( wrapper.vm.propControls ).toMatchObject( expectedPropControls );
		expect( wrapper.vm.slotControls ).toMatchObject( expectedSlotControls );
	} );
} );
