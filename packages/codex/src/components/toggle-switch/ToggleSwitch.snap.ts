// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`ToggleSwitch matches the snapshot Case 0 Default: ({"modelValue": false}) => HTML 1`] = `
<span
  class="cdx-toggle-switch"
>
  <input
    class="cdx-toggle-switch__input"
    id="v-0"
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
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label cdx-toggle-switch__label"
  >
    <label
      class="cdx-label__label"
      for="v-0"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        
        Label
        
        
      </span>
      <!--v-if-->
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <!--v-if-->
  </div>
  
</span>
`;

exports[`ToggleSwitch matches the snapshot Case 1 Disabled: ({"disabled": true, "modelValue": false}) => HTML 1`] = `
<span
  class="cdx-toggle-switch"
>
  <input
    class="cdx-toggle-switch__input"
    disabled=""
    id="v-0"
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
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label cdx-label--disabled cdx-toggle-switch__label"
  >
    <label
      class="cdx-label__label"
      for="v-0"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        
        Label
        
        
      </span>
      <!--v-if-->
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <!--v-if-->
  </div>
  
</span>
`;

exports[`ToggleSwitch matches the snapshot Case 2 With description: ({"modelValue": false}) => HTML 1`] = `
<span
  class="cdx-toggle-switch"
>
  <input
    aria-describedby="v-1"
    class="cdx-toggle-switch__input"
    id="v-0"
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
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label cdx-toggle-switch__label"
  >
    <label
      class="cdx-label__label"
      for="v-0"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        
        Label
        
        
      </span>
      <!--v-if-->
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <span
      class="cdx-label__description"
      id="v-1"
    >
      <!-- @slot Short description text. -->
      
      <!-- @slot Short description text. -->
      
      Description text
      
      
    </span>
  </div>
  
</span>
`;
