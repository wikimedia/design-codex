import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import useFocusTrap from './useFocusTrap';

describe( 'useFocusTrap', () => {
	describe( 'returns expected refs and functions', () => {
		it( 'returns all expected properties', () => {
			const containerRef = ref<HTMLElement>();
			const result = useFocusTrap( { containerRef } );

			expect( result ).toHaveProperty( 'focusTrapStart' );
			expect( result ).toHaveProperty( 'focusTrapEnd' );
			expect( result ).toHaveProperty( 'focusHolder' );
			expect( result ).toHaveProperty( 'focusFirst' );
			expect( result ).toHaveProperty( 'focusLast' );
			expect( result ).toHaveProperty( 'activateFocusTrap' );
			expect( result ).toHaveProperty( 'deactivateFocusTrap' );
		} );
	} );

	describe( 'focusFirst and focusLast', () => {
		it( 'focuses the first focusable element', () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<button id="first">First</button>
						<button id="second">Second</button>
						<button id="third">Third</button>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const { focusFirst } = useFocusTrap( { containerRef: container } );
					return { container, focusFirst };
				}
			} );

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			wrapper.vm.focusFirst();

			expect( document.activeElement ).toBe( wrapper.find( '#first' ).element );
		} );

		it( 'focuses the last focusable element', () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<button id="first">First</button>
						<button id="second">Second</button>
						<button id="third">Third</button>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const { focusLast } = useFocusTrap( { containerRef: container } );
					return { container, focusLast };
				}
			} );

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			wrapper.vm.focusLast();

			expect( document.activeElement ).toBe( wrapper.find( '#third' ).element );
		} );

		it( 'does nothing if container ref is not set', () => {
			const containerRef = ref<HTMLElement>();
			const { focusFirst, focusLast } = useFocusTrap( { containerRef } );

			// Should not throw
			expect( () => {
				focusFirst();
				focusLast();
			} ).not.toThrow();
		} );
	} );

	describe( 'activateFocusTrap', () => {
		it( 'focuses the first focusable element in the container', async () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<div ref="body">
							<button id="first">First</button>
							<button id="second">Second</button>
						</div>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const body = ref<HTMLElement>();
					const { activateFocusTrap } = useFocusTrap( {
						containerRef: container,
						bodyRef: body
					} );
					return { container, body, activateFocusTrap };
				}
			} );

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			await wrapper.vm.activateFocusTrap();

			expect( document.activeElement ).toBe( wrapper.find( '#first' ).element );
		} );

		it( 'focuses the first focusable element in container when bodyRef is not provided', async () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<button id="first">First</button>
						<button id="second">Second</button>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const { activateFocusTrap } = useFocusTrap( { containerRef: container } );
					return { container, activateFocusTrap };
				}
			} );

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			await wrapper.vm.activateFocusTrap();

			expect( document.activeElement ).toBe( wrapper.find( '#first' ).element );
		} );

		it( 'focuses the focus holder if no focusable elements exist', async () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<div ref="body">
							<p>No focusable elements</p>
						</div>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const body = ref<HTMLElement>();
					const focusTrap = useFocusTrap( {
						containerRef: container,
						bodyRef: body
					} );
					// Create and assign focus holder element
					const focusEl = document.createElement( 'div' );
					focusEl.tabIndex = -1;
					focusTrap.focusHolder.value = focusEl;
					document.body.appendChild( focusEl );
					return { container, body, activateFocusTrap: focusTrap.activateFocusTrap };
				}
			} );

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			await wrapper.vm.activateFocusTrap();

			// The focus holder should be focused since there are no focusable elements
			const focusHolderEl = document.querySelector( 'div[tabindex="-1"]' );
			expect( document.activeElement ).toBe( focusHolderEl );

			// Cleanup
			if ( focusHolderEl?.parentNode ) {
				focusHolderEl.parentNode.removeChild( focusHolderEl );
			}
		} );

		it( 'stores the previously focused element', async () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<button id="inside">Inside</button>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const { activateFocusTrap } = useFocusTrap( { containerRef: container } );
					return { container, activateFocusTrap };
				}
			} );

			// Create a button outside the component and focus it
			const outsideButton = document.createElement( 'button' );
			outsideButton.id = 'outside';
			document.body.appendChild( outsideButton );
			outsideButton.focus();
			expect( document.activeElement ).toBe( outsideButton );

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			await wrapper.vm.activateFocusTrap();

			// Focus should move to inside button
			expect( document.activeElement ).toBe( wrapper.find( '#inside' ).element );

			// Cleanup
			document.body.removeChild( outsideButton );
		} );

		it( 'does not move focus away from anchor if anchor is the previously focused element', async () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<button id="inside">Inside</button>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const anchor = ref<HTMLElement | null>( null );
					const focusTrap = useFocusTrap( {
						containerRef: container,
						anchorRef: anchor
					} );
					// Create and assign anchor element
					const anchorEl = document.createElement( 'button' );
					anchorEl.id = 'anchor';
					document.body.appendChild( anchorEl );
					anchor.value = anchorEl;
					return { container, anchor, activateFocusTrap: focusTrap.activateFocusTrap };
				}
			} );

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			// Focus the anchor button
			const anchorButton = document.getElementById( 'anchor' ) as HTMLButtonElement;
			anchorButton.focus();
			expect( document.activeElement ).toBe( anchorButton );

			await wrapper.vm.activateFocusTrap();

			// Focus should remain on the anchor button, not move to inside button
			expect( document.activeElement ).toBe( anchorButton );

			// Cleanup
			document.body.removeChild( anchorButton );
		} );
	} );

	describe( 'deactivateFocusTrap', () => {
		it( 'restores focus to the previously focused element', async () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<button id="inside">Inside</button>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const {
						activateFocusTrap,
						deactivateFocusTrap
					} = useFocusTrap( { containerRef: container } );
					return { container, activateFocusTrap, deactivateFocusTrap };
				}
			} );

			// Create a button outside the component and focus it
			const outsideButton = document.createElement( 'button' );
			outsideButton.id = 'outside';
			document.body.appendChild( outsideButton );
			outsideButton.focus();

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			await wrapper.vm.activateFocusTrap();
			expect( document.activeElement ).toBe( wrapper.find( '#inside' ).element );

			wrapper.vm.deactivateFocusTrap();

			// Focus should be restored to outside button
			expect( document.activeElement ).toBe( outsideButton );

			// Cleanup
			document.body.removeChild( outsideButton );
		} );

		it( 'does nothing if previously focused element no longer exists', async () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<button id="inside">Inside</button>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const {
						activateFocusTrap,
						deactivateFocusTrap
					} = useFocusTrap( { containerRef: container } );
					return { container, activateFocusTrap, deactivateFocusTrap };
				}
			} );

			// Create a button outside the component and focus it
			const outsideButton = document.createElement( 'button' );
			outsideButton.id = 'outside';
			document.body.appendChild( outsideButton );
			outsideButton.focus();

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			await wrapper.vm.activateFocusTrap();

			// Remove the previously focused element
			document.body.removeChild( outsideButton );

			// Should not throw
			expect( () => {
				wrapper.vm.deactivateFocusTrap();
			} ).not.toThrow();
		} );

		it( 'does nothing if no element was previously focused', () => {
			const containerRef = ref<HTMLElement>();
			const { deactivateFocusTrap } = useFocusTrap( { containerRef } );

			// Should not throw
			expect( () => {
				deactivateFocusTrap();
			} ).not.toThrow();
		} );

		it( 'does not restore focus to anchor if anchor was the previously focused element', async () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<button id="inside">Inside</button>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const anchor = ref<HTMLElement | null>( null );
					const focusTrap = useFocusTrap( {
						containerRef: container,
						anchorRef: anchor
					} );
					// Create and assign anchor element
					const anchorEl = document.createElement( 'button' );
					anchorEl.id = 'anchor';
					document.body.appendChild( anchorEl );
					anchor.value = anchorEl;
					return {
						container,
						anchor,
						activateFocusTrap: focusTrap.activateFocusTrap,
						deactivateFocusTrap: focusTrap.deactivateFocusTrap
					};
				}
			} );

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			// Focus the anchor button
			const anchorButton = document.getElementById( 'anchor' ) as HTMLButtonElement;
			anchorButton.focus();
			expect( document.activeElement ).toBe( anchorButton );

			// Activate - should not move focus away from anchor
			await wrapper.vm.activateFocusTrap();
			expect( document.activeElement ).toBe( anchorButton );

			// Move focus to inside button
			const insideButton = wrapper.find( '#inside' ).element as HTMLButtonElement;
			insideButton.focus();
			expect( document.activeElement ).toBe( insideButton );

			// Deactivate - should not restore focus to anchor
			wrapper.vm.deactivateFocusTrap();
			// Focus should remain on inside button (or wherever it naturally is)
			// We just verify it's not restored to the anchor
			expect( document.activeElement ).not.toBe( anchorButton );

			// Cleanup
			document.body.removeChild( anchorButton );
		} );
	} );

	describe( 'preventScroll option', () => {
		it( 'defaults to false', () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<button id="first">First</button>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const { focusFirst } = useFocusTrap( { containerRef: container } );
					return { container, focusFirst };
				}
			} );

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			const button = wrapper.find( '#first' ).element as HTMLButtonElement;
			const focusSpy = jest.spyOn( button, 'focus' );

			wrapper.vm.focusFirst();

			expect( focusSpy ).toHaveBeenCalledWith( { preventScroll: false } );
			focusSpy.mockRestore();
		} );

		it( 'respects preventScroll: false option', () => {
			const TestComponent = defineComponent( {
				template: `
					<div ref="container">
						<button id="first">First</button>
					</div>
				`,
				setup() {
					const container = ref<HTMLElement>();
					const { focusFirst } = useFocusTrap( {
						containerRef: container,
						preventScroll: false
					} );
					return { container, focusFirst };
				}
			} );

			const wrapper = mount( TestComponent, { attachTo: document.body } );

			const button = wrapper.find( '#first' ).element as HTMLButtonElement;
			const focusSpy = jest.spyOn( button, 'focus' );

			wrapper.vm.focusFirst();

			expect( focusSpy ).toHaveBeenCalledWith( { preventScroll: false } );
			focusSpy.mockRestore();
		} );
	} );
} );
