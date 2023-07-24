// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Default: ("Label text") => HTML 1`] = `
<div
  class="cdx-label"
>
  <label
    class="cdx-label__label"
  >
    <span>
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </span>
    <!-- For legends, the description needs to be inside the &lt;legend&gt; for screen reader
				support. -->
    <!--v-if-->
  </label>
  <!-- For single fields, add an ID attribute that will be used on the input for
			aria-describedby. -->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 1 With icon: ("Label text") => HTML 1`] = `
<div
  class="cdx-label"
>
  <label
    class="cdx-label__label"
  >
    <span>
      <cdx-icon-stub
        class="cdx-label__label__icon"
        icon="<path d=\\"M10 0a7.65 7.65 0 00-8 8c0 2.52 2 5 3 6s5 6 5 6 4-5 5-6 3-3.48 3-6a7.65 7.65 0 00-8-8zm0 11.25A3.25 3.25 0 1113.25 8 3.25 3.25 0 0110 11.25z\\"/>"
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
    </span>
    <!-- For legends, the description needs to be inside the &lt;legend&gt; for screen reader
				support. -->
    <!--v-if-->
  </label>
  <!-- For single fields, add an ID attribute that will be used on the input for
			aria-describedby. -->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 2 With optional flag: ("Label text") => HTML 1`] = `
<div
  class="cdx-label"
>
  <label
    class="cdx-label__label"
  >
    <span>
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
    </span>
    <!-- For legends, the description needs to be inside the &lt;legend&gt; for screen reader
				support. -->
    <!--v-if-->
  </label>
  <!-- For single fields, add an ID attribute that will be used on the input for
			aria-describedby. -->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 3 With visually hidden label: ("Label text") => HTML 1`] = `
<div
  class="cdx-label cdx-label--visually-hidden"
>
  <label
    class="cdx-label__label"
  >
    <span>
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </span>
    <!-- For legends, the description needs to be inside the &lt;legend&gt; for screen reader
				support. -->
    <!--v-if-->
  </label>
  <!-- For single fields, add an ID attribute that will be used on the input for
			aria-describedby. -->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 4 As legend: ("Label text") => HTML 1`] = `
<div
  class="cdx-label"
>
  <legend
    class="cdx-label__label"
  >
    <span>
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </span>
    <!-- For legends, the description needs to be inside the &lt;legend&gt; for screen reader
				support. -->
    <!--v-if-->
  </legend>
  <!-- For single fields, add an ID attribute that will be used on the input for
			aria-describedby. -->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 5 With input ID: ("Label text") => HTML 1`] = `
<div
  class="cdx-label"
>
  <label
    class="cdx-label__label"
    for="my-input-123"
  >
    <span>
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </span>
    <!-- For legends, the description needs to be inside the &lt;legend&gt; for screen reader
				support. -->
    <!--v-if-->
  </label>
  <!-- For single fields, add an ID attribute that will be used on the input for
			aria-describedby. -->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 6 Disabled: ("Label text") => HTML 1`] = `
<div
  class="cdx-label cdx-label--disabled"
>
  <label
    class="cdx-label__label"
  >
    <span>
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </span>
    <!-- For legends, the description needs to be inside the &lt;legend&gt; for screen reader
				support. -->
    <!--v-if-->
  </label>
  <!-- For single fields, add an ID attribute that will be used on the input for
			aria-describedby. -->
  <!--v-if-->
</div>
`;

exports[`matches the snapshot Case 7 With description and description ID: ("Label text") => HTML 1`] = `
<div
  class="cdx-label"
>
  <label
    class="cdx-label__label"
  >
    <span>
      <!--v-if-->
      <span
        class="cdx-label__label__text"
      >
        <!-- @slot Label text. -->
        
        Label text
        
      </span>
      <!--v-if-->
    </span>
    <!-- For legends, the description needs to be inside the &lt;legend&gt; for screen reader
				support. -->
    <!--v-if-->
  </label>
  <!-- For single fields, add an ID attribute that will be used on the input for
			aria-describedby. -->
  <span
    class="cdx-label__description"
    id="my-description-123"
  >
    <!-- @slot Short description text. -->
    
    Description text
    
  </span>
</div>
`;
