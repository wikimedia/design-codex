// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Default props: ({"inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-chip-input cdx-chip-input--status-default"
>
  <div
    aria-orientation="horizontal"
    class="cdx-chip-input__chips"
    role="listbox"
  >
    
    <cdx-input-chip-stub
      class="cdx-chip-input__item"
      disabled="false"
    />
    
    <input
      class="cdx-chip-input__input"
    />
  </div>
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 1 No input chips: ({"inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-chip-input cdx-chip-input--status-default"
>
  <div
    aria-orientation="horizontal"
    class="cdx-chip-input__chips"
    role="listbox"
  >
    
    
    <input
      class="cdx-chip-input__input"
    />
  </div>
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 2 With separate input: ({"inputChips": [Array], "separateInput": true}) => HTML 1`] = `
<div
  class="cdx-chip-input cdx-chip-input--has-separate-input cdx-chip-input--status-default"
>
  <div
    aria-orientation="horizontal"
    class="cdx-chip-input__chips"
    role="listbox"
  >
    
    <cdx-input-chip-stub
      class="cdx-chip-input__item"
      disabled="false"
    />
    
    <!--v-if-->
  </div>
  <div
    class="cdx-chip-input__separate-input"
  >
    <input
      class="cdx-chip-input__input"
    />
  </div>
</div>
`;

exports[`matches the snapshot Case 3 With error: ({"inputChips": [Array], "status": "error"}) => HTML 1`] = `
<div
  class="cdx-chip-input cdx-chip-input--status-error"
>
  <div
    aria-orientation="horizontal"
    class="cdx-chip-input__chips"
    role="listbox"
  >
    
    <cdx-input-chip-stub
      class="cdx-chip-input__item"
      disabled="false"
    />
    
    <input
      class="cdx-chip-input__input"
    />
  </div>
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 4 Disabled: ({"disabled": true, "inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-chip-input cdx-chip-input--status-default cdx-chip-input--disabled"
>
  <div
    aria-orientation="horizontal"
    class="cdx-chip-input__chips"
    role="listbox"
  >
    
    <cdx-input-chip-stub
      class="cdx-chip-input__item"
      disabled="true"
    />
    
    <input
      class="cdx-chip-input__input"
      disabled=""
    />
  </div>
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 5 Input chips with icon: ({"inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-chip-input cdx-chip-input--status-default"
>
  <div
    aria-orientation="horizontal"
    class="cdx-chip-input__chips"
    role="listbox"
  >
    
    <cdx-input-chip-stub
      class="cdx-chip-input__item"
      disabled="false"
      icon="[object Object]"
    />
    
    <input
      class="cdx-chip-input__input"
    />
  </div>
  <!--v-if-->
</div>
`;
