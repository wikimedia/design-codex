// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`SlotIcon matches the snapshot Case 0 no icon name => HTML 1`] = `
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

exports[`SlotIcon matches the snapshot Case 1 invalid icon name => HTML 1`] = `
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

exports[`SlotIcon matches the snapshot Case 2 valid icon name (cdxIconAlert) => HTML 1`] = `
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
    >
      <!--v-if-->
      <g>
        <path
          d="M9.5 1h1L19 17.2V19H1v-1.8zM9 7v6h2V7zm0 8v2h2v-2z"
        />
      </g>
    </svg>
  </span>
  
</div>
`;
