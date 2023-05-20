// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Default props: ({"inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--status-default"
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
`;

exports[`matches the snapshot Case 1 No input chips: ({"inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--status-default"
>
  
  
  <input
    class="cdx-filter-chip-input__input"
  />
</div>
`;

exports[`matches the snapshot Case 2 With error: ({"inputChips": [Array], "status": "error"}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--status-error"
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
`;

exports[`matches the snapshot Case 3 Disabled: ({"disabled": true, "inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--status-default cdx-filter-chip-input--disabled"
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
`;

exports[`matches the snapshot Case 4 Input chips with icon: ({"inputChips": [Array]}) => HTML 1`] = `
<div
  class="cdx-filter-chip-input cdx-filter-chip-input--status-default"
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
`;
