// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Accordion matches the snapshot Case 0 Renders with basic basic title and text content: ({}) => HTML 1`] = `
<details
  class="cdx-accordion cdx-accordion--separation-divider"
>
  <summary>
    <h3
      class="cdx-accordion__header"
    >
      <span
        class="cdx-accordion__header__title"
      >
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

exports[`Accordion matches the snapshot Case 1 Action button is not visible when collapsed: ({"actionButtonLabel": "Edit", "actionIcon": "<path d=\\"m15.4.4 4.2 4.2-3.2 3.2-4.2-4.2zM10.8 5 15 9.2l-8.6 8.6-4.5 1.5-1.2-1.2 1.5-4.5z\\"/>"}) => HTML 1`] = `
<details
  class="cdx-accordion cdx-accordion--separation-divider"
>
  <summary>
    <h3
      class="cdx-accordion__header"
    >
      <span
        class="cdx-accordion__header__title"
      >
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

exports[`Accordion matches the snapshot Case 2 actionAlwaysVisible makes action button visible even when collapsed: ({"actionAlwaysVisible": true, "actionButtonLabel": "Edit", "actionIcon": "<path d=\\"m15.4.4 4.2 4.2-3.2 3.2-4.2-4.2zM10.8 5 15 9.2l-8.6 8.6-4.5 1.5-1.2-1.2 1.5-4.5z\\"/>"}) => HTML 1`] = `
<details
  class="cdx-accordion cdx-accordion--has-icon cdx-accordion--separation-divider"
>
  <summary>
    <h3
      class="cdx-accordion__header"
    >
      <span
        class="cdx-accordion__header__title"
      >
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
        >
          <title>
            Edit
          </title>
          <!-- eslint-disable vue/no-v-html -->
          <g>
            <path
              d="m15.4.4 4.2 4.2-3.2 3.2-4.2-4.2zM10.8 5 15 9.2l-8.6 8.6-4.5 1.5-1.2-1.2 1.5-4.5z"
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
