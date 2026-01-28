<template>
	<div class="popover-bottom-sheet-demo">
		<div class="popover-bottom-sheet-demo__buttons">
			<cdx-button
				ref="triggerButtonFull"
				@click="showPopoverFull = !showPopoverFull"
			>
				Open Bottom Sheet with long content
			</cdx-button>

			<cdx-button
				ref="triggerButtonMinimal"
				@click="showPopoverMinimal = !showPopoverMinimal"
			>
				Open Bottom Sheet with minimal content
			</cdx-button>
		</div>

		<!-- Full bottom sheet with lorem ipsum content -->
		<cdx-popover
			v-model:open="showPopoverFull"
			use-bottom-sheet
			:anchor="triggerButtonFull"
			:render-in-place="true"
			title="Bottom Sheet with long content"
			:use-close-button="true"
			:primary-action="primaryAction"
			:default-action="defaultAction"
			:stacked-actions="true"
			@default="showPopoverFull = false"
			@primary="onPrimary"
		>
			<template #default>
				<div class="popover-bottom-sheet-demo__content">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat.
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
						dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
					<p>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem
						accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
						illo inventore veritatis et quasi architecto beatae vitae dicta sunt
						explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
						odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
						voluptatem sequi nesciunt.
					</p>

					<cdx-field>
						<cdx-label>Input Field</cdx-label>
						<cdx-text-input
							v-model="inputValue"
							placeholder="Enter some text"
						/>
					</cdx-field>

					<cdx-field>
						<cdx-label>Input Field 2</cdx-label>
						<cdx-text-input
							v-model="inputValue2"
							placeholder="Enter some text here"
						/>
					</cdx-field>
					<p>
						Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
						consectetur, adipisci velit, sed quia non numquam eius modi tempora
						incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
						enim ad minima veniam, quis nostrum exercitationem ullam corporis
						suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
					</p>
					<p>
						At vero eos et accusamus et iusto odio dignissimos ducimus qui
						blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
						et quas molestias excepturi sint occaecati cupiditate non provident,
						similique sunt in culpa qui officia deserunt mollitia animi, id est
						laborum et dolorum fuga.
					</p>
					<p>
						Et harum quidem rerum facilis est et expedita distinctio. Nam libero
						tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
						minus id quod maxime placeat facere possimus, omnis voluptas assumenda
						est, omnis dolor repellendus.
					</p>
				</div>
			</template>
		</cdx-popover>

		<!-- Minimal bottom sheet -->
		<cdx-popover
			v-model:open="showPopoverMinimal"
			use-bottom-sheet
			:anchor="triggerButtonMinimal"
			:render-in-place="true"
			title="Bottom Sheet with minimal content"
			:use-close-button="true"
			:primary-action="primaryAction"
			:default-action="defaultAction"
			:stacked-actions="true"
			@default="showPopoverMinimal = false"
			@primary="onPrimaryMinimal"
		>
			<template #default>
				<p>This is a minimal bottom sheet example with simple content.</p>
			</template>
		</cdx-popover>
	</div>
</template>

<script>
import { defineComponent, ref, useTemplateRef } from 'vue';
import { CdxPopover, CdxButton, CdxField, CdxLabel, CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'PopoverBottomSheet',
	components: {
		CdxPopover,
		CdxButton,
		CdxField,
		CdxLabel,
		CdxTextInput
	},
	setup() {
		const triggerButtonFull = useTemplateRef( 'triggerButtonFull' );
		const triggerButtonMinimal = useTemplateRef( 'triggerButtonMinimal' );
		const showPopoverFull = ref( false );
		const showPopoverMinimal = ref( false );
		const inputValue = ref( '' );
		const inputValue2 = ref( '' );

		const primaryAction = {
			label: 'Save',
			actionType: 'progressive'
		};

		const defaultAction = {
			label: 'Cancel'
		};

		function onPrimary() {
			// eslint-disable-next-line no-console
			console.log( 'Primary action clicked of bottom sheet with long content' );
			showPopoverFull.value = false;
		}

		function onPrimaryMinimal() {
			// eslint-disable-next-line no-console
			console.log( 'Primary action clicked of bottom sheet with minimal content' );
			showPopoverMinimal.value = false;
		}

		return {
			triggerButtonFull,
			triggerButtonMinimal,
			showPopoverFull,
			showPopoverMinimal,
			inputValue,
			inputValue2,
			primaryAction,
			defaultAction,
			onPrimary,
			onPrimaryMinimal
		};
	}
} );
</script>

<style lang="less">
@import (reference) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.popover-bottom-sheet-demo {
	&__buttons {
		display: flex;
		flex-wrap: wrap;
		gap: @spacing-100;
	}

	&__content {
		p {
			margin: 0 0 @spacing-100;
		}
	}
}
</style>
