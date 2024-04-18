// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-content-tree-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Content Tree',
  argTypes: {
    checkboxSelection: {
      name: 'checkbox-selection',
      description: 'Enables checkbox selection on each tree item.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disableTabbing: {
      name: 'disable-tabbing',
      description:
        'Disables tabbing inside a tree view. Use `Arrow Up/Down` for focusing a tree item and `Shift + Arrow Right` for focusing a checkbox inside the item.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    multiCheckboxSelection: {
      name: 'multi-checkbox-selection',
      description: 'Enables multiple checkbox selection.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    multiSelection: {
      name: 'multi-selection',
      description: 'Enables multiple tree items selection.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: {
        options: ['condensed', 'standard', 'large'],
        type: 'select',
      },
      name: 'size',
      description: 'The default size of all tree items.',
      table: {
        defaultValue: { summary: `'standard'` },
        type: { summary: `'condensed' | 'standard' | 'large' ` },
      },
    },
    borderless: {
      description:
        'Whether the content tree and items have a border or not. Default is `false`.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    isLastChild:{
      description: 'To be set true when the tree item is an expandable last child',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    docs: {
      page: docs,
    },
    actions: {
      handles: ['itemActionClick modus-tree-view', 'actionClick modus-tree-view-item', 'itemClick modus-tree-view-item'],
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    options: {
      isToolshown: true,
      enableShortcuts: false,
    },
  },
};

const Template = ({
  borderless,
  checkboxSelection,
  multiCheckboxSelection,
  multiSelection,
  disableTabbing,
  size,
}) => html`
  <modus-tree-view
    style="width:400px;"
    borderless=${borderless ? 'true' : 'false'}
    checkbox-selection=${checkboxSelection ? 'true' : 'false'}
    disable-tabbing=${disableTabbing ? 'true' : 'false'}
    multi-checkbox-selection=${multiCheckboxSelection ? 'true' : 'false'}
    multi-selection=${multiSelection ? 'true' : 'false'}
    size=${size}>
    <modus-tree-view-item node-Id="1" label="Inbox">
      <modus-tree-view-item node-Id="2" label="Personal"></modus-tree-view-item>
      <modus-tree-view-item node-Id="3" label="Work"></modus-tree-view-item>
      <modus-tree-view-item node-Id="4" label="Social"></modus-tree-view-item>
      <modus-tree-view-item node-Id="5" label="More ..."></modus-tree-view-item>
    </modus-tree-view-item>
    <modus-tree-view-item node-Id="6" label="Archived">
      <modus-tree-view-item node-Id="7" label="Folder1">
        <modus-tree-view-item node-Id="8" label="File1"></modus-tree-view-item>
        <modus-tree-view-item node-Id="9" label="Folder2">
          <modus-tree-view-item
            node-Id="10"
            label="File2"></modus-tree-view-item>
        </modus-tree-view-item>
        <modus-tree-view-item node-Id="11" label="File3"></modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view-item>
    <modus-tree-view-item node-Id="12" label="Spam"></modus-tree-view-item>
  </modus-tree-view>
`;

const SlotIconTemplate = ({
  borderless,
  checkboxSelection,
  multiCheckboxSelection,
  multiSelection,
  disableTabbing,
  size,
  isLastChild,
}) => html`
  <modus-tree-view style="width:400px;"
  borderless=${borderless ? 'true' : 'false'}
  checkbox-selection=${checkboxSelection ? 'true' : 'false'}
  disable-tabbing=${disableTabbing ? 'true' : 'false'}
  multi-checkbox-selection=${multiCheckboxSelection ? 'true' : 'false'}
  multi-selection=${multiSelection ? 'true' : 'false'}
  size=${size}>
    <modus-tree-view-item node-Id="1" label="Inbox">
      <svg
        slot="itemIcon"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        height="16"
        width="16"
        viewBox="0 0 32 32">
        <path
          d="M28.79 12.39A1 1 0 0 0 28 12h-2V9c0-.55-.45-1-1-1h-9.59l-1.7-1.71C13.52 6.11 13.27 6 13 6H4c-.55 0-1 .45-1 1v17c0 .04.02.07.02.11.01.05.02.11.04.16.02.09.06.17.1.25.02.03.02.06.05.09.01.01.03.02.04.03.07.08.15.14.23.19.04.03.06.05.1.07.13.06.27.1.42.1h21c.13 0 .25-.03.36-.07.04-.02.07-.04.1-.06.07-.04.14-.08.2-.13.03-.03.06-.06.09-.1.05-.05.09-.11.12-.18a.31.31 0 0 0 .06-.13c.01-.02.03-.04.03-.07l3-11c.09-.3.02-.62-.17-.87zM5 8h7.59l1.7 1.71c.19.18.44.29.71.29h9v2H7c-.45 0-.85.3-.96.74L5 16.53V8z" />
      </svg>
      <modus-tree-view-item node-Id="2" label="Personal"></modus-tree-view-item>
      <modus-tree-view-item node-Id="3" label="Work"></modus-tree-view-item>
      <modus-tree-view-item node-Id="4" label="Social"></modus-tree-view-item>
      <modus-tree-view-item node-Id="5" is-last-child=${isLastChild} label="More ..."></modus-tree-view-item>
    </modus-tree-view-item>
  </modus-tree-view>
`;

export const Default = Template.bind({});
Default.args = {
  borderless: false,
  checkboxSelection: false,
  disableTabbing: false,
  multiCheckboxSelection: false,
  multiSelection: false,
  size: 'standard',
};

export const WithIcon = SlotIconTemplate.bind({});
WithIcon.args = {...Default.args,
};

// export const Borderless = Template.bind({});

export const Condensed = Template.bind({});
Condensed.args = { ...Default.args, checkboxSelection: true, size: 'condensed' };

export const Borderless = Template.bind({});
Borderless.args = { ...Default.args, borderless: true };

export const MultiSelection = Template.bind({});
MultiSelection.args = {...Default.args,
  multiSelection: true,
  checkboxSelection: true,
  multiCheckboxSelection: true,
};

const ActionBarTemplate = ({
  borderless,
  checkboxSelection,
  multiCheckboxSelection,
  multiSelection,
  disableTabbing,
  size,
  isLastChild,
}) => html`
  <div
    id="tree-with-action-bar"
    style="display: flex; flex-direction: column; width: 400px;">
    <div
      style="display: flex; justify-content: end; flex-wrap: wrap; margin-top: 1rem;">
      <modus-button
        button-style="borderless"
        aria-label="Add"
        title="Add"
        size="small"
        color="primary"
        disabled
        id="add">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path d="M19,13H13v6H11V13H5V11h6V5h2v6h6Z" fill="#252a2e" />
        </svg>
      </modus-button>
      <modus-button
        button-style="borderless"
        aria-label="Remove"
        title="Remove"
        size="small"
        color="primary"
        disabled
        id="remove">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            d="M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM19,4H15.5l-1-1h-5l-1,1H5V6H19Z"
            fill="#252a2e" />
        </svg>
      </modus-button>
      <modus-button
        button-style="borderless"
        size="small"
        aria-label="Edit"
        title="Edit"
        color="primary"
        disabled
        id="edit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            d="M3,17.25V21H6.75L17.81,9.94,14.06,6.19ZM20.71,7.04a1,1,0,0,0,0-1.41L18.37,3.29a1,1,0,0,0-1.41,0L15.13,5.12l3.75,3.75,1.83-1.83Z"
            fill="#252a2e" />
        </svg>
      </modus-button>
      <modus-button
        button-style="borderless"
        size="small"
        aria-label="Copy"
        title="Copy"
        color="primary"
        disabled
        id="copy">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            d="M16,1H4A2.006,2.006,0,0,0,2,3V17H4V3H16Zm3,4H8A2.006,2.006,0,0,0,6,7V21a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V7A2.006,2.006,0,0,0,19,5Zm0,16H8V7H19Z"
            fill="#252a2e" />
        </svg>
      </modus-button>
      <modus-button
        button-style="borderless"
        size="small"
        aria-label="Drag"
        title="Drag"
        color="primary"
        disabled
        id="drag">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
          <path
            d="M11,18a2,2,0,1,1-2-2A2.006,2.006,0,0,1,11,18ZM9,10a2,2,0,1,0,2,2A2.006,2.006,0,0,0,9,10ZM9,4a2,2,0,1,0,2,2A2.006,2.006,0,0,0,9,4Zm6,4a2,2,0,1,0-2-2A2.006,2.006,0,0,0,15,8Zm0,2a2,2,0,1,0,2,2A2.006,2.006,0,0,0,15,10Zm0,6a2,2,0,1,0,2,2A2.006,2.006,0,0,0,15,16Z"
            fill="#252a2e" />
        </svg>
      </modus-button>
      <modus-button
        button-style="borderless"
        size="small"
        aria-label="Expand"
        title="Expand"
        color="primary"
        disabled
        id="expand">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="rgba(0,0,0,0)" />
          <path
            d="M12,5.83,15.17,9l1.41-1.41L12,3,7.41,7.59,8.83,9Zm0,12.34L8.83,15,7.42,16.41,12,21l4.59-4.59L15.17,15Z"
            fill="#252a2e" /></svg
      ></modus-button>
      <modus-button
        button-style="borderless"
        size="small"
        aria-label="Collapse"
        title="Collapse"
        color="primary"
        disabled
        style="display: none"
        id="collapse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            d="M7.41,18.59,8.83,20,12,16.83,15.17,20l1.41-1.41L12,14ZM16.59,5.41,15.17,4,12,7.17,8.83,4,7.41,5.41,12,10Z"
            fill="#252a2e" />
        </svg>
      </modus-button>
    </div>
    <modus-tree-view
      borderless=${borderless ? 'true' : 'false'}
      checkbox-selection=${checkboxSelection ? 'true' : 'false'}
      disable-tabbing=${disableTabbing ? 'true' : 'false'}
      multi-checkbox-selection=${multiCheckboxSelection ? 'true' : 'false'}
      multi-selection=${multiSelection ? 'true' : 'false'}
      size=${size}>
      <modus-tree-view-item node-Id="1" label="Inbox">
        <modus-tree-view-item
          node-Id="2"
          label="Personal"></modus-tree-view-item>
        <modus-tree-view-item node-Id="3" label="Work"></modus-tree-view-item>
        <modus-tree-view-item node-Id="4" label="Social"></modus-tree-view-item>
        <modus-tree-view-item
          node-Id="5"
          label="More ..."></modus-tree-view-item>
      </modus-tree-view-item>
      <modus-tree-view-item node-Id="6" label="Archived">
        <modus-tree-view-item node-Id="7"  is-last-child=${isLastChild}  label="Folder1">
          <modus-tree-view-item
            node-Id="8"
            label="File1"></modus-tree-view-item>
          <modus-tree-view-item
            node-Id="9"
            is-last-child=${isLastChild}
            label="File3"></modus-tree-view-item>
        </modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view>
  </div>
  ${ActionBarScript()}
`;
const ActionBarScript = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
  function actionBarScript() {
    const container = document.querySelector("div[id='tree-with-action-bar']");

    // Workaround for storybook running script twice
    if(container.getAttribute("data-script")) return;
    else container.setAttribute("data-script", true);

    const root =  container.querySelector("modus-tree-view");
    const addButton =  container.querySelector("modus-button[id='add']");
    const removeButton =  container.querySelector("modus-button[id='remove']");
    const editButton =  container.querySelector("modus-button[id='edit']");
    const copyButton =  container.querySelector("modus-button[id='copy']");
    const expandAllButton =  container.querySelector("modus-button[id='expand']");
    const collapseAllButton =  container.querySelector("modus-button[id='collapse']");
    const dragButton =  container.querySelector("modus-button[id='drag']");

    const disableButtons = (disable) =>
    {
      removeButton.disabled = disable;
      copyButton.disabled = disable;
      editButton.disabled = disable;
    }
    const getChildren = (element) => {
      const children = element.querySelectorAll('modus-tree-view-item');
      if (!children) return [];
      return Array.from(children)
        .reduce((r, c) => {
          r.push(
            c,
            ...getChildren(c)
          );
          return r;
        }, []);
    }
    const getItems = () => new Map( Array.from(root.querySelectorAll('modus-tree-view-item')).map(i => [i.nodeId, i.label]));
    const querySelect = (itemId) => container.querySelector("modus-tree-view-item[node-id='"+ itemId + "']");

    addButton.disabled = false;
    dragButton.disabled = false;
    expandAllButton.disabled = false;
    collapseAllButton.disabled = false;

    container.addEventListener("itemClick", () => {
      if(root.selectedItems.length > 0){
        disableButtons(false);
      }
      else
      {
        disableButtons(true);
      }
    });

    addButton.addEventListener("buttonClick", () => {
      const nodeId =  container.querySelectorAll('modus-tree-view-item').length + 1;
      const selectedItems = root.selectedItems;
      if (nodeId) {
        const selectedItemId = selectedItems && selectedItems.length > 0 ? selectedItems[0] : null;
        const selectedItemElement = querySelect(selectedItemId);
        const selectedItemParent = selectedItemElement?.parentElement;
        const newNode = document.createElement('modus-tree-view-item');
        newNode.nodeId = nodeId;
        newNode.editable = true;
        const insertParent = selectedItemParent || root;
        const insertBeforeElement = selectedItemElement || root.firstElementChild;
        (insertParent).insertBefore(newNode, insertBeforeElement);
      }
    });

    removeButton.addEventListener("buttonClick", () => {
      const selectedItems = root.selectedItems;
      selectedItems?.forEach((i) => {
        const selectedItemElement = querySelect(i);
        const selectedItemParent = selectedItemElement?.parentElement;
        if(selectedItemElement){
          selectedItemParent.removeChild(selectedItemElement);
        }
      });

      if(!Array.from(getItems()).length){
        container.querySelectorAll("modus-button").forEach(b => b.disabled = true);
      }
      else disableButtons(true);
    });

    editButton.addEventListener("buttonClick", () => {
      const selectedItems = root.selectedItems;
        const selectedItemId = selectedItems && selectedItems.length > 0 ? selectedItems[0] : null;
        const selectedItemElement = querySelect(selectedItemId);
        selectedItemElement.editable = true;
    });

    copyButton.addEventListener("buttonClick", () => {
      const nodeId = container.querySelectorAll('modus-tree-view-item').length + 1;
      const selectedItems = root.selectedItems;
        const selectedItemId = selectedItems && selectedItems.length > 0 ? selectedItems[0] : null;
        const selectedItemElement =  querySelect(selectedItemId);
        if(selectedItemElement){
          const newNode = selectedItemElement.cloneNode(true);
          newNode.nodeId = nodeId;
          newNode.editable = true;
          newNode.label = "Copy of " + selectedItemElement.label;

          let count = nodeId + 1;
          getChildren(newNode).forEach(c => {
            c.nodeId = count;
            count ++;
          });

          (selectedItemElement.parentElement || root).insertBefore(newNode, selectedItemElement);
        }

    });

    expandAllButton.addEventListener("buttonClick", () => {
      root.expandedItems= Array.from(getItems().keys());
      expandAllButton.style.display="none";
      collapseAllButton.style.display= "inline-block";
    });

    collapseAllButton.addEventListener("buttonClick", () => {
      root.expandedItems= [];
      collapseAllButton.style.display="none";
      expandAllButton.style.display= "inline-block";
    });

    dragButton.addEventListener("buttonClick", () => {
      const isDraggable = !root.children[0].draggableItem;
      getItems().forEach((val, key) => {
        const element =  querySelect(key);
        element.draggableItem = isDraggable;
        element.droppableItem = true;
      })
    });
  }
    actionBarScript();
  `;

  return tag;
};

export const CustomActionBar = ActionBarTemplate.bind({});
CustomActionBar.args = {...Default.args,
};

const FilterTemplate = ({
  borderless,
  checkboxSelection,
  multiCheckboxSelection,
  multiSelection,
  disableTabbing,
  size,
  isLastChild,
}) => html`
  <div
    id="tree-with-filter"
    style="display: flex; flex-direction: column; width: 400px;">
    <modus-text-input
      id="filter"
      size="large"
      placeholder="Search"
      type="search"
      disabled="true"
      include-search-icon></modus-text-input>
    <modus-tree-view
      borderless=${borderless ? 'true' : 'false'}
      checkbox-selection=${checkboxSelection ? 'true' : 'false'}
      disable-tabbing=${disableTabbing ? 'true' : 'false'}
      multi-checkbox-selection=${multiCheckboxSelection ? 'true' : 'false'}
      multi-selection=${multiSelection ? 'true' : 'false'}
      size=${size}>
      <modus-tree-view-item node-Id="1">
        <div slot="label">Inbox</div>
        <modus-tree-view-item node-Id="2">
          <div slot="label">Personal</div>
        </modus-tree-view-item>
        <modus-tree-view-item node-Id="5">
          <div slot="label">More ...</div>
        </modus-tree-view-item>
      </modus-tree-view-item>
      <modus-tree-view-item node-Id="6">
        <div slot="label">Archived</div>
        <modus-tree-view-item is-last-child=${isLastChild} node-Id="7">
          <div slot="label">Folder1</div>
          <modus-tree-view-item node-Id="8">
            <div slot="label">File1</div>
          </modus-tree-view-item>
          <modus-tree-view-item is-last-child=${isLastChild} node-Id="11">
            <div slot="label">File2</div>
          </modus-tree-view-item>
        </modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view>
  </div>
  ${FilterScript()}
`;

const FilterScript = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    function filterScript() {
      const container = document.querySelector("div[id='tree-with-filter']");

      // Workaround for storybook running script twice
      if(container.getAttribute("data-script")) return;
      else container.setAttribute("data-script", true);

      const root =  container.querySelector('modus-tree-view');
      let items = new Map();
      container.querySelectorAll('modus-tree-view-item').forEach(element => {
        items.set(element.nodeId, element.querySelector("div[slot='label']").innerHTML);
      });
      root.expandedItems = Array.from(items.keys());


      const filter =  container.querySelector("modus-text-input[id='filter']");
      filter.disabled = false;
      filter.addEventListener("valueChange", (e) => {
        const searchText  = e.detail;

        if(searchText){
          const searchResult = [...items]
            .filter(([key, value]) => {
              return value.toLowerCase().indexOf(searchText) > -1
            })
            .map(([key, value]) => key);

          const getParents = (e) => {
            if(e.parentNode && e.parentNode.nodeId) return [e.parentNode, ...getParents(e.parentNode)];
            return [];
          }


          items.forEach((value, key) => {
            const element = container.querySelector("modus-tree-view-item[node-id='" + key+"']")
            element.expanded = true;

            if(searchResult.includes(key)){
              element.querySelector("div[slot='label']").style.color="#0063a3";
              element.style.display="block";

              getParents(element).forEach(e => {
                e.style.display="block";
              });
            }
            else{
              element.querySelector("div[slot='label']").style.color = undefined;
              element.style.display= "none";
            }
          });
        }
        else{
          items.forEach((value, key) => {
            const element = container.querySelector("modus-tree-view-item[node-id='" + key+"']")
              element.querySelector("div[slot='label']").style.color = "";
              element.style.display="block";
              element.expanded = false;
          });
        }
      });
    }
    filterScript();
  `;

  return tag;
};

export const CustomFilter = FilterTemplate.bind({});
CustomFilter.args = {...Default.args,
};

const WithItemActionBarTemplate = ({
  borderless,
  checkboxSelection,
  multiCheckboxSelection,
  multiSelection,
  size,
  rowActions,
}) => html`
  <div
    style="display: flex; flex-direction: column; width: 400px;">
    <modus-tree-view
      style="width:400px;"
      borderless=${borderless}
      checkbox-selection=${checkboxSelection}
      checked-items="false"
      expanded-items="false"
      multi-checkbox-selection=${multiCheckboxSelection}
      multi-selection=${multiSelection}
      selected-items="false"
      size=${size}
    >
      <modus-tree-view-item node-id="1" label="Inbox" .actions=${rowActions}></modus-tree-view-item>
    </modus-tree-view>
  </div>
`;

export const WithActionBar = WithItemActionBarTemplate.bind({});
WithActionBar.args = {
  ...Default.args,
  rowActions: [
    { id: 'export', icon: 'export', label: 'Export' },
    { id: 'history', icon: 'history', label: 'History' },
    { id: 'edit', icon: 'pencil', label: 'Edit' },
    { id: 'delete', icon: 'delete', label: 'Delete' }
    ]
};
