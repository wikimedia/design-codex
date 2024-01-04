import DefaultTheme from 'vitepress/theme';
import { Theme } from 'vitepress';
import CustomLayout from '../../../src/components/custom-layout/CustomLayout.vue';
import CdxDemoWrapper from '../../../src/components/wrapper/Wrapper.vue';
import CdxDemoSlotIcon from '../../../src/components/slot-icon/SlotIcon.vue';
import CdxDemoRules from '../../../src/components/rules/Rules.vue';

// Import overrides for theme custom properties and custom CSS styles.
import './custom.css';

// Import special fixes for syntax highlighting colors.
import './syntax-highlighting-fixes.css';

const redirects: Record<string, string> = {
	// The "adding new icons" page was moved from icons to contributing code.
	'/icons/adding-new.html': '/contributing/contributing-code/adding-new-icons.html'
};

const customTheme: Theme = {
	...DefaultTheme,
	Layout: CustomLayout,
	enhanceApp( { app, router } ) {
		app.component( 'CdxDemoWrapper', CdxDemoWrapper );
		app.component( 'CdxDemoSlotIcon', CdxDemoSlotIcon );
		app.component( 'CdxDemoRules', CdxDemoRules );

		// If we went to a URL that matches a redirect entry, go to the redirected URL instead.
		router.onAfterRouteChanged = async ( to ) => {
			for ( const [ redirFrom, redirTo ] of Object.entries( redirects ) ) {
				if ( to.endsWith( redirFrom ) ) {
					// router.go() wants a full URL with domain name etc. Instead of trying to
					// construct that ourselves, obtain it by doing a replace on `to` (which is
					// also a full URL).
					await router.go( to.replace( redirFrom, redirTo ) );
					break;
				}
			}
		};
	}
};

export default customTheme;
