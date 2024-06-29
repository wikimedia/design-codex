// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Table matches the snapshot Case 0 Basic table: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
    <div
      aria-hidden="true"
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
            
            Column 1
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 2
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 3
            
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
    <div
      aria-hidden="true"
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
            
            Column 1
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 2
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 3
            
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
    <div
      aria-hidden="true"
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
            
            Column 1
            
          </th>
          <th
            class="cdx-table__table__cell--align-center"
            scope="col"
          >
            
            Column 2
            
          </th>
          <th
            class="cdx-table__table__cell--align-end"
            scope="col"
          >
            
            Column 3
            
          </th>
          <th
            class="cdx-table__table__cell--align-number"
            scope="col"
          >
            
            Column 3
            
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            One
            
          </td>
          <td
            class="cdx-table__table__cell--align-center"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Two
            
          </td>
          <td
            class="cdx-table__table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Three
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1
            
          </td>
          <td
            class="cdx-table__table__cell--align-center"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2
            
          </td>
          <td
            class="cdx-table__table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            3
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Four
            
          </td>
          <td
            class="cdx-table__table__cell--align-center"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Five
            
          </td>
          <td
            class="cdx-table__table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Six
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            4
            
          </td>
          <td
            class="cdx-table__table__cell--align-center"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            5
            
          </td>
          <td
            class="cdx-table__table__cell--align-end"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            6
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
            
            Column 1
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 2
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 3
            
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
    <div
      aria-hidden="true"
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
            
            Column 1
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 2
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 3
            
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            One
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Four
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            4
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
    <div
      aria-hidden="true"
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
            
            Column 1
            
          </th>
          <th
            class=""
            scope="col"
            style="min-width: 100px;"
          >
            
            Column 2
            
          </th>
          <th
            class=""
            scope="col"
            style="width: 20%; min-width: 100px;"
          >
            
            Column 3
            
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            One
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Four
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            4
            
          </th>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
    <div
      aria-hidden="true"
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
            class="cdx-table__table__select-rows"
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
            
            Column 1
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 2
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 3
            
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
                    
                    
                    Select row 1 of 4
                    
                    
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
                    
                    
                    Select row 2 of 4
                    
                    
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
                    
                    
                    Select row 3 of 4
                    
                    
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
                    
                    
                    Select row 4 of 4
                    
                    
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
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
            
            Column 1
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 2
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 3
            
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
    <div
      aria-hidden="true"
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
            
            Column 1
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 2
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 3
            
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            One
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Four
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            4
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
    <div
      aria-hidden="true"
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
            
            Column 1
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 2
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Column 3
            
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Two
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Five
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            5
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
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
        
        Table caption, column headers with buttons are sortable.
        
      </caption>
      <!-- @slot Custom &lt;thead&gt;. -->
      
      <thead>
        <tr>
          <!--v-if-->
          
          <th
            class="cdx-table__table__cell--align-number cdx-table__table__cell--has-sort"
            scope="col"
          >
            <button
              aria-selected="false"
              class="cdx-table__table__sort-button"
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
          </th>
          <th
            class="cdx-table__table__cell--has-sort"
            scope="col"
          >
            <button
              aria-selected="false"
              class="cdx-table__table__sort-button"
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
          </th>
          <th
            class="cdx-table__table__cell--align-number cdx-table__table__cell--has-sort"
            scope="col"
          >
            <button
              aria-selected="false"
              class="cdx-table__table__sort-button"
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
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2023
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Goldin
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            77
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2022
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Bernanke
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            69
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2022
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Diamond
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            69
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2022
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Dybvig
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            67
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2021
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Card
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            65
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2021
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Angrist
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            61
            
          </td>
          
        </tr>
        <tr
          class=""
        >
          <!--v-if-->
          
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            2021
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            Imbens
            
          </td>
          <td
            class="cdx-table__table__cell--align-number"
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
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

exports[`Table matches the snapshot Case 11 With empty state: ([]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <div
    class="cdx-table__header"
  >
    <!--
				We need this div, even if the caption is hidden, to ensure the
				slot is aligned to the end.
				aria-hidden is used so assistive tech will skip the visible caption and only read
				the &lt;caption&gt; element. However, if there is header content, the visible caption
				should be read too to ensure the caption is read before the header content.
			-->
    <div
      aria-hidden="true"
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
      
      <!--v-if-->
      
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <!--v-if-->
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;
