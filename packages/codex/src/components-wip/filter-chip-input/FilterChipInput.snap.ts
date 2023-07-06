// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Default props: ({"inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--status-default"
>
  <div
    class="cdx-filter-chip-input__chips"
  >
    
    <cdx-filter-chip-stub
      class="cdx-filter-chip-input__item"
      disabled="false"
      removebuttonlabel="remove"
    />
    
    <input
      class="cdx-filter-chip-input__input"
    />
  </div>
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 1 No input chips: ({"inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--status-default"
>
  <div
    class="cdx-filter-chip-input__chips"
  >
    
    
    <input
      class="cdx-filter-chip-input__input"
    />
  </div>
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 2 With separate input: ({"inputChips": [Array], "separateInput": true}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--has-separate-input cdx-filter-chip-input--status-default"
>
  <div
    class="cdx-filter-chip-input__chips"
  >
    
    <cdx-filter-chip-stub
      class="cdx-filter-chip-input__item"
      disabled="false"
      removebuttonlabel="remove"
    />
    
    <!--v-if-->
  </div>
  <div
    class="cdx-filter-chip-input__separate-input"
  >
    <input
      class="cdx-filter-chip-input__input"
    />
  </div>
</div>
`;

exports[`matches the snapshot Case 3 With error: ({"inputChips": [Array], "status": "error"}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--status-error"
>
  <div
    class="cdx-filter-chip-input__chips"
  >
    
    <cdx-filter-chip-stub
      class="cdx-filter-chip-input__item"
      disabled="false"
      removebuttonlabel="remove"
    />
    
    <input
      class="cdx-filter-chip-input__input"
    />
  </div>
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 4 Disabled: ({"disabled": true, "inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--status-default cdx-filter-chip-input--disabled"
>
  <div
    class="cdx-filter-chip-input__chips"
  >
    
    <cdx-filter-chip-stub
      class="cdx-filter-chip-input__item"
      disabled="true"
      removebuttonlabel="remove"
    />
    
    <input
      class="cdx-filter-chip-input__input"
      disabled=""
    />
  </div>
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 5 Input chips with icon: ({"inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--status-default"
>
  <div
    class="cdx-filter-chip-input__chips"
  >
    
    <cdx-filter-chip-stub
      class="cdx-filter-chip-input__item"
      disabled="false"
      icon="[object Object]"
      removebuttonlabel="remove"
    />
    
    <input
      class="cdx-filter-chip-input__input"
    />
  </div>
  <!--v-if-->
</div>
`;
