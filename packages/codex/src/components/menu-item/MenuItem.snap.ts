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
    <!-- Thumbnail, thumbnail placeholder, or icon. -->
    <!--v-if-->
    <!-- Item text. -->
    <span
      class="cdx-menu-item__text"
    >
      <!-- Item label. -->
      <span
        class="cdx-menu-item__text__label"
      >
        <bdi>
          menuItemValue
        </bdi>
      </span>
      <!-- Item search query match (e.g. alias). -->
      <!--v-if-->
      <!-- Item label supporting text. -->
      <!--v-if-->
      <!-- Item description. -->
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
    <!-- Thumbnail, thumbnail placeholder, or icon. -->
    <!--v-if-->
    <!-- Item text. -->
    <span
      class="cdx-menu-item__text"
    >
      <!-- Item label. -->
      <span
        class="cdx-menu-item__text__label"
      >
        <bdi>
          Test menu item
        </bdi>
      </span>
      <!-- Item search query match (e.g. alias). -->
      <!--v-if-->
      <!-- Item label supporting text. -->
      <!--v-if-->
      <!-- Item description. -->
      <!--v-if-->
    </span>
  </span>
  
</li>
`;

exports[`matches the snapshot Case 2 Item with match: ({"id": "test-menu-item", "match": "(match)", "value": "menuItemValue"}) => HTML 1`] = `
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
    <!-- Thumbnail, thumbnail placeholder, or icon. -->
    <!--v-if-->
    <!-- Item text. -->
    <span
      class="cdx-menu-item__text"
    >
      <!-- Item label. -->
      <span
        class="cdx-menu-item__text__label"
      >
        <bdi>
          menuItemValue
        </bdi>
      </span>
      <!-- Item search query match (e.g. alias). -->
      
      <!-- Add a space before the match. Vue strips whitespace between everything
						except plain text, so we can't rely on a newline to add a natural space
						here. -->
      <!-- eslint-disable-next-line vue/no-useless-mustaches -->
         
      <span
        class="cdx-menu-item__text__match"
      >
        <bdi>
          (match)
        </bdi>
      </span>
      
      <!-- Item label supporting text. -->
      <!--v-if-->
      <!-- Item description. -->
      <!--v-if-->
    </span>
  </span>
  
</li>
`;

exports[`matches the snapshot Case 3 Item with supporting text: ({"id": "test-menu-item", "supportingText": "(supporting text)", "value": "menuItemValue"}) => HTML 1`] = `
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
    <!-- Thumbnail, thumbnail placeholder, or icon. -->
    <!--v-if-->
    <!-- Item text. -->
    <span
      class="cdx-menu-item__text"
    >
      <!-- Item label. -->
      <span
        class="cdx-menu-item__text__label"
      >
        <bdi>
          menuItemValue
        </bdi>
      </span>
      <!-- Item search query match (e.g. alias). -->
      <!--v-if-->
      <!-- Item label supporting text. -->
      
      <!-- eslint-disable-next-line vue/no-useless-mustaches -->
         
      <span
        class="cdx-menu-item__text__supporting-text"
      >
        <bdi>
          (supporting text)
        </bdi>
      </span>
      
      <!-- Item description. -->
      <!--v-if-->
    </span>
  </span>
  
</li>
`;

exports[`matches the snapshot Case 4 Item with url: ({"description": "Test search result", "id": "test-search-result", "url": "https://example.org/test", "value": "searchResultValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--has-description"
  id="test-search-result"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <a
    class="cdx-menu-item__content"
    href="https://example.org/test"
  >
    <!-- Thumbnail, thumbnail placeholder, or icon. -->
    <!--v-if-->
    <!-- Item text. -->
    <span
      class="cdx-menu-item__text"
    >
      <!-- Item label. -->
      <span
        class="cdx-menu-item__text__label"
      >
        <bdi>
          searchResultValue
        </bdi>
      </span>
      <!-- Item search query match (e.g. alias). -->
      <!--v-if-->
      <!-- Item label supporting text. -->
      <!--v-if-->
      <!-- Item description. -->
      <span
        class="cdx-menu-item__text__description"
      >
        <bdi>
          Test search result
        </bdi>
      </span>
    </span>
  </a>
  
</li>
`;

exports[`matches the snapshot Case 5 Item with icon: ({"description": "Test search result", "icon": [Object], "id": "test-search-result", "url": "https://example.org/test", "value": "searchResultValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--has-description"
  id="test-search-result"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <a
    class="cdx-menu-item__content"
    href="https://example.org/test"
  >
    <!-- Thumbnail, thumbnail placeholder, or icon. -->
    <span
      class="cdx-icon cdx-icon--medium cdx-menu-item__icon"
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
            d="M9 1.28A1 1 0 008.35 1H2a1 1 0 00-1 1v6.35a1 1 0 00.28.65L11 18.72a1 1 0 001.37 0l6.38-6.38a1 1 0 00-.03-1.34zM5 7a2 2 0 112-2 2 2 0 01-2 2z"
          />
        </g>
      </svg>
    </span>
    <!-- Item text. -->
    <span
      class="cdx-menu-item__text"
    >
      <!-- Item label. -->
      <span
        class="cdx-menu-item__text__label"
      >
        <bdi>
          searchResultValue
        </bdi>
      </span>
      <!-- Item search query match (e.g. alias). -->
      <!--v-if-->
      <!-- Item label supporting text. -->
      <!--v-if-->
      <!-- Item description. -->
      <span
        class="cdx-menu-item__text__description"
      >
        <bdi>
          Test search result
        </bdi>
      </span>
    </span>
  </a>
  
</li>
`;

exports[`matches the snapshot Case 6 Item with placeholder thumbnail: ({"description": "Test search result", "id": "test-search-result", "url": "https://example.org/test", "value": "searchResultValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--has-description"
  id="test-search-result"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <a
    class="cdx-menu-item__content"
    href="https://example.org/test"
  >
    <!-- Thumbnail, thumbnail placeholder, or icon. -->
    <span
      class="cdx-thumbnail cdx-menu-item__thumbnail"
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
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <!--v-if-->
            <!-- eslint-disable vue/no-v-html -->
            <g>
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
      <transition-stub>
        <!--v-if-->
      </transition-stub>
    </span>
    <!-- Item text. -->
    <span
      class="cdx-menu-item__text"
    >
      <!-- Item label. -->
      <span
        class="cdx-menu-item__text__label"
      >
        <bdi>
          searchResultValue
        </bdi>
      </span>
      <!-- Item search query match (e.g. alias). -->
      <!--v-if-->
      <!-- Item label supporting text. -->
      <!--v-if-->
      <!-- Item description. -->
      <span
        class="cdx-menu-item__text__description"
      >
        <bdi>
          Test search result
        </bdi>
      </span>
    </span>
  </a>
  
</li>
`;

exports[`matches the snapshot Case 7 Item with search query: ({"description": "Test search result", "id": "test-search-result", "url": "https://example.org/test", "value": "searchResultValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--highlight-query cdx-menu-item--has-description"
  id="test-search-result"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <a
    class="cdx-menu-item__content"
    href="https://example.org/test"
  >
    <!-- Thumbnail, thumbnail placeholder, or icon. -->
    <!--v-if-->
    <!-- Item text. -->
    <span
      class="cdx-menu-item__text"
    >
      <!-- Item label. -->
      <span
        class="cdx-search-result-title"
      >
        <!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
        <!--eslint-disable-next-line max-len-->
        <bdi>
          searchResultValue
          <span
            class="cdx-search-result-title__match"
          />
          
        </bdi>
      </span>
      <!-- Item search query match (e.g. alias). -->
      <!--v-if-->
      <!-- Item label supporting text. -->
      <!--v-if-->
      <!-- Item description. -->
      <span
        class="cdx-menu-item__text__description"
      >
        <bdi>
          Test search result
        </bdi>
      </span>
    </span>
  </a>
  
</li>
`;

exports[`matches the snapshot Case 8 Item with language attributes: ({"description": "la descripción en español", "id": "test-menu-item-with-lang", "label": "Menu item with lang", "language": [Object], "match": "(match)", "value": "menuItemWithLangValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--has-description"
  id="test-menu-item-with-lang"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <span
    class="cdx-menu-item__content"
  >
    <!-- Thumbnail, thumbnail placeholder, or icon. -->
    <!--v-if-->
    <!-- Item text. -->
    <span
      class="cdx-menu-item__text"
    >
      <!-- Item label. -->
      <span
        class="cdx-menu-item__text__label"
        lang="en"
      >
        <bdi>
          Menu item with lang
        </bdi>
      </span>
      <!-- Item search query match (e.g. alias). -->
      
      <!-- Add a space before the match. Vue strips whitespace between everything
						except plain text, so we can't rely on a newline to add a natural space
						here. -->
      <!-- eslint-disable-next-line vue/no-useless-mustaches -->
         
      <span
        class="cdx-menu-item__text__match"
        lang="en"
      >
        <bdi>
          (match)
        </bdi>
      </span>
      
      <!-- Item label supporting text. -->
      <!--v-if-->
      <!-- Item description. -->
      <span
        class="cdx-menu-item__text__description"
        lang="es"
      >
        <bdi>
          la descripción en español
        </bdi>
      </span>
    </span>
  </span>
  
</li>
`;

exports[`matches the snapshot Case 9 Item with language attributes and search query: ({"description": "la descripción en español", "id": "test-menu-item-with-lang", "label": "Menu item with lang", "language": [Object], "match": "(match)", "value": "menuItemWithLangValue"}) => HTML 1`] = `
<li
  aria-disabled="false"
  aria-selected="false"
  class="cdx-menu-item cdx-menu-item--enabled cdx-menu-item--highlight-query cdx-menu-item--has-description"
  id="test-menu-item-with-lang"
  role="option"
>
  <!-- @slot Custom menu item content. -->
  
  <span
    class="cdx-menu-item__content"
  >
    <!-- Thumbnail, thumbnail placeholder, or icon. -->
    <!--v-if-->
    <!-- Item text. -->
    <span
      class="cdx-menu-item__text"
    >
      <!-- Item label. -->
      <span
        class="cdx-search-result-title"
        lang="en"
      >
        <!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
        <!--eslint-disable-next-line max-len-->
        <bdi>
          Menu item with lang
          <span
            class="cdx-search-result-title__match"
          />
          
        </bdi>
      </span>
      <!-- Item search query match (e.g. alias). -->
      
      <!-- Add a space before the match. Vue strips whitespace between everything
						except plain text, so we can't rely on a newline to add a natural space
						here. -->
      <!-- eslint-disable-next-line vue/no-useless-mustaches -->
         
      <span
        class="cdx-search-result-title"
        lang="en"
      >
        <!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
        <!--eslint-disable-next-line max-len-->
        <bdi>
          (
          <span
            class="cdx-search-result-title__match"
          >
            match
          </span>
          )
        </bdi>
      </span>
      
      <!-- Item label supporting text. -->
      <!--v-if-->
      <!-- Item description. -->
      <span
        class="cdx-menu-item__text__description"
        lang="es"
      >
        <bdi>
          la descripción en español
        </bdi>
      </span>
    </span>
  </span>
  
</li>
`;
