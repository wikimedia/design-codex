import { generateProps, generateSlots, generateVueTag } from './codegen';
import { BoundProp, EscapedSlotContent } from '../types';

describe( 'codegen', () => {
	it( 'generates props', () => {
		const propValues: Record<string, unknown> = {
			undefVal: undefined,
			nullVal: null,
			trueVal: true,
			falseVal: false,
			stringVal: 'foo',
			intVal: 123,
			objVal: { bar: 'baz' },
			arrVal: [ 'x', 'y', 'z' ]
		};

		// undefVal, nullVal, and falseVal are ignored, trueVal is just present without a
		// value, objVal and arrVal have the values stringified
		const expectedString = 'true-val string-val="foo" :int-val="123" ' +
			':obj-val="{&quot;bar&quot;:&quot;baz&quot;}" ' +
			':arr-val="[&quot;x&quot;,&quot;y&quot;,&quot;z&quot;]"';
		expect( generateProps( propValues ) ).toBe( expectedString );
	} );

	it( 'uses v-bind syntax for BoundProp strings', () => {
		const propValues: Record<string, unknown> = {
			normalString: 'foo',
			boundString: new BoundProp( 'variableName' )
		};

		// normalString with be present without a leading : for the property name, but
		// boundString will have the leading :
		const expectedString = 'normal-string="foo" :bound-string="variableName"';
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

	it( 'allows bypassing escapeHtml() calls for icons', () => {
		const iconSlot = new EscapedSlotContent(
			'<cdx-icon :icon="cdxIconArrowNext" />'
		);
		expect(
			generateVueTag( 'cdx-button', {}, { default: iconSlot } )
		).toBe(
			'<cdx-button><cdx-icon :icon="cdxIconArrowNext" /></cdx-button>'
		);
	} );

	it( 'allows bypassing escapeHtml() calls for icons with text', () => {
		const iconSlot = new EscapedSlotContent(
			'<cdx-icon :icon="cdxIconArrowNext" /> &lt;p&gt;test&lt;/p&gt;'
		);
		expect(
			generateVueTag( 'cdx-button', {}, { default: iconSlot } )
		).toBe(
			'<cdx-button><cdx-icon :icon="cdxIconArrowNext" /> &lt;p&gt;test&lt;/p&gt;</cdx-button>'
		);
	} );

	it( 'outputs self-closing tag when there are no slots', () => {
		const expectedString = '<cdx-text-input />';
		expect( generateVueTag( 'cdx-text-input', {}, {} ) ).toBe( expectedString );
	} );
} );
