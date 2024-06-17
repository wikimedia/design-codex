import { Directive } from 'vue';
import useGeneratedId from '../../composables/useGeneratedId';
import { computePosition, flip, shift, hide, offset, autoUpdate, Placement } from '@floating-ui/vue';
import { TooltipOptions } from '../../types';
import './Tooltip.less';

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

	private eventHandlers: Record<string, ( () => void )>;

	private escapeHandler: ( event: KeyboardEvent ) => void;

	constructor( referenceElement: StatefulDirectiveElement, options: TooltipOptions ) {
		// Initialize tooltip instance properties
		const doc = referenceElement.ownerDocument;
		const tooltipId = useGeneratedId( 'tooltip' );
		this.referenceElement = referenceElement;
		this.textContent = options.textContent;
		this.placement = options.placement ?? 'bottom';

		// Set up DOM elements
		this.tooltipElement = doc.createElement( 'div' );
		this.tooltipElement.classList.add( 'cdx-tooltip' );
		this.tooltipElement.role = 'tooltip';
		this.tooltipElement.id = tooltipId;
		this.referenceElement.setAttribute( 'aria-describedby', tooltipId );
		this.tooltipElement.textContent = this.textContent;
		this.referenceElement.parentElement?.appendChild( this.tooltipElement );

		// Define handler methods (so that they can be easily removed when necessary)
		this.eventHandlers = {};
		this.eventHandlers.mouseenter = this.show.bind( this );
		this.eventHandlers.mouseleave = this.hide.bind( this );
		this.eventHandlers.focus = this.show.bind( this );
		this.eventHandlers.blur = this.hide.bind( this );

		// Escape handler requires separate treatment
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
		this.tooltipElement.style.display = 'block';
		// Add the escape key listener when the tooltip is displayed
		this.tooltipElement.ownerDocument.addEventListener( 'keyup', this.escapeHandler );
	}

	private hide() {
		this.tooltipElement.style.display = 'none';
		// Remove the escape key listener when the tooltip is hidden
		this.tooltipElement.ownerDocument.removeEventListener( 'keyup', this.escapeHandler );
	}

	private onKeyup( event: KeyboardEvent ) {
		if ( event.key === 'Escape' && this.isVisible() ) {
			this.hide();
		}
	}

	private addEventListeners() {
		Object.keys( this.eventHandlers ).forEach( ( k ) => {
			this.referenceElement.addEventListener( k, this.eventHandlers[ k ] );
		} );
	}

	private removeEventListeners() {
		Object.keys( this.eventHandlers ).forEach( ( k ) => {
			this.referenceElement.removeEventListener( k, this.eventHandlers[ k ] );
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
			const opposites: Record<Placement, string> = {
				left: 'right',
				'left-start': 'right',
				'left-end': 'right',
				top: 'bottom',
				'top-start': 'bottom',
				'top-end': 'bottom',
				bottom: 'top',
				'bottom-start': 'top',
				'bottom-end': 'top',
				right: 'left',
				'right-start': 'left',
				'right-end': 'left'
			};

			Object.assign( this.tooltipElement.style, {
				left: `${ x }px`,
				top: `${ y }px`,
				visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible',
				transformOrigin: opposites[ finalPlacement ]
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
