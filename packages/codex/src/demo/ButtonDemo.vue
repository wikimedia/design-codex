<template>
	<section id="cdx-button">
		<h2>
			Button
		</h2>
		<p>
			See also <a href="demos/buttons.html">the grid of all buttons</a>.
		</p>
		<p>
			<cdx-button>Regular button</cdx-button>
		</p>
		<p>
			<cdx-button action="progressive">
				<cdx-icon :icon="cdxIconArrowNext" />
				Progressive button with icon
			</cdx-button>
		</p>
		<p>
			<cdx-button weight="primary" action="destructive">
				<cdx-icon :icon="cdxIconTrash" />
				Primary destructive button with icon
			</cdx-button>
		</p>
		<p>
			<cdx-button weight="quiet" action="progressive">
				Quiet progressive button
			</cdx-button>
		</p>
		<p>
			Icon-only button:
			<cdx-button>
				<cdx-icon :icon="cdxIconCheckAll" />
			</cdx-button>
		</p>
	</section>
</template>

<script lang="ts" setup>
import { CdxButton, CdxIcon } from '../lib';
import { cdxIconArrowNext, cdxIconCheckAll, cdxIconTrash } from '@wikimedia/codex-icons';
</script>
