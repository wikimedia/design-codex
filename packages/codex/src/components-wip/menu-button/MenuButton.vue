<template>
	<div
		class="cdx-menu-button"
		:class="rootClasses"
		:style="rootStyle"
	>
		<cdx-toggle-button
			:id="toggleId"
			ref="toggle"
			v-bind="otherAttrs"
			v-model="expanded"
			:disabled="computedDisabled"
			quiet
			aria-haspopup="menu"
			:aria-controls="menuId"
			:aria-expanded="expanded"
			@blur="expanded = false"
			@keydown="onKeydown"
		>
			<!-- @slot MenuButton content -->
			<slot />
		</cdx-toggle-button>
		<div class="cdx-menu-button__menu-wrapper">
			<cdx-menu
				:id="menuId"
				ref="menu"
				v-model:selected="modelWrapper"
				v-model:expanded="expanded"
				:menu-items="menuItems"
				v-bind="menuConfig"
				role="menu"
				:aria-labelledby="toggleId"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import {
	PropType,
	Ref,
	ComponentPublicInstance,
	defineComponent,
	ref,
	toRef
} from 'vue';

import CdxToggleButton from '../../components/toggle-button/ToggleButton.vue';
import CdxMenu from '../../components/menu/Menu.vue';
import useFieldData from '../../composables/useFieldData';
import useFloatingMenu from '../../composables/useFloatingMenu';
import useGeneratedId from '../../composables/useGeneratedId';
import useModelWrapper from '../../composables/useModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';
import { MenuButtonItemData, MenuConfig } from '../../types';

export default defineComponent( {
	name: 'CdxMenuButton',
	components: {
		CdxToggleButton,
		CdxMenu
	},
	inheritAttrs: false,
	props: {
		/**
		 * Value of the current selection.
		 *
		 * Must be bound with `v-model:selected`.
		 */
		selected: {
			type: [ String, Number, null ] as PropType<string|number|null>,
			required: true
		},

		/**
		 * Menu items. See the MenuItemData type.
		 */
		menuItems: {
			type: Array as PropType<MenuButtonItemData[]>,
			required: true
		},

		/**
		 * Configuration for various menu features. All properties default to false.
		 *
		 * See the MenuConfig type.
		 */
		menuConfig: {
			type: Object as PropType<MenuConfig>,
			default: () => {
				return {} as MenuConfig;
			}
		},

		/**
		 * Whether the dropdown is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},

	emits: [
		/**
		 * When the selected value changes.
		 *
		 * @property {string | number} selected The new selected value
		 */
		'update:selected'
	],

	setup( props, { emit, attrs } ) {
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const toggle = ref<InstanceType<typeof CdxToggleButton>>();
		const selectedProp = toRef( props, 'selected' );
		const modelWrapper = useModelWrapper( selectedProp, emit, 'update:selected' );
		const expanded = ref( false );
		const toggleId = useGeneratedId( 'menuToggle' );
		const menuId = useGeneratedId( 'menu' );
		const { computedDisabled } = useFieldData( toRef( props, 'disabled' ) );

		// Get helpers from useSplitAttributes() composable.
		const { rootClasses, rootStyle, otherAttrs } = useSplitAttributes( attrs );

		function onKeydown( e: KeyboardEvent ) {
			if (
				!menu.value ||
				computedDisabled.value ||
				props.menuItems.length === 0 ||
				e.key === ' '
			) {
				return;
			}
			menu.value.delegateKeyNavigation( e );
		}

		useFloatingMenu( toggle as Ref<ComponentPublicInstance>, menu, {
			useAvailableWidth: true,
			placement: 'bottom-start',
			offset: 4
		} );

		return {
			computedDisabled,
			expanded,
			menu,
			menuId,
			modelWrapper,
			onKeydown,
			toggle,
			toggleId,
			rootClasses,
			rootStyle,
			otherAttrs
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-menu-button {
	&__menu-wrapper {
		position: relative;
	}

	.cdx-menu {
		min-width: @size-800;
		max-width: @size-1600;
	}

	// Overrides when used within a Dialog component
	.cdx-dialog & {
		// The menu is positioned relative to the dialog backdrop, not the triggering element.
		position: static;
	}
}
</style>
