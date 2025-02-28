import { Directive } from 'vue';
import useGeneratedId from '../../composables/useGeneratedId';
import { computePosition, flip, shift, hide, offset, autoUpdate, Placement } from '@floating-ui/vue';
import { TooltipOptions } from '../../types';
import './Tooltip.less';
import { oppositeSides } from '../../constants';

interface StatefulDirectiveElement extends HTMLElement {
	// eslint-disable-next-line no-use-before-define
	tooltip?: Tooltip
}

class Tooltip {
	private referenceElement: StatefulDirectiveElement;

	private tooltipElement: HTMLElement;

	private textContent: string;

	private placement: Placement;

	private autoUpdateCleanup: () => void;

	private referenceElementHandlers: Record<string, ( () => void )>;

	private tooltipElementHandlers: Record<string, ( () => void )>;

	private escapeHandler: ( event: KeyboardEvent ) => void;

	private timeoutId: ReturnType<typeof setTimeout>|null;

	constructor( referenceElement: StatefulDirectiveElement, options: TooltipOptions ) {
		// Initialize tooltip instance properties
		const doc = referenceElement.ownerDocument;
		// We can't use useId() here because we're not in a component setup function, use the
		// deprecated useGeneratedId composable instead
		const tooltipId = useGeneratedId( 'tooltip' );
		this.referenceElement = referenceElement;
		this.textContent = options.textContent;
		this.placement = options.placement ?? 'bottom';
		this.timeoutId = null;

		// Set up DOM elements
		this.tooltipElement = doc.createElement( 'div' );
		this.tooltipElement.classList.add( 'cdx-tooltip' );
		this.tooltipElement.role = 'tooltip';
		this.tooltipElement.id = tooltipId;
		this.referenceElement.setAttribute( 'aria-describedby', tooltipId );
		this.tooltipElement.textContent = this.textContent;
		this.referenceElement.parentElement?.appendChild( this.tooltipElement );

		// Event handlers are stashed in an an object for convenient setup/teardown
		// 1. Reference element handlers
		this.referenceElementHandlers = {};
		this.referenceElementHandlers.mouseenter = this.show.bind( this );
		this.referenceElementHandlers.mouseleave = this.hideAfterDelay.bind( this );
		this.referenceElementHandlers.focus = this.show.bind( this );
		this.referenceElementHandlers.blur = this.hide.bind( this );

		// 2. Tooltip element handlers
		this.tooltipElementHandlers = {};
		this.tooltipElementHandlers.mouseenter = this.show.bind( this );
		this.tooltipElementHandlers.mouseleave = this.hideAfterDelay.bind( this );

		// 3. Escape key handler (global) requires separate treatment
		this.escapeHandler = this.onKeyup.bind( this );

		// Add the event listeners (except the escape key listener) to the document
		this.addEventListeners();

		// Set up autoUpdate and stash a reference to the cleanup function that is returned
		this.autoUpdateCleanup = autoUpdate(
			this.referenceElement,
			this.tooltipElement,
			() => this.update()
		);
	}

	private isVisible() {
		return this.tooltipElement.style.display === 'block';
	}

	private show() {
		if ( this.timeoutId ) {
			clearTimeout( this.timeoutId );
		}

		this.tooltipElement.style.display = 'block';
		// Add the escape key listener when the tooltip is displayed
		this.tooltipElement.ownerDocument.addEventListener( 'keyup', this.escapeHandler );
	}

	private hide() {
		this.tooltipElement.style.display = 'none';
		// Remove the escape key listener when the tooltip is hidden
		this.tooltipElement.ownerDocument.removeEventListener( 'keyup', this.escapeHandler );
	}

	private hideAfterDelay() {
		this.timeoutId = setTimeout( this.hide.bind( this ), 250 );
	}

	private onKeyup( event: KeyboardEvent ) {
		if ( event.key === 'Escape' && this.isVisible() ) {
			this.hide();
		}
	}

	private addEventListeners() {
		Object.keys( this.referenceElementHandlers ).forEach( ( k ) => {
			this.referenceElement.addEventListener( k, this.referenceElementHandlers[ k ] );
		} );

		Object.keys( this.tooltipElementHandlers ).forEach( ( k ) => {
			this.tooltipElement.addEventListener( k, this.tooltipElementHandlers[ k ] );
		} );
	}

	private removeEventListeners() {
		Object.keys( this.referenceElementHandlers ).forEach( ( k ) => {
			this.referenceElement.removeEventListener( k, this.referenceElementHandlers[ k ] );
		} );

		Object.keys( this.tooltipElementHandlers ).forEach( ( k ) => {
			this.tooltipElement.removeEventListener( k, this.tooltipElementHandlers[ k ] );
		} );
	}

	private update() {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		computePosition( this.referenceElement, this.tooltipElement, {
			placement: this.placement,
			middleware: [
				offset( 4 ),
				flip(),
				shift(),
				hide()
			]
		} ).then( ( { x, y, middlewareData } ) => {
			// Tooltip placement based on middleware data - considers flipping since the
			// offset property is calculated after flipping.
			const finalPlacement = middlewareData.offset?.placement ?? this.placement;

			Object.assign( this.tooltipElement.style, {
				left: `${ x }px`,
				top: `${ y }px`,
				visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible',
				transformOrigin: oppositeSides[ finalPlacement ]
			} );
		} );
	}

	public remove() {
		this.tooltipElement.remove();
		this.autoUpdateCleanup();
		this.removeEventListeners();
	}
}

const CdxTooltip : Directive = {
	mounted( el: StatefulDirectiveElement, { value, arg } ) {
		if ( !value ) {
			return;
		}

		if ( typeof value === 'string' && value.trim() === '' ) {
			return;
		}

		el.tooltip = new Tooltip( el, {
			textContent: String( value ),
			placement: arg as Placement
		} );
	},

	beforeUnmount( el: StatefulDirectiveElement ) {
		if ( el.tooltip ) {
			el.tooltip.remove();
		}
	}
};

export default CdxTooltip;
