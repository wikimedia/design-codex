import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig( {
	plugins: [ vue() ],
	test: {
		environment: 'jsdom',
		globals: true,
		include: [ 'src/**/*.test.ts' ],
		// Do not truncate the case props in test titles and snapshot keys.
		taskTitleValueFormatTruncate: 0,
		// Colocate snapshots with components: `Foo.test.ts` → `Foo.snap.ts`.
		resolveSnapshotPath: ( testPath, snapExtension ) => testPath
			.replace( /\.test\.([tj]s)$/, `${ snapExtension }.$1` ),
		coverage: {
			enabled: true,
			// The thresholds are calibrated against Istanbul instrumentation.
			provider: 'istanbul',
			reportsDirectory: 'coverage',
			reporter: [ 'clover', 'json', 'lcov', 'text' ],
			include: [ 'src/**/*.{ts,vue}' ],
			exclude: [
				'src/**/*.{d,test,snap}.ts',
				// Vitest adds files that match a glob threshold to the global
				// totals. Exclude WIP components to keep them out of the gate.
				'src/components-wip/**',
				'src/constants.ts',
				'src/demo/**',
				'src/lib.ts',
				'src/lib-wip.ts',
				'src/start.ts',
				'src/types.ts',
				'src/testutils/**',
				'src/messages.ts'
			],
			thresholds: {
				branches: 80,
				functions: 80,
				lines: 80
			}
		}
	}
} );
