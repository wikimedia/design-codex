// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`TextArea matches the snapshot Case 0 with a truthy modelValue prop which dynamically adds a class to <textarea>: ({"modelValue": "Earth Day"}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default"
>
  <textarea
    class="cdx-text-area__textarea--has-value cdx-text-area__textarea"
  />
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`TextArea matches the snapshot Case 1 with attributes: ({}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default"
>
  <textarea
    class="cdx-text-area__textarea"
    placeholder="Start typing..."
  />
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`TextArea matches the snapshot Case 2 with disabled as true: ({"modelValue": "Earth Day"}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default"
>
  <textarea
    class="cdx-text-area__textarea--has-value cdx-text-area__textarea"
    disabled=""
    placeholder="Start typing..."
  />
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`TextArea matches the snapshot Case 3 with readonly as true: ({"modelValue": "Earth Day"}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default"
>
  <textarea
    class="cdx-text-area__textarea--has-value cdx-text-area__textarea"
    placeholder="Start typing..."
    readonly=""
  />
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`TextArea matches the snapshot Case 4 with error status: ({"status": "error"}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-error"
>
  <textarea
    class="cdx-text-area__textarea"
    placeholder="Start typing..."
  />
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`TextArea matches the snapshot Case 5 with autosize as true: ({"autosize": true}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default"
>
  <textarea
    class="cdx-text-area__textarea--is-autosize cdx-text-area__textarea"
    placeholder="Start typing..."
  />
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`TextArea matches the snapshot Case 6 with start icon: ({"startIcon": "<circle cx=\\"9.85\\" cy=\\"10\\" r=\\"9\\"/>"}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default cdx-text-area--has-start-icon"
>
  <textarea
    class="cdx-text-area__textarea"
    placeholder="Start typing..."
  />
  <span
    class="cdx-icon cdx-icon--medium cdx-text-area__icon-vue cdx-text-area__start-icon"
  >
    <svg
      aria-hidden="true"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <!--v-if-->
      <!-- eslint-disable vue/no-v-html -->
      <g>
        <circle
          cx="9.85"
          cy="10"
          r="9"
        />
      </g>
    </svg>
  </span>
  <!--v-if-->
</div>
`;

exports[`TextArea matches the snapshot Case 7 with end icon: ({"endIcon": [Object]}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default cdx-text-area--has-end-icon"
>
  <textarea
    class="cdx-text-area__textarea"
    placeholder="Start typing..."
  />
  <!--v-if-->
  <span
    class="cdx-icon cdx-icon--medium cdx-text-area__icon-vue cdx-text-area__end-icon"
  >
    <svg
      aria-hidden="true"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <!--v-if-->
      <!-- eslint-disable vue/no-v-html -->
      <g>
        <path
          d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0M9 5h2v2H9zm0 4h2v6H9z"
        />
      </g>
    </svg>
  </span>
</div>
`;

exports[`TextArea matches the snapshot Case 8 with start and end icons: ({"endIcon": [Object], "startIcon": "<circle cx=\\"9.85\\" cy=\\"10\\" r=\\"9\\"/>"}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default cdx-text-area--has-start-icon cdx-text-area--has-end-icon"
>
  <textarea
    class="cdx-text-area__textarea"
    placeholder="Start typing..."
  />
  <span
    class="cdx-icon cdx-icon--medium cdx-text-area__icon-vue cdx-text-area__start-icon"
  >
    <svg
      aria-hidden="true"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <!--v-if-->
      <!-- eslint-disable vue/no-v-html -->
      <g>
        <circle
          cx="9.85"
          cy="10"
          r="9"
        />
      </g>
    </svg>
  </span>
  <span
    class="cdx-icon cdx-icon--medium cdx-text-area__icon-vue cdx-text-area__end-icon"
  >
    <svg
      aria-hidden="true"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <!--v-if-->
      <!-- eslint-disable vue/no-v-html -->
      <g>
        <path
          d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0M9 5h2v2H9zm0 4h2v6H9z"
        />
      </g>
    </svg>
  </span>
</div>
`;
