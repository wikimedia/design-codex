// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`TextArea matches the snapshot Case 0 with a truthy modelValue prop which dynamically adds a class to <textarea>: ({"modelValue": "Earth Day"}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default"
>
  <textarea
    class="cdx-text-area__textarea--has-value cdx-text-area__textarea"
  />
</div>
`;

exports[`TextArea matches the snapshot Case 1 with attributes: ({}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default"
>
  <textarea
    class="cdx-text-area__textarea"
    placeholder="Start typing..."
  />
</div>
`;

exports[`TextArea matches the snapshot Case 2 with disabled as true: ({"modelValue": "Earth Day"}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default"
>
  <textarea
    class="cdx-text-area__textarea--has-value cdx-text-area__textarea"
    disabled=""
    placeholder="Start typing..."
  />
</div>
`;

exports[`TextArea matches the snapshot Case 3 with readonly as true: ({"modelValue": "Earth Day"}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default"
>
  <textarea
    class="cdx-text-area__textarea--has-value cdx-text-area__textarea"
    placeholder="Start typing..."
    readonly=""
  />
</div>
`;

exports[`TextArea matches the snapshot Case 4 with error status: ({"status": "error"}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-error"
>
  <textarea
    class="cdx-text-area__textarea"
    placeholder="Start typing..."
  />
</div>
`;

exports[`TextArea matches the snapshot Case 5 with autosize as true: ({"autosize": true}) => HTML 1`] = `
<div
  class="cdx-text-area cdx-text-area--status-default"
>
  <textarea
    class="cdx-text-area__textarea--is-autosize cdx-text-area__textarea"
    placeholder="Start typing..."
  />
</div>
`;
