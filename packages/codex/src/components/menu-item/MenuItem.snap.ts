// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Item without label: ({"id": "test-menu-item", "value": "menuItemValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled"
  id="test-menu-item"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <span
    class="cdx-menu-item__content"
  >
    <!--v-if-->
    <span
      class="cdx-menu-item__text"
    >
      <span
        class="cdx-menu-item__label"
      >
        menuItemValue
      </span>
      <!--v-if-->
    </span>
  </span>
  
</li>
`;

exports[`matches the snapshot Case 1 Item with label: ({"id": "test-menu-item", "label": "Test menu item", "value": "menuItemValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled"
  id="test-menu-item"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <span
    class="cdx-menu-item__content"
  >
    <!--v-if-->
    <span
      class="cdx-menu-item__text"
    >
      <span
        class="cdx-menu-item__label"
      >
        Test menu item
      </span>
      <!--v-if-->
    </span>
  </span>
  
</li>
`;

exports[`matches the snapshot Case 2 Item with url: ({"description": "Test search result", "id": "test-search-result", "url": "https://example.org/test", "value": "searchResultValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled"
  id="test-search-result"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <a
    class="cdx-menu-item__content"
    href="https://example.org/test"
  >
    <!--v-if-->
    <span
      class="cdx-menu-item__text"
    >
      <span
        class="cdx-menu-item__label"
      >
        searchResultValue
      </span>
      <span
        class="cdx-menu-item__text__description"
      >
        Test search result
      </span>
    </span>
  </a>
  
</li>
`;

exports[`matches the snapshot Case 3 Item with icon: ({"description": "Test search result", "icon": [Object], "id": "test-search-result", "url": "https://example.org/test", "value": "searchResultValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled"
  id="test-search-result"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <a
    class="cdx-menu-item__content"
    href="https://example.org/test"
  >
    <span
      class="cdx-menu-item__icon"
    >
      <span
        class="cdx-icon"
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
              d="M9 1.28A1 1 0 008.35 1H2a1 1 0 00-1 1v6.35a1 1 0 00.28.65L11 18.72a1 1 0 001.37 0l6.38-6.38a1 1 0 00-.03-1.34zM5 7a2 2 0 112-2 2 2 0 01-2 2z"
            />
          </g>
        </svg>
      </span>
    </span>
    <span
      class="cdx-menu-item__text"
    >
      <span
        class="cdx-menu-item__label"
      >
        searchResultValue
      </span>
      <span
        class="cdx-menu-item__text__description"
      >
        Test search result
      </span>
    </span>
  </a>
  
</li>
`;

exports[`matches the snapshot Case 4 Item with thumbnail: ({"description": "Test search result", "id": "test-search-result", "thumbnail": [Object], "url": "https://example.org/test", "value": "searchResultValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled"
  id="test-search-result"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <a
    class="cdx-menu-item__content"
    href="https://example.org/test"
  >
    <span
      class="cdx-menu-item__thumbnail"
      style="background-image: url(https://example.org/test/thumbnail.jpg);"
    />
    <span
      class="cdx-menu-item__text"
    >
      <span
        class="cdx-menu-item__label"
      >
        searchResultValue
      </span>
      <span
        class="cdx-menu-item__text__description"
      >
        Test search result
      </span>
    </span>
  </a>
  
</li>
`;

exports[`matches the snapshot Case 5 Item with placeholder thumbnail: ({"description": "Test search result", "id": "test-search-result", "url": "https://example.org/test", "value": "searchResultValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled"
  id="test-search-result"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <a
    class="cdx-menu-item__content"
    href="https://example.org/test"
  >
    <span
      class="cdx-menu-item__thumbnail-placeholder"
    >
      <span
        class="cdx-icon cdx-menu-item__thumbnail-placeholder__icon"
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
              d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"
            />
            <path
              d="M19 5H1V3h18zm0 12H1v-2h18z"
            />
          </g>
        </svg>
      </span>
    </span>
    <span
      class="cdx-menu-item__text"
    >
      <span
        class="cdx-menu-item__label"
      >
        searchResultValue
      </span>
      <span
        class="cdx-menu-item__text__description"
      >
        Test search result
      </span>
    </span>
  </a>
  
</li>
`;

exports[`matches the snapshot Case 6 Item with search query: ({"description": "Test search result", "id": "test-search-result", "url": "https://example.org/test", "value": "searchResultValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--highlight-query"
  id="test-search-result"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <a
    class="cdx-menu-item__content"
    href="https://example.org/test"
  >
    <!--v-if-->
    <span
      class="cdx-menu-item__text"
    >
      <span
        class="cdx-search-result-title"
      >
        <!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
        <!--eslint-disable-next-line max-len-->
        searchResultValue
        <span
          class="cdx-search-result-title__match"
        />
        
      </span>
      <span
        class="cdx-menu-item__text__description"
      >
        Test search result
      </span>
    </span>
  </a>
  
</li>
`;
