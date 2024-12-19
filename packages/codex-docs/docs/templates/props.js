import { getTypeText, mdclean } from './utils.js';

/** @import { BlockTag, PropDescriptor, Tag } from 'vue-docgen-api' */

/**
 * Return true if the thing is a tag
 *
 * @param {BlockTag} v
 * @return {v is Tag}
 */
function isTag( v ) {
	return 'content' in v && !!v.content;
}

/**
 * Format any tags present in prop docs
 *
 * @param {Record<string, BlockTag[]>|undefined} tags
 * @return {string}
 */
const renderTags = ( tags ) => {
	if ( !tags ) {
		return '';
	}
	return Object.entries( tags )
		.map( ( [ tag, values ] ) => values.map( ( v ) => `<br/>\`@${ tag }\` ${ isTag( v ) ? v.content : v.description }` ).join( '' ) )
		.join( '' );
};

/**
 * Customization: determine if any of the properties have a .values entry, if none do then
 * the values column will be omitted entirely
 *
 * @param {PropDescriptor[]} props This component's props
 * @return {boolean}
 */
const includeValuesCol = ( props ) => props.some(
	( currentProp ) => currentProp.values
);

/**
 * Returns a formatted markdown table body with prop information.
 *
 * @param {PropDescriptor[]} props This component's props
 * @return {string}
 */
const tmpl = ( props ) => {
	let ret = '';

	const showValues = includeValuesCol( props );
	props.forEach( ( pr ) => {
		// Customization: exclude the @default tag from the rendered tags.
		const { default: defaultTag, ...unrecognizedTags } = pr.tags ?? {};

		// Prop name.
		let p = '`' + pr.name + '`';
		// Customization: add the required indicator after the prop name if it is required.
		p += pr.required ? '<sup class="cdx-docs-required-indicator">(required)</sup>' : '';

		// Prop description and tags.
		let t = pr.description ?? '';
		t += renderTags( unrecognizedTags );

		// Prop type.
		const n = pr.type ? getTypeText( pr.type.name ) : '';

		// Prop default value.
		// Customization: use the @default tag, if it exists, to allow doc comments to override the
		// automatically generated default with something cleaner. This is often needed if the
		// default comes from a function.
		const defaultValue =
			// First try to get the default value from the @default tag
			defaultTag?.[ 0 ] && !isTag( defaultTag[ 0 ] ) && typeof defaultTag[ 0 ].description === 'string' ?
				defaultTag[ 0 ].description :
				// Otherwise use the detected default value
				pr.defaultValue?.value;
		const d = defaultValue ? getTypeText( defaultValue ) : '';

		// Construct row.
		ret += `| ${ mdclean( p ) } | ${ mdclean( t ) } | ${ mdclean( n ) }`;

		// Prop values.
		// Customization: only include a values column if any of the props have something to show.
		if ( showValues ) {
			const v = pr.values ?
				pr.values.map( ( pv ) => `\`${ pv }\`` ).join( ', ' ) :
				'-';
			ret += ` | ${ mdclean( v ) }`;
		}

		// Customization: Add class to deprecated prop rows.
		const rowClass = unrecognizedTags.deprecated ? '{ .cdx-docs-table-row--warning }' : '';
		ret += ` | ${ mdclean( d ) } ${ rowClass } |\n`;
	} );
	return ret;
};

/**
 * Exports a custom template for the props data on a component demo page.
 *
 * Note that most of this code comes directly from vue-docgen-api, so no improvements have been
 * made—changes to the default code/template have been noted.
 *
 * @type {import('vue-docgen-cli').Templates['props']}
 */
const propsTemplate = function ( props, opt = {} ) {
	// Customization: only include a values column if any of the props have something to show
	const showValues = includeValuesCol( props );
	const valuesHeading = showValues ? ' | Values     ' : '';
	const valuesDivider = showValues ? ' | -----------' : '';
	return `
${ !!opt.isSubComponent || opt.hasSubComponents ? '#' : '' }## Props

<div class="cdx-docs-table-wrapper">

| Prop name     | Description | Type     ${ valuesHeading } | Default     |
| ------------- | ----------- | ---------${ valuesDivider } | ----------- |
${ tmpl( props ) }

</div>

`;

};

export default propsTemplate;
