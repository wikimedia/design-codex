// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Image matches the snapshot Case 0 renders in the default state with a valid source: ({"alt": "Valid image", "height": 220, "src": "https://upload.wikimedia.org/wikipedia/commons/d/df/Full_moon_partially_obscured_by_atmosphere.jpg", "width": 400}) => HTML 1`] = `
<div
  class="cdx-image"
>
  <img
    alt="Valid image"
    class="cdx-image__image cdx-image__image--object-position-center cdx-image__image--object-fit-cover cdx-image__image--is-loading"
    height="220"
    loading="lazy"
    src="https://upload.wikimedia.org/wikipedia/commons/d/df/Full_moon_partially_obscured_by_atmosphere.jpg"
    width="400"
  />
  <div
    class="cdx-image__placeholder"
    style="width: 400px; height: 220px;"
  >
    <span
      class="cdx-icon cdx-icon--medium cdx-image__placeholder__icon cdx-image__placeholder__icon--size-large"
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
            d="M15 15H5l3.5-4 2 2L15 8zM6.25 5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5"
          />
          <path
            d="M19 19H1V1h18zM3 17h14V3H3z"
          />
        </g>
      </svg>
    </span>
  </div>
</div>
`;

exports[`Image matches the snapshot Case 1 renders with a custom aspect ratio: ({"alt": "Image with aspect ratio", "aspectRatio": "16:9", "height": 220, "src": "https://upload.wikimedia.org/wikipedia/commons/d/df/Full_moon_partially_obscured_by_atmosphere.jpg", "width": 400}) => HTML 1`] = `
<div
  class="cdx-image"
>
  <img
    alt="Image with aspect ratio"
    class="cdx-image__image cdx-image__image--16-9 cdx-image__image--object-position-center cdx-image__image--object-fit-cover cdx-image__image--is-loading"
    height="220"
    loading="lazy"
    src="https://upload.wikimedia.org/wikipedia/commons/d/df/Full_moon_partially_obscured_by_atmosphere.jpg"
    width="400"
  />
  <div
    class="cdx-image__placeholder cdx-image__placeholder--16-9"
    style="width: 400px; height: 220px;"
  >
    <span
      class="cdx-icon cdx-icon--medium cdx-image__placeholder__icon cdx-image__placeholder__icon--size-large"
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
            d="M15 15H5l3.5-4 2 2L15 8zM6.25 5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5"
          />
          <path
            d="M19 19H1V1h18zM3 17h14V3H3z"
          />
        </g>
      </svg>
    </span>
  </div>
</div>
`;
