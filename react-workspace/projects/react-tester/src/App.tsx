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
} from '@trimble-oss/modus-react-components';

function App() {
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

      <h3>NavBar</h3>

      <ModusNavbar
        id="working"
        show-apps-menu
        show-help
        show-main-menu
        show-notifications
        apps={[
          {
            description: [
              {
                description: 'The One Trimble Design System',
                logoUrl: 'https://modus.trimble.com/favicon.svg',
                name: 'Trimble Modus',
                url: 'https://modus.trimble.com/',
              },
            ],
            logoUrl: '',
            name: '',
            url: '',
            category: '',
            showCategory: false,
          },
        ]}
        productLogoOptions={{
          height: 24,
          url: 'https://modus.trimble.com/img/trimble-logo.svg',
        }}
        profileMenuOptions={{
          avatarUrl: '...',
          email: 'modus_user@trimble.com',
          initials: 'MU',
          username: 'Modus User',
        }}>
        <div slot="main" style={{ height: '300px' }}>
          Render your own main menu.
        </div>
        <div slot="notifications">Render your own notifications.</div>
      </ModusNavbar>
    </div>
  );
}

export default App;
