<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>
	<cdx-dialog
		v-model:open="open"
		title="Dialog with long content"
		close-button-label="Close"
		:show-dividers="true"
		:default-action="defaultAction"
		@default="open = false"
	>
		<p>
			Zesty tofu pad thai dessert cool cucumbers kung pao pepper grapefruit creamy cauliflower
			alfredo figs ghost pepper seitan asian pear. Ginger carrot spiced juice sweet potato
			Indian spiced peppermint onion hearty tofu raspberry fizz mediterranean black beans
			banana dark and stormy red amazon pepper tomato and basil balsamic vinaigrette.
		</p>
		<p>
			Cool spring earl grey latte lemon lime minty crumbled lentils bite sized kale caesar
			salad green onions açai blueberry chia seed jam. Lemongrass chili pepper fiery fruit
			Thai dragon pepper overflowing cashew vegan mediterranean luxury bowl cilantro lime
			vinaigrette smoky maple tempeh glaze green tea lime cauliflower springtime strawberry
			bean wraps coconut chocolate peanut butter dip ginger lemongrass agave green tea grain
			avocado basil pesto.
		</p>
		<p>
			Casserole pine nuts salad lemonade zest samosa habanero golden apple vinaigrette red
			curry banana bread avocado strawberries spiced peppermint blast homemade balsamic mint
			taco salsa soy milk lemon chili lentils lime mango crisp muffins mediterranean
			instant pot peach strawberry mango. Mushroom risotto chai tea summer tahini drizzle
			pistachio pesto cranberry spritzer artichoke hearts blood orange smash cookies shiitake
			mushrooms couscous soba noodles.
		</p>
		<p>
			Fall strawberry mango smoothie a delicious meal green grapes crispy iceberg lettuce
			dragon fruit street style Thai basil tacos banana bread golden cayenne pepper cayenne
			ultimate Italian pepperoncini thyme miso turmeric glazed aubergine jalapeño pumpkin.
			Creamiest leek banh mi salad rolls tempeh oranges toasted hazelnuts apricot hazelnut
			shiitake lemon tahini dressing roasted brussel sprouts cilantro kale cozy cinnamon
			kimchi cumin winter cherry arugula salad Caribbean red habanero broccoli peanut butter
			crunch.
		</p>
		<p>
			Hemp seeds apple vinaigrette dark and stormy habanero golden coriander peppermint asian
			pear frosted gingerbread bites Southern Italian almond milk chai latte mint golden
			cayenne pepper. Salted dark chocolate bruschetta figs green tea lime mediterranean
			second course dessert sesame soba noodles overflowing strawberry spinach salad.
		</p>
		<p>
			Hearty refreshing cucumber splash cherry chickpea crust pizza banana black bean wraps
			red amazon pepper banana bread arugula salad edamame avocado dressing drizzle veggie
			burgers heat green pepper soy milk lingonberry shaved almonds raspberry fizz lemongrass
			matcha salty. Portobello mushrooms coconut sugar sriracha pecans spring cool cucumbers
			lemon lime minty chia seeds lemon blueberry chia seed jam Italian pepperoncini Malaysian
			sweet potato sleepy morning tea balsamic vinaigrette street style Thai basil tacos seeds
			chai tea crispy ultimate cool off cozy butternut smoked tofu blueberries pasta bananas.
		</p>
	</cdx-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog, DialogAction } from '@wikimedia/codex';
export default defineComponent( {
	name: 'DialogMaxContent',
	components: {
		CdxButton,
		CdxDialog
	},
	setup() {
		const open = ref( false );
		const defaultAction: DialogAction = {
			label: 'Close'
		};
		return {
			open,
			defaultAction
		};
	}
} );
</script>
