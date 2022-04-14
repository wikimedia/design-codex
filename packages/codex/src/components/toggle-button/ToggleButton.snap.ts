// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Default: ({"disabled": false, "modelValue": false, "quiet": false}) => HTML 1`] = `
<button
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-off"
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;

exports[`matches the snapshot Case 1 Active: ({"disabled": false, "modelValue": true, "quiet": false}) => HTML 1`] = `
<button
  aria-pressed="true"
  class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-on"
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;

exports[`matches the snapshot Case 2 Disabled, inactive: ({"disabled": true, "modelValue": false, "quiet": false}) => HTML 1`] = `
<button
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-off"
  disabled=""
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;

exports[`matches the snapshot Case 3 Disabled, active: ({"disabled": true, "modelValue": true, "quiet": false}) => HTML 1`] = `
<button
  aria-pressed="true"
  class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-on"
  disabled=""
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;

exports[`matches the snapshot Case 4 Quiet: ({"disabled": false, "modelValue": false, "quiet": true}) => HTML 1`] = `
<button
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--quiet cdx-toggle-button--toggled-off"
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;

exports[`matches the snapshot Case 5 Quiet, active: ({"disabled": false, "modelValue": true, "quiet": true}) => HTML 1`] = `
<button
  aria-pressed="true"
  class="cdx-toggle-button cdx-toggle-button--quiet cdx-toggle-button--toggled-on"
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;

exports[`matches the snapshot Case 6 Quiet, disabled, inactive: ({"disabled": true, "modelValue": false, "quiet": true}) => HTML 1`] = `
<button
  aria-pressed="false"
  class="cdx-toggle-button cdx-toggle-button--quiet cdx-toggle-button--toggled-off"
  disabled=""
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;

exports[`matches the snapshot Case 7 Quiet, disabled, active: ({"disabled": true, "modelValue": true, "quiet": true}) => HTML 1`] = `
<button
  aria-pressed="true"
  class="cdx-toggle-button cdx-toggle-button--quiet cdx-toggle-button--toggled-on"
  disabled=""
>
  <!-- @slot Button content -->
  
  Button text
  
</button>
`;
