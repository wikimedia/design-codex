// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Item with label: ({"description": "An example item", "label": "Label for item", "url": "https://example.org/item", "value": "value"}) => HTML 1`] = `
<a
  class="cdx-list-tile"
  href="https://example.org/item"
>
  <span
    class="cdx-list-tile__thumbnail-placeholder"
  >
    <span
      class="cdx-icon cdx-list-tile__thumbnail-icon"
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
    class="cdx-list-tile__text"
  >
    <span
      class="cdx-list-tile-label"
    >
      <!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
      <!--eslint-disable-next-line max-len-->
      
      <span
        class="cdx-list-tile-label__match"
      >
        Label for item
      </span>
      
    </span>
    <span
      class="cdx-list-tile__description"
    >
      An example item
    </span>
  </span>
</a>
`;

exports[`matches the snapshot Case 1 With search query: ({"description": "An example item", "label": "Label for item", "url": "https://example.org/item", "value": "value"}) => HTML 1`] = `
<a
  class="cdx-list-tile"
  href="https://example.org/item"
>
  <span
    class="cdx-list-tile__thumbnail-placeholder"
  >
    <span
      class="cdx-icon cdx-list-tile__thumbnail-icon"
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
    class="cdx-list-tile__text"
  >
    <span
      class="cdx-list-tile-label"
    >
      <!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
      <!--eslint-disable-next-line max-len-->
      
      <span
        class="cdx-list-tile-label__match"
      >
        Label for item
      </span>
      
    </span>
    <span
      class="cdx-list-tile__description"
    >
      An example item
    </span>
  </span>
</a>
`;

exports[`matches the snapshot Case 2 With search query and highlight: ({"description": "An example item", "label": "Label for item", "url": "https://example.org/item", "value": "value"}) => HTML 1`] = `
<a
  class="cdx-list-tile"
  href="https://example.org/item"
>
  <span
    class="cdx-list-tile__thumbnail-placeholder"
  >
    <span
      class="cdx-icon cdx-list-tile__thumbnail-icon"
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
    class="cdx-list-tile__text"
  >
    <span
      class="cdx-list-tile-label"
    >
      <!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
      <!--eslint-disable-next-line max-len-->
      Label for item
      <span
        class="cdx-list-tile-label__match"
      />
      
    </span>
    <span
      class="cdx-list-tile__description"
    >
      An example item
    </span>
  </span>
</a>
`;

exports[`matches the snapshot Case 3 With thumbnail: ({"description": "An example item", "thumbnail": [Object], "url": "https://example.org/item", "value": "value"}) => HTML 1`] = `
<a
  class="cdx-list-tile"
  href="https://example.org/item"
>
  <span
    class="cdx-list-tile__thumbnail"
    style="background-image: url(https://example.org/item/thumbnail.jpg);"
  />
  <span
    class="cdx-list-tile__text"
  >
    <span
      class="cdx-list-tile-label"
    >
      <!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
      <!--eslint-disable-next-line max-len-->
      
      <span
        class="cdx-list-tile-label__match"
      >
        value
      </span>
      
    </span>
    <span
      class="cdx-list-tile__description"
    >
      An example item
    </span>
  </span>
</a>
`;

exports[`matches the snapshot Case 4 Hide thumbnail: ({"description": "An example item", "url": "https://example.org/item", "value": "value"}) => HTML 1`] = `
<a
  class="cdx-list-tile"
  href="https://example.org/item"
>
  <!--v-if-->
  <span
    class="cdx-list-tile__text"
  >
    <span
      class="cdx-list-tile-label"
    >
      <!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
      <!--eslint-disable-next-line max-len-->
      value
      <span
        class="cdx-list-tile-label__match"
      />
      
    </span>
    <span
      class="cdx-list-tile__description"
    >
      An example item
    </span>
  </span>
</a>
`;

exports[`matches the snapshot Case 5 Hide description: ({"description": "An example item", "url": "https://example.org/item", "value": "value"}) => HTML 1`] = `
<a
  class="cdx-list-tile"
  href="https://example.org/item"
>
  <span
    class="cdx-list-tile__thumbnail-placeholder"
  >
    <span
      class="cdx-icon cdx-list-tile__thumbnail-icon"
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
    class="cdx-list-tile__text"
  >
    <span
      class="cdx-list-tile-label"
    >
      <!-- All on one line to avoid introducing unwanted whitespace into the UI. -->
      <!--eslint-disable-next-line max-len-->
      value
      <span
        class="cdx-list-tile-label__match"
      />
      
    </span>
    <!--v-if-->
  </span>
</a>
`;
