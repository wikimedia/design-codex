import { getTypeText, mdclean } from './utils.js';

/** @typedef {import('vue-docgen-api').BlockTag} BlockTag */
/** @typedef {import('vue-docgen-api').PropDescriptor} PropDescriptor */
/** @typedef {import('vue-docgen-api').Tag} Tag */

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
		.map( ( [ tag, values ] ) => {
			return values.map( ( v ) => `<br/>\`@${ tag }\` ${ isTag( v ) ? v.content : v.description }` ).join( '' );
		} )
		.join( '' );
};

/**
 * Customization: determine if any of the properties have a .values entry, if none do then
 * the values column will be omitted entirely
 *
 * @param {PropDescriptor[]} props This component's props
 * @return {boolean}
 */
const includeValuesCol = ( props ) => {
	return props.some(
		( currentProp ) => currentProp.values
	);
};

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
		let p = '`' + pr.name + '`';
		// Customization: add the required indicator after the prop name if it is required.
		p += pr.required ? '<sup class="cdx-docs-required-indicator">(required)</sup>' : '';
		let t = pr.description ?? '';
		// Customization: exclude the @default tag from the rendered tags
		const { default: defaultTag, ...unrecognizedTags } = pr.tags ?? {};
		t += renderTags( unrecognizedTags );
		const n = pr.type ? getTypeText( pr.type.name ) : '';
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

		ret += `| ${ mdclean( p ) } | ${ mdclean( t ) } | ${ mdclean( n ) }`;
		// Customization: only include a values column if any of the props have something
		// to show
		if ( showValues ) {
			const v = pr.values ?
				pr.values.map( ( pv ) => `\`${ pv }\`` ).join( ', ' ) :
				'-';
			ret += ` | ${ mdclean( v ) }`;
		}
		ret += ` | ${ mdclean( d ) } |\n`;
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
