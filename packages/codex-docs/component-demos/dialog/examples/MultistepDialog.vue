<template>
	<cdx-button @click="open = true">
		Open Dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			title="Onboarding dialog"
			class="cdx-demo-onboarding-dialog"
		>
			<template #header>
				<div class="cdx-demo-onboarding-dialog__header-top">
					<h2>Introduction</h2>
					<cdx-button
						weight="quiet"
						@click="onClose"
					>
						Skip all
					</cdx-button>
				</div>

				<div class="cdx-demo-onboarding-dialog__stepper">
					<div class="cdx-demo-onboarding-dialog__stepper__label">
						{{ ( currentStep + 1 ) + ' of 3' }}
					</div>
					<div class="cdx-demo-onboarding-dialog__stepper__steps" aria-hidden>
						<span
							v-for="step of [ 0, 1, 2 ]"
							:key="step"
							class="cdx-demo-onboarding-dialog__stepper__step"
							:class="getStepClass( step )"
						/>
					</div>
				</div>
			</template>

			<div class="cdx-demo-onboarding-dialog__image">
				<img :src="images[ currentStep ]" alt="">
			</div>

			<div class="cdx-demo-onboarding-dialog__text">
				<template v-if="currentStep === 0">
					<strong>Adding links will help people learn faster.</strong>
					<p>You'll decide whether words in one article should link to other articles.</p>
					<p>No special knowledge about the article is needed to do this task.</p>
				</template>

				<template v-if="currentStep === 1">
					<strong>Suggested links are machine-generated, and can be incorrect.</strong>
					<p>
						The suggestions might be on words that don’t need them, or might link to the
						wrong article. Use your judgment to decide whether they are right or wrong.
					</p>
				</template>

				<template v-if="currentStep === 2">
					<strong>Guidelines</strong>
					<ul>
						<li>Link concepts that a reader might want to learn more about.</li>
						<li>Make sure the link is going to the right article.</li>
						<li>Don't link common words, years, or dates.</li>
						<li>If you're not sure, skip.</li>
					</ul>
				</template>
			</div>

			<template #footer>
				<cdx-checkbox v-model="checkboxValue" :inline="true">
					Don't show again
				</cdx-checkbox>

				<div class="cdx-demo-onboarding-dialog__actions">
					<cdx-button
						v-if="currentStep > 0"
						aria-label="Previous"
						@click="onDefaultAction"
					>
						<cdx-icon :icon="cdxIconPrevious" />
					</cdx-button>

					<cdx-button
						weight="primary"
						action="progressive"
						aria-label="Next"
						@click="onPrimaryAction"
					>
						<cdx-icon v-if="currentStep < 2" :icon="cdxIconNext" />
						<template v-if="currentStep === 2">
							Get started
						</template>
					</cdx-button>
				</div>
			</template>
		</cdx-dialog>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog, CdxCheckbox, CdxIcon } from '@wikimedia/codex';
import { cdxIconNext, cdxIconPrevious } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'MultistepDialog',
	components: {
		CdxButton,
		CdxDialog,
		CdxCheckbox,
		CdxIcon
	},
	setup() {
		const open = ref( false );

		const checkboxValue = ref( false );

		const currentStep = ref( 0 );
		const images = [
			'../../../assets/components/dialog-onboarding-image1-ltr.svg',
			'../../../assets/components/dialog-onboarding-image2-ltr.svg',
			'../../../assets/components/dialog-onboarding-image3-ltr.svg'
		];

		/**
		 * Close the dialog and reset to step 1.
		 */
		function onClose() {
			currentStep.value = 0;
			open.value = false;
		}

		/**
		 * If this is step 1 or 2, go to the next step. Otherwise, close the dialog.
		 */
		function onPrimaryAction() {
			if ( currentStep.value < 2 ) {
				currentStep.value++;
			} else {
				onClose();
			}
		}

		/**
		 * Go back a step.
		 */
		function onDefaultAction() {
			currentStep.value--;
		}

		function getStepClass( step ) {
			return {
				'cdx-demo-onboarding-dialog__stepper__step--active': step <= currentStep.value
			};
		}

		return {
			open,
			checkboxValue,
			currentStep,
			images,
			onClose,
			onPrimaryAction,
			onDefaultAction,
			getStepClass,
			cdxIconNext,
			cdxIconPrevious
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-onboarding-dialog {
	// Attempt to keep all 3 slides the same height.
	/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
	min-height: 530px;

	header {
		padding: @spacing-100 @spacing-150;

		h2 {
			margin: 0;
			padding: 0;
			font-size: @font-size-large;
		}
	}

	&__header-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__stepper {
		display: flex;
		align-items: center;
		gap: @spacing-50;

		&__label {
			color: @color-subtle;
			font-size: @font-size-small;
		}

		&__steps {
			display: flex;
			gap: @spacing-50;
		}

		&__step {
			// TODO: rebase onto main to get @background-color-interactive--active
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			background-color: #c8ccd1;
			display: block;
			width: @size-75;
			height: @size-75;
			border-radius: @border-radius-circle;

			&--active {
				background-color: @color-base;
			}
		}
	}

	.cdx-dialog__body {
		padding: 0 0 @spacing-100;
	}

	&__image {
		background-color: @background-color-progressive-subtle;
		display: flex;
		justify-content: center;

		img {
			display: block;
		}
	}

	&__text {
		padding: @spacing-100 @spacing-150;

		p {
			margin: @spacing-50 0 0;
			font-size: @font-size-small;
		}

		ul {
			margin: 0;
			padding-left: @spacing-150;
		}

		li {
			font-size: @font-size-small;
		}
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: @border-subtle;
		padding: @spacing-100 @spacing-150;
	}

	&__actions {
		display: flex;
		gap: @spacing-50;
	}
}
</style>
