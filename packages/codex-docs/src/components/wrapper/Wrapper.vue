<template>
	<div class="cdx-demo-wrapper" :class="rootClasses">
		<!--
			Note :key="dir" below is needed to ensure that icons and other things that use
			useComputedDirection rerender when the direction is changed
		-->
		<div
			:key="dir"
			class="cdx-demo-wrapper__demo-pane"
			:dir="dir"
		>
			<cdx-button
				v-if="includeReset"
				class="cdx-demo-wrapper__demo-pane__reset-button"
				type="quiet"
				@click="onReset"
			>
				Reset
			</cdx-button>
			<div class="cdx-demo-wrapper__demo-pane__demo" @mousedown.capture="onDemoMousedown">
				<!-- The key is used to allow resetting the component -->
				<slot
					:key="demoRenderKey"
					name="demo"
					:prop-values="propValues"
					:slot-values="slotValues"
				/>
			</div>
			<!-- Align the copy button and the display toggle together -->
			<div
				v-if="hasCodeSample"
				class="cdx-demo-wrapper__demo-pane__code-buttons"
			>
				<cdx-docs-copy-text-button
					v-show="showCode"
					class="cdx-demo-wrapper__demo-pane__code-copy"
					button-text="Copy code"
					:copy-text="codeText"
				/>
				<cdx-toggle-button
					v-model="showCode"
					class="cdx-demo-wrapper__demo-pane__code-toggle"
				>
					{{ codeToggleLabel }}
				</cdx-toggle-button>
			</div>
		</div>
		<div
			v-if="hasCodeSlot"
			v-show="showCode"
			class="cdx-demo-wrapper__code-slotted"
		>
			<slot name="code" />
		</div>
		<div
			v-else-if="hasGeneratedCode"
			v-show="showCode"
			ref="codeDiv"
			class="cdx-demo-wrapper__code-generated"
		>
			<div class="language-vue">
				<!-- Carefully avoid leaving whitespace inside the <pre> and <code> tags -->
				<!-- language-markup is used because prism does not support Vue -->
				<pre><code class="language-markup"
				>{{ generatedCode }}</code></pre>
			</div>
		</div>
		<div v-if="hasControls" class="cdx-demo-wrapper__controls">
			<cdx-docs-controls
				dir="ltr"
				:controls-with-values="controlsWithValues"
				@control-change="handleControlChange"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	reactive,
	ref,
	computed,
	inject,
	onMounted,
	toRef,
	watch,
	nextTick,
	PropType
} from 'vue';
import {
	ControlsConfig,
	ControlConfigWithValue,
	PropValues,
	PropValuesWithIcons,
	SlotValues,
	BoundProp,
	EscapedSlotContent
} from '../../types';
import Prism from 'prismjs';
import escapeHtml from 'escape-html';
import { DirectionKey } from '../../constants';
import CdxDocsControls from '../controls/Controls.vue';
import CdxDocsCopyTextButton from '../copy-text-button/CopyTextButton.vue';
import { useRoute } from 'vitepress';
import { generateVueTag } from '../../utils/codegen';
import toKebabCase from '../../utils/toKebabCase';
import { CdxButton, CdxToggleButton } from '@wikimedia/codex';
import * as allIcons from '@wikimedia/codex-icons';
import { Icon } from '@wikimedia/codex-icons';

// Don't automatically run Prism highlighting, it breaks the VitePress syntax highlighting
// for the code slots since Prism doesn't support Vue (and even if it did it would be unneeded
// since it is already highlighted by VitePress). Highlighting is manually triggered for the
// generated code.
Prism.manual = true;

// Access to icon objects by name
const iconsByName = {} as Record<string, Icon>;
for ( const iconName in allIcons ) {
	const icon = allIcons[ iconName as keyof typeof allIcons ];
	// Some of the exports are utility functions, filter those out
	if ( typeof icon === 'function' ) {
		continue;
	}
	// Add to known map
	iconsByName[ iconName ] = icon;
}

/**
 * Wrapper for component demos.
 *
 * Includes:
 *  - Formatting for the demo itself
 *  - Show/hide code button and functionality
 *  - Button to copy the demo code
 *  - Reset button to restore the original state of the demo
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
		}
	},
	setup( props, { slots } ) {
		// Inject direction from CustomLayout.vue
		const dir = inject( DirectionKey );
		const route = useRoute();

		// Determine the component name to use if sample code should be generated
		const hasGeneratedCode = toRef( props, 'showGeneratedCode' );
		const autoCodeTag = computed( () => {
			if ( !hasGeneratedCode.value ) {
				return '';
			}
			// Should be `cdx-*` kebab case component name. The easiest way
			// to get the name of the component being shown is from the
			// title of the current page, from the route.
			const componentTitle = route.data.title;
			return 'cdx-' + toKebabCase( componentTitle );
		} );

		// Set up show code/hide code button.
		const hasCodeSlot = slots && slots.code;
		const hasCodeSample = computed( () => {
			return hasCodeSlot || hasGeneratedCode.value;
		} );
		const showCode = ref( false );
		const codeToggleLabel = computed( () => {
			return showCode.value === true ? 'Hide code' : 'Show code';
		} );
		const codeDiv = ref<HTMLDivElement>();

		// Set up controls if config is provided.
		const hasControls = ref( props.controlsConfig.length > 0 );

		// Set up reset button if configuration is provided, or if the demo wants to
		// show the button anyway
		const includeReset = computed( () => {
			return hasControls.value || props.forceReset;
		} );

		const rootClasses = computed( () => {
			return {
				'cdx-demo-wrapper--has-code': hasCodeSample.value,
				'cdx-demo-wrapper--has-reset': includeReset.value,
				'cdx-demo-wrapper--code-expanded': showCode.value
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
		 * Create a map of the defaults to use for resetting. Because the default values
		 * of some of the types can be undefined, which cannot be used as the
		 * actual value of the object, when filling in missing defaults they are saved
		 * as the "value" of the objects to simplify typescript handling. The default
		 * value is used as the initial value, and will be either the provided default or
		 * an appropriate default based on the control type.
		 */
		const defaultControlValues = props.controlsConfig.map(
			( config ) : ControlConfigWithValue => {
				switch ( config.type ) {
					case 'radio':
						return { ...config, value: config.default ?? config.options[ 0 ] };
					case 'boolean':
						return { ...config, value: config.default ?? false };
					case 'slot':
						return { ...config, value: config.default };
					// Icon also uses empty string as default, meaning no icon
					case 'icon':
					case 'slot-icon':
						return { ...config, value: config.default ?? '' };
					case 'text':
					default:
						return { ...config, value: config.default ?? '' };
				}
			}
		);

		/**
		 * Start off the values based on the defaults, making a copy of the default
		 * objects so that they can be used to reset.
		 */
		const controlsWithValues = reactive( defaultControlValues.map(
			( config ) : ControlConfigWithValue => {
				return { ...config };
			}
		) );

		/**
		 * Redo the syntax highlighting for the generated code when it changes. This is called when
		 * a control value changes, when the tag name changes, and on mount if automatic code
		 * generation is enabled.
		 */
		function updateHighlight() : void {
			// can't use void with nextTick() to satisfy typescript, because then it
			// complains about not using `undefined` instead (no-void), we don't care
			// about the promise returned
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			nextTick( () => {
				if ( codeDiv.value && hasGeneratedCode.value ) {
					Prism.highlightAllUnder( codeDiv.value );
				}
			} );
		}

		/**
		 * Store new control value so it can be passed back into the controls
		 * and to the component via the demo slot. Also re-highlight the source code, if
		 * needed.
		 *
		 * @param name The prop or slot name
		 * @param value The new value
		 */
		const handleControlChange = ( name: string, value: string | number | boolean ) => {
			const control = controlsWithValues.find( ( c ) => c.name === name );
			if ( control ) {
				control.value = value;
			}
			if ( hasGeneratedCode.value ) {
				updateHighlight();
			}
		};

		/**
		 * Pull out prop values so we can pass them to the scoped slot, for use in component demos.
		 * It will be easier to write a demo if the props and slots are separated. Here, the
		 * icon properties have real Icon objects as their values, rather than the icon name.
		 */
		const propValues = computed( () => {
			const constructedPropValues = {} as PropValuesWithIcons;
			for ( const control of controlsWithValues ) {
				// Convert icon props from the value being the icon name to the
				// actual icon object (or undefined if not given)
				if ( control.type === 'icon' ) {
					constructedPropValues[ control.name ] = iconsByName[ control.value ];
				} else if ( control.type !== 'slot' && control.type !== 'slot-icon' ) {
					constructedPropValues[ control.name ] = control.value;
				}
			}
			return constructedPropValues;
		} );

		/**
		 * Pull out slot values for the same reason as props above, using icon names for
		 * slot icon contents, to be handled by cdxDemoSlotIcon
		 */
		const slotValues = computed( () => {
			const constructedSlotValues = {} as SlotValues;
			for ( const control of controlsWithValues ) {
				if ( control.type === 'slot' || control.type === 'slot-icon' ) {
					constructedSlotValues[ control.name ] = control.value;
				}
			}
			return constructedSlotValues;
		} );

		/**
		 * Pull out slot values for the same reason as props above, for slots with icons
		 * escape the text and wrap the overall content in an EscapedSlotContent object
		 * so that codegen does not escape the brackets for the <cdx-icon> usage, and
		 * does not double-escape the slot text
		 */
		const slotValueStrings = computed( () => {
			const constructedSlotValues = {} as SlotValues;
			for ( const control of controlsWithValues ) {
				if ( control.type === 'slot' ) {
					constructedSlotValues[ control.name ] = control.value;
				}
			}
			// Add icons afterwords to ensure content does not override them
			for ( const control of controlsWithValues ) {
				if ( control.type !== 'slot-icon' || !control.value ) {
					continue;
				}
				// remove the -icon at the end
				const targetSlotName = control.name.slice(
					0,
					control.name.length - 5
				);
				if ( constructedSlotValues[ targetSlotName ] === undefined ) {
					continue;
				}
				// If there is already text for the slot, we need to escape it
				// here, don't add an extra space if there is no text
				let slotDisplayText = '<cdx-icon :icon="' + control.value + '" />';
				if ( constructedSlotValues[ targetSlotName ] ) {
					slotDisplayText += ' ' + escapeHtml(
						constructedSlotValues[ targetSlotName ] as string
					);
				}
				constructedSlotValues[ targetSlotName ] = new EscapedSlotContent(
					slotDisplayText
				);
			}
			return constructedSlotValues;
		} );

		// Allow resetting the display, which forces the component to rerender with
		// its initial state
		const demoRenderKey = ref( 1 );
		const onReset = (): void => {
			demoRenderKey.value++;
			for ( const control of controlsWithValues ) {
				const defaultControl = defaultControlValues.find(
					( c ) => c.name === control.name
				);
				// should always exist, but satisfy typescript checks
				if ( defaultControl ) {
					control.value = defaultControl.value;
				}
			}
			// Update highlighting
			if ( hasGeneratedCode.value ) {
				updateHighlight();
			}
		};

		/**
		 * If there is a code slot, this retrieves the content of that slot for copying,
		 * which cannot be done until after the component is mounted. If not, if there
		 * is generated code this will be updated with the generated content below.
		 */
		const codeText = ref( 'Unused' );
		if ( hasCodeSlot ) {
			onMounted( () => {
				// Satisfy typescript, already checked by hasCodeSlot
				if ( slots && slots.code ) {
					const codeSlotNodeElement = slots.code()[ 0 ].el;
					// Typescript complains that this might be null
					if ( codeSlotNodeElement ) {
						codeText.value = codeSlotNodeElement.innerText;
					}
				}
			} );
		}

		const nonDefaultPropValues = computed( () => {
			const valuesByName = {} as PropValues;
			// Cannot just reuse the propValues filtering of excluding slots, because
			// that converts icon props to have the actual icon object as the value,
			// instead of the icon name, but the generated code display should use
			// the icon name
			for ( const control of controlsWithValues ) {
				if ( control.type === 'slot' || control.type === 'slot-icon' ) {
					continue;
				}
				const propName = control.name;
				const propVal = control.value;
				const defaultControl = defaultControlValues.find(
					( c ) => c.name === propName
				);
				// Should always exist, but satisfy typescript
				if ( !(
					defaultControl &&
					defaultControl.value !== propVal
				) ) {
					continue;
				}
				// For icon properties, wrap the value in a BoundProp,
				// so that the code generation does not try to use it
				// as a literal string value with v-bind syntax, but only
				// when the value is set (not null or undefined), otherwise
				// we want the generateVueTag() to exclude the value
				if ( defaultControl.type === 'icon' &&
					typeof propVal === 'string'
				) {
					valuesByName[ propName ] = new BoundProp( propVal );
				} else {
					valuesByName[ propName ] = propVal;
				}
			}
			return valuesByName;
		} );

		const generatedCode = computed( () => generateVueTag(
			autoCodeTag.value, nonDefaultPropValues.value, slotValueStrings.value
		) );

		watch( autoCodeTag, updateHighlight );
		if ( autoCodeTag.value ) {
			onMounted( updateHighlight );
		}

		// Update code to copy from the generated code when it changes
		watch(
			generatedCode,
			() => {
				if ( hasGeneratedCode.value ) {
					codeText.value = generatedCode.value;
				}
			}
		);
		// Set initial starting code text to the first generated code, so that it can
		// be copied even when there are no changes made to it (but don't overwrite the
		// code from the slot)
		if ( hasGeneratedCode.value ) {
			codeText.value = generatedCode.value;
		}

		return {
			// Overall wrapper
			rootClasses,

			// Demo pane
			dir,
			onDemoMousedown,

			// Reset button - render key is changed to force rerendering
			demoRenderKey,
			includeReset,
			onReset,

			// Actual demo
			propValues,
			slotValues,

			// Code display and copy button
			hasCodeSlot,
			hasCodeSample,
			showCode,
			codeToggleLabel,
			codeText,

			// generated code
			hasGeneratedCode,
			codeDiv,
			generatedCode,

			// Interactive controls
			hasControls,
			controlsWithValues,
			handleControlChange,

			// exported for testing only, see the "computes demo text for slots"
			// tests
			// eslint-disable-next-line vue/no-unused-properties
			slotValueStrings
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

// TODO: Tokenize. Also in use in TypeaheadSearch.
@border-color-heading: @color-base70;

.cdx-demo-wrapper {
	margin-top: 16px;

	&__demo-pane {
		position: relative;
		border: @border-width-base @border-style-base @border-color-heading;
		border-radius: @border-radius-base;
		padding: 24px;

		&__reset-button {
			position: absolute;
			top: 0;
			right: 0;
			font-size: 0.875em;
		}

		// Since the buttons are always on the right, ensure they retain their order
		// so that in RTL view the appearance of the copy button doesn't result in
		// moving the display toggle. TODO should these buttons be on the left when
		// in RTL? In which case the absolute position should be revisited
		&__code-buttons {
			position: absolute;
			// Overlap demo pane border.
			right: @position-offset-border-width-base;
			bottom: @position-offset-border-width-base;
			direction: ltr;
			font-size: 0.875em;

			// Remove border radiuses that connect with other borders for a more streamlined
			// appearance. These buttons are pinned to the bottom right edge of the demo pane and
			// their borders overlap with the demo pane's border, so the border radiuses in corners
			// that touch the demo pane border should be removed to form a right angle (rather than
			// a curved one). Similarly, the border radiuses where the buttons touch each other
			// should be removed. See T307394.
			.cdx-demo-wrapper__demo-pane__code-toggle,
			.cdx-demo-wrapper__demo-pane__code-copy {
				border-top-right-radius: 0;
				border-bottom-left-radius: 0;
			}

			.cdx-demo-wrapper__demo-pane__code-copy {
				border-bottom-right-radius: 0;
			}
		}

		// TODO: We need to unset all global styles inside this element to keep them from
		// polluting component demos. For now, manually undo styles that are causing issues.
		a {
			color: inherit;

			&:hover {
				text-decoration: none;
			}
		}
	}

	// Add some space above the component demo to ensure that it does not collide with the
	// reset button, if there is such a button included
	&--has-reset &__demo-pane__demo {
		margin-top: 16px;
	}

	// Add some space below the component demo to ensure it never collides with the buttons
	// to toggle the code display and to copy the code text, if there are such buttons
	&--has-code &__demo-pane__demo {
		margin-bottom: 16px;
	}

	// When code is expanded, remove all of the code toggle button's border radiuses.
	&--code-expanded &__demo-pane__code-toggle {
		border-radius: 0;
	}

	// Code output underneath component with code language class, for example `language-vue`.
	&__code-generated [ class*='language-' ],
	&__code-slotted [ class*='language-' ] {
		margin-top: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
}
</style>
