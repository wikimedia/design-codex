import DefaultTheme from 'vitepress/theme';
import Wrapper from './../../../src/components/wrapper/Wrapper.vue';

// Import overrides for theme custom properties and custom CSS styles.
import './custom.css';

export default {
	...DefaultTheme,
	enhanceApp( { app } ) {
		app.component( 'Wrapper', Wrapper )
	}
};
