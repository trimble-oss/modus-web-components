import { ModusList, ModusListItem } from '@trimble-oss/modus-react-components';

export default function ModusListExamples() {
  return (
    <>
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
    </>
  );
}
