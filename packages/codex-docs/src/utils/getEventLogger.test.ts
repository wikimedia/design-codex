import getEventLogger, { getMultiEventLogger } from './getEventLogger';

describe( 'getEventLogger', () => {
	it( 'works with single events (getEventLogger)', () => {
		const logger = getEventLogger<string>( 'update:modelValue' );
		const consoleSpy = jest.spyOn( console, 'log' );
		logger( 'new value' );
		expect( consoleSpy ).toHaveBeenCalledWith(
			'"update:modelValue" event emitted with the value:',
			'new value'
		);
	} );

	it( 'works with multiple events (getMultiEventLogger)', () => {
		const logger = getMultiEventLogger<string>();
		const consoleSpy = jest.spyOn( console, 'log' );
		logger( 'update:modelValue', 'new value' );
		expect( consoleSpy ).toHaveBeenCalledWith(
			'"update:modelValue" event emitted with the value:',
			'new value'
		);
	} );
} );
