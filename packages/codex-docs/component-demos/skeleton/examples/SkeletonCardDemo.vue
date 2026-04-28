<template>
	<div class="skeleton-card-demo">
		<Transition name="skeleton-card-demo__fade" mode="out-in">
			<!-- Skeleton state -->
			<div
				v-if="loading"
				key="skeleton"
				class="skeleton-card-demo__skeleton cdx-card"
				aria-busy="true"
			>
				<cdx-skeleton
					shape="rectangle"
					class="skeleton-card-demo__thumbnail"
					:announce="true"
				/>
				<span class="skeleton-card-demo__text cdx-card__text">
					<cdx-skeleton shape="line" />
					<cdx-skeleton
						shape="line"
						class="skeleton-card-demo__text__short"
					/>
				</span>
			</div>

			<!-- Loaded card -->
			<cdx-card
				v-else
				key="card"
				:thumbnail="thumbnail"
			>
				<template #title>
					Skeleton loader component
				</template>
				<template #description>
					A loading placeholder that approximates the shape of the UI it replaces.
				</template>
			</cdx-card>
		</Transition>

		<cdx-button
			class="skeleton-card-demo__reload"
			weight="quiet"
			@click="reload"
		>
			Reload demo
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { CdxCard, CdxButton, CdxSkeleton } from '@wikimedia/codex';

const LOAD_DELAY_MS = 2500;

const thumbnail = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
};

export default defineComponent( {
	name: 'SkeletonCardDemo',
	components: { CdxCard, CdxButton, CdxSkeleton },
	setup() {
		const loading = ref( true );

		function startLoading() {
			loading.value = true;
			setTimeout( () => {
				loading.value = false;
			}, LOAD_DELAY_MS );
		}

		function reload() {
			startLoading();
		}

		onMounted( () => {
			startLoading();
		} );

		return {
			loading,
			thumbnail,
			reload
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.skeleton-card-demo {
	max-width: @max-width-base;

	// Mirror the Card component's layout so the skeleton matches 1:1.
	&__skeleton {
		// `cdx-card` provides border, padding, flex layout.
		// Pointer events are irrelevant during loading.
		pointer-events: none;
		// Ensure min-height matches a card with description.
		align-items: flex-start;
	}

	&__thumbnail {
		flex-shrink: 0;
		// Mirror .cdx-card__thumbnail.cdx-thumbnail dimensions.
		// The `rectangle` shape sets the height and border radius.
		width: @size-300;
		margin-right: @spacing-75;
	}

	&__text {
		// `cdx-card__text` sets the flex column layout.
		gap: @spacing-25;

		&__short {
			// TODO: We could consider a golden ratio or two thirds token here.
			width: @size-half;
		}
	}

	&__reload {
		margin-top: @spacing-75;
	}

	// Crossfade between skeleton and card.
	&__fade {
		&-enter-active,
		&-leave-active {
			transition-property: @transition-property-fade;
			transition-duration: @transition-duration-medium;
		}

		&-enter-from,
		&-leave-to {
			opacity: 0;
		}
	}
}
</style>
