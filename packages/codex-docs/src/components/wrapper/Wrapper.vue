<template>
	<div class="cdx-demo-wrapper" :class="rootClasses">
		<!--
			Note :key="dir" below is needed to ensure that icons and other things that use
			useComputedDirection rerender when the direction is changed.
		-->
		<div
			:key="direction"
			class="cdx-demo-wrapper__demo-pane"
			:dir="direction"
		>
			<div
				class="vp-raw cdx-demo-wrapper__demo-pane__demo"
				@mousedown.capture="onDemoMousedown"
			>
				<!-- The key is used to allow resetting the component -->
				<slot
					:key="demoRenderKey"
					name="demo"
					:prop-values="componentDemoValues.propValues"
					:slot-values="componentDemoValues.slotValues"
				/>
			</div>
			<div class="cdx-demo-wrapper__demo-pane__demo-controls-wrapper">
				<!-- Align the copy button and the display toggle together. -->
				<div
					v-if="hasCodeSample"
					class="cdx-demo-wrapper__demo-pane__code-buttons"
				>
					<cdx-toggle-button
						v-model="showCode"
						class="cdx-demo-wrapper__demo-pane__code-toggle"
					>
						{{ codeToggleLabel }}
					</cdx-toggle-button>
					<cdx-docs-copy-text-button
						v-show="showCode"
						class="cdx-demo-wrapper__demo-pane__code-copy"
						button-text="Copy code"
						:copy-text="copyTextOrWrapper"
					/>
				</div>
				<cdx-button
					v-if="includeReset"
					class="cdx-demo-wrapper__demo-pane__reset-button"
					weight="quiet"
					@click="onReset"
				>
					Reset demo
				</cdx-button>
			</div>
		</div>
		<div
			v-if="hasCodeSlot"
			v-show="showCode"
			ref="slottedCodeWrapper"
			class="cdx-demo-wrapper__code-slotted"
		>
			<slot name="code" />
		</div>
		<div
			v-else-if="showGeneratedCode"
			v-show="showCode"
			ref="generatedCodeWrapper"
			class="cdx-demo-wrapper__code-generated"
		>
			<div class="language-vue">
				<!-- Carefully avoid leaving whitespace inside the <pre> and <code> tags -->
				<!-- language-markup is used because prism does not support Vue -->
				<pre><code class="language-markup"
				>{{ generatedCode }}</code></pre>
			</div>
		</div>
		<div
			v-if="hasControls"
			class="cdx-demo-wrapper__controls"
			dir="ltr"
		>
			<cdx-docs-controls
				v-model:direction="direction"
				:controls-with-values="controlsWithValues"
				@control-change="handleControlChange"
			/>
		</div>
		<!-- Direction-aware target for any teleport usage in demos -->
		<!--
			This has to be inside the cdx-demo-wrapper div, it can't be a sibling. If the Wrapper
			component outputs multiple root nodes, that triggers a bug in VitePress that breaks
			scoped styles on Wrappers,
		-->
		<div
			ref="teleportTarget"
			class="vp-raw"
			:dir="direction"
		/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	reactive,
	ref,
	computed,
	onMounted,
	watch,
	nextTick,
	PropType,
	provide
} from 'vue';
import {
	ControlConfig,
	ControlsConfig,
	ControlConfigWithValue,
	PropValuesWithIcons,
	SlotValues
} from '../../types';
import Prism from 'prismjs';
import CdxDocsControls from '../controls/Controls.vue';
import CdxDocsCopyTextButton from '../copy-text-button/CopyTextButton.vue';
import useCurrentComponentName from '../../composables/useCurrentComponentName';
import { generateVueTag } from '../../utils/codegen';
import getIconByName from '../../utils/getIconByName';
import { CdxButton, CdxToggleButton, HTMLDirection } from '@wikimedia/codex';
import { DirectionKey } from '../../constants';

// Don't automatically run Prism highlighting, it breaks the VitePress syntax highlighting
// for the code slots since Prism doesn't support Vue (and even if it did it would be unneeded
// since it is already highlighted by VitePress). Highlighting is manually triggered for the
// generated code.
Prism.manual = true;

/**
 * Wrapper for component demos.
 *
 * Includes:
 *  - Formatting for the demo itself
 *  - Reset button to restore the original state of the demo
 *  - Show/hide code button and functionality
 *  - Button to copy the demo code
 *  - Optional controls for configurable demos
 */
export default defineComponent( {
	name: 'CdxDemoWrapper',
	components: { CdxDocsControls, CdxDocsCopyTextButton, CdxButton, CdxToggleButton },
	props: {
		/**
		 * Data for configurable props and slots.
		 */
		controlsConfig: {
			type: Array as PropType<ControlsConfig>,
			default: () => {
				return [];
			}
		},
		/**
		 * Add controls, even if no configuration is provided.
		 *
		 * This allows you to add only the default controls, e.g. direction.
		 */
		forceControls: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether to include a reset option even when there are no configurable properties
		 * and slots. This is intended for components with internal states like an
		 * indeterminate Checkbox or a dismissable Message, where even when there are
		 * no configuration options it should still be possible to reset to restore the
		 * original state. If the user can easily restore the original state (eg clicking
		 * a toggle again or clearing their input) a reset button is unneeded.
		 */
		forceReset: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether to try to generate a code sample for a configurable demonstration,
		 * determining the component name from the current page title.
		 */
		showGeneratedCode: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether to include a v-model attribute for the generated demo code, in which
		 * case this is a string with an appropriate model name, or omitted for no model
		 */
		generatedModelName: {
			type: String,
			default: ''
		},
		/**
		 * Whether to allow normal link styles to be applied to the contents of the Wrapper.
		 *
		 * Useful for components that can contain, for example, paragraphs of text that may
		 * contain links that should be shown with normal link styles.
		 */
		allowLinkStyles: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether to allow normal table styles to be applied to the contents of the Wrapper.
		 *
		 * Use when the demo contains a table.
		 */
		allowTableStyles: {
			type: Boolean,
			default: false
		}
	},
	setup( props, { slots } ) {
		const direction = ref<HTMLDirection>( 'ltr' );
		provide( DirectionKey, direction );

		// Set up a template ref for a demo-specific teleport target. During the
		// mounted hook (when the ref finally exists), provide this target to
		// any teleport-using demo components to ensure that direction-specific
		// styles don't break.
		const teleportTarget = ref<HTMLDivElement>();
		onMounted( () => {
			provide( 'CdxTeleportTarget', teleportTarget.value );
		} );

		// Set up show code/hide code button.
		const hasCodeSlot = !!slots?.code;
		const hasCodeSample = computed( () => hasCodeSlot || props.showGeneratedCode );
		const showCode = ref( false );
		const codeToggleLabel = computed( () => {
			return showCode.value === true ? 'Hide code' : 'Show code';
		} );
		const slottedCodeWrapper = ref<HTMLDivElement>();
		const generatedCodeWrapper = ref<HTMLDivElement>();

		// Set up controls if config is provided.
		const hasControls = computed( () =>
			props.controlsConfig.length > 0 || props.forceControls );

		// Set up reset button if configuration is provided, or if the demo wants to
		// show the button anyway
		const includeReset = computed( () => hasControls.value || props.forceReset );

		const rootClasses = computed( () => {
			return {
				'cdx-demo-wrapper--has-code': hasCodeSample.value,
				'cdx-demo-wrapper--has-reset': includeReset.value,
				'cdx-demo-wrapper--code-expanded': showCode.value,
				'cdx-demo-wrapper--allow-link-styles': props.allowLinkStyles,
				'cdx-demo-wrapper--allow-table-styles': props.allowTableStyles
			};
		} );

		// Work around undesired behavior in VitePress that takes over link click handling.
		// See https://github.com/vuejs/vitepress/issues/591 and T304894.
		// The event handlers run in the following order:
		// - onDemoMousedown (capturing mousedown handler on the demo div)
		// - Component's mousedown handler, if there is one
		// - VitePress's capturing click handler
		// - The capturing click handler on the link bound by onDemoMousedown
		// - Component's click handler, if there is one
		// - Browser's native click behavior, if not prevented
		// Note that onDemoMousedown needs to be a capturing handler, so that it runs before any
		// of the component's mousedown handlers; otherwise, those handlers could stop propagation
		// of the mousedown event, and onDemoMousedown would never run
		const onDemoMousedown = ( event: MouseEvent ) => {
			const link = ( event.target as Element ).closest( 'a' );
			if ( link && event.button === 0 ) {
				// Set target = '_blank' temporarily, so that VitePress's click handler sees that
				// and decides not to take over click handling for this link
				const oldTarget = link.target;
				link.target = '_blank';

				// Bind a capturing click handler that restores the previous value of link.target
				// before the browser's native click handling sees it
				link.addEventListener( 'click', () => {
					link.target = oldTarget;
				}, { capture: true, once: true } );
			}
		};

		/**
		 * Helper to get the default for a control config with early returns for simplicity
		 *
		 * @param {ControlConfig} config
		 * @return string | boolean | number
		 */
		const getAppropriateDefault = ( config: ControlConfig ): string|boolean|number => {
			switch ( config.type ) {
				case 'radio':
					return config.default ?? config.options[ 0 ];
				case 'select':
					return config.default ?? config.menuItems[ 0 ]?.value;
				case 'boolean':
					return config.default ?? false;
				case 'slot':
					// slots always have a default set, because for now
					// slot defaults are the same as initial
					return config.default;
				case 'icon':
				case 'slot-icon':
					// empty string = no icon
					return config.default ?? '';
				case 'text':
				default:
					return config.default ?? '';
			}
		};

		/**
		 * Create a map of the defaults to use for code generation, and for fallback values
		 * for the initial display (including after the component is reset) if there is
		 * no 'initial' value.
		 */
		const defaultControlValues: Record<string, string|boolean|number> = {};
		for ( const control of props.controlsConfig ) {
			defaultControlValues[ control.name ] = getAppropriateDefault( control );
		}

		/**
		 * Initial values to display, also used for when the component is reset. This is
		 * either the 'initial' field of the control, if set, or the default value, if not.
		 */
		const initialControlValues = props.controlsConfig.map(
			( config ) : ControlConfigWithValue => {
				// defaultControlValues only holds values appropriate for the
				// type of the config, but typescript doesn't know that because
				// it is typed as `Record<string, string|boolean|number>` and
				// doesn't realize that the values are okay for the config name,
				// so it complains about trying to assign incompatible types.
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				return {
					...config,
					value: config.initial ?? defaultControlValues[ config.name ]
				};
			}
		);

		/**
		 * Start off the values based on the defaults, making a copy of the default
		 * objects so that they can be used to reset.
		 */
		const controlsWithValues = reactive( initialControlValues.map(
			( config ) : ControlConfigWithValue => ( { ...config } )
		) );

		/**
		 * Store new control value so it can be passed back into the controls
		 * and to the component via the demo slot.
		 *
		 * @param name The prop or slot name
		 * @param value The new value
		 */
		const handleControlChange = ( name: string, value: string | number | boolean ) => {
			const control = controlsWithValues.find( ( c ) => c.name === name );
			if ( control ) {
				control.value = value;
			}
		};

		/**
		 * Split up prop and slot values to be passed to the scoped slot with the component
		 * being demonstrated. It is easier to write the demo if the props and slots are
		 * separate when used by the demo, but to avoid duplication the primary processing
		 * is done together. Here, icon properties have real Icon objects (or undefined)
		 * as their values, but slot icons use icon names, to be handled by cdxDemoSlotIcon.
		 */
		const componentDemoValues = computed( () => {
			const propValues: PropValuesWithIcons = {};
			const slotValues: SlotValues = {};
			for ( const control of controlsWithValues ) {
				if ( control.type === 'slot' || control.type === 'slot-icon' ) {
					slotValues[ control.name ] = control.value;
				} else if ( control.type === 'icon' ) {
					propValues[ control.name ] = getIconByName( control.value );
				} else {
					propValues[ control.name ] = control.value;
				}
			}
			return { propValues, slotValues };
		} );

		// Allow resetting the display, which forces the component to rerender with
		// its initial state
		const demoRenderKey = ref( 1 );
		const onReset = (): void => {
			demoRenderKey.value++;
			for ( const control of controlsWithValues ) {
				const initialControl = initialControlValues.find(
					( c ) => c.name === control.name
				);
				// should always exist, but satisfy typescript checks
				if ( initialControl ) {
					control.value = initialControl.value;
				}
			}
		};

		const currentComponentName = useCurrentComponentName();
		const generatedCode = computed( () => generateVueTag(
			currentComponentName,
			defaultControlValues,
			controlsWithValues,
			props.generatedModelName
		) );

		const copyTextOrWrapper = computed( () => hasCodeSlot && slottedCodeWrapper.value ?
			slottedCodeWrapper.value : generatedCode.value
		);

		/**
		 * Redo the syntax highlighting for the generated code when it changes, and on mount
		 * if automatic code generation is enabled.
		 */
		async function updateHighlight() {
			await nextTick();
			if ( generatedCodeWrapper.value && props.showGeneratedCode ) {
				Prism.highlightAllUnder( generatedCodeWrapper.value );
			}
		}

		// Update code to copy from the generated code when it changes, and rehighlight,
		// also includes when the component is reset
		watch( generatedCode, () => {
			if ( props.showGeneratedCode ) {
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				updateHighlight();
			}
		} );
		// If we are using generated code, highlight it at the start, and use it for
		// the code text so that it can be copied even when there are no changes made
		// (but don't overwrite the code from the slot)
		if ( props.showGeneratedCode ) {
			onMounted( updateHighlight );
		}

		return {
			// Overall wrapper
			rootClasses,

			// Demo pane
			direction,
			onDemoMousedown,

			// Reset button - render key is changed to force rerendering
			demoRenderKey,
			includeReset,
			onReset,

			// Actual demo
			componentDemoValues,

			// Code display and copy button
			hasCodeSlot,
			hasCodeSample,
			showCode,
			codeToggleLabel,
			slottedCodeWrapper,
			copyTextOrWrapper,

			// generated code
			generatedCode,
			generatedCodeWrapper,

			// Interactive controls
			hasControls,
			controlsWithValues,
			handleControlChange,

			// Dialog teleport related
			teleportTarget
		};
	}
} );
</script>

<style lang="less">
// Load the CSS for Prism, so that syntax highlighting works
@import 'prism-themes/themes/prism-dracula.css';
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-wrapper {
	margin-top: @spacing-100;

	&__demo-pane {
		position: relative;
		border: @border-subtle;
		border-radius: @border-radius-base;
		padding: @spacing-200 @spacing-125;

		// Wrapper containing the demo controls: Reset button, show code toggle and
		// copy code button.
		&__demo-controls-wrapper {
			display: flex;
			justify-content: space-between;
			position: absolute;
			// Overlap demo pane border.
			right: @position-offset-border-width-base;
			bottom: @position-offset-border-width-base;
			left: @position-offset-border-width-base;
			font-size: @font-size-small;
		}

		// Since the buttons are always on the right, ensure they retain their order so that in
		// RTL demo view the appearance of the copy button doesn't result in moving the
		// display toggle.
		&__code-buttons {
			direction: ltr;

			// Remove border radiuses that connect with other borders for a more streamlined
			// appearance. These buttons are pinned to the bottom right edge of the demo pane and
			// their borders overlap with the demo pane's border, so the border radiuses in corners
			// that touch the demo pane border should be removed to form a right angle (rather than
			// a curved one). Similarly, the border radiuses where the buttons touch each other
			// should be removed. See T307394.
			.cdx-demo-wrapper__demo-pane__code-toggle,
			.cdx-demo-wrapper__demo-pane__code-copy {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}

			.cdx-demo-wrapper__demo-pane__code-copy {
				border-bottom-left-radius: 0;
			}
		}

		// Set consistent margins on p elements (to override browser styles).
		p {
			margin: 0 0 @spacing-100;
		}

		p:last-child {
			margin-bottom: 0;
		}

		// Special styles for text within the demo pane, e.g. a label for the selected value.
		.cdx-docs-demo-text {
			font-weight: var( --font-weight-bold );
		}
	}

	// Demos don't get link styles from VitePress because of the `vp-raw` class, but sometimes we
	// want properly styled links (like in the content of a Message demo). This class is added when
	// the `allow-link-styles` prop is provided to the Wrapper.
	&--allow-link-styles {
		a {
			color: @color-progressive;
			text-decoration: @text-decoration-none;
		}

		a:hover {
			text-decoration: @text-decoration-underline;
		}
	}

	&--allow-table-styles {
		// Add some table styles.
		table {
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			border-collapse: collapse;
		}

		th {
			text-align: left;
		}

		th,
		td {
			border: @border-subtle;
			padding: @spacing-50 @spacing-75;
			font-size: @font-size-small;
		}
	}

	// Add some space below the component demo to ensure it never collides with the buttons
	// to toggle the code display and to copy the code text, if there are such buttons
	&--has-reset &__demo-pane__demo,
	&--has-code &__demo-pane__demo {
		margin-bottom: @spacing-200;
	}

	// When code is expanded, remove all of the code toggle button's border radiuses.
	&--code-expanded &__demo-pane__code-toggle {
		border-radius: 0;
	}

	// Code output underneath component with code language class, for example `language-vue`.
	// Element selectors needed to override VitePress styles.
	&__code-generated div[ class*='language-' ],
	&__code-slotted div[ class*='language-' ] {
		margin-top: 0;
		border-radius: 0 0 @border-radius-base @border-radius-base;
	}

	// Special styles for code groups (for code samples with multiple versions).
	/* stylelint-disable selector-class-pattern */
	.vp-code-group {
		margin-top: 0;

		.tabs {
			border-radius: 0 0 @border-radius-base @border-radius-base;
		}
	}
	/* stylelint-enable selector-class-pattern */
}
</style>
