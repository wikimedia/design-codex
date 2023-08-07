<template>
	<div
		v-if="theme.isBranchDeploy || theme.isMainBranch"
		:dir="isComponentPage ? 'ltr' : undefined"
	>
		<cdx-message
			class="cdx-docs-version-banner"
			type="warning"
			:dismiss-button-label="theme.isMainBranch ? 'Dismiss' : undefined"
		>
			<template v-if="theme.isMainBranch">
				You're viewing the docs for the beta version of Codex, which may contain features
				that have not been released yet.
			</template>

			<template v-if="theme.isBranchDeploy">
				This is a preview of a
				<a v-if="theme.patchID" :href="'https://gerrit.wikimedia.org/r/c/design/codex/+/' + theme.patchID">
					Gerrit patch
				</a>
				<template v-else>
					Gerrit patch
				</template>
				and may be outdated.
			</template>

			Codex users should visit the
			<!-- class="vp-raw" prevents VitePress from treating this like an internal link -->
			<a class="vp-raw" :href="'https://doc.wikimedia.org/codex/latest' + currentPath">official docs</a>.
		</cdx-message>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { CdxMessage } from '@wikimedia/codex';
import { useRoute, useData } from 'vitepress';
import { CustomConfig } from '../../../docs/.vitepress/types';

export default defineComponent( {
	name: 'CdxDocsVersionBanner',
	components: { CdxMessage },
	setup() {
		const route = useRoute();
		const currentPath = computed( () => route.path );
		const isComponentPage = computed( () => route.path.includes( '/components/demos/' ) );

		const { theme } = useData<CustomConfig>();

		return {
			currentPath,
			isComponentPage,
			theme
		};
	}
} );

</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-version-banner {
	margin-bottom: @spacing-200;

	a {
		.cdx-mixin-link();
	}
}
</style>
