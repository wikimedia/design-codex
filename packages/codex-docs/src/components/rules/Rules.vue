<template>
	<div class="cdx-demo-rules cdx-docs-grid cdx-docs-grid-columns-2">
		<div class="cdx-demo-rules__do">
			<div class="cdx-demo-rules__media">
				<slot name="do-media" />
			</div>

			<div class="cdx-demo-rules__text">
				<span class="cdx-demo-rules__label">
					<cdx-icon
						class="cdx-demo-rules__icon"
						:icon="cdxIconSuccess"
						size="small"
					/>
					{{ doLabel }}
				</span>
				<slot name="do-text" />
			</div>
		</div>

		<div class="cdx-demo-rules__dont">
			<div class="cdx-demo-rules__media">
				<slot name="dont-media" />
			</div>

			<div class="cdx-demo-rules__text">
				<span class="cdx-demo-rules__label">
					<cdx-icon
						class="cdx-demo-rules__icon"
						:icon="cdxIconClear"
						size="small"
					/>
					{{ dontLabel }}
				</span>
				<slot name="dont-text" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent
} from 'vue';
import { cdxIconSuccess, cdxIconClear } from '@wikimedia/codex-icons';
import { CdxIcon } from '@wikimedia/codex';

/**
 * Side-by-side comparison of recommended and not recommended methods.
 */
export default defineComponent( {
	name: 'CdxDemoRules',
	components: { CdxIcon },
	props: {
		/**
		 * Label for the "do" section.
		 */
		doLabel: {
			type: String,
			default: 'Do: '
		},
		/**
		 * Label for the "don't" section.
		 */
		dontLabel: {
			type: String,
			default: 'Don\'t: '
		}
	},
	setup() {

		return {
			cdxIconSuccess,
			cdxIconClear
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

@border-width-rules: @border-width-thick * 2;
@border-color-do: @color-success;
@border-color-dont: @color-error;

.cdx-demo-rules {
	&.cdx-docs-grid-columns-2 {
		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			grid-gap: @spacing-100;
		}
	}

	&__media {
		background-color: @background-color-interactive-subtle;
	}

	&__text {
		border-top-width: @border-width-rules;
		border-top-style: @border-style-base;
		padding-top: @spacing-100;
	}

	&__label {
		display: flex;
		align-items: center;
		gap: @spacing-25;
		font-weight: @font-weight-bold;
	}

	&__do {
		margin-bottom: @spacing-100;

		@media screen and ( min-width: @min-width-breakpoint-tablet ) {
			margin-bottom: 0;
		}

		.cdx-demo-rules__text {
			border-top-color: @border-color-do;
		}

		.cdx-demo-rules__label,
		.cdx-demo-rules__icon {
			color: @color-success;
		}
	}

	&__dont {
		.cdx-demo-rules__text {
			border-top-color: @border-color-dont;
		}

		.cdx-demo-rules__label,
		.cdx-demo-rules__icon {
			color: @color-error;
		}
	}

	ol,
	ul,
	p {
		margin: 0;
	}
}
</style>
