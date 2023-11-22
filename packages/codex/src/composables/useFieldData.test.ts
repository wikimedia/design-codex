import { PropType, h, defineComponent, provide, toRef, ref, computed } from 'vue';
import { mount } from '@vue/test-utils';
import useFieldData from './useFieldData';
import { FieldStatusKey, FieldInputIdKey } from '../constants';
import { ValidationStatusType } from '../types';

describe( 'useFieldData', () => {
	describe( 'computed status', () => {
		const ChildComponent = defineComponent( {
			template: '<input :class="rootClasses">',
			props: { status: { type: String as PropType<ValidationStatusType>, default: 'default' } },
			setup( props ) {
				const { computedStatus } = useFieldData( ref( false ), toRef( props, 'status' ) );
				const rootClasses = computed( () => {
					return { [ `my-class--${ computedStatus.value }` ]: true };
				} );
				return { rootClasses };
			}
		} );
		const ParentComponent = defineComponent( {
			props: {
				statusProp: { type: String as PropType<ValidationStatusType>, default: 'default' },
				providedStatus: { type: String as PropType<ValidationStatusType>, default: 'default' }
			},
			render() {
				return h( ChildComponent, { status: this.statusProp } );
			},
			setup( props ) {
				provide( FieldStatusKey, toRef( props, 'providedStatus' ) );
			}
		} );

		describe( 'when both status prop and provided status are default', () => {
			it( 'returns false', () => {
				const wrapper = mount( ParentComponent );
				expect( wrapper.find( 'input' ).element.classList ).toContain( 'my-class--default' );
			} );
		} );

		describe( 'when status prop is error and provided status is default', () => {
			it( 'returns false', () => {
				const wrapper = mount( ParentComponent, { props: { statusProp: 'error' } } );
				expect( wrapper.find( 'input' ).element.classList ).toContain( 'my-class--error' );
			} );
		} );

		describe( 'when status prop is default and provided status is error', () => {
			it( 'returns false', () => {
				const wrapper = mount( ParentComponent, { props: { providedStatus: 'error' } } );
				expect( wrapper.find( 'input' ).element.classList ).toContain( 'my-class--error' );
			} );
		} );

		describe( 'when both status prop and provided status are error', () => {
			it( 'returns false', () => {
				const wrapper = mount( ParentComponent, { props: { statusProp: 'error', providedStatus: 'error' } } );
				expect( wrapper.find( 'input' ).element.classList ).toContain( 'my-class--error' );
			} );
		} );
	} );

	describe( 'computed id', () => {
		const ChildComponent = defineComponent( {
			template: '<input :id="computedInputId || undefined">',
			inheritAttrs: false,
			setup( props, { attrs } ) {
				const { computedInputId } = useFieldData( ref( false ), ref( 'default' ), attrs?.id as string|undefined );
				return { computedInputId };
			}
		} );
		const ParentComponent = defineComponent( {
			props: {
				childId: { type: String, default: '' },
				providedId: { type: String, default: undefined }
			},
			render() {
				return h( ChildComponent, { id: this.childId } );
			},
			setup( props ) {
				provide( FieldInputIdKey, computed( () => props.providedId ) );
			}
		} );

		describe( 'when called with no ID attribute or provided ID', () => {
			it( 'returns undefined', () => {
				const wrapper = mount( ParentComponent );
				expect( wrapper.find( 'input' ).element.hasAttribute( 'id' ) ).toBeFalsy();
			} );
		} );

		describe( 'when called with an ID attribute and no provided ID', () => {
			it( 'returns the ID attribute', () => {
				const wrapper = mount( ParentComponent, { props: { childId: 'my-id-123' } } );
				expect( wrapper.find( 'input' ).element.id ).toBe( 'my-id-123' );
			} );
		} );

		describe( 'when called with no ID attribute and a provided ID', () => {
			it( 'returns the provided ID', () => {
				const wrapper = mount( ParentComponent, { props: { providedId: 'provided-id' } } );
				expect( wrapper.find( 'input' ).element.id ).toBe( 'provided-id' );
			} );
		} );

		describe( 'when called with both an ID attribute and a provided ID', () => {
			it( 'returns the provided ID', () => {
				const wrapper = mount( ParentComponent, { props: { childId: 'my-id-123', providedId: 'provided-id' } } );
				expect( wrapper.find( 'input' ).element.id ).toBe( 'provided-id' );
			} );
		} );
	} );
} );
