<template>
	<section id="cdx-dialog">
		<h2>Dialog</h2>
		<p>
			<cdx-button @click="showDialog1 = true">
				Dialog with teleport disabled
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog2 = true">
				Dialog with no header
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog3 = true">
				Dialog with title, subtitle, and footer text
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog4 = true">
				Minimum possible Dialog
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog5 = true">
				Class fallthrough example
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog6 = true">
				Custom dialog example
			</cdx-button>

			&nbsp;

			<cdx-button @click="showDialog7 = true">
				With menu components
			</cdx-button>
		</p>

		<cdx-dialog
			v-model:open="showDialog1"
			close-button-label="close"
			:stacked-actions="true"
			:render-in-place="true"
			:primary-action="{ actionType: 'progressive', label: 'Sweet!' }"
			:default-action="{ label: 'Bummer' }"
			title="Example Dialog 1"
			@default="showDialog1 = false"
			@primary="showDialog1 = false"
		>
			<p>This dialog is displayed in-place</p>
		</cdx-dialog>

		<cdx-dialog
			v-model:open="showDialog2"
			target="#teleport-target"
			:primary-action="{ actionType: 'destructive', label: 'Destroy!' }"
			:default-action="{ label: 'Cancel' }"
			title="Example Dialog 2"
			:hide-title="true"
			@default="showDialog2 = false"
			@primary="showDialog2 = false"
		>
			<p>
				This dialog is teleported to the #teleport-target element
				elsewhere on the page.
			</p>
		</cdx-dialog>

		<cdx-dialog
			v-model:open="showDialog3"
			close-button-label="close"
			target="#teleport-target"
			:primary-action="{ actionType: 'progressive', label: 'Sweet!' }"
			:default-action="{ label: 'Bummer' }"
			title="Example Dialog 3"
			subtitle="Subtitle example"
			@default="showDialog3 = false"
			@primary="showDialog3 = false"
		>
			<p>Example dialog with subtitle and footer text</p>

			<template #footer-text>
				This is some example <a href="#">footer text</a> blah blah blah.
			</template>
		</cdx-dialog>

		<cdx-dialog
			v-model:open="showDialog4"
			target="#teleport-target"
			title="Example Dialog 4"
			:hide-title="true"
		>
			<p>Minimum possible dialog</p>
		</cdx-dialog>

		<cdx-dialog
			v-model:open="showDialog5"
			target="#teleport-target"
			:primary-action="{ actionType: 'progressive', label: 'Sweet!' }"
			:default-action="{ label: 'Bummer' }"
			title="Example Dialog 5"
			class="foo-dialog"
			@default="showDialog5 = false"
			@primary="showDialog5 = false"
		>
			<p>
				Example of attribute fall-through. The <code>foo-dialog</code>
				class applied here gets applied to the inner dialog element
				as opposed to the outer backdrop element without conflicting
				with internally computed classes.
			</p>
		</cdx-dialog>

		<wrapped-dialog
			v-model:open="showDialog6"
			target="#teleport-target"
			title="Custom Wrapped Dialog"
		>
			Example of a custom wrapped dialog
		</wrapped-dialog>

		<cdx-dialog
			v-model:open="showDialog7"
			:render-in-place="true"
			title="Dialog with long content"
			close-button-label="Close"
			:show-dividers="true"
			:primary-action="{ actionType: 'progressive', label: 'I love veggies!' }"
			:default-action="{ label: 'I prefer candy' }"
			@default="showDialog7 = false"
			@primary="showDialog7 = false"
		>
			<p>
				Zesty tofu pad thai dessert cool cucumbers kung pao pepper
				grapefruit creamy cauliflower alfredo figs ghost pepper seitan
				asian pear. Ginger carrot spiced juice sweet potato Indian
				spiced peppermint onion hearty tofu raspberry fizz mediterranean
				black beans banana dark and stormy red amazon pepper tomato and
				basil balsamic vinaigrette.
			</p>
			<p>
				Cool spring earl grey latte lemon lime minty crumbled lentils
				bite sized kale caesar salad green onions açai blueberry chia
				seed jam. Lemongrass chili pepper fiery fruit Thai dragon pepper
				overflowing cashew vegan mediterranean luxury bowl cilantro lime
				vinaigrette smoky maple tempeh glaze green tea lime cauliflower
				springtime strawberry bean wraps coconut chocolate peanut butter
				dip ginger lemongrass agave green tea grain avocado basil pesto.
			</p>
			<p>
				Casserole pine nuts salad lemonade zest samosa habanero golden
				apple vinaigrette red curry banana bread avocado strawberries
				spiced peppermint blast homemade balsamic mint taco salsa soy
				milk lemon chili lentils lime mango crisp muffins mediterranean
				instant pot peach strawberry mango. Mushroom risotto chai tea
				summer tahini drizzle pistachio pesto cranberry spritzer
				artichoke hearts blood orange smash cookies shiitake mushrooms
				couscous soba noodles.
			</p>
			<p>
				Fall strawberry mango smoothie a delicious meal green grapes
				crispy iceberg lettuce dragon fruit street style Thai basil
				tacos banana bread golden cayenne pepper cayenne ultimate
				Italian pepperoncini thyme miso turmeric glazed aubergine
				jalapeño pumpkin.  Creamiest leek banh mi salad rolls tempeh
				oranges toasted hazelnuts apricot hazelnut shiitake lemon tahini
				dressing roasted brussel sprouts cilantro kale cozy cinnamon
				kimchi cumin winter cherry arugula salad Caribbean red habanero
				broccoli peanut butter crunch.
			</p>

			<cdx-select
				v-model:selected="selected"
				:menu-items="menuItems"
				default-label="Select an option with a really really really long title"
			/>
			<br><br>
			<cdx-select
				v-model:selected="selected"
				:menu-items="menuItemsLong"
				:menu-config="menuConfig"
				default-label="Select with visible item limit"
			/>
			<br><br>
			<cdx-combobox
				v-model:selected="comboboxSelected"
				:menu-items="menuItems"
				placeholder="Type or choose an option"
			/>
			<br><br>
			<cdx-lookup
				v-model:selected="lookupSelected"
				:menu-items="lookupMenuItems"
				@input="onInput"
			/>
			<br>
			<div>
				<cdx-text-input
					ref="input"
					v-model="selectedValue"
					role="combobox"
					:aria-expanded="expanded"
					:aria-controls="menuId"
					:aria-activedescendant="activeDescendant"
					@click="onClick"
					@blur="expanded = false"
					@keydown="onKeydown"
				/>
				<cdx-menu
					:id="menuId"
					ref="menu"
					v-model:selected="selectedValue"
					v-model:expanded="expanded"
					:menu-items="menuItems"
					:footer="footer"
				>
					<template #default="{ menuItem }">
						<template v-if="menuItem.value === 'menu-footer'">
							Footer item with value: {{ menuItem.value }}
						</template>
					</template>
				</cdx-menu>
			</div>
			<br>
			<p>
				Hemp seeds apple vinaigrette dark and stormy habanero golden
				coriander peppermint asian pear frosted gingerbread bites
				Southern Italian almond milk chai latte mint golden cayenne
				pepper. Salted dark chocolate bruschetta figs green tea lime
				mediterranean second course dessert sesame soba noodles
				overflowing strawberry spinach salad.
			</p>
			<p>
				Hearty refreshing cucumber splash cherry chickpea crust pizza
				banana black bean wraps red amazon pepper banana bread arugula
				salad edamame avocado dressing drizzle veggie burgers heat green
				pepper soy milk lingonberry shaved almonds raspberry fizz
				lemongrass matcha salty. Portobello mushrooms coconut sugar
				sriracha pecans spring cool cucumbers lemon lime minty chia
				seeds lemon blueberry chia seed jam Italian pepperoncini
				Malaysian sweet potato sleepy morning tea balsamic vinaigrette
				street style Thai basil tacos seeds chai tea crispy ultimate
				cool off cozy butternut smoked tofu blueberries pasta bananas.
			</p>
		</cdx-dialog>
	</section>
</template>

<script lang="ts" setup>
import { Ref, ComponentPublicInstance, ref, computed } from 'vue';
import { CdxDialog, CdxButton, CdxCombobox, CdxLookup, CdxSelect, MenuItemData, CdxMenu, CdxTextInput, useGeneratedId, useFloatingMenu } from '../lib';
import WrappedDialog from './WrappedDialog.vue';
import vegetableItems from 'codex-docs/component-demos/lookup/examples/data.json';

const showDialog1 = ref( false );
const showDialog2 = ref( false );
const showDialog3 = ref( false );
const showDialog4 = ref( false );
const showDialog5 = ref( false );
const showDialog6 = ref( false );
const showDialog7 = ref( false );

const selected = ref( null );
const menuItems = [
	{ label: 'Option A', value: 'a' },
	{ label: 'Option B', value: 'b' },
	{ label: 'Option C', value: 'c' },
	{ label: 'Option D', value: 'd' }
];
const menuItemsLong = [
	{ label: 'Option A', value: 'a' },
	{ label: 'Option B', value: 'b' },
	{ label: 'Option C', value: 'c' },
	{ label: 'Option D', value: 'd' },
	{ label: 'Option E', value: 'e' },
	{ label: 'Option F', value: 'f' },
	{ label: 'Option G', value: 'g' },
	{ label: 'Option H', value: 'h' },
	{ label: 'Option I', value: 'i' },
	{ label: 'Option J', value: 'j' },
	{ label: 'Option K', value: 'k' }
];
const menuConfig = {
	visibleItemLimit: 6
};

const comboboxSelected = ref( '' );

const lookupSelected = ref( null );
const lookupMenuItems = ref<MenuItemData[]>( [] );
function onInput( value: string ) {
	if ( value ) {
		lookupMenuItems.value = vegetableItems.filter( ( item ) =>
			item.label.includes( value )
		);
	}
}

const input = ref<InstanceType<typeof CdxTextInput>>();
const menu = ref<InstanceType<typeof CdxMenu>>();
const selectedValue = ref( '' );
const expanded = ref( false );
const activeDescendant = computed( () => menu.value?.getHighlightedMenuItem()?.id );
const menuId = useGeneratedId( 'menu' );

const footer = {
	value: 'menu-footer'
};

useFloatingMenu( input as Ref<ComponentPublicInstance>, menu );

/**
 * Delegate most keydowns on the text input to the Menu component. This
 * allows the Menu component to enable keyboard navigation of the menu.
 *
 * @param {KeyboardEvent} e The keyboard event
 */
function onKeydown( e: KeyboardEvent ) {
	// The menu component enables the space key to open and close the
	// menu. However, for text inputs with menus, the space key should
	// always insert a new space character in the input.
	if ( e.key === ' ' ) {
		return;
	}

	// Delegate all other key events to the Menu component.
	if ( menu.value ) {
		menu.value.delegateKeyNavigation( e );
	}
}

function onClick() {
	expanded.value = true;
}
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.foo-dialog {
	background-color: @background-color-progressive-subtle;
}
</style>
