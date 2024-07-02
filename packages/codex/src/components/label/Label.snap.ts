// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Default: ("Label text") => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label"
  >
    <label
      class="cdx-label__label"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <!--v-if-->
  </div>
  
</div>
`;

exports[`matches the snapshot Case 1 With icon: ("Label text") => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label"
  >
    <label
      class="cdx-label__label"
    >
      <cdx-icon-stub
        class="cdx-label__label__icon"
        icon="<path d="M10 0a7.65 7.65 0 00-8 8c0 2.52 2 5 3 6s5 6 5 6 4-5 5-6 3-3.48 3-6a7.65 7.65 0 00-8-8m0 11.25A3.25 3.25 0 1113.25 8 3.25 3.25 0 0110 11.25"/>"
        iconlabel=""
        size="medium"
      />
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <!--v-if-->
  </div>
  
</div>
`;

exports[`matches the snapshot Case 2 With optional flag using deprecated API: ("Label text") => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label"
  >
    <label
      class="cdx-label__label"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <span
        class="cdx-label__label__optional-flag"
      >
        <!-- Add a space before the optional flag text. Vue strips whitespace
					between everything except plain text, so we can't rely on a newline to
					add a natural space here. -->
        <!-- eslint-disable-next-line vue/no-useless-mustaches -->
           (optional)
      </span>
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <!--v-if-->
  </div>
  
</div>
`;

exports[`matches the snapshot Case 3 With optional flag: ("Label text ") => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label"
  >
    <label
      class="cdx-label__label"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <span
        class="cdx-label__label__optional-flag"
      >
        <!-- Add a space before the optional flag text. Vue strips whitespace
					between everything except plain text, so we can't rely on a newline to
					add a natural space here. -->
        <!-- eslint-disable-next-line vue/no-useless-mustaches -->
           (optional)
      </span>
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <!--v-if-->
  </div>
  
</div>
`;

exports[`matches the snapshot Case 4 With visually hidden label: ("Label text") => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label cdx-label--visually-hidden"
  >
    <label
      class="cdx-label__label"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <!--v-if-->
  </div>
  
</div>
`;

exports[`matches the snapshot Case 5 As legend: ("Label text") => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  
  <!-- &lt;legend&gt; must be the root element so it is a direct child of &lt;fieldset&gt;, and &lt;legend&gt;
		contains the description. Both required for assistive technology support. -->
  <legend
    class="cdx-label"
  >
    <span
      class="cdx-label__label"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </span>
    <!-- For legends, the description needs to be inside the &lt;legend&gt; for
			assistive technology support. -->
    <!--v-if-->
  </legend>
  
  
</div>
`;

exports[`matches the snapshot Case 6 With input ID: ("Label text") => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label"
  >
    <label
      class="cdx-label__label"
      for="my-input-123"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <!--v-if-->
  </div>
  
</div>
`;

exports[`matches the snapshot Case 7 Disabled: ("Label text") => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label cdx-label--disabled"
  >
    <label
      class="cdx-label__label"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <!--v-if-->
  </div>
  
</div>
`;

exports[`matches the snapshot Case 8 With description and description ID: ("Label text") => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
  <div
    class="cdx-label"
  >
    <label
      class="cdx-label__label"
    >
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </label>
    <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
    <span
      class="cdx-label__description"
      id="my-description-123"
    >
      <!-- @slot Short description text. -->
      
      Description text
      
    </span>
  </div>
  
</div>
`;
