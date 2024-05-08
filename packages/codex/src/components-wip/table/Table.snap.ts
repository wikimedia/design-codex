// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Table matches the snapshot Case 0 Basic table: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
    <div
      class="cdx-table__header__caption"
    >
      <!-- Visible table title. -->
      
      Table caption
      
    </div>
    <div
      class="cdx-table__header__content"
    >
      <!-- eslint-disable-next-line max-len -->
      <!-- @slot Header content. Not to be confused with &lt;thead&gt;; use the thead slot to customize that. -->
      
      
    </div>
  </div>
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 1
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 2
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 1 With out-of-order data: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
    <div
      class="cdx-table__header__caption"
    >
      <!-- Visible table title. -->
      
      Table caption
      
    </div>
    <div
      class="cdx-table__header__content"
    >
      <!-- eslint-disable-next-line max-len -->
      <!-- @slot Header content. Not to be confused with &lt;thead&gt;; use the thead slot to customize that. -->
      
      
    </div>
  </div>
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 1
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 2
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 2 With text alignment: ([[Object], [Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
    <div
      class="cdx-table__header__caption"
    >
      <!-- Visible table title. -->
      
      Table caption
      
    </div>
    <div
      class="cdx-table__header__content"
    >
      <!-- eslint-disable-next-line max-len -->
      <!-- @slot Header content. Not to be confused with &lt;thead&gt;; use the thead slot to customize that. -->
      
      
    </div>
  </div>
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 1
            </span>
          </th>
          <th
            class="cdx-table__cell--align-center"
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 2
            </span>
          </th>
          <th
            class="cdx-table__cell--align-end"
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          <th
            class="cdx-table__cell--align-number"
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            One
            
          </td>
          <td
            class="cdx-table__cell--align-center"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Two
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          <td
            class="cdx-table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            1
            
          </td>
          <td
            class="cdx-table__cell--align-center"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          <td
            class="cdx-table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Four
            
          </td>
          <td
            class="cdx-table__cell--align-center"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Five
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          <td
            class="cdx-table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            4
            
          </td>
          <td
            class="cdx-table__cell--align-center"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            5
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          <td
            class="cdx-table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 3 With hidden caption: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <!--v-if-->
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 1
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 2
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 4 With row headers: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
    <div
      class="cdx-table__header__caption"
    >
      <!-- Visible table title. -->
      
      Table caption
      
    </div>
    <div
      class="cdx-table__header__content"
    >
      <!-- eslint-disable-next-line max-len -->
      <!-- @slot Header content. Not to be confused with &lt;thead&gt;; use the thead slot to customize that. -->
      
      
    </div>
  </div>
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 1
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 2
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <!--v-if-->
          
          <th
            class=""
            scope="row"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            One
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <th
            class=""
            scope="row"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            1
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <th
            class=""
            scope="row"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Four
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <th
            class=""
            scope="row"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            4
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 5 With column width settings: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
    <div
      class="cdx-table__header__caption"
    >
      <!-- Visible table title. -->
      
      Table caption
      
    </div>
    <div
      class="cdx-table__header__content"
    >
      <!-- eslint-disable-next-line max-len -->
      <!-- @slot Header content. Not to be confused with &lt;thead&gt;; use the thead slot to customize that. -->
      
      
    </div>
  </div>
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table cdx-table__table--layout-fixed"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            class=""
            scope="col"
            style="width: 20%;"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 1
            </span>
          </th>
          <th
            class=""
            scope="col"
            style="min-width: 100px;"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 2
            </span>
          </th>
          <th
            class=""
            scope="col"
            style="width: 20%; min-width: 100px;"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <!--v-if-->
          
          <th
            class=""
            scope="row"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            One
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <th
            class=""
            scope="row"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            1
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <th
            class=""
            scope="row"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Four
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <th
            class=""
            scope="row"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            4
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 6 With row selection: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
    <div
      class="cdx-table__header__caption"
    >
      <!-- Visible table title. -->
      
      Table caption
      
    </div>
    <div
      class="cdx-table__header__content"
    >
      <!-- eslint-disable-next-line max-len -->
      <!-- @slot Header content. Not to be confused with &lt;thead&gt;; use the thead slot to customize that. -->
      
      
    </div>
  </div>
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <th
            class="cdx-table__row-selection"
          >
            <span
              class="cdx-checkbox cdx-checkbox--status-default"
            >
              <input
                class="cdx-checkbox__input"
                id="cdx-checkbox-0"
                type="checkbox"
                value="false"
              />
              <span
                class="cdx-checkbox__icon"
              />
              <!-- Only render a Label component if label text has been provided. This component can also
			supply a description to the Checkbox if content is provided in the description slot. -->
              
              <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
              <div
                class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
              >
                <label
                  class="cdx-label__label"
                  for="cdx-checkbox-0"
                >
                  <!--v-if-->
                  <span
                    class="cdx-label__label__text"
                  >
                    <!-- @slot Label text. -->
                    
                    
                    Select all rows
                    
                    
                  </span>
                  <!--v-if-->
                </label>
                <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
                <!--v-if-->
              </div>
              
            </span>
          </th>
          
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 1
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 2
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <td>
            <span
              class="cdx-checkbox cdx-checkbox--status-default"
            >
              <input
                class="cdx-checkbox__input"
                id="cdx-checkbox-2"
                type="checkbox"
                value="0"
              />
              <span
                class="cdx-checkbox__icon"
              />
              <!-- Only render a Label component if label text has been provided. This component can also
			supply a description to the Checkbox if content is provided in the description slot. -->
              
              <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
              <div
                class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
              >
                <label
                  class="cdx-label__label"
                  for="cdx-checkbox-2"
                >
                  <!--v-if-->
                  <span
                    class="cdx-label__label__text"
                  >
                    <!-- @slot Label text. -->
                    
                    
                    Select row
                    
                    
                  </span>
                  <!--v-if-->
                </label>
                <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
                <!--v-if-->
              </div>
              
            </span>
          </td>
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <td>
            <span
              class="cdx-checkbox cdx-checkbox--status-default"
            >
              <input
                class="cdx-checkbox__input"
                id="cdx-checkbox-4"
                type="checkbox"
                value="1"
              />
              <span
                class="cdx-checkbox__icon"
              />
              <!-- Only render a Label component if label text has been provided. This component can also
			supply a description to the Checkbox if content is provided in the description slot. -->
              
              <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
              <div
                class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
              >
                <label
                  class="cdx-label__label"
                  for="cdx-checkbox-4"
                >
                  <!--v-if-->
                  <span
                    class="cdx-label__label__text"
                  >
                    <!-- @slot Label text. -->
                    
                    
                    Select row
                    
                    
                  </span>
                  <!--v-if-->
                </label>
                <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
                <!--v-if-->
              </div>
              
            </span>
          </td>
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <td>
            <span
              class="cdx-checkbox cdx-checkbox--status-default"
            >
              <input
                class="cdx-checkbox__input"
                id="cdx-checkbox-6"
                type="checkbox"
                value="2"
              />
              <span
                class="cdx-checkbox__icon"
              />
              <!-- Only render a Label component if label text has been provided. This component can also
			supply a description to the Checkbox if content is provided in the description slot. -->
              
              <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
              <div
                class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
              >
                <label
                  class="cdx-label__label"
                  for="cdx-checkbox-6"
                >
                  <!--v-if-->
                  <span
                    class="cdx-label__label__text"
                  >
                    <!-- @slot Label text. -->
                    
                    
                    Select row
                    
                    
                  </span>
                  <!--v-if-->
                </label>
                <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
                <!--v-if-->
              </div>
              
            </span>
          </td>
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <td>
            <span
              class="cdx-checkbox cdx-checkbox--status-default"
            >
              <input
                class="cdx-checkbox__input"
                id="cdx-checkbox-8"
                type="checkbox"
                value="3"
              />
              <span
                class="cdx-checkbox__icon"
              />
              <!-- Only render a Label component if label text has been provided. This component can also
			supply a description to the Checkbox if content is provided in the description slot. -->
              
              <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
              <div
                class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
              >
                <label
                  class="cdx-label__label"
                  for="cdx-checkbox-8"
                >
                  <!--v-if-->
                  <span
                    class="cdx-label__label__text"
                  >
                    <!-- @slot Label text. -->
                    
                    
                    Select row
                    
                    
                  </span>
                  <!--v-if-->
                </label>
                <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
                <!--v-if-->
              </div>
              
            </span>
          </td>
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 7 With header and footer slots: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
    <div
      class="cdx-table__header__caption"
    >
      <!-- Visible table title. -->
      
      Table caption
      
    </div>
    <div
      class="cdx-table__header__content"
    >
      <!-- eslint-disable-next-line max-len -->
      <!-- @slot Header content. Not to be confused with &lt;thead&gt;; use the thead slot to customize that. -->
      
      Header slot content
      
    </div>
  </div>
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 1
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 2
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <div
    class="cdx-table__footer"
  >
    <!-- eslint-disable-next-line max-len -->
    <!-- @slot Footer content. Not to be confused with &lt;tfoot&gt;; use the tfoot slot to add that. -->
    
    Footer slot content
    
  </div>
</div>
`;

exports[`Table matches the snapshot Case 8 With tfoot: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
    <div
      class="cdx-table__header__caption"
    >
      <!-- Visible table title. -->
      
      Table caption
      
    </div>
    <div
      class="cdx-table__header__content"
    >
      <!-- eslint-disable-next-line max-len -->
      <!-- @slot Header content. Not to be confused with &lt;thead&gt;; use the thead slot to customize that. -->
      
      
    </div>
  </div>
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 1
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 2
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 9 With item slot: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
    <div
      class="cdx-table__header__caption"
    >
      <!-- Visible table title. -->
      
      Table caption
      
    </div>
    <div
      class="cdx-table__header__content"
    >
      <!-- eslint-disable-next-line max-len -->
      <!-- @slot Header content. Not to be confused with &lt;thead&gt;; use the thead slot to customize that. -->
      
      
    </div>
  </div>
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 1
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 2
            </span>
          </th>
          <th
            class=""
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              Column 3
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            <p>
              One
            </p>
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Three
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            <p>
              1
            </p>
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            3
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            <p>
              Four
            </p>
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Six
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            <p>
              4
            </p>
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 10 With sort icon: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!-- We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end. -->
    <div
      class="cdx-table__header__caption"
    >
      <!-- Visible table title. -->
      
      Table caption
      
    </div>
    <div
      class="cdx-table__header__content"
    >
      <!-- eslint-disable-next-line max-len -->
      <!-- @slot Header content. Not to be confused with &lt;thead&gt;; use the thead slot to customize that. -->
      
      Header slot content
      
    </div>
  </div>
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        Table caption
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            aria-sort="none"
            class="cdx-table__cell--align-end cdx-table__cell--has-sort"
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              <button
                aria-selected="false"
                class="cdx-table__th-content__button-sort"
              >
                Year 
                <span
                  aria-hidden="true"
                  class="cdx-icon cdx-icon--small cdx-table__table__sort-icon"
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
                    <!-- eslint-disable vue/no-v-html -->
                    <g>
                      <path
                        d="M10 0 3 8h14zm0 18-7-8h14z"
                      />
                    </g>
                  </svg>
                </span>
              </button>
            </span>
          </th>
          <th
            aria-sort="none"
            class="cdx-table__cell--has-sort"
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              <button
                aria-selected="false"
                class="cdx-table__th-content__button-sort"
              >
                Last name 
                <span
                  aria-hidden="true"
                  class="cdx-icon cdx-icon--small cdx-table__table__sort-icon"
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
                    <!-- eslint-disable vue/no-v-html -->
                    <g>
                      <path
                        d="M10 0 3 8h14zm0 18-7-8h14z"
                      />
                    </g>
                  </svg>
                </span>
              </button>
            </span>
          </th>
          <th
            aria-sort="none"
            class="cdx-table__cell--align-end cdx-table__cell--has-sort"
            scope="col"
          >
            <span
              class="cdx-table__th-content"
            >
              <button
                aria-selected="false"
                class="cdx-table__th-content__button-sort"
              >
                Age at win 
                <span
                  aria-hidden="true"
                  class="cdx-icon cdx-icon--small cdx-table__table__sort-icon"
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
                    <!-- eslint-disable vue/no-v-html -->
                    <g>
                      <path
                        d="M10 0 3 8h14zm0 18-7-8h14z"
                      />
                    </g>
                  </svg>
                </span>
              </button>
            </span>
          </th>
          
        </tr>
      </thead>
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2023
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Goldin
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            77
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2022
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Bernanke
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            69
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2022
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Diamond
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            69
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2022
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Dybvig
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            67
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2021
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Card
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            65
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2021
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Angrist
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            61
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            2021
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            Imbens
            
          </td>
          <td
            class="cdx-table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow} Data for the entire row
								-->
            
            58
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <div
    class="cdx-table__footer"
  >
    <!-- eslint-disable-next-line max-len -->
    <!-- @slot Footer content. Not to be confused with &lt;tfoot&gt;; use the tfoot slot to add that. -->
    
    Footer slot content
    
  </div>
</div>
`;
