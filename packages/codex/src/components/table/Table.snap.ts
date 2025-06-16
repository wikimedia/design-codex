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
      
      <!--v-if-->
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
      
      <!--v-if-->
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
            
            Column 4
            
          </th>
          
        </tr>
      </thead>
      
      <!--v-if-->
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
            
            
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 3 With hidden caption: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
  tabindex="0"
>
  <!--v-if-->
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
      
      <!--v-if-->
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
      
      <!--v-if-->
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
  <!--v-if-->
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
      
      <!--v-if-->
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
          <th
            class="cdx-table__table__select-rows"
          >
            <div
              class="cdx-checkbox cdx-checkbox--status-default"
            >
              <div
                class="cdx-checkbox__wrapper"
              >
                <input
                  class="cdx-checkbox__input"
                  id="v-0"
                  type="checkbox"
                  value="false"
                />
                <span
                  class="cdx-checkbox__icon"
                />
                <!-- Only render a Label component if label text has been provided.
			This component can also supply a description to the Checkbox if content
			is provided in the description slot. -->
                
                <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
                <div
                  class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
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
                      
                      
                      Select all rows
                      
                      
                    </span>
                    <!--v-if-->
                  </label>
                  <!-- Include an ID attribute that will be used on the input for aria-describedby. -->
                  <!--v-if-->
                </div>
                
              </div>
              <!-- Only render custom input component(s) if custom input has been provided. -->
              <!--v-if-->
            </div>
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
      
      <!--v-if-->
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <tbody>
        
        <tr
          class=""
        >
          <td>
            <div
              class="cdx-checkbox cdx-checkbox--status-default"
            >
              <div
                class="cdx-checkbox__wrapper"
              >
                <input
                  class="cdx-checkbox__input"
                  id="v-2"
                  type="checkbox"
                  value="0"
                />
                <span
                  class="cdx-checkbox__icon"
                />
                <!-- Only render a Label component if label text has been provided.
			This component can also supply a description to the Checkbox if content
			is provided in the description slot. -->
                
                <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
                <div
                  class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
                >
                  <label
                    class="cdx-label__label"
                    for="v-2"
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
                
              </div>
              <!-- Only render custom input component(s) if custom input has been provided. -->
              <!--v-if-->
            </div>
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
            <div
              class="cdx-checkbox cdx-checkbox--status-default"
            >
              <div
                class="cdx-checkbox__wrapper"
              >
                <input
                  class="cdx-checkbox__input"
                  id="v-4"
                  type="checkbox"
                  value="1"
                />
                <span
                  class="cdx-checkbox__icon"
                />
                <!-- Only render a Label component if label text has been provided.
			This component can also supply a description to the Checkbox if content
			is provided in the description slot. -->
                
                <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
                <div
                  class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
                >
                  <label
                    class="cdx-label__label"
                    for="v-4"
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
                
              </div>
              <!-- Only render custom input component(s) if custom input has been provided. -->
              <!--v-if-->
            </div>
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
            <div
              class="cdx-checkbox cdx-checkbox--status-default"
            >
              <div
                class="cdx-checkbox__wrapper"
              >
                <input
                  class="cdx-checkbox__input"
                  id="v-6"
                  type="checkbox"
                  value="2"
                />
                <span
                  class="cdx-checkbox__icon"
                />
                <!-- Only render a Label component if label text has been provided.
			This component can also supply a description to the Checkbox if content
			is provided in the description slot. -->
                
                <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
                <div
                  class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
                >
                  <label
                    class="cdx-label__label"
                    for="v-6"
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
                
              </div>
              <!-- Only render custom input component(s) if custom input has been provided. -->
              <!--v-if-->
            </div>
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
            <div
              class="cdx-checkbox cdx-checkbox--status-default"
            >
              <div
                class="cdx-checkbox__wrapper"
              >
                <input
                  class="cdx-checkbox__input"
                  id="v-8"
                  type="checkbox"
                  value="3"
                />
                <span
                  class="cdx-checkbox__icon"
                />
                <!-- Only render a Label component if label text has been provided.
			This component can also supply a description to the Checkbox if content
			is provided in the description slot. -->
                
                <!-- Separate &lt;label&gt; and description are wrapped in a &lt;div&gt;. -->
                <div
                  class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
                >
                  <label
                    class="cdx-label__label"
                    for="v-8"
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
                
              </div>
              <!-- Only render custom input component(s) if custom input has been provided. -->
              <!--v-if-->
            </div>
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
      
      <!--v-if-->
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
      
      <!--v-if-->
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
      
      <!--v-if-->
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
  <!--v-if-->
  <div
    class="cdx-table__table-wrapper"
  >
    <table
      class="cdx-table__table"
    >
      <!-- Visually-hidden caption element, for assistive technology. -->
      <caption>
        
        Table caption (column headers with buttons are sortable).
        
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
              <span
                class="cdx-table__table__sort-label"
              >
                Year
              </span>
              <span
                aria-hidden="true"
                class="cdx-icon cdx-icon--small cdx-table__table__sort-icon--vue"
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
              <span
                class="cdx-table__table__sort-label"
              >
                Last name
              </span>
              <span
                aria-hidden="true"
                class="cdx-icon cdx-icon--small cdx-table__table__sort-icon--vue"
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
              <span
                class="cdx-table__table__sort-label"
              >
                Age at win
              </span>
              <span
                aria-hidden="true"
                class="cdx-icon cdx-icon--small cdx-table__table__sort-icon--vue"
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
                      d="M10 0 3 8h14zm0 18-7-8h14z"
                    />
                  </g>
                </svg>
              </span>
            </button>
          </th>
          
        </tr>
      </thead>
      
      <!--v-if-->
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
  <!--v-if-->
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
      
      <!--v-if-->
      
      <!--v-if-->
      <!-- @slot Custom &lt;tbody&gt;. -->
      
      <!--v-if-->
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <!--v-if-->
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 12 With basic pagination: ([[Object], [Object]]) => HTML 1`] = `
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
    class="cdx-table-pager cdx-table__pagination--top"
  >
    <div
      class="cdx-table-pager__start"
    >
      <div
        aria-disabled="false"
        class="cdx-select-vue cdx-select-vue--enabled cdx-select-vue--value-selected cdx-select-vue--status-default"
      >
        <div
          aria-controls="v-0"
          aria-expanded="false"
          class="cdx-select-vue__handle"
          id="v-1"
          role="combobox"
          tabindex="0"
        >
          <!--
				@slot Display of the current selection or default label
				@binding {MenuItemData|undefined} selected-menu-item The currently selected menu
				item
				@binding {string} default-label The default label, provided via a prop
			-->
          
          <span>
            <span>
              10 rows
            </span>
          </span>
          
          <!--v-if-->
          <span
            class="cdx-icon cdx-icon--medium cdx-select-vue__indicator"
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
                  d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
                />
              </g>
            </svg>
          </span>
        </div>
        <div
          class="cdx-menu"
          style="display: none; visibility: hidden; position: absolute; top: 0px; left: 0px; transform: translate(0px, 0px);"
        >
          <ul
            class="cdx-menu__listbox"
            id="v-0"
            role="listbox"
            tabindex="-1"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <li
              aria-disabled="false"
              aria-selected="true"
              class="cdx-menu-item cdx-menu-item--selected cdx-menu-item--enabled"
              id="v-2-1"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <span
                class="cdx-menu-item__content"
              >
                <!-- Thumbnail, thumbnail placeholder, or icon. -->
                <!--v-if-->
                <!-- Item text. -->
                <span
                  class="cdx-menu-item__text"
                >
                  <!-- Item label. -->
                  <span
                    class="cdx-menu-item__text__label"
                  >
                    <bdi>
                      10
                    </bdi>
                  </span>
                  <!-- Item search query match (e.g. alias). -->
                  <!--v-if-->
                  <!-- Item label supporting text. -->
                  <!--v-if-->
                  <!-- Item description. -->
                  <!--v-if-->
                </span>
                <!--v-if-->
              </span>
              
            </li>
            
            
            <li
              aria-disabled="false"
              class="cdx-menu-item cdx-menu-item--enabled"
              id="v-2-2"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <span
                class="cdx-menu-item__content"
              >
                <!-- Thumbnail, thumbnail placeholder, or icon. -->
                <!--v-if-->
                <!-- Item text. -->
                <span
                  class="cdx-menu-item__text"
                >
                  <!-- Item label. -->
                  <span
                    class="cdx-menu-item__text__label"
                  >
                    <bdi>
                      20
                    </bdi>
                  </span>
                  <!-- Item search query match (e.g. alias). -->
                  <!--v-if-->
                  <!-- Item label supporting text. -->
                  <!--v-if-->
                  <!-- Item description. -->
                  <!--v-if-->
                </span>
                <!--v-if-->
              </span>
              
            </li>
            
            
            <li
              aria-disabled="false"
              class="cdx-menu-item cdx-menu-item--enabled"
              id="v-2-3"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <span
                class="cdx-menu-item__content"
              >
                <!-- Thumbnail, thumbnail placeholder, or icon. -->
                <!--v-if-->
                <!-- Item text. -->
                <span
                  class="cdx-menu-item__text"
                >
                  <!-- Item label. -->
                  <span
                    class="cdx-menu-item__text__label"
                  >
                    <bdi>
                      50
                    </bdi>
                  </span>
                  <!-- Item search query match (e.g. alias). -->
                  <!--v-if-->
                  <!-- Item label supporting text. -->
                  <!--v-if-->
                  <!-- Item description. -->
                  <!--v-if-->
                </span>
                <!--v-if-->
              </span>
              
            </li>
            
            
            <!--v-if-->
          </ul>
        </div>
      </div>
    </div>
    <div
      class="cdx-table-pager__center"
    >
      <!-- @slot pagination status -->
      
      <span
        class="cdx-table__pagination-status--long"
      >
        Showing results 1–10 of 52
      </span>
      <span
        class="cdx-table__pagination-status--short"
      >
        1–10 of 52
      </span>
      
    </div>
    <div
      class="cdx-table-pager__end"
    >
      <button
        aria-label="First page"
        class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only cdx-table-pager__button-first"
        disabled=""
      >
        <!-- @slot Button content -->
        
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
            <!-- eslint-disable vue/no-v-html -->
            <g>
              <path
                d="M3 1h2v18H3zm13.5 1.5L15 1l-9 9 9 9 1.5-1.5L9 10z"
              />
            </g>
          </svg>
        </span>
        
      </button>
      <button
        aria-label="Previous page"
        class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only cdx-table-pager__button-prev"
        disabled=""
      >
        <!-- @slot Button content -->
        
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
            <!-- eslint-disable vue/no-v-html -->
            <g>
              <path
                d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"
              />
            </g>
          </svg>
        </span>
        
      </button>
      <button
        aria-label="Next page"
        class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only cdx-table-pager__button-next"
      >
        <!-- @slot Button content -->
        
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
            <!-- eslint-disable vue/no-v-html -->
            <g>
              <path
                d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"
              />
            </g>
          </svg>
        </span>
        
      </button>
      <button
        aria-label="Last page"
        class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only cdx-table-pager__button-last"
      >
        <!-- @slot Button content -->
        
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
            <!-- eslint-disable vue/no-v-html -->
            <g>
              <path
                d="M15 1h2v18h-2zM3.5 2.5 11 10l-7.5 7.5L5 19l9-9-9-9z"
              />
            </g>
          </svg>
        </span>
        
      </button>
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
            
            Record Name
            
          </th>
          <th
            class=""
            scope="col"
          >
            
            Record ID
            
          </th>
          
        </tr>
      </thead>
      
      <!--v-if-->
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
            
            AAAAA
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1001
            
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
            
            BBBBB
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1002
            
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
            
            CCCCC
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1003
            
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
            
            DDDDD
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1004
            
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
            
            EEEEE
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1005
            
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
            
            FFFFF
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1006
            
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
            
            GGGGG
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1007
            
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
            
            HHHHH
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1008
            
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
            
            IIIII
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1009
            
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
            
            JJJJJ
            
          </td>
          <td
            class=""
          >
            <!--
									@slot Table cell content, per column.
									@binding item {any} Data for the cell
									@binding row {TableRow|TableRowWithIdentifier} Data for the row
								-->
            
            1010
            
          </td>
          
        </tr>
        
      </tbody>
      
      <!-- @slot Custom &lt;tfoot&gt;. -->
      
      
    </table>
  </div>
  <div
    class="cdx-table-pager cdx-table__pagination--bottom"
  >
    <div
      class="cdx-table-pager__start"
    >
      <div
        aria-disabled="false"
        class="cdx-select-vue cdx-select-vue--enabled cdx-select-vue--value-selected cdx-select-vue--status-default"
      >
        <div
          aria-controls="v-3"
          aria-expanded="false"
          class="cdx-select-vue__handle"
          id="v-4"
          role="combobox"
          tabindex="0"
        >
          <!--
				@slot Display of the current selection or default label
				@binding {MenuItemData|undefined} selected-menu-item The currently selected menu
				item
				@binding {string} default-label The default label, provided via a prop
			-->
          
          <span>
            <span>
              10 rows
            </span>
          </span>
          
          <!--v-if-->
          <span
            class="cdx-icon cdx-icon--medium cdx-select-vue__indicator"
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
                  d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
                />
              </g>
            </svg>
          </span>
        </div>
        <div
          class="cdx-menu"
          style="display: none; visibility: hidden; position: absolute; top: 0px; left: 0px; transform: translate(0px, 0px);"
        >
          <ul
            class="cdx-menu__listbox"
            id="v-3"
            role="listbox"
            tabindex="-1"
          >
            <!--v-if-->
            <!--v-if-->
            
            
            <li
              aria-disabled="false"
              aria-selected="true"
              class="cdx-menu-item cdx-menu-item--selected cdx-menu-item--enabled"
              id="v-5-1"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <span
                class="cdx-menu-item__content"
              >
                <!-- Thumbnail, thumbnail placeholder, or icon. -->
                <!--v-if-->
                <!-- Item text. -->
                <span
                  class="cdx-menu-item__text"
                >
                  <!-- Item label. -->
                  <span
                    class="cdx-menu-item__text__label"
                  >
                    <bdi>
                      10
                    </bdi>
                  </span>
                  <!-- Item search query match (e.g. alias). -->
                  <!--v-if-->
                  <!-- Item label supporting text. -->
                  <!--v-if-->
                  <!-- Item description. -->
                  <!--v-if-->
                </span>
                <!--v-if-->
              </span>
              
            </li>
            
            
            <li
              aria-disabled="false"
              class="cdx-menu-item cdx-menu-item--enabled"
              id="v-5-2"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <span
                class="cdx-menu-item__content"
              >
                <!-- Thumbnail, thumbnail placeholder, or icon. -->
                <!--v-if-->
                <!-- Item text. -->
                <span
                  class="cdx-menu-item__text"
                >
                  <!-- Item label. -->
                  <span
                    class="cdx-menu-item__text__label"
                  >
                    <bdi>
                      20
                    </bdi>
                  </span>
                  <!-- Item search query match (e.g. alias). -->
                  <!--v-if-->
                  <!-- Item label supporting text. -->
                  <!--v-if-->
                  <!-- Item description. -->
                  <!--v-if-->
                </span>
                <!--v-if-->
              </span>
              
            </li>
            
            
            <li
              aria-disabled="false"
              class="cdx-menu-item cdx-menu-item--enabled"
              id="v-5-3"
              role="option"
            >
              <!-- @slot Custom menu item content. -->
              
              <span
                class="cdx-menu-item__content"
              >
                <!-- Thumbnail, thumbnail placeholder, or icon. -->
                <!--v-if-->
                <!-- Item text. -->
                <span
                  class="cdx-menu-item__text"
                >
                  <!-- Item label. -->
                  <span
                    class="cdx-menu-item__text__label"
                  >
                    <bdi>
                      50
                    </bdi>
                  </span>
                  <!-- Item search query match (e.g. alias). -->
                  <!--v-if-->
                  <!-- Item label supporting text. -->
                  <!--v-if-->
                  <!-- Item description. -->
                  <!--v-if-->
                </span>
                <!--v-if-->
              </span>
              
            </li>
            
            
            <!--v-if-->
          </ul>
        </div>
      </div>
    </div>
    <div
      class="cdx-table-pager__center"
    >
      <!-- @slot pagination status -->
      
      <span
        class="cdx-table__pagination-status--long"
      >
        Showing results 1–10 of 52
      </span>
      <span
        class="cdx-table__pagination-status--short"
      >
        1–10 of 52
      </span>
      
    </div>
    <div
      class="cdx-table-pager__end"
    >
      <button
        aria-label="First page"
        class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only cdx-table-pager__button-first"
        disabled=""
      >
        <!-- @slot Button content -->
        
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
            <!-- eslint-disable vue/no-v-html -->
            <g>
              <path
                d="M3 1h2v18H3zm13.5 1.5L15 1l-9 9 9 9 1.5-1.5L9 10z"
              />
            </g>
          </svg>
        </span>
        
      </button>
      <button
        aria-label="Previous page"
        class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only cdx-table-pager__button-prev"
        disabled=""
      >
        <!-- @slot Button content -->
        
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
            <!-- eslint-disable vue/no-v-html -->
            <g>
              <path
                d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"
              />
            </g>
          </svg>
        </span>
        
      </button>
      <button
        aria-label="Next page"
        class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only cdx-table-pager__button-next"
      >
        <!-- @slot Button content -->
        
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
            <!-- eslint-disable vue/no-v-html -->
            <g>
              <path
                d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"
              />
            </g>
          </svg>
        </span>
        
      </button>
      <button
        aria-label="Last page"
        class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only cdx-table-pager__button-last"
      >
        <!-- @slot Button content -->
        
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
            <!-- eslint-disable vue/no-v-html -->
            <g>
              <path
                d="M15 1h2v18h-2zM3.5 2.5 11 10l-7.5 7.5L5 19l9-9-9-9z"
              />
            </g>
          </svg>
        </span>
        
      </button>
    </div>
  </div>
  <!--v-if-->
</div>
`;
