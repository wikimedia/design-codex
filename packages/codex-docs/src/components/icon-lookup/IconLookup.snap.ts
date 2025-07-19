// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`IconLookup matches the snapshot icon lookup (no default icon) => HTML 1`] = `
<div
  class="cdx-lookup cdx-docs-icon-lookup"
>
  <div
    class="cdx-text-input cdx-text-input--status-default cdx-lookup__input"
  >
    <input
      aria-autocomplete="list"
      aria-controls="v-0"
      aria-expanded="false"
      autocomplete="off"
      class="cdx-text-input__input"
      placeholder="Start typing an icon name"
      role="combobox"
      size="1"
      type="text"
    />
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
  </div>
  <!--teleport start-->
  <!--teleport end-->
</div>
`;

exports[`IconLookup matches the snapshot icon lookup (with default icon) => HTML 1`] = `
<div
  class="cdx-lookup cdx-docs-icon-lookup"
>
  <div
    class="cdx-text-input cdx-text-input--clearable cdx-text-input--status-default cdx-lookup__input"
  >
    <input
      aria-autocomplete="list"
      aria-controls="v-0"
      aria-expanded="false"
      autocomplete="off"
      class="cdx-text-input__input cdx-text-input__input--has-value"
      placeholder="Start typing an icon name"
      role="combobox"
      size="1"
      type="text"
    />
    <!--v-if-->
    <!--v-if-->
    <span
      class="cdx-icon cdx-icon--medium cdx-text-input__icon-vue cdx-text-input__clear-icon"
    >
      <svg
        aria-hidden="true"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!--v-if-->
        <g>
          <path
            d="M10 0a10 10 0 1010 10A10 10 0 0010 0m5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"
          />
        </g>
      </svg>
    </span>
  </div>
  <!--teleport start-->
  <!--teleport end-->
</div>
`;
