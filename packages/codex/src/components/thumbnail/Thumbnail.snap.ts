// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Thumbnail matches the snapshot Case 0 With default placeholder icon: (%p) => HTML 1`] = `
<span
  class="cdx-thumbnail"
>
  <span
    class="cdx-thumbnail__placeholder"
  >
    <span
      class="cdx-icon cdx-icon--medium cdx-thumbnail__placeholder__icon--vue"
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
            d="M19 19H1V1h18zm-8.5-6-2-2L5 15h10V8zm-4-8a1.5 1.5 0 100 3 1.5 1.5 0 000-3"
          />
        </g>
      </svg>
    </span>
  </span>
  <transition-stub
    appear="false"
    css="true"
    name="cdx-thumbnail__image"
    persisted="false"
  >
    <!--v-if-->
  </transition-stub>
</span>
`;

exports[`Thumbnail matches the snapshot Case 1 With custom placeholder icon: ({"ltr": "<path d=\\"M14 16H6v-1h8zm0-2H6v-1h8zm0-2H6v-1h8zM9 9H6V8h3zm5 0h-4V4h4zM9 7H6V6h3zm0-2H6V4h3z\\"/><path d=\\"M18 20H2V0h16zM4 18h12V2H4z\\"/>", "shouldFlip": true}) => HTML 1`] = `
<span
  class="cdx-thumbnail"
>
  <span
    class="cdx-thumbnail__placeholder"
  >
    <span
      class="cdx-icon cdx-icon--medium cdx-thumbnail__placeholder__icon--vue"
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
            d="M14 16H6v-1h8zm0-2H6v-1h8zm0-2H6v-1h8zM9 9H6V8h3zm5 0h-4V4h4zM9 7H6V6h3zm0-2H6V4h3z"
          />
          <path
            d="M18 20H2V0h16zM4 18h12V2H4z"
          />
        </g>
      </svg>
    </span>
  </span>
  <transition-stub
    appear="false"
    css="true"
    name="cdx-thumbnail__image"
    persisted="false"
  >
    <!--v-if-->
  </transition-stub>
</span>
`;
