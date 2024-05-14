// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 no icon name => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!--
		Need to use v-if and not v-show because if the icon is not set or invalid, the
		component will still try to use the :icon="demoIcon" with the value of undefined,
		which breaks.
	-->
  <!--v-if-->
  
</div>
`;

exports[`matches the snapshot Case 1 invalid icon name => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!--
		Need to use v-if and not v-show because if the icon is not set or invalid, the
		component will still try to use the :icon="demoIcon" with the value of undefined,
		which breaks.
	-->
  <!--v-if-->
  
</div>
`;

exports[`matches the snapshot Case 2 valid icon name (cdxIconAlert) => HTML 1`] = `
<div
  data-v-app=""
>
  
  <!--
		Need to use v-if and not v-show because if the icon is not set or invalid, the
		component will still try to use the :icon="demoIcon" with the value of undefined,
		which breaks.
	-->
  <span
    class="cdx-icon cdx-icon--medium"
  >
    <svg
      aria-hidden="true"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <!--v-if-->
      <g>
        <path
          d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"
        />
      </g>
    </svg>
  </span>
  
</div>
`;
