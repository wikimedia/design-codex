// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Default props: ({}) => HTML 1`] = `
<div
  class="cdx-filter-chip"
>
  <!--v-if-->
  <span
    class="cdx-filter-chip__text"
  >
    <!-- @slot Chip text. -->
    
    <p>
      Chip content
    </p>
    
  </span>
  <cdx-button-stub
    action="default"
    aria-label="remove"
    class="cdx-filter-chip__button"
    disabled="false"
    size="medium"
    weight="quiet"
  />
</div>
`;

exports[`matches the snapshot Case 1 Disabled: ({"disabled": true}) => HTML 1`] = `
<div
  class="cdx-filter-chip cdx-filter-chip--disabled"
>
  <!--v-if-->
  <span
    class="cdx-filter-chip__text"
  >
    <!-- @slot Chip text. -->
    
    <p>
      Chip content
    </p>
    
  </span>
  <cdx-button-stub
    action="default"
    aria-label="remove"
    class="cdx-filter-chip__button"
    disabled="true"
    size="medium"
    weight="quiet"
  />
</div>
`;

exports[`matches the snapshot Case 2 Icon: ({"icon": [Object]}) => HTML 1`] = `
<div
  class="cdx-filter-chip"
>
  <cdx-icon-stub
    icon="[object Object]"
    iconlabel=""
    size="small"
  />
  <span
    class="cdx-filter-chip__text"
  >
    <!-- @slot Chip text. -->
    
    <p>
      Chip content
    </p>
    
  </span>
  <cdx-button-stub
    action="default"
    aria-label="remove"
    class="cdx-filter-chip__button"
    disabled="false"
    size="medium"
    weight="quiet"
  />
</div>
`;
