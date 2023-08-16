// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Basic usage 1`] = `
<teleport-stub>
  <div
    class="cdx-dialog-backdrop cdx-dialog-fade-enter-from cdx-dialog-fade-enter-active"
  >
    <!-- Focus trap start -->
    <div
      tabindex="0"
    />
    <div
      aria-labelledby="cdx-dialog-label-0"
      aria-modal="true"
      class="cdx-dialog cdx-dialog--horizontal-actions"
      role="dialog"
    >
      <header
        class="cdx-dialog__header cdx-dialog__header--default"
      >
        <!-- @slot Customizable Dialog header -->
        
        <div
          class="cdx-dialog__header__title-group"
        >
          <h2
            class="cdx-dialog__header__title"
            id="cdx-dialog-label-0"
          >
            Dialog
          </h2>
          <!--v-if-->
        </div>
        <!--v-if-->
        
      </header>
      <div
        class="cdx-dialog-focus-trap"
        tabindex="-1"
      />
      <div
        class="cdx-dialog__body cdx-dialog__body--no-footer"
      >
        <!-- @slot Dialog content -->
        
        <p>
          Hello world!
        </p>
        
      </div>
      <!--v-if-->
    </div>
    <!-- Focus trap end -->
    <div
      tabindex="0"
    />
  </div>
</teleport-stub>
`;

exports[`matches the snapshot Case 1 Open dialog 1`] = `
<teleport-stub>
  <div
    class="cdx-dialog-backdrop cdx-dialog-fade-enter-from cdx-dialog-fade-enter-active"
  >
    <!-- Focus trap start -->
    <div
      tabindex="0"
    />
    <div
      aria-labelledby="cdx-dialog-label-1"
      aria-modal="true"
      class="cdx-dialog cdx-dialog--horizontal-actions"
      role="dialog"
    >
      <header
        class="cdx-dialog__header cdx-dialog__header--default"
      >
        <!-- @slot Customizable Dialog header -->
        
        <div
          class="cdx-dialog__header__title-group"
        >
          <h2
            class="cdx-dialog__header__title"
            id="cdx-dialog-label-1"
          >
            Dialog
          </h2>
          <!--v-if-->
        </div>
        <!--v-if-->
        
      </header>
      <div
        class="cdx-dialog-focus-trap"
        tabindex="-1"
      />
      <div
        class="cdx-dialog__body cdx-dialog__body--no-footer"
      >
        <!-- @slot Dialog content -->
        
        <p>
          Hello world!
        </p>
        
      </div>
      <!--v-if-->
    </div>
    <!-- Focus trap end -->
    <div
      tabindex="0"
    />
  </div>
</teleport-stub>
`;

exports[`matches the snapshot Case 2 With hidden title 1`] = `
<teleport-stub>
  <div
    class="cdx-dialog-backdrop cdx-dialog-fade-enter-from cdx-dialog-fade-enter-active"
  >
    <!-- Focus trap start -->
    <div
      tabindex="0"
    />
    <div
      aria-label="Dialog"
      aria-modal="true"
      class="cdx-dialog cdx-dialog--horizontal-actions"
      role="dialog"
    >
      <header
        class="cdx-dialog__header cdx-dialog__header--default"
      >
        <!-- @slot Customizable Dialog header -->
        
        <!--v-if-->
        <button
          aria-label="close"
          class="cdx-button cdx-button--action-default cdx-button--weight-quiet cdx-button--size-medium cdx-button--icon-only cdx-dialog__header__close-button"
          type="button"
        >
          <!-- @slot Button content -->
          
          <span
            class="cdx-icon cdx-icon--medium"
          >
            <svg
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>
                close
              </title>
              <!-- eslint-disable vue/no-v-html -->
              <g>
                <path
                  d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"
                />
                <path
                  d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"
                />
              </g>
            </svg>
          </span>
          
        </button>
        
      </header>
      <div
        class="cdx-dialog-focus-trap"
        tabindex="-1"
      />
      <div
        class="cdx-dialog__body cdx-dialog__body--no-footer"
      >
        <!-- @slot Dialog content -->
        
        <p>
          foo
        </p>
        
      </div>
      <!--v-if-->
    </div>
    <!-- Focus trap end -->
    <div
      tabindex="0"
    />
  </div>
</teleport-stub>
`;

exports[`matches the snapshot Case 3 With default action 1`] = `
<teleport-stub>
  <div
    class="cdx-dialog-backdrop cdx-dialog-fade-enter-from cdx-dialog-fade-enter-active"
  >
    <!-- Focus trap start -->
    <div
      tabindex="0"
    />
    <div
      aria-labelledby="cdx-dialog-label-3"
      aria-modal="true"
      class="cdx-dialog cdx-dialog--horizontal-actions"
      role="dialog"
    >
      <header
        class="cdx-dialog__header cdx-dialog__header--default"
      >
        <!-- @slot Customizable Dialog header -->
        
        <div
          class="cdx-dialog__header__title-group"
        >
          <h2
            class="cdx-dialog__header__title"
            id="cdx-dialog-label-3"
          >
            Dialog
          </h2>
          <!--v-if-->
        </div>
        <!--v-if-->
        
      </header>
      <div
        class="cdx-dialog-focus-trap"
        tabindex="-1"
      />
      <div
        class="cdx-dialog__body"
      >
        <!-- @slot Dialog content -->
        
        <p>
          foo
        </p>
        
      </div>
      <footer
        class="cdx-dialog__footer cdx-dialog__footer--default"
      >
        <!-- @slot Customizable Dialog footer -->
        
        <!--v-if-->
        <div
          class="cdx-dialog__footer__actions"
        >
          <!--v-if-->
          <button
            class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-dialog__footer__default-action"
          >
            <!-- @slot Button content -->
            
            ok
            
          </button>
        </div>
        
      </footer>
    </div>
    <!-- Focus trap end -->
    <div
      tabindex="0"
    />
  </div>
</teleport-stub>
`;

exports[`matches the snapshot Case 4 With default disabled action 1`] = `
<teleport-stub>
  <div
    class="cdx-dialog-backdrop cdx-dialog-fade-enter-from cdx-dialog-fade-enter-active"
  >
    <!-- Focus trap start -->
    <div
      tabindex="0"
    />
    <div
      aria-labelledby="cdx-dialog-label-4"
      aria-modal="true"
      class="cdx-dialog cdx-dialog--horizontal-actions"
      role="dialog"
    >
      <header
        class="cdx-dialog__header cdx-dialog__header--default"
      >
        <!-- @slot Customizable Dialog header -->
        
        <div
          class="cdx-dialog__header__title-group"
        >
          <h2
            class="cdx-dialog__header__title"
            id="cdx-dialog-label-4"
          >
            Dialog
          </h2>
          <!--v-if-->
        </div>
        <!--v-if-->
        
      </header>
      <div
        class="cdx-dialog-focus-trap"
        tabindex="-1"
      />
      <div
        class="cdx-dialog__body"
      >
        <!-- @slot Dialog content -->
        
        <p>
          foo
        </p>
        
      </div>
      <footer
        class="cdx-dialog__footer cdx-dialog__footer--default"
      >
        <!-- @slot Customizable Dialog footer -->
        
        <!--v-if-->
        <div
          class="cdx-dialog__footer__actions"
        >
          <!--v-if-->
          <button
            class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-dialog__footer__default-action"
            disabled=""
          >
            <!-- @slot Button content -->
            
            ok
            
          </button>
        </div>
        
      </footer>
    </div>
    <!-- Focus trap end -->
    <div
      tabindex="0"
    />
  </div>
</teleport-stub>
`;

exports[`matches the snapshot Case 5 With default and primary actions 1`] = `
<teleport-stub>
  <div
    class="cdx-dialog-backdrop cdx-dialog-fade-enter-from cdx-dialog-fade-enter-active"
  >
    <!-- Focus trap start -->
    <div
      tabindex="0"
    />
    <div
      aria-labelledby="cdx-dialog-label-5"
      aria-modal="true"
      class="cdx-dialog cdx-dialog--horizontal-actions"
      role="dialog"
    >
      <header
        class="cdx-dialog__header cdx-dialog__header--default"
      >
        <!-- @slot Customizable Dialog header -->
        
        <div
          class="cdx-dialog__header__title-group"
        >
          <h2
            class="cdx-dialog__header__title"
            id="cdx-dialog-label-5"
          >
            Dialog
          </h2>
          <!--v-if-->
        </div>
        <!--v-if-->
        
      </header>
      <div
        class="cdx-dialog-focus-trap"
        tabindex="-1"
      />
      <div
        class="cdx-dialog__body"
      >
        <!-- @slot Dialog content -->
        
        <p>
          foo
        </p>
        
      </div>
      <footer
        class="cdx-dialog__footer cdx-dialog__footer--default"
      >
        <!-- @slot Customizable Dialog footer -->
        
        <!--v-if-->
        <div
          class="cdx-dialog__footer__actions"
        >
          <button
            class="cdx-button cdx-button--action-progressive cdx-button--weight-primary cdx-button--size-medium cdx-button--framed cdx-dialog__footer__primary-action"
          >
            <!-- @slot Button content -->
            
            save
            
          </button>
          <button
            class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-dialog__footer__default-action"
          >
            <!-- @slot Button content -->
            
            cancel
            
          </button>
        </div>
        
      </footer>
    </div>
    <!-- Focus trap end -->
    <div
      tabindex="0"
    />
  </div>
</teleport-stub>
`;

exports[`matches the snapshot Case 6 With stacked default and primary actions 1`] = `
<teleport-stub>
  <div
    class="cdx-dialog-backdrop cdx-dialog-fade-enter-from cdx-dialog-fade-enter-active"
  >
    <!-- Focus trap start -->
    <div
      tabindex="0"
    />
    <div
      aria-labelledby="cdx-dialog-label-6"
      aria-modal="true"
      class="cdx-dialog cdx-dialog--vertical-actions"
      role="dialog"
    >
      <header
        class="cdx-dialog__header cdx-dialog__header--default"
      >
        <!-- @slot Customizable Dialog header -->
        
        <div
          class="cdx-dialog__header__title-group"
        >
          <h2
            class="cdx-dialog__header__title"
            id="cdx-dialog-label-6"
          >
            Dialog
          </h2>
          <!--v-if-->
        </div>
        <!--v-if-->
        
      </header>
      <div
        class="cdx-dialog-focus-trap"
        tabindex="-1"
      />
      <div
        class="cdx-dialog__body"
      >
        <!-- @slot Dialog content -->
        
        <p>
          foo
        </p>
        
      </div>
      <footer
        class="cdx-dialog__footer cdx-dialog__footer--default"
      >
        <!-- @slot Customizable Dialog footer -->
        
        <!--v-if-->
        <div
          class="cdx-dialog__footer__actions"
        >
          <button
            class="cdx-button cdx-button--action-progressive cdx-button--weight-primary cdx-button--size-medium cdx-button--framed cdx-dialog__footer__primary-action"
          >
            <!-- @slot Button content -->
            
            save
            
          </button>
          <button
            class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-dialog__footer__default-action"
          >
            <!-- @slot Button content -->
            
            cancel
            
          </button>
        </div>
        
      </footer>
    </div>
    <!-- Focus trap end -->
    <div
      tabindex="0"
    />
  </div>
</teleport-stub>
`;

exports[`matches the snapshot Case 7 With subtitle 1`] = `
<teleport-stub>
  <div
    class="cdx-dialog-backdrop cdx-dialog-fade-enter-from cdx-dialog-fade-enter-active"
  >
    <!-- Focus trap start -->
    <div
      tabindex="0"
    />
    <div
      aria-labelledby="cdx-dialog-label-7"
      aria-modal="true"
      class="cdx-dialog cdx-dialog--horizontal-actions"
      role="dialog"
    >
      <header
        class="cdx-dialog__header cdx-dialog__header--default"
      >
        <!-- @slot Customizable Dialog header -->
        
        <div
          class="cdx-dialog__header__title-group"
        >
          <h2
            class="cdx-dialog__header__title"
            id="cdx-dialog-label-7"
          >
            Dialog
          </h2>
          <p
            class="cdx-dialog__header__subtitle"
          >
            Subtitle
          </p>
        </div>
        <!--v-if-->
        
      </header>
      <div
        class="cdx-dialog-focus-trap"
        tabindex="-1"
      />
      <div
        class="cdx-dialog__body"
      >
        <!-- @slot Dialog content -->
        
        <p>
          foo
        </p>
        
      </div>
      <footer
        class="cdx-dialog__footer cdx-dialog__footer--default"
      >
        <!-- @slot Customizable Dialog footer -->
        
        <!--v-if-->
        <div
          class="cdx-dialog__footer__actions"
        >
          <button
            class="cdx-button cdx-button--action-progressive cdx-button--weight-primary cdx-button--size-medium cdx-button--framed cdx-dialog__footer__primary-action"
          >
            <!-- @slot Button content -->
            
            save
            
          </button>
          <button
            class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-dialog__footer__default-action"
          >
            <!-- @slot Button content -->
            
            cancel
            
          </button>
        </div>
        
      </footer>
    </div>
    <!-- Focus trap end -->
    <div
      tabindex="0"
    />
  </div>
</teleport-stub>
`;

exports[`matches the snapshot Case 8 With footer text 1`] = `
<teleport-stub>
  <div
    class="cdx-dialog-backdrop cdx-dialog-fade-enter-from cdx-dialog-fade-enter-active"
  >
    <!-- Focus trap start -->
    <div
      tabindex="0"
    />
    <div
      aria-labelledby="cdx-dialog-label-8"
      aria-modal="true"
      class="cdx-dialog cdx-dialog--horizontal-actions"
      role="dialog"
    >
      <header
        class="cdx-dialog__header cdx-dialog__header--default"
      >
        <!-- @slot Customizable Dialog header -->
        
        <div
          class="cdx-dialog__header__title-group"
        >
          <h2
            class="cdx-dialog__header__title"
            id="cdx-dialog-label-8"
          >
            Dialog
          </h2>
          <p
            class="cdx-dialog__header__subtitle"
          >
            Subtitle
          </p>
        </div>
        <!--v-if-->
        
      </header>
      <div
        class="cdx-dialog-focus-trap"
        tabindex="-1"
      />
      <div
        class="cdx-dialog__body"
      >
        <!-- @slot Dialog content -->
        
        <p>
          foo
        </p>
        
      </div>
      <footer
        class="cdx-dialog__footer cdx-dialog__footer--default"
      >
        <!-- @slot Customizable Dialog footer -->
        
        <p
          class="cdx-dialog__footer__text"
        >
          <!-- @slot Optional footer text -->
          
          This is some 
          <a
            href="#"
          >
            footer text
          </a>
          .
          
        </p>
        <div
          class="cdx-dialog__footer__actions"
        >
          <button
            class="cdx-button cdx-button--action-progressive cdx-button--weight-primary cdx-button--size-medium cdx-button--framed cdx-dialog__footer__primary-action"
          >
            <!-- @slot Button content -->
            
            save
            
          </button>
          <button
            class="cdx-button cdx-button--action-default cdx-button--weight-normal cdx-button--size-medium cdx-button--framed cdx-dialog__footer__default-action"
          >
            <!-- @slot Button content -->
            
            cancel
            
          </button>
        </div>
        
      </footer>
    </div>
    <!-- Focus trap end -->
    <div
      tabindex="0"
    />
  </div>
</teleport-stub>
`;

exports[`matches the snapshot Case 9 With custom header and footer 1`] = `
<teleport-stub>
  <div
    class="cdx-dialog-backdrop cdx-dialog-fade-enter-from cdx-dialog-fade-enter-active"
  >
    <!-- Focus trap start -->
    <div
      tabindex="0"
    />
    <div
      aria-label="Dialog"
      aria-modal="true"
      class="cdx-dialog cdx-dialog--horizontal-actions"
      role="dialog"
    >
      <header
        class="cdx-dialog__header"
      >
        <!-- @slot Customizable Dialog header -->
        
        <h1>
          Dialog header custom
        </h1>
        
      </header>
      <div
        class="cdx-dialog-focus-trap"
        tabindex="-1"
      />
      <div
        class="cdx-dialog__body"
      >
        <!-- @slot Dialog content -->
        
        <p>
          foo
        </p>
        
      </div>
      <footer
        class="cdx-dialog__footer"
      >
        <!-- @slot Customizable Dialog footer -->
        
        <p>
          Dialog footer custom
        </p>
        
      </footer>
    </div>
    <!-- Focus trap end -->
    <div
      tabindex="0"
    />
  </div>
</teleport-stub>
`;
