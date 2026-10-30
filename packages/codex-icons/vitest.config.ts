import { defineConfig } from 'vitest/config';
import rawSvg from './vite-plugin-raw-svg';

export default defineConfig( {
	plugins: [
		rawSvg( {
			include: 'src/images/*.svg'
		} )
	],
	test: {
		globals: true,
		include: [ 'tests/**/*.test.ts' ],
		coverage: {
			enabled: true,
			// The thresholds are calibrated against Istanbul instrumentation.
			provider: 'istanbul',
			reportsDirectory: 'coverage',
			reporter: [ 'clover', 'json', 'lcov', 'text' ],
			include: [ 'src/**/*.ts' ],
			exclude: [
				'src/**/*.d.ts',
				'src/index.ts',
				'src/icons.ts',
				'src/types.ts',
				'src/images/**'
			],
			thresholds: {
				branches: 80,
				functions: 80,
				lines: 80
			}
		}
	}
} );
