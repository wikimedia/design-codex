import DefaultTheme from 'vitepress/theme';
import { Theme } from 'vitepress';
import CustomLayout from '../../../src/components/custom-layout/CustomLayout.vue';
import CdxDemoWrapper from '../../../src/components/wrapper/Wrapper.vue';
import CdxDemoSlotIcon from '../../../src/components/slot-icon/SlotIcon.vue';

// Import overrides for theme custom properties and custom CSS styles.
import './custom.css';

const customTheme: Theme = {
	...DefaultTheme,
	Layout: CustomLayout,
	enhanceApp( { app } ) {
		app.component( 'CdxDemoWrapper', CdxDemoWrapper );
		app.component( 'CdxDemoSlotIcon', CdxDemoSlotIcon );
	}
};

export default customTheme;
