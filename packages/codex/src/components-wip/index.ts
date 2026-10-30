// Add components that are still in development to this file, as follows:
// import CdxComponentName from './component-name/ComponentName.vue';
//
// export {
//     CdxComponentName
// };
//
// Note that when all components in this list are removed, you should remove the imports and the
// `export` statement and instead add `export default {};`. src/lib-wip.ts re-exports this file,
// and the file must stay an ES module for that to compile.
import CdxBreadcrumb from './breadcrumb/Breadcrumb.vue';
import CdxContainer from './container/Container.vue';

export {
	CdxBreadcrumb,
	CdxContainer
};
