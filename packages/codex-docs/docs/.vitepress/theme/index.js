// eslint-disable-next-line node/no-missing-import
import DefaultTheme from 'vitepress/theme';
import CustomLayout from '../../../src/components/custom-layout/CustomLayout.vue';
import CdxDemoWrapper from '../../../src/components/wrapper/Wrapper.vue';
import CdxDemoSlotIcon from '../../../src/components/slot-icon/SlotIcon.vue';

/** @typedef {import('vitepress').Theme} Theme */
/** @typedef {import('vitepress').EnhanceAppContext} EnhanceAppContext */

// Import overrides for theme custom properties and custom CSS styles.
import './custom.css';

/** @type {Theme} */
export default {
	...DefaultTheme,
	Layout: CustomLayout,
	/**
	 * @param {EnhanceAppContext} ctx
	 */
	enhanceApp( { app } ) {
		app.component( 'CdxDemoWrapper', CdxDemoWrapper );
		app.component( 'CdxDemoSlotIcon', CdxDemoSlotIcon );
	}
};
