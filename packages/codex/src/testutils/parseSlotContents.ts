import { defineComponent, VNode } from 'vue';
import { mount } from '@vue/test-utils';
import { GlobalMountOptions } from '@vue/test-utils/dist/types';

/**
 * Helper component for parseSlotContents().
 *
 * This component renders nothing, but exposes the slot contents as a VNode array through the
 * getContents() method.
 */
const TestComponent = defineComponent( {
	name: 'TestComponent',
	setup( props, { slots } ) {
		function getContents() {
			return slots.default?.();
		}

		return {
			getContents
		};
	},
	render() {
		return '';
	}
} );

/**
 * Parse a Vue template string to a VNode array.
 *
 * This is used to allow tests to be written more clearly and concisely, by expressing the VNode
 * input in template form, rather than as VNode objects.
 *
 * @param slotContents Vue template string
 * @param components Components used in the template string
 * @return VNodes representing the given string
 */
export default function parseSlotContents(
	slotContents: string,
	components?: GlobalMountOptions['components']
): VNode[] | undefined {
	const wrapper = mount( TestComponent, {
		slots: { default: slotContents },
		global: { components }
	} );
	return wrapper.vm.getContents();
}
