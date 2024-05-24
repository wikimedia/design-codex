<template>
	<div class="cdx-menu-button">
		<cdx-toggle-button
			:id="toggleId"
			ref="toggle"
			v-model="expanded"
			:disabled="computedDisabled"
			quiet
			aria-haspopup="menu"
			:aria-label="toggleButtonLabel"
			:aria-controls="menuId"
			:aria-expanded="expanded"
			@blur="expanded = false"
			@keydown="onKeydown"
		>
			<!-- @slot MenuButton content -->
			<slot>
				<cdx-icon :icon="cdxIconEllipsis" />
			</slot>
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
import CdxIcon from '../../components/icon/Icon.vue';
import useFieldData from '../../composables/useFieldData';
import useFloatingMenu from '../../composables/useFloatingMenu';
import useGeneratedId from '../../composables/useGeneratedId';
import useModelWrapper from '../../composables/useModelWrapper';
import { MenuButtonItemData, MenuConfig } from '../../types';
import { cdxIconEllipsis } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'CdxMenuButton',
	components: {
		CdxToggleButton,
		CdxIcon,
		CdxMenu
	},

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
		 * Label text for the toggle button
		 *
		 * An icon-only toggle button will be used to open or close the menu on click.  This prop is
		 * for the hidden button label required for accessibility purposes and tooltip text.
		 */
		toggleButtonLabel: {
			type: String,
			required: true
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

	setup( props, { emit } ) {
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const toggle = ref<InstanceType<typeof CdxToggleButton>>();
		const selectedProp = toRef( props, 'selected' );
		const modelWrapper = useModelWrapper( selectedProp, emit, 'update:selected' );
		const expanded = ref( false );
		const toggleId = useGeneratedId( 'menuToggle' );
		const menuId = useGeneratedId( 'menu' );
		const { computedDisabled } = useFieldData( toRef( props, 'disabled' ) );

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
			cdxIconEllipsis,
			computedDisabled,
			expanded,
			menu,
			menuId,
			modelWrapper,
			onKeydown,
			toggle,
			toggleId
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
		max-width: @size-2400;
	}

	// Overrides when used within a Dialog component
	.cdx-dialog & {
		// The menu is positioned relative to the dialog backdrop, not the triggering element.
		position: static;
	}
}
</style>
