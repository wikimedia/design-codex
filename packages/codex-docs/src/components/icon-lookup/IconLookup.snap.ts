// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot icon lookup (no default icon) => HTML 1`] = `
<div
  class="cdx-lookup cdx-docs-icon-lookup"
>
  <div
    class="cdx-text-input cdx-lookup__input"
  >
    <input
      aria-autocomplete="list"
      aria-expanded="false"
      aria-owns="cdx-lookup-menu-0"
      autocomplete="off"
      class="cdx-text-input__input"
      placeholder="Start typing an icon name"
      role="combobox"
      type="text"
    />
    <!---->
    <!---->
    <!---->
  </div>
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-lookup-menu-0"
    role="listbox"
    style="display: none;"
  >
    <!---->
    <li
      class="cdx-menu__no-results cdx-menu-item"
    >
      
      
    </li>
    
    
    <!---->
  </ul>
</div>
`;

exports[`matches the snapshot icon lookup (with default icon) => HTML 1`] = `
<div
  class="cdx-lookup cdx-docs-icon-lookup"
>
  <div
    class="cdx-text-input cdx-text-input--clearable cdx-lookup__input"
  >
    <input
      aria-autocomplete="list"
      aria-expanded="false"
      aria-owns="cdx-lookup-menu-1"
      autocomplete="off"
      class="cdx-text-input__input cdx-text-input__input--has-value"
      placeholder="Start typing an icon name"
      role="combobox"
      type="text"
    />
    <!---->
    <!---->
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
        <!---->
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
  <ul
    aria-multiselectable="false"
    class="cdx-menu"
    id="cdx-lookup-menu-1"
    role="listbox"
    style="display: none;"
  >
    <!---->
    <!---->
    
    <li
      aria-disabled="false"
      aria-selected="true"
      class="cdx-menu-item cdx-menu-item--selected cdx-menu-item--enabled cdx-menu-item--bold-label"
      id="cdx-menu-item-2"
      role="option"
    >
      
      <span
        class="cdx-menu-item__content"
      >
        <span
          class="cdx-icon cdx-menu-item__icon"
        >
          <svg
            aria-hidden="true"
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!---->
            <g
              fill="currentColor"
            >
              <path
                d="M9 1.28A1 1 0 008.35 1H2a1 1 0 00-1 1v6.35a1 1 0 00.28.65L11 18.72a1 1 0 001.37 0l6.38-6.38a1 1 0 00-.03-1.34zM5 7a2 2 0 112-2 2 2 0 01-2 2z"
              />
            </g>
          </svg>
        </span>
        <span
          class="cdx-menu-item__text"
        >
          <span
            class="cdx-menu-item__text__label"
          >
            <bdi>
              cdxIconTag
            </bdi>
          </span>
          <!---->
          <!---->
        </span>
      </span>
      
    </li>
    
    <!---->
  </ul>
</div>
`;
