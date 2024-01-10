// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Accordion matches the snapshot Case 0 Renders with basic basic title and text content: ({}) => HTML 1`] = `
<details
  class="cdx-accordion"
>
  <summary>
    <h3
      class="cdx-accordion__header"
    >
      <span
        class="cdx-accordion__header__title"
      >
        <!-- indicator icon -->
        <span
          alt=""
          class="cdx-icon cdx-icon--small cdx-accordion__indicator"
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
                d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
              />
            </g>
          </svg>
        </span>
        <!-- @slot Customizable Accordion title-->
        
        Title
        
      </span>
      <span
        class="cdx-accordion__header__description"
      >
        <!-- @slot Customizable Accordion description-->
        
        
      </span>
    </h3>
    <!--v-if-->
  </summary>
  <div
    class="cdx-accordion__content"
  >
    <!-- @slot Customizable Accordion content -->
    
    
  </div>
</details>
`;

exports[`Accordion matches the snapshot Case 1 Action button is not visible when collapsed: ({"actionButtonLabel": "Edit", "actionIcon": "<path d=\\"m16.77 8 1.94-2a1 1 0 000-1.41l-3.34-3.3a1 1 0 00-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96-4.75-4.75z\\"/>"}) => HTML 1`] = `
<details
  class="cdx-accordion"
>
  <summary>
    <h3
      class="cdx-accordion__header"
    >
      <span
        class="cdx-accordion__header__title"
      >
        <!-- indicator icon -->
        <span
          alt=""
          class="cdx-icon cdx-icon--small cdx-accordion__indicator"
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
                d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
              />
            </g>
          </svg>
        </span>
        <!-- @slot Customizable Accordion title-->
        
        Title
        
      </span>
      <span
        class="cdx-accordion__header__description"
      >
        <!-- @slot Customizable Accordion description-->
        
        
      </span>
    </h3>
    <!--v-if-->
  </summary>
  <div
    class="cdx-accordion__content"
  >
    <!-- @slot Customizable Accordion content -->
    
    
  </div>
</details>
`;

exports[`Accordion matches the snapshot Case 2 actionAlwaysVisible makes action button visible even when collapsed: ({"actionAlwaysVisible": true, "actionButtonLabel": "Edit", "actionIcon": "<path d=\\"m16.77 8 1.94-2a1 1 0 000-1.41l-3.34-3.3a1 1 0 00-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96-4.75-4.75z\\"/>"}) => HTML 1`] = `
<details
  class="cdx-accordion cdx-accordion--has-icon"
>
  <summary>
    <h3
      class="cdx-accordion__header"
    >
      <span
        class="cdx-accordion__header__title"
      >
        <!-- indicator icon -->
        <span
          alt=""
          class="cdx-icon cdx-icon--small cdx-accordion__indicator"
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
                d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
              />
            </g>
          </svg>
        </span>
        <!-- @slot Customizable Accordion title-->
        
        Title
        
      </span>
      <span
        class="cdx-accordion__header__description"
      >
        <!-- @slot Customizable Accordion description-->
        
        
      </span>
    </h3>
    <button
      aria-label="Edit"
      class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only cdx-accordion__action"
      type="button"
    >
      <!-- @slot Button content -->
      
      <span
        class="cdx-icon cdx-icon--medium"
      >
        <svg
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <title>
            Edit
          </title>
          <!-- eslint-disable vue/no-v-html -->
          <g>
            <path
              d="m16.77 8 1.94-2a1 1 0 000-1.41l-3.34-3.3a1 1 0 00-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96-4.75-4.75z"
            />
          </g>
        </svg>
      </span>
      
    </button>
  </summary>
  <div
    class="cdx-accordion__content"
  >
    <!-- @slot Customizable Accordion content -->
    
    
  </div>
</details>
`;
