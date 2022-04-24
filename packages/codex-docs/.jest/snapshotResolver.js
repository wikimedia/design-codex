/* eslint-env node */
// See https://jestjs.io/docs/en/configuration.html#snapshotresolver-string.
module.exports = {
	/**
	 * Colocate snapshots with components.
	 *
	 * @param {string} testPath
	 * @param {string} snapshotExtension
	 * @return {string}
	 */
	resolveSnapshotPath( testPath, snapshotExtension ) {
		return testPath.replace( /\.test\.([tj]s?)/, `${snapshotExtension}.$1` );
	},

	/**
	 * Colocate tests with components.
	 *
	 * @param {string} snapshotPath
	 * @param {string} snapshotExtension
	 * @return {string}
	 */
	resolveTestPath( snapshotPath, snapshotExtension ) {
		return snapshotPath.replace( snapshotExtension, '.test' );
	},

	testPathForConsistencyCheck: '<path>/<test subject>.test.ts'
};
