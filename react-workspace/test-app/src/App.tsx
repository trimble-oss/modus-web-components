import { ModusButton } from '@trimble-oss/modus-react-components';
import '@trimble-oss/modus-web-components/dist/modus-web-components/modus-web-components.css';
import Accordion from './common/components/Accordion';
import ThemeToggle from './common/ThemeToggle';
import './App.css';

function App() {
  function toggleTheme() {
    const theme = document.body.getAttribute('data-mwc-theme');
    document.body.setAttribute(
      'data-mwc-theme',
      !theme || theme === 'light' ? 'dark' : 'light'
    );
  }

  function resetTheme() {
    document.body.removeAttribute('data-mwc-theme');
  }

  return (
    <div style={{ padding: '10px' }}>
      <ModusButton
        color="primary"
        style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '10px' }}
        id="toggle"
        onClick={() => toggleTheme()}>
        Toggle theme
      </ModusButton>
      <ModusButton
        color="primary"
        style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '10px' }}
        id="reset"
        onClick={() => resetTheme()}>
        Reset theme
      </ModusButton>

      <ThemeToggle title="Toggle Accordion theme">
        <Accordion></Accordion>
      </ThemeToggle>
      {/* <div>
        <ModusButton
          color="primary"
          style="padding: 10px"
          id="toggle_accordion-item">
          Toggle Accordion theme
        </ModusButton>
      </div>
      <div>
        <ModusAccordion>
          <ModusAccordionItem header-text="Collapsible Group Item #1">
            This is the first item's accordion body. It is shown by default,
            until the collapse plugin adds the appropriate classes that we use
            to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can
            modify any of this with custom CSS or overriding our default
            variables.
          </ModusAccordionItem>
          <ModusAccordionItem header-text="Collapsible Group Item #2">
            Content
          </ModusAccordionItem>
          <ModusAccordionItem disabled header-text="Collapsible Group Item #3">
            Content
          </ModusAccordionItem>
        </ModusAccordion>
      </div>

      <div>
        <ModusButton color="primary" style="padding: 10px" id="toggle_alert">
          Toggle Alerts theme
        </ModusButton>
      </div>
      <div>
        <ModusAlert message="Info alert (default)"></ModusAlert>
        <ModusAlert dismissible message="Dismissible alert"></ModusAlert>
        <ModusAlert message="Error alert" type="error"></ModusAlert>
        <ModusAlert message="Info gray alert" type="info-gray"></ModusAlert>
        <ModusAlert
          message="Info gray dark alert"
          type="info-gray-dark"></ModusAlert>
        <ModusAlert message="Success alert" type="success"></ModusAlert>
        <ModusAlert message="Warning alert" type="warning"></ModusAlert>
      </div>
      <div>
        <ModusButton color="primary" id="toggle_badge" style="padding: 10px">
          Toggle Badges theme
        </ModusButton>
      </div>
      <div>
        <ModusBadge>Default</ModusBadge>
        <ModusBadge color="secondary">Secondary</ModusBadge>
        <ModusBadge color="tertiary">Tertiary</ModusBadge>
        <ModusBadge color="dark">Dark</ModusBadge>
        <ModusBadge color="success">Success</ModusBadge>
        <ModusBadge color="warning">Warning</ModusBadge>
        <ModusBadge color="danger">Danger</ModusBadge>

        <ModusBadge type="text">Text</ModusBadge>
        <ModusBadge color="secondary" type="text">
          Text
        </ModusBadge>
        <ModusBadge color="tertiary" type="text">
          Text
        </ModusBadge>
        <ModusBadge color="dark" type="text">
          Text
        </ModusBadge>
        <ModusBadge color="success" type="text">
          Success
        </ModusBadge>
        <ModusBadge color="warning" type="text">
          Text
        </ModusBadge>
        <ModusBadge color="danger" type="text">
          Text
        </ModusBadge>
      </div>

      <div>
        <ModusButton
          color="primary"
          id="toggle_breadcrumb"
          style="padding: 10px">
          Toggle Buttons theme
        </ModusButton>
      </div>
      <div>
        <ModusBreadcrumb></ModusBreadcrumb>
      </div>

      <div>
        <ModusButton color="primary" id="toggle_button" style="padding: 10px">
          Toggle Buttons theme
        </ModusButton>
      </div>
      <div>
        <ModusButton color="primary">Primary</ModusButton>
        <ModusButton color="secondary">Secondary</ModusButton>
        <ModusButton color="tertiary">Tertiary</ModusButton>

        <ModusButton color="danger">Danger</ModusButton>
        <ModusButton disabled color="danger">
          Disabled
        </ModusButton>

        <ModusButton size="small" color="primary">
          Small
        </ModusButton>
        <ModusButton size="large" color="primary">
          Large
        </ModusButton>

        <ModusButton button-style="borderless">Borderless</ModusButton>

        <ModusButton button-style="outline" color="primary">
          Outline
        </ModusButton>
        <ModusButton button-style="outline" color="secondary">
          Outline
        </ModusButton>
      </div>

      <div>
        <ModusButton color="primary" id="toggle_checkbox" style="padding: 10px">
          Toggle Checkbox theme
        </ModusButton>
      </div>
      <div>
        <ModusCheckbox></ModusCheckbox>
        <ModusCheckbox disabled></ModusCheckbox>
        <ModusCheckbox label="Checkbox"></ModusCheckbox>
        <ModusCheckbox disabled label="Checkbox"></ModusCheckbox>
        <ModusCheckbox checked disabled label="Checkbox"></ModusCheckbox>
        <ModusCheckbox indeterminate></ModusCheckbox>
      </div>

      <div>
        <ModusButton color="primary" id="toggle_card" style="padding: 10px">
          Toggle Card theme
        </ModusButton>
      </div>
      <div>
        <ModusCard>
          <div style="padding: 10px">
            <h4 id="card-title">Card title</h4>
            <h5 id="card-subtitle">Card subtitle</h5>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <ModusButton color="primary">Go somewhere</ModusButton>
          </div>
        </ModusCard>
      </div>
      <div>
        <ModusButton color="primary" id="toggle_chip" style="padding: 10px">
          Toggle Chip theme
        </ModusButton>
      </div>
      <div>
        <ModusChip
          image-url="https://modus.trimble.com/icon.png"
          show-close
          value="Bryan"></ModusChip>
        <ModusChip
          has-error
          image-url="https://modus.trimble.com/icon.png"
          show-close
          value="Bryan"></ModusChip>
        <ModusChip
          disabled
          image-url="https://modus.trimble.com/icon.png"
          show-close
          value="Bryan"></ModusChip>

        <ModusChip
          image-url="https://modus.trimble.com/icon.png"
          show-close
          chip-style="outline"
          value="Bryan"></ModusChip>
        <ModusChip
          has-error
          image-url="https://modus.trimble.com/icon.png"
          show-close
          chip-style="outline"
          value="Bryan"></ModusChip>
        <ModusChip
          disabled
          image-url="https://modus.trimble.com/icon.png"
          show-close
          chip-style="outline"
          value="Bryan"></ModusChip>

        <ModusChip show-checkmark size="small" value="Pets OK"></ModusChip>
      </div>

      <div>
        <ModusButton
          color="primary"
          id="toggle_tree-view--tree-view-item"
          style="padding: 10px">
          Toggle Content tree theme
        </ModusButton>
      </div>
      <div>
        <ModusTreeView
          style="width: 400px"
          checkbox-selection="true"
          class="hydrated">
          <ModusTreeViewItem node-id="1" label="Inbox" class="hydrated">
            <svg
              slot="itemIcon"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="16"
              width="16"
              viewBox="0 0 32 32">
              <path d="M28.79 12.39A1 1 0 0 0 28 12h-2V9c0-.55-.45-1-1-1h-9.59l-1.7-1.71C13.52 6.11 13.27 6 13 6H4c-.55 0-1 .45-1 1v17c0 .04.02.07.02.11.01.05.02.11.04.16.02.09.06.17.1.25.02.03.02.06.05.09.01.01.03.02.04.03.07.08.15.14.23.19.04.03.06.05.1.07.13.06.27.1.42.1h21c.13 0 .25-.03.36-.07.04-.02.07-.04.1-.06.07-.04.14-.08.2-.13.03-.03.06-.06.09-.1.05-.05.09-.11.12-.18a.31.31 0 0 0 .06-.13c.01-.02.03-.04.03-.07l3-11c.09-.3.02-.62-.17-.87zM5 8h7.59l1.7 1.71c.19.18.44.29.71.29h9v2H7c-.45 0-.85.3-.96.74L5 16.53V8z"></path>
            </svg>
            <ModusTreeViewItem
              disabled
              node-id="2"
              label="Personal"
              class="hydrated"
              draggable-item
              droppable-item></ModusTreeViewItem>
            <ModusTreeViewItem
              node-id="3"
              label="Work"
              class="hydrated"
              draggable-item
              droppable-item></ModusTreeViewItem>
            <ModusTreeViewItem
              node-id="4"
              label="Social"
              class="hydrated"
              draggable-item
              droppable-item></ModusTreeViewItem>
            <ModusTreeViewItem
              node-id="5"
              label="More ..."
              class="hydrated"
              draggable-item
              droppable-item></ModusTreeViewItem>
          </ModusTreeViewItem>
        </ModusTreeView>
      </div>
      <div>
        <ModusButton color="primary" id="toggle_dropdown" style="padding: 10px">
          Toggle Dropdown
        </ModusButton>
      </div>
      <div style="display: flex; flex-wrap: wrap; margin-top: 1rem">
        <ModusDropdown toggle-element-id="toggleElement1">
          <ModusButton id="toggleElement1" slot="dropdownToggle">
            Dropdown
          </ModusButton>
          <ModusList slot="dropdownList">
            <ModusListItem size="condensed">Item 1</ModusListItem>
            <ModusListItem size="condensed">Item 3</ModusListItem>
          </ModusList>
        </ModusDropdown>
        <ModusDropdown toggle-element-id="toggleElement2">
          <ModusButton
            color="secondary"
            id="toggleElement2"
            slot="dropdownToggle">
            Dropdown
          </ModusButton>
          <ModusList slot="dropdownList">
            <ModusListItem size="condensed">Item 2</ModusListItem>
            <ModusListItem size="condensed">Item 3</ModusListItem>
          </ModusList>
        </ModusDropdown>
        <ModusDropdown toggle-element-id="toggleElement3">
          <ModusButton
            color="tertiary"
            id="toggleElement3"
            slot="dropdownToggle">
            Dropdown
          </ModusButton>
          <ModusList slot="dropdownList">
            <ModusListItem size="condensed">Item 1</ModusListItem>
            <ModusListItem size="condensed">Item 2</ModusListItem>
          </ModusList>
        </ModusDropdown>
        <ModusDropdown toggle-element-id="toggleElement4">
          <ModusButton
            button-style="borderless"
            id="toggleElement4"
            slot="dropdownToggle">
            Dropdown
          </ModusButton>
          <ModusList slot="dropdownList">
            <ModusListItem size="condensed">Item 3</ModusListItem>
          </ModusList>
        </ModusDropdown>
        <ModusDropdown toggle-element-id="toggleElement5">
          <ModusButton
            button-style="outline"
            color="primary"
            id="toggleElement5"
            slot="dropdownToggle">
            Dropdown
          </ModusButton>
          <ModusList slot="dropdownList">
            <ModusListItem size="condensed">Item 1</ModusListItem>
          </ModusList>
        </ModusDropdown>
        <ModusDropdown toggle-element-id="toggleElement6">
          <ModusButton
            button-style="outline"
            color="secondary"
            id="toggleElement6"
            slot="dropdownToggle">
            Dropdown
          </ModusButton>
          <ModusList slot="dropdownList">
            <ModusListItem size="condensed">Item 1</ModusListItem>
            <ModusListItem size="condensed">Item 2</ModusListItem>
            <ModusListItem size="condensed">Item 3</ModusListItem>
          </ModusList>
        </ModusDropdown>
      </div>
      <div>
        <ModusButton
          color="primary"
          id="toggle_list-item"
          style="padding: 10px">
          Toggle List items
        </ModusButton>
      </div>
      <div>
        <ModusList>
          <ModusListItem size="condensed">Condensed</ModusListItem>
          <ModusListItem selected size="condensed">
            Condensed & Selected
          </ModusListItem>
          <ModusListItem>Default</ModusListItem>
          <ModusListItem selected>Selected</ModusListItem>
          <ModusListItem disabled>Disabled</ModusListItem>
          <ModusListItem size="large">Large</ModusListItem>
          <ModusListItem selected size="large">
            Large & Selected
          </ModusListItem>
        </ModusList>

        <ModusList>
          <ModusListItem>Condensed</ModusListItem>
          <ModusListItem>Condensed & Selected</ModusListItem>
          <ModusListItem>Default</ModusListItem>
          <ModusListItem>Selected</ModusListItem>
          <ModusListItem>Disabled</ModusListItem>
          <ModusListItem>Large</ModusListItem>
          <ModusListItem>Large & Selected</ModusListItem>
        </ModusList>
      </div>
      <div>
        <ModusButton
          color="primary"
          id="toggle_file-dropzone"
          style="padding: 10px">
          Toggle File upload dropzone
        </ModusButton>
      </div>
      <div>
        <ModusFileDropzone
          aria-Label="dropzone"
          description="File dropzone description"
          dropzone-Height="175px"
          dropzone-Width="400px"
          label="Dropzone Label"
          multiple="false">
          {' '}
        </ModusFileDropzone>
      </div>
      <div>
        <ModusButton color="primary" id="toggle_message" style="padding: 10px">
          Toggle Messages theme
        </ModusButton>
      </div>
      <div>
        <ModusMessage type="info">Info message.</ModusMessage>
        <ModusMessage type="question">Question message?</ModusMessage>
      </div>

      <div>
        <ModusButton color="primary" id="toggle_modal" style="padding: 10px">
          Toggle Modal
        </ModusButton>
      </div>
      <div>
        <ModusButton id="btn-modal" color="primary">
          Open modal
        </ModusButton>
        <ModusModal
          header-text="Modal title"
          primary-button-text="Sweet!"
          secondary-button-text="Save changes">
          <p>Woo-hoo, you're reading this text in a modal!</p>
        </ModusModal>
      </div>

      <div>
        <ModusButton color="primary" id="toggle_navbar" style="padding: 10px">
          Toggle Navbar
        </ModusButton>
      </div>
      <div>
        <ModusNavbar show-apps-menu show-help show-main-menu show-notifications>
          <div slot="main">Render your own main menu.</div>
          <div slot="notifications">Render your own notifications.</div>
        </ModusNavbar>
      </div>
      <div>
        <ModusButton
          color="primary"
          id="toggle_pagination"
          style="padding: 10px">
          Toggle Pagination
        </ModusButton>
      </div>
      <div>
        <ModusPagination
          active-page="8"
          max-page="32"
          min-page="1"
          size="medium"></ModusPagination>
      </div>

      <div>
        <ModusButton
          color="primary"
          id="toggle_progress-bar"
          style="padding: 10px">
          Toggle Progress Bar
        </ModusButton>
      </div>
      <div>
        <div>
          <ModusProgressBar
            value="3"
            max-value="4"
            min-value="0"
            text="75%"></ModusProgressBar>
        </div>
        <div>
          <ModusProgressBar
            value="3"
            max-value="4"
            min-value="0"
            size="compact"></ModusProgressBar>
        </div>
      </div>
      <div>
        <ModusButton
          color="primary"
          id="toggle_radio-group"
          style="padding: 10px">
          Toggle Radio group{' '}
        </ModusButton>
      </div>
      <div>
        <ModusRadioGroup checked-id="1" name="my-group"></ModusRadioGroup>
      </div>
      <div>
        <ModusButton
          color="primary"
          id="toggle_number-input"
          style="padding: 10px">
          Toggle Number Input{' '}
        </ModusButton>
      </div>
      <div>
        <ModusNumberInput
          label="Number Input Demo 1"
          placeholder="Placeholder"
          required="true"></ModusNumberInput>
        <ModusNumberInput
          disabled="true"
          value="1235"
          label="Number Input Demo 2"
          placeholder="Placeholder"
          required="true"></ModusNumberInput>
        <ModusNumberInput
          helper-text="Helper demo"
          label="Number Input Demo 3"
          placeholder="Placeholder"></ModusNumberInput>
        <ModusNumberInput
          error-text="Error demo"
          label="Number Input Demo 4"
          placeholder="Placeholder"></ModusNumberInput>
        <ModusNumberInput
          valid-text="Valid demo"
          label="Number Input Demo 5"
          placeholder="Placeholder"></ModusNumberInput>
        <ModusNumberInput
          label="Text Input Demo 6"
          placeholder="Placeholder"
          size="large"
          value="100"></ModusNumberInput>
      </div>
      <div>
        <ModusButton
          color="primary"
          id="toggle_text-input"
          style="padding: 10px">
          Toggle Text Input{' '}
        </ModusButton>
      </div>
      <div>
        <ModusTextInput
          label="Text Input Demo 1"
          placeholder="Placeholder"
          include-search-icon
          required></ModusTextInput>
        <ModusTextInput
          label="Text Input Demo 2"
          include-search-icon
          disabled></ModusTextInput>
        <ModusTextInput
          label="Text Input Demo 3"
          placeholder="Placeholder"
          value="Value"
          helper-text="Helper Demo"
          include-search-icon
          required></ModusTextInput>
        <ModusTextInput
          label="Text Input Demo 4"
          placeholder="Placeholder"
          value="Value"
          error-text="Error Demo"
          include-search-icon></ModusTextInput>
        <ModusTextInput
          label="Text Input Demo 5"
          placeholder="Placeholder"
          value="Value"
          valid-text="Valid Demo"
          include-search-icon></ModusTextInput>
        <ModusTextInput
          label="Text Input Demo 6"
          placeholder="Placeholder"
          value="Value"
          size="large"
          include-search-icon></ModusTextInput>
        <ModusTextInput
          label="Text Input Demo Password"
          placeholder="Password"
          type="password"></ModusTextInput>
      </div>
      <div>
        <ModusButton color="primary" id="toggle_switch" style="padding: 10px">
          Toggle Switch{' '}
        </ModusButton>
      </div>
      <div>
        <ModusSwitch label="Default"></ModusSwitch>
        <ModusSwitch checked label="Checked"></ModusSwitch>
        <ModusSwitch disabled label="Disabled"></ModusSwitch>
      </div>
      <div>
        <ModusButton color="primary" id="toggle_select" style="padding: 10px">
          Toggle Select{' '}
        </ModusButton>
      </div>
      <div>
        <ModusSelect
          id="select-demo-1"
          label="Select Demo 1"
          options-display-prop="display"></ModusSelect>
        <ModusSelect
          disabled
          helper-text="Helper demo"
          id="select-demo-2"
          label="Select Demo 2"
          options-display-prop="display"></ModusSelect>
        <ModusSelect
          error-text="Error demo"
          label="Select Demo 3"></ModusSelect>
        <ModusSelect
          label="Select Demo 4"
          valid-text="Valid demo"></ModusSelect>

        <div>
          <ModusButton color="primary" id="toggle_slider" style="padding: 10px">
            Toggle Slider{' '}
          </ModusButton>
        </div>
        <div>
          <ModusSlider label="Slider"></ModusSlider>
          <br />
          <ModusSlider disabled label="Disabled slider"></ModusSlider>
        </div>
        <div>
          <ModusButton
            color="primary"
            id="toggle_spinner"
            style="padding: 10px">
            Toggle Spinner{' '}
          </ModusButton>
        </div>
        <div>
          <ModusSpinner></ModusSpinner>
          <ModusSpinner color="secondary"></ModusSpinner>
          <ModusSpinner color="dark"></ModusSpinner>
          <br />
          <br />
          <ModusButton color="primary">
            <ModusSpinner color="white" size=".5rem"></ModusSpinner>
            &nbsp;Loading...
          </ModusButton>
          <br />
          <br />
          <ModusButton color="primary" disabled>
            <ModusSpinner color="white" size=".5rem"></ModusSpinner>
            &nbsp;Loading...
          </ModusButton>
        </div>
        <div>
          <ModusButton color="primary" id="toggle_tabs" style="padding: 10px">
            Toggle Tabs{' '}
          </ModusButton>
        </div>
        <div>
          <ModusTabs></ModusTabs>
        </div>

        <div>
          <ModusButton color="primary" id="toggle_toast" style="padding: 10px">
            Toggle Toasts{' '}
          </ModusButton>
        </div>
        <div>
          <ModusToast dismissible>Default</ModusToast>
          <br />
          <ModusToast dismissible type="danger">
            Danger
          </ModusToast>
          <br />
          <ModusToast dismissible type="dark">
            Dark
          </ModusToast>
          <br />
          <ModusToast dismissible type="primary">
            Primary
          </ModusToast>
          <br />
          <ModusToast dismissible type="secondary">
            Secondary
          </ModusToast>
          <br />
          <ModusToast dismissible type="success">
            Success
          </ModusToast>
          <br />
          <ModusToast dismissible type="tertiary">
            Tertiary
          </ModusToast>
          <br />
          <ModusToast dismissible type="warning">
            Warning
          </ModusToast>
        </div>

        <div>
          <ModusButton
            color="primary"
            id="toggle_tooltip"
            style="padding: 10px">
            Toggle Tooltip{' '}
          </ModusButton>
        </div>
        <div>
          <ModusTooltip text="Tooltip text..." position="right">
            <ModusButton>Button</ModusButton>
          </ModusTooltip>
        </div>
        <div>
          <ModusButton
            color="primary"
            id="toggle_data-table"
            style="padding: 10px">
            Toggle Datatable{' '}
          </ModusButton>
        </div>
        <div>
          <div style="width: 800px">
            <ModusDataTable />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
