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
  <div
    class="cdx-menu"
    style="display: none;"
  >
    <ul
      class="cdx-menu__listbox"
      id="v-0"
      role="listbox"
      tabindex="-1"
    >
      <!--v-if-->
      <li
        class="cdx-menu__no-results cdx-menu-item"
        role="option"
      >
        
        
      </li>
      
      
      <!--v-if-->
    </ul>
  </div>
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
            d="M14.243 7.172 11.413 10l2.828 2.83-1.414 1.413L10 11.415l-2.827 2.827-1.414-1.414L8.585 10 5.757 7.172l1.415-1.414 2.827 2.828 2.83-2.828z"
          />
          <path
            d="M10 1a9 9 0 110 18 9 9 0 010-18m0 2a7 7 0 100 14 7 7 0 000-14"
          />
        </g>
      </svg>
    </span>
  </div>
  <!--teleport start-->
  <div
    class="cdx-menu"
    style="display: none; visibility: hidden; position: absolute; top: 0px; left: 0px; transform: translate(0px, 0px);"
  >
    <ul
      class="cdx-menu__listbox"
      id="v-0"
      role="listbox"
      tabindex="-1"
    >
      <!--v-if-->
      <!--v-if-->
      
      
      <li
        aria-disabled="false"
        aria-selected="true"
        class="cdx-menu-item cdx-menu-item--selected cdx-menu-item--enabled cdx-menu-item--bold-label"
        id="v-1-1"
        role="option"
      >
        
        <span
          class="cdx-menu-item__content"
        >
          <span
            class="cdx-icon cdx-icon--medium cdx-menu-item__icon"
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
                  d="m19.914 11.503-8.413 8.414L.004 8.414.003 1l1-1h7.415zM2.003 7.587l9.497 9.502 5.585-5.587-9.496-9.501L2.003 2z"
                />
                <circle
                  cx="5.5"
                  cy="5.5"
                  r="1.5"
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
            <!--v-if-->
            <!--v-if-->
            <!--v-if-->
          </span>
          <!--v-if-->
        </span>
        
      </li>
      
      
      <!--v-if-->
    </ul>
  </div>
  <!--teleport end-->
</div>
`;
