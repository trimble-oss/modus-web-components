import { ModusButton, ModusDropdown, ModusList, ModusListItem } from '@trimble-oss/modus-react-components';

export default function ModusDropdownExamples() {
  return (
    <>
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
    </>
  );
}
