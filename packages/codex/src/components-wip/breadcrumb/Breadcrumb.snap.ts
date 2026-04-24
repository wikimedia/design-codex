// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Breadcrumb matches the snapshot Case 0 With empty Items: ({"items": [Array]}) => HTML 1`] = `
<nav
  aria-label="Breadcrumb"
  class="cdx-breadcrumb"
>
  <ol
    class="cdx-breadcrumb__list"
  >
    <!--v-if-->
    
    
  </ol>
</nav>
`;

exports[`Breadcrumb matches the snapshot Case 1 With a single item: ({"items": [Array]}) => HTML 1`] = `
<nav
  aria-label="Breadcrumb"
  class="cdx-breadcrumb"
>
  <ol
    class="cdx-breadcrumb__list"
  >
    <!--v-if-->
    
    <li
      class="cdx-breadcrumb__list__item"
    >
      <a
        aria-current="page"
        class="cdx-breadcrumb__link"
        href="/some-home"
      >
        Some Home
      </a>
      <!--v-if-->
    </li>
    
  </ol>
</nav>
`;

exports[`Breadcrumb matches the snapshot Case 2 With exact items: ({"items": [Array], "maxVisible": 4, "truncateLength": 10}) => HTML 1`] = `
<nav
  aria-label="Breadcrumb"
  class="cdx-breadcrumb"
>
  <ol
    class="cdx-breadcrumb__list"
  >
    <!--v-if-->
    
    <li
      class="cdx-breadcrumb__list__item"
    >
      <a
        class="cdx-breadcrumb__link"
        href="/some-home"
      >
        Some Home
      </a>
      <span
        aria-hidden="true"
        class="cdx-icon cdx-icon--x-small cdx-breadcrumb__separator-icon"
      >
        <svg
          aria-hidden="true"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!--v-if-->
          <!-- eslint-disable vue/no-v-html -->
          <g>
            <path
              d="M14 9.293v1.414l-5.982 6-1.415-1.414L11.896 10 6.603 4.707l1.414-1.414z"
            />
          </g>
        </svg>
      </span>
    </li>
    <li
      class="cdx-breadcrumb__list__item"
    >
      <a
        aria-describedby="cdx-tooltip-10a3dwc"
        class="cdx-breadcrumb__link"
        href="/some-section"
      >
        Some Secti…
      </a>
      <span
        aria-hidden="true"
        class="cdx-icon cdx-icon--x-small cdx-breadcrumb__separator-icon"
      >
        <svg
          aria-hidden="true"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!--v-if-->
          <!-- eslint-disable vue/no-v-html -->
          <g>
            <path
              d="M14 9.293v1.414l-5.982 6-1.415-1.414L11.896 10 6.603 4.707l1.414-1.414z"
            />
          </g>
        </svg>
      </span>
      <div
        class="cdx-tooltip"
        id="cdx-tooltip-10a3dwc"
      >
        Some Section
      </div>
    </li>
    <li
      class="cdx-breadcrumb__list__item"
    >
      <a
        aria-describedby="cdx-tooltip-35vvzo"
        class="cdx-breadcrumb__link"
        href="/some-subsection"
      >
        Some Subse…
      </a>
      <span
        aria-hidden="true"
        class="cdx-icon cdx-icon--x-small cdx-breadcrumb__separator-icon"
      >
        <svg
          aria-hidden="true"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!--v-if-->
          <!-- eslint-disable vue/no-v-html -->
          <g>
            <path
              d="M14 9.293v1.414l-5.982 6-1.415-1.414L11.896 10 6.603 4.707l1.414-1.414z"
            />
          </g>
        </svg>
      </span>
      <div
        class="cdx-tooltip"
        id="cdx-tooltip-35vvzo"
      >
        Some Subsection
      </div>
    </li>
    <li
      class="cdx-breadcrumb__list__item"
    >
      <a
        aria-current="page"
        aria-describedby="cdx-tooltip-ry706s"
        class="cdx-breadcrumb__link"
        href=""
      >
        Some Activ…
      </a>
      <!--v-if-->
      <div
        class="cdx-tooltip"
        id="cdx-tooltip-ry706s"
      >
        Some Active Breadcrumb
      </div>
    </li>
    
  </ol>
</nav>
`;

exports[`Breadcrumb matches the snapshot Case 3 With overflow: ({"items": [Array], "maxVisible": 3}) => HTML 1`] = `
<nav
  aria-label="Breadcrumb"
  class="cdx-breadcrumb"
>
  <ol
    class="cdx-breadcrumb__list"
  >
    <li
      class="cdx-breadcrumb__list__overflow"
    >
      <cdx-menu-button-stub
        action="default"
        aria-label="More navigation options"
        class="cdx-breadcrumb__overflow-button"
        disabled="false"
        menuconfig="[object Object]"
        menuitems="[object Object]"
        weight="quiet"
      />
      <span
        aria-hidden="true"
        class="cdx-icon cdx-icon--x-small cdx-breadcrumb__separator-icon"
      >
        <svg
          aria-hidden="true"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!--v-if-->
          <!-- eslint-disable vue/no-v-html -->
          <g>
            <path
              d="M10 9.293v1.414l-5.982 6-1.415-1.414L7.896 10 2.603 4.707l1.414-1.414zm8 0v1.414l-5.982 6-1.416-1.414L15.895 10l-5.293-5.293 1.415-1.414z"
            />
          </g>
        </svg>
      </span>
    </li>
    
    <li
      class="cdx-breadcrumb__list__item"
    >
      <a
        aria-describedby="cdx-tooltip-10a3dwd"
        class="cdx-breadcrumb__link"
        href="/some-section"
      >
        Some Secti…
      </a>
      <span
        aria-hidden="true"
        class="cdx-icon cdx-icon--x-small cdx-breadcrumb__separator-icon"
      >
        <svg
          aria-hidden="true"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!--v-if-->
          <!-- eslint-disable vue/no-v-html -->
          <g>
            <path
              d="M14 9.293v1.414l-5.982 6-1.415-1.414L11.896 10 6.603 4.707l1.414-1.414z"
            />
          </g>
        </svg>
      </span>
      <div
        class="cdx-tooltip"
        id="cdx-tooltip-10a3dwd"
      >
        Some Section
      </div>
    </li>
    <li
      class="cdx-breadcrumb__list__item"
    >
      <a
        aria-describedby="cdx-tooltip-35vvzp"
        class="cdx-breadcrumb__link"
        href="/some-subsection"
      >
        Some Subse…
      </a>
      <span
        aria-hidden="true"
        class="cdx-icon cdx-icon--x-small cdx-breadcrumb__separator-icon"
      >
        <svg
          aria-hidden="true"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!--v-if-->
          <!-- eslint-disable vue/no-v-html -->
          <g>
            <path
              d="M14 9.293v1.414l-5.982 6-1.415-1.414L11.896 10 6.603 4.707l1.414-1.414z"
            />
          </g>
        </svg>
      </span>
      <div
        class="cdx-tooltip"
        id="cdx-tooltip-35vvzp"
      >
        Some Subsection
      </div>
    </li>
    <li
      class="cdx-breadcrumb__list__item"
    >
      <a
        aria-current="page"
        aria-describedby="cdx-tooltip-ry706t"
        class="cdx-breadcrumb__link"
        href=""
      >
        Some Activ…
      </a>
      <!--v-if-->
      <div
        class="cdx-tooltip"
        id="cdx-tooltip-ry706t"
      >
        Some Active Breadcrumb
      </div>
    </li>
    
  </ol>
</nav>
`;

exports[`Breadcrumb matches the snapshot Case 4 With truncation and overflow: ({"items": [Array], "maxVisible": 2, "truncateLength": 10}) => HTML 1`] = `
<nav
  aria-label="Breadcrumb"
  class="cdx-breadcrumb"
>
  <ol
    class="cdx-breadcrumb__list"
  >
    <li
      class="cdx-breadcrumb__list__overflow"
    >
      <cdx-menu-button-stub
        action="default"
        aria-label="More navigation options"
        class="cdx-breadcrumb__overflow-button"
        disabled="false"
        menuconfig="[object Object]"
        menuitems="[object Object],[object Object]"
        weight="quiet"
      />
      <span
        aria-hidden="true"
        class="cdx-icon cdx-icon--x-small cdx-breadcrumb__separator-icon"
      >
        <svg
          aria-hidden="true"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!--v-if-->
          <!-- eslint-disable vue/no-v-html -->
          <g>
            <path
              d="M10 9.293v1.414l-5.982 6-1.415-1.414L7.896 10 2.603 4.707l1.414-1.414zm8 0v1.414l-5.982 6-1.416-1.414L15.895 10l-5.293-5.293 1.415-1.414z"
            />
          </g>
        </svg>
      </span>
    </li>
    
    <li
      class="cdx-breadcrumb__list__item"
    >
      <a
        aria-describedby="cdx-tooltip-35vvzq"
        class="cdx-breadcrumb__link"
        href="/some-subsection"
      >
        Some Subse…
      </a>
      <span
        aria-hidden="true"
        class="cdx-icon cdx-icon--x-small cdx-breadcrumb__separator-icon"
      >
        <svg
          aria-hidden="true"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!--v-if-->
          <!-- eslint-disable vue/no-v-html -->
          <g>
            <path
              d="M14 9.293v1.414l-5.982 6-1.415-1.414L11.896 10 6.603 4.707l1.414-1.414z"
            />
          </g>
        </svg>
      </span>
      <div
        class="cdx-tooltip"
        id="cdx-tooltip-35vvzq"
      >
        Some Subsection
      </div>
    </li>
    <li
      class="cdx-breadcrumb__list__item"
    >
      <a
        aria-current="page"
        aria-describedby="cdx-tooltip-ry706u"
        class="cdx-breadcrumb__link"
        href=""
      >
        Some Activ…
      </a>
      <!--v-if-->
      <div
        class="cdx-tooltip"
        id="cdx-tooltip-ry706u"
      >
        Some Active Breadcrumb
      </div>
    </li>
    
  </ol>
</nav>
`;
