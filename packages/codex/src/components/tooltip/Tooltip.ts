import { Directive } from 'vue';
import { computePosition, flip, shift, hide, offset, autoUpdate, Placement } from '@floating-ui/vue';
import { TooltipOptions } from '../../types';
import { generateHashId } from '../../utils/generateHashId';
import './Tooltip.less';
import { oppositeSides } from '../../constants';

/**
 * Map used for deterministic and SSR-safe ID generation.
 * Keys (strings) correspond to tooltip content; values (numbers)
 * correspond to the number of tooltips that use the same content.
 * This allows us to guarantee ~unique, deterministic IDs which
 * will be the same on both server and client.
 */
const contentCounters = new Map<string, number>();

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
		// Generate a unique, deterministic ID based on tooltip content
		const tooltipId = this.generateTooltipId( options.textContent );
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

	/**
	 * Assign each Tooltip a (reasonably) unique, deterministic, and SSR-safe ID
	 * based on its content.
	 *
	 * @param content The tooltip content text
	 * @return A unique ID for the tooltip
	 */
	private generateTooltipId( content: string ): string {
		// Each tooltip has an entry in the contentCounters Map, keyed to the
		// tooltip content. Multiple occurrences of the same content string
		// are tracked by incrementing the corresponding value. This allows
		// us to generate unique & deterministic IDs even when content
		// is the same across multiple tooltips.
		const contentKey = content.trim();
		const count = contentCounters.get( contentKey ) ?? 0;
		contentCounters.set( contentKey, count + 1 );

		return generateHashId( contentKey + '-' + count, 'cdx-tooltip' );
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

	public updateWithOptions( options: TooltipOptions ) {
		this.textContent = options.textContent;
		this.placement = options.placement ?? this.placement;
		this.tooltipElement.textContent = this.textContent;
		this.update();
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

	updated( el: StatefulDirectiveElement, { value, arg } ) {
		if ( value === null ) {
			return;
		}
		// If there was no tooltip on the element, add a new one
		if ( !el.tooltip ) {
			el.tooltip = new Tooltip( el, {
				textContent: String( value ),
				placement: arg as Placement
			} );
		} else { // If there was a tooltip, then update it with the new content
			el.tooltip.updateWithOptions( {
				textContent: String( value ),
				placement: arg as Placement
			} );
		}
	},

	beforeUnmount( el: StatefulDirectiveElement ) {
		if ( el.tooltip ) {
			el.tooltip.remove();
		}
	}
};

export default CdxTooltip;
