// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 ToggleButton with slot content => HTML 1`] = `
<div>
  <!-- Have a slot -->
  <button
    aria-pressed="false"
    class="cdx-toggle-button cdx-toggle-button--framed cdx-toggle-button--toggled-off"
    disabled=""
  >
    <!-- @slot Button content -->
    
    
    Button text
    
    
  </button>
</div>
`;

exports[`matches the snapshot Case 1 ToggleSwitch without slot => HTML 1`] = `
<div>
  <!-- Have a slot -->
  
  <!-- No slot content -->
  <span
    class="cdx-toggle-switch"
  >
    <input
      class="cdx-toggle-switch__input"
      id="cdx-toggle-switch-0"
      role="switch"
      type="checkbox"
      value="false"
    />
    <span
      class="cdx-toggle-switch__switch"
    >
      <span
        class="cdx-toggle-switch__switch__grip"
      />
    </span>
    <!-- Only render a Label component if label text has been provided. This component can also
			supply a description to the input if content is provided in the description slot. -->
    <!--v-if-->
  </span>
  
</div>
`;
