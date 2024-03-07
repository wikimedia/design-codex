// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Table matches the snapshot Case 0 Basic table: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
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
      class="cdx-table__header__slot"
    >
      <!-- @slot Header content. Not to be confused with \`&lt;thead&gt;\`; use the default
					slot to customize that. -->
      
      
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
      <thead>
        
        <th>
          Column 1
        </th>
        <th>
          Column 2
        </th>
        <th>
          Column 3
        </th>
        
      </thead>
      <tbody>
        
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            One
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Two
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Three
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            1
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            2
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            3
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Four
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Five
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Six
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            4
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            5
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      <!-- @slot Custom thead, tbody, and tfoot. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 1 With out-of-order data: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
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
      class="cdx-table__header__slot"
    >
      <!-- @slot Header content. Not to be confused with \`&lt;thead&gt;\`; use the default
					slot to customize that. -->
      
      
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
      <thead>
        
        <th>
          Column 1
        </th>
        <th>
          Column 2
        </th>
        <th>
          Column 3
        </th>
        
      </thead>
      <tbody>
        
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            One
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Two
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Three
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            1
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            2
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            3
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Four
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Five
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Six
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            4
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            5
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      <!-- @slot Custom thead, tbody, and tfoot. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 2 With hidden caption: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
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
      <thead>
        
        <th>
          Column 1
        </th>
        <th>
          Column 2
        </th>
        <th>
          Column 3
        </th>
        
      </thead>
      <tbody>
        
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            One
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Two
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Three
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            1
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            2
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            3
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Four
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Five
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Six
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            4
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            5
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      <!-- @slot Custom thead, tbody, and tfoot. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 3 With row headers: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
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
      class="cdx-table__header__slot"
    >
      <!-- @slot Header content. Not to be confused with \`&lt;thead&gt;\`; use the default
					slot to customize that. -->
      
      
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
      <thead>
        
        <th>
          Column 1
        </th>
        <th>
          Column 2
        </th>
        <th>
          Column 3
        </th>
        
      </thead>
      <tbody>
        
        <tr>
          
          <th>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            One
            
          </th>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Two
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Three
            
          </td>
          
        </tr>
        <tr>
          
          <th>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            1
            
          </th>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            2
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            3
            
          </td>
          
        </tr>
        <tr>
          
          <th>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Four
            
          </th>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Five
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Six
            
          </td>
          
        </tr>
        <tr>
          
          <th>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            4
            
          </th>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            5
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      <!-- @slot Custom thead, tbody, and tfoot. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 4 With header and footer slots: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
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
      class="cdx-table__header__slot"
    >
      <!-- @slot Header content. Not to be confused with \`&lt;thead&gt;\`; use the default
					slot to customize that. -->
      
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
      <thead>
        
        <th>
          Column 1
        </th>
        <th>
          Column 2
        </th>
        <th>
          Column 3
        </th>
        
      </thead>
      <tbody>
        
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            One
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Two
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Three
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            1
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            2
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            3
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Four
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Five
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Six
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            4
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            5
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      <!-- @slot Custom thead, tbody, and tfoot. -->
      
      
    </table>
  </div>
  <div
    class="cdx-table__footer"
  >
    <!-- @slot Footer content. Not to be confused with \`&lt;tfoot&gt;\`; use the default
				slot to add that. -->
    
    Footer slot content
    
  </div>
</div>
`;

exports[`Table matches the snapshot Case 5 With tfoot: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
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
      class="cdx-table__header__slot"
    >
      <!-- @slot Header content. Not to be confused with \`&lt;thead&gt;\`; use the default
					slot to customize that. -->
      
      
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
      <thead>
        
        <th>
          Column 1
        </th>
        <th>
          Column 2
        </th>
        <th>
          Column 3
        </th>
        
      </thead>
      <tbody>
        
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            One
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Two
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Three
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            1
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            2
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            3
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Four
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Five
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Six
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            4
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            5
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      <!-- @slot Custom thead, tbody, and tfoot. -->
      
      <tfoot>
        <tr>
          <td>
            One
          </td>
          <td>
            Two
          </td>
          <td>
            Three
          </td>
        </tr>
      </tfoot>
      
    </table>
  </div>
  <!--v-if-->
</div>
`;

exports[`Table matches the snapshot Case 6 With item slot: ([[Object], [Object], [Object]]) => HTML 1`] = `
<div
  class="cdx-table"
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
      class="cdx-table__header__slot"
    >
      <!-- @slot Header content. Not to be confused with \`&lt;thead&gt;\`; use the default
					slot to customize that. -->
      
      
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
      <thead>
        
        <th>
          Column 1
        </th>
        <th>
          Column 2
        </th>
        <th>
          Column 3
        </th>
        
      </thead>
      <tbody>
        
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            <p>
              One
            </p>
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Two
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Three
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            <p>
              1
            </p>
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            2
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            3
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            <p>
              Four
            </p>
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Five
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            Six
            
          </td>
          
        </tr>
        <tr>
          
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            <p>
              4
            </p>
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            5
            
          </td>
          <td>
            <!--
								@slot Table cell content, per column.
								@binding item Data for the cell
							-->
            
            6
            
          </td>
          
        </tr>
        
      </tbody>
      <!-- @slot Custom thead, tbody, and tfoot. -->
      
      
    </table>
  </div>
  <!--v-if-->
</div>
`;
