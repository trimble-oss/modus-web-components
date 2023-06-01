import React from 'react';
import './App.css';
import {
  ModusAccordion,
  ModusAccordionItem,
  ModusAlert,
  ModusBadge,
  ModusBreadcrumb,
  ModusButton,
  ModusCard,
  ModusChip,
  ModusTreeViewItem,
  ModusTreeView,
  ModusDataTable,
  ModusDropdown,
  ModusList,
  ModusListItem,
  ModusFileDropzone,
  ModusMessage,
  ModusModal,
  ModusNavbar,
  ModusPagination,
  ModusProgressBar,
  ModusRadioGroup,
  ModusSwitch,
  ModusSideNavigation,
  ModusSlider,
  ModusSpinner,
  ModusTabs,
  ModusToast,
  ModusTooltip,
  ModusAutocomplete,
  ModusCheckbox,
  ModusDateInput,
  ModusDatePicker,
  ModusNumberInput,
  ModusSelect,
  ModusTextInput,
  ModusTimePicker,
} from '@trimble-oss/modus-react-components';
import { ModusSideNavigationItemInfo } from '@trimble-oss/modus-web-components';

function App() {
  const selectionHandler = (e: any) => {
    if (e.detail) {
      const panel = document.querySelector('#panelcontent');
      document.querySelector('#sidenav-content-title')?.remove();
      const el = document.createElement('h3');
      el.id = 'sidenav-content-title';
      el.innerHTML = e.target?.label || 'Home page';
      panel?.insertBefore(el, document.querySelector('#overview'));
    }
  };

  const homeIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cstyle%3E .st1 %7B stroke: %23000; stroke-miterlimit: 10; %7D %3C/style%3E%3Cpath d='M30.707 15.293 26 10.586V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.586l-4.293-4.293a1 1 0 0 0-1.414 0l-13 13A1 1 0 0 0 4 17h3v12a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-7h6v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V17h3a1 1 0 0 0 .707-1.707z' /%3E%3C/svg%3E";

  const usageIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cg%3E%3Cpath d='M30 23v6c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-5h-8v5h2c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-5H7v5h2c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-6c0-.55.45-1 1-1h9v-5h-2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-2v5h9c.55 0 1 .45 1 1v6h2c.55 0 1 .45 1 1z' /%3E%3C/g%3E%3C/svg%3E";

  const stylesIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cpath d='M30 25h-1v-9a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v9h-2V5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v20h-2V12a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13H3a1 1 0 1 0 0 2h27a1 1 0 1 0 0-2zM6 25V13h3v12H6zm9 0V6h3v19h-3zm9 0v-8h3v8h-3z' /%3E%3C/svg%3E";

  const accessibilityIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cg%3E%3Cpath d='M29 4H3c-.55 0-1 .45-1 1v17c0 .55.45 1 1 1h12v3h-4c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1h-4v-3h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 17H4v-2h24v2z' /%3E%3C/g%3E%3C/svg%3E";

  const sideNavData: ModusSideNavigationItemInfo[] = [
    {
      id: 'home-menu',
      menuIcon: homeIcon,
      label: 'Home page 1',
      children: [
        {
          id: 'home-menu-2',
          menuIcon: homeIcon,
          label: 'Home page 2',
          onSideNavItemClicked: selectionHandler,
        },
        {
          id: 'usage-menu-2',
          children: [
            {
              id: 'home-menu-3',
              menuIcon: homeIcon,
              label: 'Home page 3',
              onSideNavItemClicked: selectionHandler,
            },
          ],
          menuIcon: usageIcon,
          label: 'Usage page 2',
        },
      ],
    },
    {
      id: 'usage-menu',
      menuIcon: usageIcon,
      label: 'Usage page 1',
      onSideNavItemClicked: selectionHandler,
    },
    {
      id: 'styles-menu',
      menuIcon: stylesIcon,
      label: 'Styles page 1',
      onSideNavItemClicked: selectionHandler,
    },
    {
      id: 'accessibility-menu',
      menuIcon: accessibilityIcon,
      label: 'Accessibility page 1',
      onSideNavItemClicked: selectionHandler,
    },
  ];

  return (
    <div className="grid w-50">
      <h3>Accordion</h3>
      <ModusAccordion>
        <ModusAccordionItem headerText="Item 1">Content</ModusAccordionItem>
        <ModusAccordionItem headerText="Item 2">Content</ModusAccordionItem>
        <ModusAccordionItem disabled headerText="Item 3">
          Content
        </ModusAccordionItem>
      </ModusAccordion>
      <h3>Alert</h3>
      <div className="grid">
        <ModusAlert dismissible message="Dismissible alert"></ModusAlert>
        <ModusAlert message="Error alert" type="error"></ModusAlert>
        <ModusAlert message="Info gray alert" type="info-gray"></ModusAlert>
        <ModusAlert message="Info gray dark alert" type="info-gray-dark"></ModusAlert>
        <ModusAlert message="Success alert" type="success"></ModusAlert>
        <ModusAlert message="Warning alert" type="warning"></ModusAlert>
      </div>
      <h3>Badge</h3>
      <div className="grid">
        <div className="grid-row">
          <ModusBadge>Default</ModusBadge>
          <ModusBadge color="secondary">Secondary</ModusBadge>
          <ModusBadge color="tertiary">Tertiary</ModusBadge>
          <ModusBadge color="dark">Dark</ModusBadge>
          <ModusBadge color="warning">Warning</ModusBadge>
          <ModusBadge color="danger">Danger</ModusBadge>
        </div>

        <div className="grid-row">
          <ModusBadge size="small">Small</ModusBadge>
          <ModusBadge size="medium">Medium</ModusBadge>
          <ModusBadge size="large">Large</ModusBadge>
        </div>

        <div className="grid-row">
          <ModusBadge type="counter">Counter</ModusBadge>
          <ModusBadge color="secondary" type="counter">
            Counter
          </ModusBadge>
          <ModusBadge color="tertiary" type="counter">
            Counter
          </ModusBadge>
          <ModusBadge color="dark" type="counter">
            Counter
          </ModusBadge>
          <ModusBadge color="warning" type="counter">
            Counter
          </ModusBadge>
          <ModusBadge color="danger" type="counter">
            Counter
          </ModusBadge>
        </div>

        <div className="grid-row">
          <ModusBadge size="small" type="counter">
            Small
          </ModusBadge>
          <ModusBadge size="medium" type="counter">
            Medium
          </ModusBadge>
          <ModusBadge size="large" type="counter">
            Large
          </ModusBadge>
        </div>

        <div className="grid-row">
          <ModusBadge type="text">Primary</ModusBadge>
          <ModusBadge color="secondary" type="text">
            Secondary
          </ModusBadge>
          <ModusBadge color="dark" type="text">
            High Contrast
          </ModusBadge>
          <ModusBadge color="success" type="text">
            Success
          </ModusBadge>
          <ModusBadge color="danger" type="text">
            Danger
          </ModusBadge>
        </div>

        <div className="grid-row">
          <ModusBadge size="small" type="text">
            Small
          </ModusBadge>
          <ModusBadge size="medium" type="text">
            Medium
          </ModusBadge>
          <ModusBadge size="large" type="text">
            Large
          </ModusBadge>
        </div>
      </div>
      <h3>Breadcrumbs</h3>
      <ModusBreadcrumb
        crumbs={[
          { id: '1', display: 'Crumb 1' },
          { id: '2', display: 'Crumb 2' },
          { id: '3', display: 'Crumb 3' },
          { id: '4', display: 'Crumb 4' },
        ]}></ModusBreadcrumb>
      <h3>Buttons</h3>
      <div className="grid-row">
        <ModusButton color="primary">Primary</ModusButton>
        <ModusButton color="secondary">Secondary</ModusButton>
        <ModusButton color="tertiary">Tertiary</ModusButton>
      </div>
      <div className="grid-row">
        <ModusButton color="danger">Danger</ModusButton>
        <ModusButton disabled color="danger">
          Disabled
        </ModusButton>
      </div>
      <div className="grid-row">
        <ModusButton size="small" color="primary">
          Small
        </ModusButton>
        <ModusButton size="large" color="primary">
          Large
        </ModusButton>
      </div>
      <div className="grid-row">
        <ModusButton button-style="borderless">Borderless</ModusButton>
      </div>
      <div className="grid-row">
        <ModusButton button-style="outline" color="primary">
          Outline
        </ModusButton>
        <ModusButton button-style="outline" color="secondary">
          Outline
        </ModusButton>
      </div>
      <h3>Card</h3>
      <ModusCard>
        <div style={{ padding: '10px' }}>
          <h4 id="card-title">Card title</h4>
          <h5 id="card-subtitle">Card subtitle</h5>
          <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <ModusButton color="primary">Go somewhere</ModusButton>
        </div>
      </ModusCard>
      <h3>Chips</h3>
      <div className="grid-row">
        <ModusChip image-url="https://example.com/image.jpg" show-close value="Bryan"></ModusChip>
        <ModusChip has-error image-url="https://example.com/image.jpg" show-close value="Bryan"></ModusChip>
        <ModusChip disabled image-url="https://example.com/image.jpg" show-close value="Bryan"></ModusChip>
      </div>
      <div className="grid-row">
        <ModusChip image-url="https://example.com/image.jpg" show-close chip-style="outline" value="Bryan"></ModusChip>
        <ModusChip
          has-error
          image-url="https://example.com/image.jpg"
          show-close
          chip-style="outline"
          value="Bryan"></ModusChip>
        <ModusChip
          disabled
          image-url="https://example.com/image.jpg"
          show-close
          chip-style="outline"
          value="Bryan"></ModusChip>
      </div>
      <div className="grid-row">
        <ModusChip show-checkmark size="small" value="Pets OK"></ModusChip>
      </div>
      <h3>Content Tree</h3>
      <ModusTreeView
        style={{ width: '400px' }}
        checkbox-selection="true"
        checked-items="false"
        expanded-items="false"
        multi-checkbox-selection="true"
        multi-selection="true"
        selected-items="false">
        <ModusTreeViewItem nodeId="1" label="Inbox">
          <ModusTreeViewItem nodeId="2" label="Personal"></ModusTreeViewItem>
          <ModusTreeViewItem nodeId="3" label="Work"></ModusTreeViewItem>
          <ModusTreeViewItem nodeId="4" label="Social"></ModusTreeViewItem>
          <ModusTreeViewItem nodeId="5" label="More ..."></ModusTreeViewItem>
        </ModusTreeViewItem>
        <ModusTreeViewItem nodeId="6" label="Archived">
          <ModusTreeViewItem nodeId="7" label="Folder1">
            <ModusTreeViewItem nodeId="8" label="File1"></ModusTreeViewItem>
            <ModusTreeViewItem nodeId="9" label="Folder2">
              <ModusTreeViewItem nodeId="10" label="File2"></ModusTreeViewItem>
            </ModusTreeViewItem>
            <ModusTreeViewItem nodeId="11" label="File3"></ModusTreeViewItem>
          </ModusTreeViewItem>
        </ModusTreeViewItem>
        <ModusTreeViewItem nodeId="12" label="Spam"></ModusTreeViewItem>
      </ModusTreeView>
      <h3>Data Table</h3>
      <ModusDataTable
        columns={['Name', 'Age', 'Contacted']}
        data={[
          ['John', 25, false],
          ['Jane', 26, false],
          ['Joe', 27, true],
        ]}
      />
      <h3>Dropdown</h3>
      <ModusDropdown toggle-element-id="toggleElement">
        <ModusButton id="toggleElement" slot="dropdownToggle">
          Dropdown
        </ModusButton>
        <ModusList slot="dropdownList">
          <ModusListItem size="condensed">Item 1</ModusListItem>
          <ModusListItem size="condensed">Item 2</ModusListItem>
          <ModusListItem size="condensed">Item 3</ModusListItem>
        </ModusList>
      </ModusDropdown>
      <h3>File upload dropzone</h3>
      <ModusFileDropzone
        aria-Label="dropzone"
        description="File dropzone description"
        dropzone-Height="175px"
        dropzone-Width="400px"
        label="Dropzone Label"
        multiple={true}
        onFiles={(event) => {
          const [files, error] = event.detail;
          alert(`Files Uplaod: ${files.map((f) => f.name).toString()}`);
        }}></ModusFileDropzone>
      <h3>List</h3>
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
      <h3>Message</h3>
      <ModusMessage type="info">Info message.</ModusMessage>
      <ModusMessage type="question">Question message?</ModusMessage>
      <h3>Modal</h3>
      <ModusButton
        id="btn-modal"
        color="primary"
        onButtonClick={(e) => {
          const modal = document.querySelector('#modal1');
          if (modal) {
            (modal as HTMLModusModalElement).open();
          }
        }}>
        Open modal
      </ModusButton>
      <ModusModal
        id="modal1"
        header-text="Modal title"
        primary-button-text="Save changes"
        secondary-button-text="Sweet!"
        primary-button-aria-label="Save changes"
        secondary-button-aria-label="Sweet">
        <p>Woo-hoo, you're reading this text in a modal!</p>
      </ModusModal>
      <h3>Pagination</h3>
      <div className="grid">
        <ModusPagination active-page="8" max-page="32" min-page="1" size="medium"></ModusPagination>
        <ModusPagination active-page="8" max-page="32" min-page="1" size="large"></ModusPagination>
        <ModusPagination active-page="8" max-page="32" min-page="1" size="small"></ModusPagination>
      </div>
      <h3>Navbar</h3>
      <ModusNavbar
        onMainMenuClick={(e) => {
          const panel = document.querySelector('modus-side-navigation');
          if (panel) panel.expanded = !panel.expanded;
        }}
        id="navbar"
        show-apps-menu
        show-help
        show-main-menu
        show-notifications
        apps={[
          {
            description: 'The One Trimble Design System',
            logoUrl: 'https://modus.trimble.com/favicon.svg',
            name: 'Trimble Modus',
            url: 'https://modus.trimble.com/',
            category: '',
            showCategory: false,
          },
        ]}
        productLogoOptions={{ url: 'https://modus.trimble.com/img/trimble-logo.svg' }}
        profileMenuOptions={{
          email: 'modus_user@trimble.com',
          initials: 'MU',
          username: 'Modus User',
        }}>
        <div slot="main" style={{ height: '300px' }}>
          Render your own main menu.
        </div>
        <div slot="notifications">Render your own notifications.</div>
      </ModusNavbar>
      <h3>Progress Bar</h3>
      <div className="grid">
        <ModusProgressBar value={3} maxValue={4} min-value="0" text="75%"></ModusProgressBar>
        <ModusProgressBar value={3} maxValue={4} min-value="0" size="compact"></ModusProgressBar>
      </div>
      <h3>Radio group</h3>
      <ModusRadioGroup
        checked-id="1"
        name="my-group"
        radioButtons={[
          {
            id: '0',
            label: 'Radio 1',
          },
          {
            id: '1',
            checked: true,
            label: 'Radio 2',
          },
          {
            id: '2',
            label: 'Radio 3',
          },
        ]}></ModusRadioGroup>
      <h3>Side navigation</h3>
      <div id="dataTemplate">
        <ModusSwitch
          id="switch-mode"
          onSwitchClick={(e) => {
            const sidenav = document.querySelector('modus-side-navigation');
            if (sidenav) sidenav.mode = sidenav.mode === 'push' ? 'overlay' : 'push';
          }}
          label="Enable Push Side Navigation"></ModusSwitch>
        <div style={{ width: '100%', alignItems: 'center', height: '56px', boxShadow: '0 0 2px', marginTop: '10px' }}>
          <ModusNavbar
            onMainMenuClick={(e) => {
              const panel = document.querySelector('modus-side-navigation');
              if (panel) panel.expanded = !panel.expanded;
            }}
            id="navbar"
            show-apps-menu
            show-help
            show-main-menu
            show-notifications
            apps={[
              {
                description: 'The One Trimble Design System',
                logoUrl: 'https://modus.trimble.com/favicon.svg',
                name: 'Trimble Modus',
                url: 'https://modus.trimble.com/',
                category: '',
                showCategory: false,
              },
            ]}
            productLogoOptions={{ url: 'https://modus.trimble.com/img/trimble-logo.svg' }}
            profileMenuOptions={{
              email: 'modus_user@trimble.com',
              initials: 'MU',
              username: 'Modus User',
            }}></ModusNavbar>
        </div>

        <div
          id="container"
          style={{ display: 'flex', minHeight: '500px', overflowY: 'auto', position: 'relative', boxShadow: '0 0 2px' }}>
          <ModusSideNavigation
            max-width="300px"
            id="sideNav"
            target-content="#dataTemplate #panelcontent"
            mode="overlay"
            data={sideNavData}></ModusSideNavigation>

          <div id="panelcontent" style={{ padding: '10px', transition: 'all 0.25s linear 0s' }}>
            <div id="overview">
              <p>
                The side navigation of an application provides context through accessible menu options and positions a
                consistent component to connect to various pages in the application.
              </p>
              <p>
                The side navigation is a collapsible side content of the site’s pages. It is located alongside the page’s
                primary content. The component is designed to add side content to a fullscreen application. It is activated
                through the “hamburger” menu in the Navbar.
              </p>
            </div>
          </div>
        </div>
      </div>
      <h3>Slider</h3>
      <div className="grid">
        <ModusSlider label="Slider"></ModusSlider> <ModusSlider disabled label="Disabled slider"></ModusSlider>
        <h3>Spinner</h3>
        <ModusSpinner></ModusSpinner>
        <ModusSpinner color="secondary"></ModusSpinner>
        <ModusButton color="primary" disabled>
          <ModusSpinner color="white" size=".5rem"></ModusSpinner>
          &nbsp;Loading...
        </ModusButton>
      </div>

      <h3>Tabs</h3>
      <ModusTabs
        tabs={[
          {
            id: '0',
            label: 'Tab 1',
          },
          {
            active: true,
            id: '1',
            label: 'Tab 2',
          },
        ]}></ModusTabs>

      <h3>Toasts</h3>
      <div className="grid">
        <ModusToast type="default">Default</ModusToast>
        <ModusToast type="danger">Danger</ModusToast>
        <ModusToast type="dark">Dark</ModusToast>
        <ModusToast type="primary">Primary</ModusToast>
        <ModusToast type="secondary">Secondary</ModusToast>
        <ModusToast type="success">Success</ModusToast>
        <ModusToast type="warning">Warning</ModusToast>
      </div>

      <h3>Tooltips</h3>
      <ModusTooltip text="Tooltip text..." position="right">
        <ModusButton>Button</ModusButton>
      </ModusTooltip>

      <h3>AutoComplete</h3>
      <div className="grid">
        <div style={{ width: '500px' }}>
          <ModusAutocomplete
            id="default"
            options={['Apple', 'Banana', 'Orange']}
            label="Default Autocomplete"
            placeholder="Search..."></ModusAutocomplete>

          <ModusAutocomplete
            id="with-option"
            options={[
              { id: '0', value: 'Apple' },
              { id: '1', value: 'Banana' },
              { id: '2', value: 'Orange' },
            ]}
            label="Autocomplete using option model"
            placeholder="Search..."></ModusAutocomplete>

          <ModusAutocomplete label="Employee Search" clearable placeholder="Search...">
            <li data-search-value="The Git Guru" data-id="1" style={{ padding: '8px' }}>
              <div style={{ fontWeight: 'bold' }}>The Git Guru</div>
              <div style={{ fontSize: '12px' }}>Lead DevOps Engineer</div>
            </li>
            <li data-search-value="Bob the Builder" data-id="2" style={{ padding: '8px' }}>
              <div style={{ fontWeight: 'bold' }}>Bob the Builder</div>
              <div style={{ fontSize: '12px' }}>Senior Construction Engineer</div>
            </li>
          </ModusAutocomplete>
        </div>
      </div>

      <h3>Checkbox</h3>
      <div className="grid">
        <ModusCheckbox></ModusCheckbox>
        <ModusCheckbox disabled></ModusCheckbox>
        <ModusCheckbox label="Checkbox"></ModusCheckbox>
        <ModusCheckbox disabled label="Checkbox"></ModusCheckbox>
        <ModusCheckbox checked disabled label="Checkbox"></ModusCheckbox>

        <ModusCheckbox indeterminate></ModusCheckbox>
      </div>

      <h3>Date picker</h3>
      <div className="grid">
        <ModusDateInput
          helper-text="mm/dd/yyyy"
          label="Single date"
          allowed-chars-regex="[\d\/]"
          format="mm/dd/yyyy"
          value="2022-12-22"></ModusDateInput>

        <ModusDatePicker label="Select date range">
          <ModusDateInput
            type="start"
            label="Start"
            format="dd-mm-yyyy"
            helper-text="dd-mm-yyyy"
            allowed-chars-regex="[\d-]"
            show-calendar-icon="true"
            value="2022-12-22"></ModusDateInput>

          <ModusDateInput
            type="end"
            label="End"
            format="dd-mm-yyyy"
            helper-text="dd-mm-yyyy"
            allowed-chars-regex="[\d-]"
            show-calendar-icon="true"
            value="2022-12-22"></ModusDateInput>
        </ModusDatePicker>
      </div>

      <h3>Number Input</h3>
      <div className="grid">
        <ModusNumberInput label="Number Input Demo 1" placeholder="Placeholder" required={true}></ModusNumberInput>
        <ModusNumberInput
          disabled={true}
          label="Number Input Demo 2"
          placeholder="Placeholder"
          required={true}></ModusNumberInput>
        <ModusNumberInput helper-text="Helper demo" label="Number Input Demo 3" placeholder="Placeholder"></ModusNumberInput>
        <ModusNumberInput error-text="Error demo" label="Number Input Demo 4" placeholder="Placeholder"></ModusNumberInput>
        <ModusNumberInput valid-text="Valid demo" label="Number Input Demo 5" placeholder="Placeholder"></ModusNumberInput>
        <ModusNumberInput label="Text Input Demo 6" placeholder="Placeholder" size="large" value="100"></ModusNumberInput>
      </div>

      <h3>Select Input</h3>
      <div className="grid">
        <ModusSelect
          id="select-demo-1"
          label="Select Demo 1"
          value={{ display: 'Option 1' }}
          options-display-prop="display"
          options={[{ display: 'Option 1' }, { display: 'Option 2' }, { display: 'Option 3' }]}></ModusSelect>

        <ModusSelect
          disabled
          helper-text="Helper demo"
          id="select-demo-2"
          label="Select Demo 2"
          options-display-prop="display"></ModusSelect>

        <ModusSelect error-text="Error demo" label="Select Demo 3"></ModusSelect>

        <ModusSelect label="Select Demo 4" value="Option 1" valid-text="Valid demo"></ModusSelect>
      </div>

      <h3>Switch</h3>
      <div className="grid">
        <ModusSwitch label="Default"></ModusSwitch>
        <ModusSwitch checked label="Checked"></ModusSwitch>
        <ModusSwitch disabled label="Disabled"></ModusSwitch>
      </div>

      <h3>Text Input</h3>
      <div className="grid">
        <ModusTextInput label="Text Input Demo 1" placeholder="Placeholder" include-search-icon required></ModusTextInput>
        <ModusTextInput label="Text Input Demo 2" include-search-icon disabled></ModusTextInput>
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
        <ModusTextInput label="Text Input Demo 7" placeholder="Placeholder" value="Value" clearable={true}></ModusTextInput>
        <ModusTextInput label="Text Input Demo Password" placeholder="Password" type="password"></ModusTextInput>
      </div>

      <h3>Time Picker Input</h3>
      <div className="grid">
        <ModusTimePicker
          ampm={true}
          auto-format="true"
          helper-text="hh:mm AM/PM"
          label="Time"
          max-length="10"
          placeholder="12:00 AM">
          <div style={{ width: '300px', paddingLeft: '0.5rem' }} slot="timeZone">
            <ModusSelect
              id="timezone"
              label="Time Zone"
              aria-label="Time Zone"
              options={[
                { display: 'Alpha Time Zone' },
                { display: 'Australian Central Daylight Time' },
                { display: 'Atlantic Daylight Time' },
              ]}
              options-display-prop="display"></ModusSelect>
          </div>
        </ModusTimePicker>
      </div>
    </div>
  );
}

export default App;
