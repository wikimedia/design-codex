import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CdxDocsCopyTextButton from './CopyTextButton.vue';

const CopyButtonSelector = '.cdx-docs-copy-text-button';
const SuccessIconSelector = '.cdx-docs-copy-text-button__icon';

describe( 'CopyTextButon', () => {
	afterEach( () => {
		// Some tests use fake timers
		jest.useRealTimers();
	} );

	it( 'uses button text', async () => {
		const wrapper = mount( CdxDocsCopyTextButton, {
			props: {
				copyText: 'Random text'
			}
		} );

		// default text is just 'Copy'
		expect( wrapper.get( CopyButtonSelector ).text() ).toBe( 'Copy' );

		// change with a prop
		await wrapper.setProps( {
			buttonText: 'different label'
		} );
		// should change display
		expect( wrapper.get( CopyButtonSelector ).text() ).toBe( 'different label' );
	} );

	it( 'executes copy command on click', () => {
		const wrapper = mount( CdxDocsCopyTextButton, {
			props: {
				copyText: 'Random text'
			}
		} );

		// Starts off without success
		expect( wrapper.vm.copySuccess ).toBe( false );

		// Clicking the button should call document.execCommand,
		// testing both failure (return false, or throws exception) and success
		// (return true)
		const mockCommand = jest.fn();
		document.execCommand = mockCommand;
		mockCommand.mockReturnValue( false );
		wrapper.get( CopyButtonSelector ).trigger( 'click' );
		expect( mockCommand ).toHaveBeenCalledWith( 'copy' );

		// Failed, should not change state
		expect( wrapper.vm.copySuccess ).toBe( false );

		// Throwing exceptions also counts as failure
		mockCommand.mockImplementation( () => {
			throw new Error();
		} );
		wrapper.get( CopyButtonSelector ).trigger( 'click' );
		expect( mockCommand ).toHaveBeenCalledTimes( 2 );

		// should still be unsuccessful
		expect( wrapper.vm.copySuccess ).toBe( false );

		mockCommand.mockReturnValue( true );
		wrapper.get( CopyButtonSelector ).trigger( 'click' );
		expect( mockCommand ).toHaveBeenCalledTimes( 3 );

		// Succeeded, should be true now (dealing with timeout later)
		expect( wrapper.vm.copySuccess ).toBe( true );
	} );

	it( 'shows icon when needed', async () => {
		const wrapper = mount( CdxDocsCopyTextButton, {
			props: {
				copyText: 'Random text'
			}
		} );

		// Starts without success (variable or indicator)
		expect( wrapper.vm.copySuccess ).toBe( false );
		expect( wrapper.find( SuccessIconSelector ).exists() ).toBe( false );

		// make successful
		wrapper.vm.copySuccess = true;

		// indicator should now be shown (after the next tick)
		await nextTick();
		expect( wrapper.find( SuccessIconSelector ).exists() ).toBe( true );

		// make unsuccessful again
		wrapper.vm.copySuccess = false;

		// indicator should be hidden again (after the next tick)
		await nextTick();
		expect( wrapper.find( SuccessIconSelector ).exists() ).toBe( false );
	} );

	it( 'shows the icon upon copying for 2 seconds', async () => {
		const wrapper = mount( CdxDocsCopyTextButton, {
			props: {
				copyText: 'Random text'
			}
		} );

		// Starts without success (variable or indicator)
		expect( wrapper.vm.copySuccess ).toBe( false );
		expect( wrapper.find( SuccessIconSelector ).exists() ).toBe( false );

		// using fake timers
		jest.useFakeTimers();
		jest.spyOn( global, 'setTimeout' );

		// make sure the button click will be successful
		const mockCommand = jest.fn();
		document.execCommand = mockCommand;
		mockCommand.mockReturnValue( true );
		wrapper.get( CopyButtonSelector ).trigger( 'click' );

		// should have been clicked
		expect( mockCommand ).toHaveBeenCalledWith( 'copy' );

		// Should have set state to successful (variable and indicator) (indicator only
		// visible after the next tick)
		expect( wrapper.vm.copySuccess ).toBe( true );
		await nextTick();
		expect( wrapper.find( SuccessIconSelector ).exists() ).toBe( true );

		// should have set a timeout for hiding after 2 seconds (2000 ms)
		expect( setTimeout ).toHaveBeenCalledTimes( 1 );
		expect( setTimeout ).toHaveBeenLastCalledWith( expect.any( Function ), 2000 );

		// advance 3 seconds, callback will have run and restored the state (indicator
		// only hidden after the next tick)
		jest.advanceTimersByTime( 3000 );
		expect( wrapper.vm.copySuccess ).toBe( false );
		await nextTick();
		expect( wrapper.find( SuccessIconSelector ).exists() ).toBe( false );
	} );

	it( 'works with undefined selection', () => {
		// Cover the case of window.getSelection() returning undefined, which is the
		// default return value for jest.fn()
		window.getSelection = jest.fn();

		// For some reason, this was failing with
		// `Error: Uncaught [ReferenceError: setTimeout is not defined]`
		// installing fake timers fixes it, though we aren't quite sure why, since the
		// setTimeout() call works fine in the 'executes copy command on click' test above
		jest.useFakeTimers();

		const wrapper = mount( CdxDocsCopyTextButton, {
			props: {
				copyText: 'Random text'
			}
		} );
		// Try clicking, should still reach the document.execCommand() execution
		// without breaking from no selection
		const mockCommand = jest.fn();
		document.execCommand = mockCommand;
		mockCommand.mockReturnValue( true );
		wrapper.get( CopyButtonSelector ).trigger( 'click' );

		// should have been clicked
		expect( mockCommand ).toHaveBeenCalledWith( 'copy' );

		// nothing else to test, just that a missing selection still works
	} );

	it( 'stops being successful when the copy text changes', async () => {
		const wrapper = mount( CdxDocsCopyTextButton, {
			props: {
				copyText: 'Random text'
			}
		} );

		// Starts without success (variable or indicator)
		expect( wrapper.vm.copySuccess ).toBe( false );
		expect( wrapper.find( SuccessIconSelector ).exists() ).toBe( false );

		// using fake timers
		jest.useFakeTimers();
		jest.spyOn( global, 'setTimeout' );
		jest.spyOn( global, 'clearTimeout' );

		// make sure the button click will be successful
		const mockCommand = jest.fn();
		document.execCommand = mockCommand;
		mockCommand.mockReturnValue( true );
		wrapper.get( CopyButtonSelector ).trigger( 'click' );

		// should have been clicked
		expect( mockCommand ).toHaveBeenCalledWith( 'copy' );

		// Should have set state to successful (variable and indicator) (indicator only
		// visible after the next tick)
		expect( wrapper.vm.copySuccess ).toBe( true );
		await nextTick();
		expect( wrapper.find( SuccessIconSelector ).exists() ).toBe( true );

		// should have set a timeout for hiding after 2 seconds (2000 ms)
		expect( setTimeout ).toHaveBeenCalledTimes( 1 );
		expect( setTimeout ).toHaveBeenLastCalledWith( expect.any( Function ), 2000 );

		// change the copy text, should result in success indicator immediately hiding
		// (visible change only after the next tick)
		await wrapper.setProps( {
			copyText: 'different text'
		} );
		expect( clearTimeout ).toHaveBeenCalledTimes( 1 );

		expect( wrapper.vm.copySuccess ).toBe( false );
		await nextTick();
		expect( wrapper.find( SuccessIconSelector ).exists() ).toBe( false );

		// manually set to true, and ensure that the callback was properly cleared
		// because it doesn't switch back to false after the delay
		// advance 3 seconds, if not cleared the callback would have run by then and
		// restored the state (indicator only hidden after the next tick)
		wrapper.vm.copySuccess = true;
		expect( wrapper.vm.copySuccess ).toBe( true );
		await nextTick();
		expect( wrapper.find( SuccessIconSelector ).exists() ).toBe( true );

		// advance past when the callback would have run
		jest.advanceTimersByTime( 3000 );
		// should not have changed
		expect( wrapper.vm.copySuccess ).toBe( true );
	} );
} );
