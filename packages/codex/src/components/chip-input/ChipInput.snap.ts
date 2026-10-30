// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`ChipInput > matches the snapshot > Case 0 Default props: ({ inputChips: [ { value: 'Sample chip' } ] }) => HTML 1`] = `
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
  <!-- Hidden status element (ARIA live region) for screen readers. -->
  <div
    aria-live="polite"
    class="cdx-chip-input__aria-status"
    role="status"
  />
</div>
`;

exports[`ChipInput > matches the snapshot > Case 1 No input chips: ({ inputChips: [] }) => HTML 1`] = `
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
  <!-- Hidden status element (ARIA live region) for screen readers. -->
  <div
    aria-live="polite"
    class="cdx-chip-input__aria-status"
    role="status"
  />
</div>
`;

exports[`ChipInput > matches the snapshot > Case 2 With separate input: ({ inputChips: [ { value: 'Sample chip' } ], separateInput: true }) => HTML 1`] = `
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
  <!-- Hidden status element (ARIA live region) for screen readers. -->
  <div
    aria-live="polite"
    class="cdx-chip-input__aria-status"
    role="status"
  />
</div>
`;

exports[`ChipInput > matches the snapshot > Case 3 With error: ({ inputChips: [ { value: 'Sample chip' } ], status: 'error' }) => HTML 1`] = `
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
  <!-- Hidden status element (ARIA live region) for screen readers. -->
  <div
    aria-live="polite"
    class="cdx-chip-input__aria-status"
    role="status"
  />
</div>
`;

exports[`ChipInput > matches the snapshot > Case 4 Disabled: ({ inputChips: [ { value: 'Sample chip' } ], disabled: true }) => HTML 1`] = `
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
  <!-- Hidden status element (ARIA live region) for screen readers. -->
  <div
    aria-live="polite"
    class="cdx-chip-input__aria-status"
    role="status"
  />
</div>
`;

exports[`ChipInput > matches the snapshot > Case 5 Input chips with icon: ({ inputChips: [ { value: 'Sample chip', icon: { ltr: '<path d="M2 0h16v20H2zm2 2v16h12V2zm2 2h3v1H6zm0 2h3v1H6zm0 2h3v1H6zm0 3h8v1H6zm0 2h8v1H6zm0 2h8v1H6zm4-11h4v5h-4z"/>', shouldFlip: true } } ] }) => HTML 1`] = `
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
  <!-- Hidden status element (ARIA live region) for screen readers. -->
  <div
    aria-live="polite"
    class="cdx-chip-input__aria-status"
    role="status"
  />
</div>
`;
