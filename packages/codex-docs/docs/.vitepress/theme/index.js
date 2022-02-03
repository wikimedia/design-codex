import DefaultTheme from 'vitepress/theme';
import CustomLayout from '../../../src/components/custom-layout/CustomLayout.vue';
import Wrapper from '../../../src/components/wrapper/Wrapper.vue';

// Import overrides for theme custom properties and custom CSS styles.
import './custom.css';

export default {
	...DefaultTheme,
	Layout: CustomLayout,
	enhanceApp( { app } ) {
		app.component( 'Wrapper', Wrapper );
	}
};
