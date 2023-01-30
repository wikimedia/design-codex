// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Default props: ({}) => HTML 1`] = `
<div
  class="cdx-info-chip"
>
  <!--v-if-->
  <span
    class="cdx-info-chip--text"
  >
    <!-- @slot Chip content. -->
    
    <p>
      Chip content
    </p>
    
  </span>
</div>
`;

exports[`matches the snapshot Case 1 notice status: ({"status": "notice"}) => HTML 1`] = `
<div
  class="cdx-info-chip"
>
  <!--v-if-->
  <span
    class="cdx-info-chip--text"
  >
    <!-- @slot Chip content. -->
    
    <p>
      Chip content
    </p>
    
  </span>
</div>
`;

exports[`matches the snapshot Case 2 warning status: ({"status": "warning"}) => HTML 1`] = `
<div
  class="cdx-info-chip"
>
  <cdx-icon-stub
    class="cdx-info-chip__icon cdx-info-chip__icon--warning"
    icon="<path d=\\"M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z\\"/>"
    iconlabel=""
  />
  <span
    class="cdx-info-chip--text"
  >
    <!-- @slot Chip content. -->
    
    <p>
      Chip content
    </p>
    
  </span>
</div>
`;

exports[`matches the snapshot Case 3 error status: ({"status": "error"}) => HTML 1`] = `
<div
  class="cdx-info-chip"
>
  <cdx-icon-stub
    class="cdx-info-chip__icon cdx-info-chip__icon--error"
    icon="<path d=\\"M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z\\"/>"
    iconlabel=""
  />
  <span
    class="cdx-info-chip--text"
  >
    <!-- @slot Chip content. -->
    
    <p>
      Chip content
    </p>
    
  </span>
</div>
`;

exports[`matches the snapshot Case 4 success status: ({"status": "success"}) => HTML 1`] = `
<div
  class="cdx-info-chip"
>
  <cdx-icon-stub
    class="cdx-info-chip__icon cdx-info-chip__icon--success"
    icon="<path fill-rule=\\"evenodd\\" d=\\"M10 20a10 10 0 100-20 10 10 0 000 20Zm-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10l5 5Z\\" clip-rule=\\"evenodd\\"/>"
    iconlabel=""
  />
  <span
    class="cdx-info-chip--text"
  >
    <!-- @slot Chip content. -->
    
    <p>
      Chip content
    </p>
    
  </span>
</div>
`;

exports[`matches the snapshot Case 5 Custom icon: ({"icon": [Object]}) => HTML 1`] = `
<div
  class="cdx-info-chip"
>
  <cdx-icon-stub
    class="cdx-info-chip__icon cdx-info-chip__icon--notice"
    icon="[object Object]"
    iconlabel=""
  />
  <span
    class="cdx-info-chip--text"
  >
    <!-- @slot Chip content. -->
    
    <p>
      Message content
    </p>
    
  </span>
</div>
`;
