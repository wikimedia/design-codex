import { contentRefsById, toastStore } from './toast.store';
import { defineComponent, ref } from 'vue';

import { mount } from '@vue/test-utils';
import useToast from './useToast';

/** Wrapper component so useToast() runs inside a Vue instance (useId() etc.). */
const TestHost = defineComponent( {
	template: '<div></div>',
	setup() {
		const toast = useToast();
		return { toast };
	}
} );

describe( 'useToast', () => {
	afterEach( () => {
		toastStore.toasts.splice( 0 );
		contentRefsById.clear();
	} );

	function getToast() {
		const wrapper = mount( TestHost );
		return wrapper.vm.toast;
	}

	it( 'show() throws when neither message nor contentRef provided', () => {
		const toast = getToast();
		expect( () => toast.show( {} as never ) ).toThrow( 'provide either message or contentRef' );
	} );

	it( 'show() with message returns id and adds toast to store', () => {
		const toast = getToast();
		const id = toast.show( { message: 'Test', type: 'notice' } );
		expect( typeof id ).toBe( 'string' );
		expect( id.length ).toBeGreaterThan( 0 );
		expect( toastStore.toasts ).toHaveLength( 1 );
		expect( toastStore.toasts[ 0 ].id ).toBe( id );
		expect( toastStore.toasts[ 0 ].message ).toBe( 'Test' );
		expect( toastStore.toasts[ 0 ].type ).toBe( 'notice' );
	} );

	it( 'update() updates existing toast in store', () => {
		const toast = getToast();
		const id = toast.show( { message: 'Test', type: 'notice' } );
		expect( toastStore.toasts[ 0 ].type ).toBe( 'notice' );
		toast.update( id, { type: 'success' } );
		expect( toastStore.toasts[ 0 ].type ).toBe( 'success' );
		toast.update( id, { type: 'warning', autoDismiss: 2000 } );
		expect( toastStore.toasts[ 0 ].type ).toBe( 'warning' );
		expect( toastStore.toasts[ 0 ].autoDismiss ).toBe( 2000 );
	} );

	it( 'update() is no-op when id not found', () => {
		const toast = getToast();
		toast.show( { message: 'Test' } );
		toast.update( 'nonexistent-id', { type: 'error' } );
		expect( toastStore.toasts[ 0 ].type ).toBe( 'notice' );
	} );

	it( 'dismiss() removes toast and clears contentRefsById', () => {
		const toast = getToast();
		const id = toast.show( { message: 'Test' } );
		contentRefsById.set( id, ref<HTMLElement | null>( null ) );
		toast.dismiss( id );
		expect( toastStore.toasts ).toHaveLength( 0 );
		expect( contentRefsById.has( id ) ).toBe( false );
	} );

	it( 'clear() removes all toasts and clears contentRefsById', () => {
		const toast = getToast();
		const id1 = toast.show( { message: 'One' } );
		toast.show( { message: 'Two' } );
		contentRefsById.set( id1, ref<HTMLElement | null>( null ) );
		toast.clear();
		expect( toastStore.toasts ).toHaveLength( 0 );
		expect( contentRefsById.size ).toBe( 0 );
	} );

	it( 'success(), error(), info(), warning() return id and set type', () => {
		const toast = getToast();
		const successId = toast.success( 'OK' );
		expect( toastStore.toasts.find( ( t ) => t.id === successId )?.type ).toBe( 'success' );
		const errorId = toast.error( 'Fail' );
		expect( toastStore.toasts.find( ( t ) => t.id === errorId )?.type ).toBe( 'error' );
		const infoId = toast.info( 'Info' );
		expect( toastStore.toasts.find( ( t ) => t.id === infoId )?.type ).toBe( 'notice' );
		const warnId = toast.warning( 'Careful' );
		expect( toastStore.toasts.find( ( t ) => t.id === warnId )?.type ).toBe( 'warning' );
	} );
} );
