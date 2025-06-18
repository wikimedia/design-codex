<template>
	<demo-base-layout class="cdx-button-grid">
		<template #header>
			Codex Button Grid
		</template>
		<template #content>
			<section id="cdx-button">
				<h2>
					Button
				</h2>

				<button-grid-table>
					<template #default="{ action, size, weight, disabled }">
						<cdx-button
							:size="size"
							:weight="weight"
							:action="action"
							:disabled="disabled"
							@click="onClick"
						>
							<cdx-icon
								:size="size === 'small' ? 'small' : 'medium'"
								:icon="cdxIconTrash"
							/>
							{{ size === 'small' ? "button" : "Button" }}
						</cdx-button>
					</template>
				</button-grid-table>

				<h3>Icon-only buttons</h3>
				<button-grid-table>
					<template #default="{ action, size, weight, disabled }">
						<cdx-button
							:size="size"
							:weight="weight"
							:action="action"
							:disabled="disabled"
							aria-label="Button"
							@click="onClick"
						>
							<cdx-icon
								:size="size === 'small' ? 'small' : 'medium'"
								:icon="cdxIconTrash"
							/>
						</cdx-button>
					</template>
				</button-grid-table>

				<h3>CSS-only version</h3>
				<button-grid-table>
					<template #default="{ action, size, weight, disabled }">
						<!-- eslint-disable max-len -->
						<button
							:class="`cdx-button ${action ? `cdx-button--action-${action}` : ''} ${weight ? `cdx-button--weight-${weight}` : ''} ${size ? `cdx-button--size-${size}` : ''}`"
							:disabled="disabled"
						>
							<span
								class="cdx-button__icon"
								:class="size === 'small' ? `cdx-demo-css-icon--trash--small` : 'cdx-demo-css-icon--trash'"
							/>
							{{ size === 'small' ? "button" : "Button" }}
						</button>
						<!-- eslint-enable max-len -->
					</template>
				</button-grid-table>

				<h3>CSS-only icon-only buttons</h3>
				<button-grid-table>
					<template #default="{ action, size, weight, disabled }">
						<!-- eslint-disable max-len -->
						<button
							:class="`cdx-button cdx-button--icon-only ${action ? `cdx-button--action-${action}` : ''} ${weight ? `cdx-button--weight-${weight}` : ''} ${size ? `cdx-button--size-${size}` : ''}`"
							:disabled="disabled"
							aria-label="Button"
						>
							<span
								class="cdx-button__icon"
								:class="size === 'small' ? `cdx-demo-css-icon--trash--small` : 'cdx-demo-css-icon--trash'"
							/>
						</button>
						<!-- eslint-enable max-len -->
					</template>
				</button-grid-table>

				<h3>Link buttons</h3>
				<button-grid-table>
					<template #default="{ action, size, weight, disabled }">
						<!-- eslint-disable max-len -->
						<a :class="`cdx-button cdx-button--fake-button cdx-button--fake-button--${disabled ? 'disabled' : 'enabled'} ${action ? `cdx-button--action-${action}` : ''} ${weight ? `cdx-button--weight-${weight}` : ''} ${size ? `cdx-button--size-${size}` : ''}`">
							<span
								class="cdx-button__icon"
								:class="size === 'small' ? `cdx-demo-css-icon--trash--small` : 'cdx-demo-css-icon--trash'"
							/>
							{{ size === 'small' ? "button" : "Button" }}
						</a>
						<!-- eslint-enable max-len -->
					</template>
				</button-grid-table>

				<h3>Icon-only link buttons</h3>
				<button-grid-table>
					<template #default="{ action, size, weight, disabled }">
						<!-- eslint-disable max-len -->
						<a :class="`cdx-button cdx-button--icon-only cdx-button--fake-button cdx-button--fake-button--${disabled ? 'disabled' : 'enabled'} ${action ? `cdx-button--action-${action}` : ''} ${weight ? `cdx-button--weight-${weight}` : ''} ${size ? `cdx-button--size-${size}` : ''}`" aria-label="Button">
							<span
								class="cdx-button__icon"
								:class="size === 'small' ? `cdx-demo-css-icon--trash--small` : 'cdx-demo-css-icon--trash'"
							/>
						</a>
						<!-- eslint-enable max-len -->
					</template>
				</button-grid-table>

				<h3>Icon-only link buttons with small icon</h3>
				<button-grid-table>
					<template #default="{ action, size, weight, disabled }">
						<!-- eslint-disable max-len -->
						<a :class="`cdx-button cdx-button--icon-only cdx-button--fake-button cdx-button--fake-button--${disabled ? 'disabled' : 'enabled'} ${action ? `cdx-button--action-${action}` : ''} ${weight ? `cdx-button--weight-${weight}` : ''} ${size ? `cdx-button--size-${size}` : ''}`" aria-label="Button">
							<span class="cdx-button__icon cdx-demo-css-icon--trash--small" />
						</a>
						<!-- eslint-enable max-len -->
					</template>
				</button-grid-table>

				<h3>Checkbox hack (label buttons)</h3>
				<button-grid-table>
					<template #default="{ action, size, weight, disabled }">
						<!-- eslint-disable max-len -->
						<label :class="`cdx-button cdx-button--fake-button cdx-button--fake-button--${disabled ? 'disabled' : 'enabled'} ${action ? `cdx-button--action-${action}` : ''} ${weight ? `cdx-button--weight-${weight}` : ''} ${size ? `cdx-button--size-${size}` : ''}`">
							<span
								class="cdx-button__icon"
								:class="size === 'small' ? `cdx-demo-css-icon--trash--small` : 'cdx-demo-css-icon--trash'"
							/>
							{{ size === 'small' ? "button" : "Button" }}
						</label>
						<!-- eslint-enable max-len -->
					</template>
				</button-grid-table>

				<h3>Icon-only checkbox hack (label buttons)</h3>
				<button-grid-table>
					<template #default="{ action, size, weight, disabled }">
						<!-- eslint-disable max-len -->
						<label
							:class="`cdx-button cdx-button--icon-only cdx-button--fake-button cdx-button--fake-button--${disabled ? 'disabled' : 'enabled'} ${action ? `cdx-button--action-${action}` : ''} ${weight ? `cdx-button--weight-${weight}` : ''} ${size ? `cdx-button--size-${size}` : ''}`"
							aria-label="Button"
						>
							<span
								class="cdx-button__icon"
								:class="size === 'small' ? `cdx-demo-css-icon--trash--small` : 'cdx-demo-css-icon--trash'"
							/>
						</label>
						<!-- eslint-enable max-len -->
					</template>
				</button-grid-table>

				<h3>Flush layout for buttons</h3>
				<h4>Regular buttons</h4>
				<div class="cdx-demo-flush-layout cdx-demo-flush-layout--regular">
					<div class="cdx-demo-flush-layout__buttons">
						<cdx-button weight="quiet">
							Button one
						</cdx-button>
						<cdx-button weight="quiet">
							Button two
						</cdx-button>
					</div>
					<div class="cdx-demo-flush-layout__content">
						<!-- eslint-disable max-len -->
						<p>
							Hemp seeds apple vinaigrette dark and stormy habanero golden coriander
							peppermint asian pear frosted gingerbread bites Southern Italian almond milk
							chai latte mint golden cayenne pepper.
						</p>
						<!-- eslint-enable max-len -->
					</div>
				</div>

				<h4>Icon-only buttons</h4>
				<div class="cdx-demo-flush-layout cdx-demo-flush-layout--icon-only">
					<div class="cdx-demo-flush-layout__buttons">
						<cdx-button weight="quiet" aria-label="Align left">
							<cdx-icon :icon="cdxIconAlignLeft" />
						</cdx-button>
						<cdx-button weight="quiet" aria-label="Align right">
							<cdx-icon :icon="cdxIconAlignRight" />
						</cdx-button>
					</div>
					<div class="cdx-demo-flush-layout__content">
						<!-- eslint-disable max-len -->
						<p>
							Hemp seeds apple vinaigrette dark and stormy habanero golden coriander
							peppermint asian pear frosted gingerbread bites Southern Italian almond milk
							chai latte mint golden cayenne pepper.
						</p>
						<!-- eslint-enable max-len -->
					</div>
				</div>

				<h4>CSS-only icon-only buttons</h4>
				<div class="cdx-demo-flush-layout cdx-demo-flush-layout--icon-only">
					<div class="cdx-demo-flush-layout__buttons">
						<button
							class="cdx-button cdx-button--weight-quiet cdx-button--icon-only"
							aria-label="Align left"
						>
							<span class="cdx-button__icon cdx-demo-css-icon--align-left" />
						</button>
						<button
							class="cdx-button cdx-button--weight-quiet cdx-button--icon-only"
							aria-label="Align right"
						>
							<span class="cdx-button__icon cdx-demo-css-icon--align-right" />
						</button>
					</div>
					<div class="cdx-demo-flush-layout__content">
						<!-- eslint-disable max-len -->
						<p>
							Hemp seeds apple vinaigrette dark and stormy habanero golden coriander
							peppermint asian pear frosted gingerbread bites Southern Italian almond milk
							chai latte mint golden cayenne pepper.
						</p>
						<!-- eslint-enable max-len -->
					</div>
				</div>

				<h4>Small icon-only buttons</h4>
				<div class="cdx-demo-flush-layout cdx-demo-flush-layout--icon-only-small">
					<div class="cdx-demo-flush-layout__buttons">
						<cdx-button
							weight="quiet"
							size="small"
							aria-label="Align left"
						>
							<cdx-icon size="small" :icon="cdxIconAlignLeft" />
						</cdx-button>
						<cdx-button
							weight="quiet"
							size="small"
							aria-label="Align right"
						>
							<cdx-icon size="small" :icon="cdxIconAlignRight" />
						</cdx-button>
					</div>
					<div class="cdx-demo-flush-layout__content">
						<!-- eslint-disable max-len -->
						<p>
							Hemp seeds apple vinaigrette dark and stormy habanero golden coriander
							peppermint asian pear frosted gingerbread bites Southern Italian almond milk
							chai latte mint golden cayenne pepper.
						</p>
						<!-- eslint-enable max-len -->
					</div>
				</div>

				<h4>Large icon-only buttons</h4>
				<div class="cdx-demo-flush-layout cdx-demo-flush-layout--icon-only-large">
					<div class="cdx-demo-flush-layout__buttons">
						<cdx-button
							weight="quiet"
							size="large"
							aria-label="Align left"
						>
							<cdx-icon :icon="cdxIconAlignLeft" />
						</cdx-button>
						<cdx-button
							weight="quiet"
							size="large"
							aria-label="Align right"
						>
							<cdx-icon :icon="cdxIconAlignRight" />
						</cdx-button>
					</div>
					<div class="cdx-demo-flush-layout__content">
						<!-- eslint-disable max-len -->
						<p>
							Hemp seeds apple vinaigrette dark and stormy habanero golden coriander
							peppermint asian pear frosted gingerbread bites Southern Italian almond milk
							chai latte mint golden cayenne pepper.
						</p>
						<!-- eslint-enable max-len -->
					</div>
				</div>

				<h4>Buttons in flex layouts</h4>
				<div class="cdx-demo-buttons-flex cdx-demo-buttons-flex--desktop">
					<form class="cdx-demo-buttons-flex--desktop__flex-container">
						<div class="cdx-text-input">
							<input
								class="cdx-text-input__input"
								name="search"
								value=""
								size="70"
							>
						</div>
						<input
							type="submit"
							name="fulltext"
							value="Artikel suchen"
							class="cdx-button"
						>
					</form>
				</div>
				<div class="cdx-demo-buttons-flex cdx-demo-buttons-flex--mobile">
					<form class="cdx-demo-buttons-flex--mobile__flex-container">
						<div class="cdx-text-input">
							<input
								name="search"
								class="cdx-text-input__input"
								size="50"
							>
						</div>
						<input
							type="submit"
							name="go"
							value="Look up"
							class="cdx-button"
						>
					</form>
				</div>
				<div class="cdx-demo-buttons-flex cdx-demo-buttons-flex--icon-only">
					<cdx-text-input v-model="textValue" />
					<cdx-button aria-label="Search">
						<cdx-icon :icon="cdxIconSearch" />
					</cdx-button>
				</div>
			</section>
		</template>
	</demo-base-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxButton, CdxIcon, CdxTextInput } from '../lib';
import { cdxIconTrash, cdxIconAlignLeft, cdxIconAlignRight, cdxIconSearch } from '@wikimedia/codex-icons';
import DemoBaseLayout from './DemoBaseLayout.vue';
import ButtonGridTable from './ButtonGridTable.vue';

const onClick = function () {
	// eslint-disable-next-line no-console
	console.log( 'click event emitted' );
};

const textValue = ref( '' );
</script>

<style lang="less" scoped>
// Note: you must import the design tokens before importing the css-icon mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../themes/mixins/public/css-icon.less';
@import ( reference ) '../themes/mixins/public/button-layout-flush.less';

.cdx-demo-css-icon {
	&--trash {
		.cdx-mixin-css-icon( @cdx-icon-trash, @param-is-button-icon: true );
	}

	&--trash--small {
		.cdx-mixin-css-icon(
			@cdx-icon-trash,
			@param-size-icon: @size-icon-small,
			@param-is-button-icon: true
		);
	}

	&--align-left {
		.cdx-mixin-css-icon( @cdx-icon-align-left, @param-is-button-icon: true );
	}

	&--align-right {
		.cdx-mixin-css-icon( @cdx-icon-align-right, @param-is-button-icon: true );
	}
}

.cdx-demo-flush-layout {
	&--regular {
		.cdx-button:first-child {
			.cdx-mixin-button-layout-flush( 'start' );
		}

		.cdx-button:last-child {
			.cdx-mixin-button-layout-flush( 'end' );
		}
	}

	&--icon-only {
		.cdx-button:first-child {
			.cdx-mixin-button-layout-flush( 'start', true );
		}

		.cdx-button:last-child {
			.cdx-mixin-button-layout-flush( 'end', true );
		}
	}

	&--icon-only-small {
		.cdx-button:first-child {
			.cdx-mixin-button-layout-flush( 'start', true, 'small' );
		}

		.cdx-button:last-child {
			.cdx-mixin-button-layout-flush( 'end', true, 'small' );
		}
	}

	&--icon-only-large {
		.cdx-button:first-child {
			.cdx-mixin-button-layout-flush( 'start', true, 'large' );
		}

		.cdx-button:last-child {
			.cdx-mixin-button-layout-flush( 'end', true, 'large' );
		}
	}

	&__buttons {
		display: flex;
		justify-content: space-between;
	}

	&__content {
		margin-top: @spacing-100;
		border: @border-base;
		padding: @spacing-100;
	}
}

// Styles taken directly from features noted in T370032.
/* stylelint-disable */
.cdx-demo-buttons-flex {
	font-size: 14px;
	margin-bottom: @spacing-100;

	&--desktop {
		max-width: 50em;

		&__flex-container {
			display: flex;
			justify-content: center;
			column-gap: 4px;
		}

		.cdx-text-input {
			min-width: auto;
		}
	}

	&--mobile {
		max-width: 341px;

		&__flex-container {
			display: flex;
			justify-content: center;
			column-gap: 4px;
		}

		.cdx-text-input {
			min-width: auto;
		}
	}

	&--icon-only {
		display: flex;
		gap: 4px;
	}
}
/* stylelint-enable */

</style>
