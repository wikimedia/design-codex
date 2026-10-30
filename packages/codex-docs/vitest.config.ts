import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig( {
	plugins: [ vue() ],
	test: {
		environment: 'jsdom',
		globals: true,
		include: [ 'src/**/*.test.ts' ],
		setupFiles: [ './vitest.setup.js' ],
		// Colocate snapshots with components: `Foo.test.ts` → `Foo.snap.ts`.
		resolveSnapshotPath: ( testPath, snapExtension ) => testPath
			.replace( /\.test\.([tj]s)$/, `${ snapExtension }.$1` ),
		coverage: {
			enabled: true,
			// The thresholds are calibrated against Istanbul instrumentation.
			provider: 'istanbul',
			reportsDirectory: 'coverage',
			reporter: [ 'clover', 'json', 'lcov', 'text' ],
			// No `include`: only files loaded by tests are measured. Several docs-site
			// components have no unit tests and the thresholds were set without them.
			exclude: [
				'src/**/*.{test,snap}.ts',
				'src/lib.ts',
				'src/env.d.ts',
				'src/types.ts'
			],
			thresholds: {
				branches: 70,
				functions: 80,
				lines: 80
			}
		}
	}
} );
