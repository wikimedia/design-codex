import { generateProps, generateSlots } from './codegen';

describe( 'codegen', () => {
	it( 'generates props', () => {
		const propValues: Record<string, unknown> = {
			undefVal: undefined,
			trueVal: true,
			falseVal: false,
			stringVal: 'foo',
			intVal: 123,
			objVal: { bar: 'baz' },
			arrVal: [ 'x', 'y', 'z' ]
		};

		// undefVal and falseVal are ignored, trueVal is just present without a
		// value, objVal and arrVal have the values stringified
		const expectedString = 'trueVal stringVal="foo" :intVal="123" ' +
			':objVal="{&quot;bar&quot;:&quot;baz&quot;}" ' +
			':arrVal="[&quot;x&quot;,&quot;y&quot;,&quot;z&quot;]"';
		expect( generateProps( propValues ) ).toBe( expectedString );
	} );

	it( 'generates slots', () => {
		const slotValues: Record<string, string> = {
			first: 'random content',
			second: 'other content'
		};

		const expectedString = '<template #first>random content</template>' +
			'\n<template #second>other content</template>';
		expect( generateSlots( slotValues ) ).toBe( expectedString );
	} );
} );
