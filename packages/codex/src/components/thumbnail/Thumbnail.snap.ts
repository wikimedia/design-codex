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
            d="M19 19H1V1h18zm-8.5-6-2-2L5 15h10V8zM6.25 5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5"
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

exports[`Thumbnail matches the snapshot Case 1 With custom placeholder icon: ({"ltr": "<path d=\\"M14 15H6v-2h8zm-5-4H6V9h3zm5 0h-3V5h3zM9 7H6V5h3z\\"/><path d=\\"M18 19H2V1h16zM4 17h12V3H4z\\"/>", "shouldFlip": true}) => HTML 1`] = `
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
            d="M14 15H6v-2h8zm-5-4H6V9h3zm5 0h-3V5h3zM9 7H6V5h3z"
          />
          <path
            d="M18 19H2V1h16zM4 17h12V3H4z"
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
