// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Input type: text : ({"inputType": "text"}) => HTML 1`] = `
<div
  class="cdx-text-input"
>
  <input
    class="cdx-text-input__input"
    type="text"
  />
  <!--v-if-->
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 1 Input type: search : ({"inputType": "search"}) => HTML 1`] = `
<div
  class="cdx-text-input"
>
  <input
    class="cdx-text-input__input"
    type="search"
  />
  <!--v-if-->
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 2 Disabled: ({"disabled": true}) => HTML 1`] = `
<div
  class="cdx-text-input"
>
  <input
    class="cdx-text-input__input"
    disabled=""
    type="text"
  />
  <!--v-if-->
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 3 With start icon: ({"startIcon": "<path d=\\"M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z\\"/>"}) => HTML 1`] = `
<div
  class="cdx-text-input cdx-text-input--has-start-icon"
>
  <input
    class="cdx-text-input__input"
    type="text"
  />
  <span
    class="cdx-icon cdx-text-input__icon cdx-text-input__start-icon"
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
      <g
        fill="currentColor"
      >
        <path
          d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z"
        />
      </g>
    </svg>
  </span>
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 4 With end icon: ({"endIcon": [Object]}) => HTML 1`] = `
<div
  class="cdx-text-input cdx-text-input--has-end-icon"
>
  <input
    class="cdx-text-input__input"
    type="text"
  />
  <!--v-if-->
  <span
    class="cdx-icon cdx-text-input__icon cdx-text-input__end-icon"
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
      <g
        fill="currentColor"
      >
        <path
          d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"
        />
      </g>
    </svg>
  </span>
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 5 Clearable, no input: ({"clearable": true}) => HTML 1`] = `
<div
  class="cdx-text-input"
>
  <input
    class="cdx-text-input__input"
    type="text"
  />
  <!--v-if-->
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 6 Clearable, with input: ({"clearable": true, "modelValue": "Some value"}) => HTML 1`] = `
<div
  class="cdx-text-input cdx-text-input--clearable"
>
  <input
    class="cdx-text-input__input cdx-text-input__input--has-value"
    type="text"
  />
  <!--v-if-->
  <!--v-if-->
  <span
    class="cdx-icon cdx-text-input__icon cdx-text-input__clear-icon"
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
      <g
        fill="currentColor"
      >
        <path
          d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"
        />
      </g>
    </svg>
  </span>
</div>
`;

exports[`matches the snapshot Case 7 With end icon, clearable, no input: ({"clearable": true, "endIcon": [Object]}) => HTML 1`] = `
<div
  class="cdx-text-input cdx-text-input--has-end-icon"
>
  <input
    class="cdx-text-input__input"
    type="text"
  />
  <!--v-if-->
  <span
    class="cdx-icon cdx-text-input__icon cdx-text-input__end-icon"
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
      <g
        fill="currentColor"
      >
        <path
          d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"
        />
      </g>
    </svg>
  </span>
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 8 With end icon, clearable, with input: ({"clearable": true, "endIcon": [Object], "modelValue": "Some value"}) => HTML 1`] = `
<div
  class="cdx-text-input cdx-text-input--has-end-icon cdx-text-input--clearable"
>
  <input
    class="cdx-text-input__input cdx-text-input__input--has-value"
    type="text"
  />
  <!--v-if-->
  <span
    class="cdx-icon cdx-text-input__icon cdx-text-input__end-icon"
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
      <g
        fill="currentColor"
      >
        <path
          d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 5h2v2H9zm0 4h2v6H9z"
        />
      </g>
    </svg>
  </span>
  <span
    class="cdx-icon cdx-text-input__icon cdx-text-input__clear-icon"
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
      <g
        fill="currentColor"
      >
        <path
          d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"
        />
      </g>
    </svg>
  </span>
</div>
`;

exports[`matches the snapshot Case 9 With attributes: ({}) => HTML 1`] = `
<div
  class="cdx-text-input"
>
  <input
    class="cdx-text-input__input"
    placeholder="Start typing..."
    size="30"
    type="text"
  />
  <!--v-if-->
  <!--v-if-->
  <!--v-if-->
</div>
`;
