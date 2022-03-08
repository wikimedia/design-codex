// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Default: ({"disabled": false, "modelValue": false}) => HTML 1`] = `
<button
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--toggled-off"
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;

exports[`matches the snapshot Case 1 Active: ({"disabled": false, "modelValue": true}) => HTML 1`] = `
<button
  aria-pressed="true"
  class="cdx-toggle-button cdx-toggle-button--toggled-on"
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;

exports[`matches the snapshot Case 2 Disabled, inactive: ({"disabled": true, "modelValue": false}) => HTML 1`] = `
<button
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--toggled-off"
  disabled=""
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;

exports[`matches the snapshot Case 3 Disabled, active: ({"disabled": true, "modelValue": true}) => HTML 1`] = `
<button
  aria-pressed="true"
  class="cdx-toggle-button cdx-toggle-button--toggled-on"
  disabled=""
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;
