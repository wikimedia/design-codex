import { h, defineComponent, provide, toRef } from 'vue';
import { mount } from '@vue/test-utils';
import useComputedDisabled from './useComputedDisabled';
import { DisabledKey } from '../constants';

describe( 'useComputedDisabled', () => {
	const ChildComponent = defineComponent( {
		template: '<input :disabled="computedDisabled">',
		props: { disabled: { type: Boolean, default: false } },
		setup( props ) {
			const computedDisabled = useComputedDisabled( toRef( props, 'disabled' ) );
			return { computedDisabled };
		}
	} );
	const ParentComponent = defineComponent( {
		props: {
			disabledProp: { type: Boolean, default: false },
			providedDisabled: { type: Boolean, default: false }
		},
		render() {
			return h( ChildComponent, { disabled: this.disabledProp } );
		},
		setup( props ) {
			provide( DisabledKey, toRef( props, 'providedDisabled' ) );
		}
	} );

	describe( 'when both disabled prop and provided disabled are false', () => {
		it( 'returns false', () => {
			const wrapper = mount( ParentComponent );
			expect( wrapper.find( 'input' ).element.disabled ).toBeFalsy();
		} );
	} );

	describe( 'when disabled prop is true', () => {
		it( 'returns true', () => {
			const wrapper = mount( ParentComponent, { props: { disabledProp: true } } );
			expect( wrapper.find( 'input' ).element.disabled ).toBeTruthy();
		} );
	} );

	describe( 'when provided disabled is true', () => {
		it( 'returns true', () => {
			const wrapper = mount( ParentComponent, { props: { providedDisabled: true } } );
			expect( wrapper.find( 'input' ).element.disabled ).toBeTruthy();
		} );
	} );

	describe( 'when both disabled prop and provided disabled are true', () => {
		it( 'returns true', () => {
			const wrapper = mount( ParentComponent, {
				props: { disabledProp: true, providedDisabled: true }
			} );
			expect( wrapper.find( 'input' ).element.disabled ).toBeTruthy();
		} );
	} );
} );
