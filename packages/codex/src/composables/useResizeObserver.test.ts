import { defineComponent, nextTick, ref } from 'vue';

import { mount } from '@vue/test-utils';

import useResizeObserver from './useResizeObserver';

describe( 'useResizeObserver', () => {
	let lastCallback: ( ( entries: ResizeObserverEntry[] ) => void ) | null = null;
	const observeSpy = jest.fn();
	const disconnectSpy = jest.fn();

	let OriginalResizeObserver: typeof ResizeObserver;
	let OriginalResizeObserverEntry: typeof ResizeObserverEntry | undefined;

	beforeAll( () => {
		OriginalResizeObserver = window.ResizeObserver;
		OriginalResizeObserverEntry = 'ResizeObserverEntry' in window ?
			window.ResizeObserverEntry :
			undefined;
	} );

	beforeEach( () => {
		lastCallback = null;
		observeSpy.mockClear();
		disconnectSpy.mockClear();

		class MockResizeObserver {
			constructor( cb: ( entries: ResizeObserverEntry[] ) => void ) {
				lastCallback = cb;
			}

			public observe = observeSpy;

			public disconnect = disconnectSpy;
		}

		window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
		Object.defineProperty( window, 'ResizeObserverEntry', {
			configurable: true,
			writable: true,
			value: OriginalResizeObserverEntry ?? class ResizeObserverEntryMock {}
		} );
	} );

	afterEach( () => {
		window.ResizeObserver = OriginalResizeObserver;
		if ( OriginalResizeObserverEntry !== undefined ) {
			window.ResizeObserverEntry = OriginalResizeObserverEntry;
		} else {
			Reflect.deleteProperty( window, 'ResizeObserverEntry' );
		}
	} );

	function invokeResizeCallback( entries: ResizeObserverEntry[] ) {
		if ( lastCallback === null ) {
			throw new Error( 'ResizeObserver callback was not captured' );
		}
		lastCallback( entries );
	}

	function makeEntry( options: {
		borderBox?: { inlineSize: number; blockSize: number };
		contentRect?: { width: number; height: number };
	} ): ResizeObserverEntry {
		const rect = options.contentRect;
		const contentRect = rect ?
			{
				x: 0,
				y: 0,
				top: 0,
				left: 0,
				bottom: rect.height,
				right: rect.width,
				width: rect.width,
				height: rect.height,
				toJSON: () => ''
			} :
			{
				x: 0,
				y: 0,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				width: 0,
				height: 0,
				toJSON: () => ''
			};
		return {
			borderBoxSize: options.borderBox ?
				[ options.borderBox ] :
				undefined,
			contentRect
		} as unknown as ResizeObserverEntry;
	}

	it( 'observes the element on mount and updates dimensions from borderBoxSize', async () => {
		const TestComponent = defineComponent( {
			template: '<div ref="el" style="width:10px;height:20px"></div>',
			setup() {
				const el = ref<HTMLElement>();
				const dimensions = useResizeObserver( el );
				return { el, dimensions };
			}
		} );

		const wrapper = mount( TestComponent, { attachTo: document.body } );
		await nextTick();

		expect( observeSpy ).toHaveBeenCalled();

		invokeResizeCallback( [ makeEntry( { borderBox: { inlineSize: 100, blockSize: 50 } } ) ] );

		expect( wrapper.vm.dimensions ).toEqual( { width: 100, height: 50 } );
	} );

	it( 'falls back to contentRect when borderBoxSize is missing', async () => {
		const TestComponent = defineComponent( {
			template: '<div ref="el"></div>',
			setup() {
				const el = ref<HTMLElement>();
				const dimensions = useResizeObserver( el );
				return { el, dimensions };
			}
		} );

		const wrapper = mount( TestComponent, { attachTo: document.body } );
		await nextTick();

		invokeResizeCallback( [
			makeEntry( { contentRect: { width: 42, height: 24 } } )
		] );

		expect( wrapper.vm.dimensions ).toEqual( { width: 42, height: 24 } );
	} );

	it( 'does not change dimensions when entries are empty', async () => {
		const TestComponent = defineComponent( {
			template: '<div ref="el"></div>',
			setup() {
				const el = ref<HTMLElement>();
				const dimensions = useResizeObserver( el );
				return { el, dimensions };
			}
		} );

		const wrapper = mount( TestComponent, { attachTo: document.body } );
		await nextTick();

		invokeResizeCallback( [] );

		expect( wrapper.vm.dimensions ).toEqual( { width: undefined, height: undefined } );
	} );

	it( 're-observes when the template ref target changes after mount', async () => {
		const TestComponent = defineComponent( {
			template: '<div></div>',
			setup() {
				const target = ref<Element | undefined>();
				const dimensions = useResizeObserver( target );
				return { target, dimensions };
			}
		} );

		const wrapper = mount( TestComponent, { attachTo: document.body } );
		await nextTick();

		const div1 = document.createElement( 'div' );
		const div2 = document.createElement( 'div' );
		document.body.appendChild( div1 );
		document.body.appendChild( div2 );

		wrapper.vm.target = div1;
		await nextTick();

		const countAfterFirstTarget = observeSpy.mock.calls.length;
		expect( countAfterFirstTarget ).toBeGreaterThanOrEqual( 1 );

		wrapper.vm.target = div2;
		await nextTick();

		expect( disconnectSpy ).toHaveBeenCalled();
		expect( observeSpy.mock.calls.length ).toBeGreaterThan( countAfterFirstTarget );
		expect( wrapper.vm.dimensions ).toEqual( { width: undefined, height: undefined } );

		div1.remove();
		div2.remove();
	} );

	it( 'returns default dimensions when ResizeObserver is unavailable', () => {
		Reflect.deleteProperty( window, 'ResizeObserver' );

		const el = ref<HTMLElement>();
		const dimensions = useResizeObserver( el );

		expect( dimensions.value ).toEqual( { width: undefined, height: undefined } );
	} );
} );
