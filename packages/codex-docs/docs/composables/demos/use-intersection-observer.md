# useIntersectionObserver

This sets up an
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
which attaches to the provided [template ref](https://vuejs.org/guide/essentials/template-refs.html)
when the component is mounted.

Returns a boolean [ref](https://vuejs.org/api/reactivity-core.html#ref) which will update to match
the current intersection status of the targeted element (true if the element is in view and false
otherwise).

If the browser doesn't support IntersectionObserver, the returned `ref` will always be false.

## Usage

Pass in the [template ref](https://vuejs.org/guide/essentials/template-refs.html) as the first
argument. The template ref is the target element to watch.
Then pass in [observer options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#intersection_observer_options)
like `threshold`.

```js
const firstTabLabel = ref(null);
const firstLabelVisible = useIntersectionObserver( firstTabLabel, { threshold: 0.95 } );
```

## Full example

In this example, the component has a video that will auto-pause if the video is not fully visible.

```vue
<template>
	<!-- Wikimedia Foundation, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons -->
	<!-- This example is inspired by https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/#aa-use-case-2-auto-pause-video-when-its-out-of-view -->

	<div class="container">
		<h1>When the video is not fully visible on page, it pauses</h1>
		<video ref="video" controls autoplay muted width="620">
		<source
			src="https://upload.wikimedia.org/wikipedia/commons/9/99/What_does_the_Wikimedia_Foundation_do_%E2%80%93_A_WIKI_MINUTE_16-9.webm"
			type="video/webm"
		/>

		Sorry, your browser doesn't support embedded videos, but don't worry, you
		can
		<a
			href="https://commons.wikimedia.org/wiki/File:What_does_the_Wikimedia_Foundation_do_%E2%80%93_A_WIKI_MINUTE_16-9.webm"
		>
			download it
		</a>
		and watch it with your favorite video player!
		</video>
	</div>
</template>
<script>
import { defineComponent, ref, computed, onUpdated, watch } from 'vue';
import { useIntersectionObserver } from '@wikimedia/codex';

export default defineComponent({
	components: {},
	setup() {
		const video = ref(null); //target element
		const videoVisible = useIntersectionObserver (video, {threshold: 1});

		watch (() => {
			if ( !videoVisible.value && !video.value?.paused ) {
				video.value?.pause();
			} else if (video.value?.paused) {
				video.value?.play();
			}
		})

		return { video };
	},
});
</script>
<style>
body {
	height: calc( @size-5600 + @size-5600 );
}

h1 {
	margin-top: @spacing-75;
	font-size: @font-size-medium;
}
</style>
```
