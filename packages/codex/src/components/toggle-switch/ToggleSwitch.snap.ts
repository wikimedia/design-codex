// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Default: ({"disabled": false, "modelValue": true}) => HTML 1`] = `
<span
  class="cdx-toggle-switch"
>
  <!--v-if-->
  <input
    class="cdx-toggle-switch__input"
    id="cdx-toggle-switch-0"
    type="checkbox"
  />
  <span
    class="cdx-toggle-switch__switch"
  >
    <span
      class="cdx-toggle-switch__switch__grip"
    />
  </span>
</span>
`;

exports[`matches the snapshot Case 1 With label: ({"disabled": false, "modelValue": true}) => HTML 1`] = `
<span
  class="cdx-toggle-switch"
>
  <label
    aria-disabled="false"
    class="cdx-toggle-switch__label"
    for="cdx-toggle-switch-1"
  >
    <!-- @slot Label content -->
    
    Label
    
  </label>
  <input
    class="cdx-toggle-switch__input"
    id="cdx-toggle-switch-1"
    type="checkbox"
  />
  <span
    class="cdx-toggle-switch__switch"
  >
    <span
      class="cdx-toggle-switch__switch__grip"
    />
  </span>
</span>
`;

exports[`matches the snapshot Case 2 Disabled: ({"disabled": true, "modelValue": true}) => HTML 1`] = `
<span
  class="cdx-toggle-switch"
>
  <!--v-if-->
  <input
    class="cdx-toggle-switch__input"
    disabled=""
    id="cdx-toggle-switch-2"
    type="checkbox"
  />
  <span
    class="cdx-toggle-switch__switch"
  >
    <span
      class="cdx-toggle-switch__switch__grip"
    />
  </span>
</span>
`;

exports[`matches the snapshot Case 3 Disabled with label: ({"disabled": true, "modelValue": true}) => HTML 1`] = `
<span
  class="cdx-toggle-switch"
>
  <label
    aria-disabled="true"
    class="cdx-toggle-switch__label"
    for="cdx-toggle-switch-3"
  >
    <!-- @slot Label content -->
    
    Label
    
  </label>
  <input
    class="cdx-toggle-switch__input"
    disabled=""
    id="cdx-toggle-switch-3"
    type="checkbox"
  />
  <span
    class="cdx-toggle-switch__switch"
  >
    <span
      class="cdx-toggle-switch__switch__grip"
    />
  </span>
</span>
`;
