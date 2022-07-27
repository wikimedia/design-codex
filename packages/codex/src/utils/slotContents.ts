import { Comment, VNode } from 'vue';

export function flattenSlotContents( slotContents: VNode[] ): ( VNode | string )[] {
	const flattened: ( VNode | string )[] = [];
	for ( const node of slotContents ) {
		if (
			// HTML tag
			typeof node.type === 'string' ||
			// Component
			typeof node.type === 'object'
		) {
			flattened.push( node );
		} else if ( node.type !== Comment ) {
			// Text node or fragment (or something fragment-like); descend into its children
			if ( typeof node.children === 'string' && node.children.trim() !== '' ) {
				flattened.push( node.children );
			} else if ( Array.isArray( node.children ) ) {
				// According to the type definition, the elements of node.children could also be
				// strings, numbers, boolean, null, undefined or arrays. But in practice, we
				// only ever see VNode objects, so we use a type assertion here to simplify
				// this code
				flattened.push( ...flattenSlotContents( node.children as VNode[] ) );
			}
		}
	}
	return flattened;
}

/**
 * Check whether a given node represents a component. Optionally check whether it represents an
 * instance of a specific component.
 *
 * isComponentVNode( node ) checks whether node is a component node of any type. To check whether
 * node is a component node that is an instance of e.g. the CdxIcon component, use
 * isComponentVNode( node, CdxIcon.name )
 *
 * @param node VNode to test
 * @param componentName If set, check whether the component node has this name. Where possible,
 *  import the component and pass CdxFooBar.name, rather than passing a hard-coded string like
 *  'CdxFooBar'
 * @return Whether node is a component node; and, if componentName is set, whether it represents
 *  an instance of the component with that name.
 */
export function isComponentVNode( node: VNode, componentName?: string ): boolean {
	if ( typeof node.type === 'object' && 'name' in node.type ) {
		// node is a component node. Check if it has the right name, if requested
		if ( componentName !== undefined ) {
			return node.type.name === componentName;
		}
		return true;
	}
	return false;
}

/**
 * Check whether a given node represents an HTML tag. Optionally check whether it represents
 * a specific tag.
 *
 * @param node VNode to test
 * @param tagName If set, check whether the node represents this HTML tag
 * @return Whether node is an HTML tag node; and, if tagName is set, whether it's that specific
 *  HTML tag.
 */
export function isTagVNode( node: VNode, tagName?: string ): boolean {
	if ( typeof node.type === 'string' ) {
		// node is a tag node. Check if it has the right name, if requested
		if ( tagName !== undefined ) {
			return node.type === tagName.toLowerCase();
		}
		return true;
	}
	return false;
}
