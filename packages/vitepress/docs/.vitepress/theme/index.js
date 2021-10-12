import DefaultTheme from 'vitepress/theme';
import Wrapper from './../../utils/Wrapper.vue';

import './custom.css';

export default {
	...DefaultTheme,
	enhanceApp( { app } ) {
		app.component( 'Wrapper', Wrapper )
	}
};
