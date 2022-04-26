<script setup>
import { CdxProgressBar } from '@wikimedia/codex';

</script>

## Demos

### Default

Default indeterminate progress bar.

<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-progress-bar />
</template>

<template v-slot:code>

```vue
<cdx-progress-bar />
```

</template>
</cdx-demo-wrapper>

### Inline

An inline version is available for use within other components, like Menu.

<cdx-demo-wrapper>
<template v-slot:demo>
<cdx-progress-bar :inline="true" />
</template>

<template v-slot:code>

```vue
<cdx-progress-bar :inline="true" />
```

</template>
</cdx-demo-wrapper>
