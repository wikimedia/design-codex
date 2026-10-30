// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`InputChip > matches the snapshot > Case 0 Default props: ({}) => HTML 1`] = `
<div
  aria-description="Press Enter to edit or Delete to remove"
  class="cdx-input-chip"
  role="option"
  tabindex="0"
>
  <!--v-if-->
  <span
    class="cdx-input-chip__text"
  >
    <!-- @slot Chip text. -->
    
    <p>
      Chip content
    </p>
    
  </span>
  <cdx-button-stub
    action="default"
    aria-hidden="true"
    class="cdx-input-chip__button"
    disabled="false"
    size="medium"
    tabindex="-1"
    type="button"
    weight="quiet"
  />
</div>
`;

exports[`InputChip > matches the snapshot > Case 1 Disabled: ({ disabled: true }) => HTML 1`] = `
<div
  aria-description="Press Enter to edit or Delete to remove"
  class="cdx-input-chip cdx-input-chip--disabled"
  role="option"
  tabindex="-1"
>
  <!--v-if-->
  <span
    class="cdx-input-chip__text"
  >
    <!-- @slot Chip text. -->
    
    <p>
      Chip content
    </p>
    
  </span>
  <cdx-button-stub
    action="default"
    aria-hidden="true"
    class="cdx-input-chip__button"
    disabled="true"
    size="medium"
    tabindex="-1"
    type="button"
    weight="quiet"
  />
</div>
`;

exports[`InputChip > matches the snapshot > Case 2 Icon: ({ icon: { ltr: '<path d="M2 0h16v20H2zm2 2v16h12V2zm2 2h3v1H6zm0 2h3v1H6zm0 2h3v1H6zm0 3h8v1H6zm0 2h8v1H6zm0 2h8v1H6zm4-11h4v5h-4z"/>', shouldFlip: true } }) => HTML 1`] = `
<div
  aria-description="Press Enter to edit or Delete to remove"
  class="cdx-input-chip"
  role="option"
  tabindex="0"
>
  <cdx-icon-stub
    icon="[object Object]"
    iconlabel=""
    size="small"
  />
  <span
    class="cdx-input-chip__text"
  >
    <!-- @slot Chip text. -->
    
    <p>
      Chip content
    </p>
    
  </span>
  <cdx-button-stub
    action="default"
    aria-hidden="true"
    class="cdx-input-chip__button"
    disabled="false"
    size="medium"
    tabindex="-1"
    type="button"
    weight="quiet"
  />
</div>
`;

exports[`InputChip > matches the snapshot > Case 3 CSS class: ({ className: 'my-css-class' }) => HTML 1`] = `
<div
  aria-description="Press Enter to edit or Delete to remove"
  class="cdx-input-chip my-css-class"
  role="option"
  tabindex="0"
>
  <!--v-if-->
  <span
    class="cdx-input-chip__text"
  >
    <!-- @slot Chip text. -->
    
    <p>
      Chip content
    </p>
    
  </span>
  <cdx-button-stub
    action="default"
    aria-hidden="true"
    class="cdx-input-chip__button"
    disabled="false"
    size="medium"
    tabindex="-1"
    type="button"
    weight="quiet"
  />
</div>
`;
