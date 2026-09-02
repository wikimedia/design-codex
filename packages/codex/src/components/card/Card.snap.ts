// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Card matches the snapshot Case 0 Card with title and description: ("Title") => HTML 1`] = `
<span
  class="cdx-card"
>
  <!--v-if-->
  <span
    class="cdx-card__text"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <span
      class="cdx-card__text__description"
    >
      <!-- @slot Card description -->
      
      Description
      
    </span>
    <!--v-if-->
    <!--v-if-->
  </span>
</span>
`;

exports[`Card matches the snapshot Case 1 Card with supporting text: ("Title") => HTML 1`] = `
<span
  class="cdx-card"
>
  <!--v-if-->
  <span
    class="cdx-card__text"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <span
      class="cdx-card__text__description"
    >
      <!-- @slot Card description -->
      
      Description
      
    </span>
    <!--v-if-->
    <span
      class="cdx-card__text__supporting-text"
    >
      <!-- @slot Short supporting text -->
      
      Supporting text
      
    </span>
  </span>
</span>
`;

exports[`Card matches the snapshot Case 2 Card with icon: ("Title") => HTML 1`] = `
<span
  class="cdx-card cdx-card--title-only"
>
  <!--v-if-->
  <span
    class="cdx-card__text"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <span
        class="cdx-icon cdx-icon--medium cdx-card__icon"
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
              d="M12 11a6 6 0 016 6v2H2v-2a6 6 0 016-6z"
            />
            <circle
              cx="10"
              cy="5"
              r="4"
            />
          </g>
        </svg>
      </span>
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
  </span>
</span>
`;

exports[`Card matches the snapshot Case 3 Card with icon and thumbnail (icon should not render): ("Title") => HTML 1`] = `
<span
  class="cdx-card cdx-card--title-only"
>
  <span
    class="cdx-thumbnail cdx-card__thumbnail"
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
  <span
    class="cdx-card__text"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
  </span>
</span>
`;

exports[`Card matches the snapshot Case 4 Card with icon and forceThumbnail (icon should not render): ("Title") => HTML 1`] = `
<span
  class="cdx-card cdx-card--title-only"
>
  <span
    class="cdx-thumbnail cdx-card__thumbnail"
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
  <span
    class="cdx-card__text"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
  </span>
</span>
`;

exports[`Card matches the snapshot Case 5 Card with header-start: ("Title") => HTML 1`] = `
<span
  class="cdx-card"
>
  <!--v-if-->
  <span
    class="cdx-card__text"
  >
    <span
      class="cdx-card__text__header-start"
    >
      <!-- @slot Content placed above title, e.g. an InfoChip -->
      
      Chip
      
    </span>
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
  </span>
</span>
`;

exports[`Card matches the snapshot Case 6 Card with header-end: ("Title") => HTML 1`] = `
<span
  class="cdx-card"
>
  <!--v-if-->
  <span
    class="cdx-card__text cdx-card__text--has-header-end"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <span
      class="cdx-card__text__header-end"
    >
      <!-- @slot Content placed inline at the end of title row, e.g. icon buttons -->
      
      More
      
    </span>
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
  </span>
</span>
`;

exports[`Card matches the snapshot Case 7 Card with footer: ("Title") => HTML 1`] = `
<span
  class="cdx-card"
>
  <!--v-if-->
  <span
    class="cdx-card__text"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <!--v-if-->
    <span
      class="cdx-card__text__footer"
    >
      <!-- @slot Content placed below the body, e.g. action buttons -->
      
      Action
      
    </span>
    <!--v-if-->
  </span>
</span>
`;

exports[`Card matches the snapshot Case 8 Card with all slots: ("Title") => HTML 1`] = `
<span
  class="cdx-card"
>
  <!--v-if-->
  <span
    class="cdx-card__text cdx-card__text--has-header-end"
  >
    <span
      class="cdx-card__text__header-start"
    >
      <!-- @slot Content placed above title, e.g. an InfoChip -->
      
      Chip
      
    </span>
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <span
      class="cdx-card__text__header-end"
    >
      <!-- @slot Content placed inline at the end of title row, e.g. icon buttons -->
      
      More
      
    </span>
    <span
      class="cdx-card__text__description"
    >
      <!-- @slot Card description -->
      
      Description
      
    </span>
    <span
      class="cdx-card__text__footer"
    >
      <!-- @slot Content placed below the body, e.g. action buttons -->
      
      Action
      
    </span>
    <span
      class="cdx-card__text__supporting-text"
    >
      <!-- @slot Short supporting text -->
      
      Supporting text
      
    </span>
  </span>
</span>
`;

exports[`Card matches the snapshot Case 9 Card with thumbnail: ("Title") => HTML 1`] = `
<span
  class="cdx-card cdx-card--title-only"
>
  <span
    class="cdx-thumbnail cdx-card__thumbnail"
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
  <span
    class="cdx-card__text"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
  </span>
</span>
`;

exports[`Card matches the snapshot Case 10 Card with thumbnail placeholder: ("Title") => HTML 1`] = `
<span
  class="cdx-card cdx-card--title-only"
>
  <span
    class="cdx-thumbnail cdx-card__thumbnail"
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
  <span
    class="cdx-card__text"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
  </span>
</span>
`;

exports[`Card matches the snapshot Case 11 Card with custom placeholder icon: ("Title") => HTML 1`] = `
<span
  class="cdx-card cdx-card--title-only"
>
  <span
    class="cdx-thumbnail cdx-card__thumbnail"
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
              d="M12 11a6 6 0 016 6v2H2v-2a6 6 0 016-6z"
            />
            <circle
              cx="10"
              cy="5"
              r="4"
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
  <span
    class="cdx-card__text"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
  </span>
</span>
`;

exports[`Card matches the snapshot Case 12 Card with link: ("Title") => HTML 1`] = `
<a
  class="cdx-card cdx-card--is-link cdx-card--title-only"
  href="https://example.com"
>
  <!--v-if-->
  <span
    class="cdx-card__text"
  >
    <!--v-if-->
    <span
      class="cdx-card__text__title"
    >
      <!--v-if-->
      <!-- @slot Card title -->
      
      Title
      
    </span>
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
    <!--v-if-->
  </span>
</a>
`;
