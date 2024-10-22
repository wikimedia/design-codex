<template>
	<section id="cdx-info-chip">
		<h2>
			InfoChip
		</h2>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<!-- Status chips. -->
			<cdx-info-chip :icon="cdxIconInfoFilled">
				Notice
			</cdx-info-chip>
			<cdx-info-chip status="warning">
				Warning
			</cdx-info-chip>
			<cdx-info-chip status="error">
				Error
			</cdx-info-chip>
			<cdx-info-chip status="success">
				Success
			</cdx-info-chip>
		</div>
		<div class="cdx-demo__content__sectioning">
			<!-- Notice chip with text only. -->
			<cdx-info-chip>Info Chip</cdx-info-chip>
		</div>
		<div class="cdx-demo__content__sectioning">
			<!-- Notice chip with long text. -->
			<cdx-info-chip>
				This is really really really really really
				really really really really really really
				really really really really really really
				really really really really really really
				long text
			</cdx-info-chip>
		</div>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<!-- Notice chip with custom icon. -->
			<cdx-info-chip :icon="cdxIconHeart">
				Notice
			</cdx-info-chip>
			<cdx-info-chip :icon="cdxIconCamera">
				Photos
			</cdx-info-chip>
		</div>

		<h3>
			CSS-only InfoChip
		</h3>
		<div class="cdx-demo__content__sectioning cdx-demo-flex-container">
			<!-- Status chips -->
			<div class="cdx-info-chip cdx-info-chip--notice">
				<span class="cdx-info-chip__icon" />
				<span class="cdx-info-chip__text">
					Notice
				</span>
			</div>
			<div class="cdx-info-chip cdx-info-chip--warning">
				<span class="cdx-info-chip__icon" />
				<span class="cdx-info-chip__text">
					Warning
				</span>
			</div>
			<div class="cdx-info-chip cdx-info-chip--error">
				<span class="cdx-info-chip__icon" />
				<span class="cdx-info-chip__text">
					Error
				</span>
			</div>
			<div class="cdx-info-chip cdx-info-chip--success">
				<span class="cdx-info-chip__icon" />
				<span class="cdx-info-chip__text">
					Success
				</span>
			</div>
		</div>
		<div class="cdx-demo__content__sectioning">
			<!-- Notice chip with text only. -->
			<div class="cdx-info-chip">
				<span class="cdx-info-chip__text">Info Chip</span>
			</div>
		</div>
		<div class="cdx-demo__content__sectioning">
			<!-- Notice chip with long text. -->
			<div class="cdx-info-chip">
				<span class="cdx-info-chip__text">
					This is really really really really really really really really really
					really really really really really really really really really really really
					really really really long text
				</span>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { CdxInfoChip } from '../lib';
import { cdxIconHeart, cdxIconCamera, cdxIconInfoFilled } from '@wikimedia/codex-icons';
</script>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-flex-container {
	display: flex;
	gap: @spacing-100;
}

</style>
