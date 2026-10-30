// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`TextArea > matches the snapshot > Case 0 with a truthy modelValue prop which dynamically adds a class to <textarea>: ({ modelValue: 'Earth Day' }) => HTML 1`] = `
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

exports[`TextArea > matches the snapshot > Case 1 with attributes: ({}) => HTML 1`] = `
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

exports[`TextArea > matches the snapshot > Case 2 with disabled as true: ({ modelValue: 'Earth Day' }) => HTML 1`] = `
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

exports[`TextArea > matches the snapshot > Case 3 with readonly as true: ({ modelValue: 'Earth Day' }) => HTML 1`] = `
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

exports[`TextArea > matches the snapshot > Case 4 with error status: ({ status: 'error' }) => HTML 1`] = `
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

exports[`TextArea > matches the snapshot > Case 5 with autosize as true: ({ autosize: true }) => HTML 1`] = `
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

exports[`TextArea > matches the snapshot > Case 6 with start icon: ({ startIcon: '<circle cx="10" cy="10" r="4"/>' }) => HTML 1`] = `
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
    >
      <!--v-if-->
      <!-- eslint-disable vue/no-v-html -->
      <g>
        <circle
          cx="10"
          cy="10"
          r="4"
        />
      </g>
    </svg>
  </span>
  <!--v-if-->
</div>
`;

exports[`TextArea > matches the snapshot > Case 7 with end icon: ({ endIcon: { langCodeMap: { ar: '<path d="M13 20H7v-2h6zM10 0c1.938 0 3.58.556 4.745 1.644C15.918 2.738 16.5 4.27 16.5 6c0 2.22-1.15 3.732-2.04 4.727-.644.72-.96 1.633-.96 2.662V16h-7v-2.611c0-1.029-.317-1.942-.96-2.662C4.65 9.732 3.5 8.22 3.5 6c0-1.627.593-3.145 1.743-4.255C6.395.634 8.032 0 10 0"/>' }, default: '<path d="M10 1a9 9 0 110 18 9 9 0 010-18M8 9v2h1v2H8v2h4v-2h-1V9zm1-4v2h2V5z"/>' } }) => HTML 1`] = `
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
    >
      <!--v-if-->
      <!-- eslint-disable vue/no-v-html -->
      <g>
        <path
          d="M10 1a9 9 0 110 18 9 9 0 010-18M8 9v2h1v2H8v2h4v-2h-1V9zm1-4v2h2V5z"
        />
      </g>
    </svg>
  </span>
</div>
`;

exports[`TextArea > matches the snapshot > Case 8 with start and end icons: ({ startIcon: '<circle cx="10" cy="10" r="4"/>', endIcon: { langCodeMap: { ar: '<path d="M13 20H7v-2h6zM10 0c1.938 0 3.58.556 4.745 1.644C15.918 2.738 16.5 4.27 16.5 6c0 2.22-1.15 3.732-2.04 4.727-.644.72-.96 1.633-.96 2.662V16h-7v-2.611c0-1.029-.317-1.942-.96-2.662C4.65 9.732 3.5 8.22 3.5 6c0-1.627.593-3.145 1.743-4.255C6.395.634 8.032 0 10 0"/>' }, default: '<path d="M10 1a9 9 0 110 18 9 9 0 010-18M8 9v2h1v2H8v2h4v-2h-1V9zm1-4v2h2V5z"/>' } }) => HTML 1`] = `
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
    >
      <!--v-if-->
      <!-- eslint-disable vue/no-v-html -->
      <g>
        <circle
          cx="10"
          cy="10"
          r="4"
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
    >
      <!--v-if-->
      <!-- eslint-disable vue/no-v-html -->
      <g>
        <path
          d="M10 1a9 9 0 110 18 9 9 0 010-18M8 9v2h1v2H8v2h4v-2h-1V9zm1-4v2h2V5z"
        />
      </g>
    </svg>
  </span>
</div>
`;
