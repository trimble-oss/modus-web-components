import { ModusAccordion, ModusAccordionItem } from '@trimble-oss/modus-react-components';

export default function ModusAccordionExamples() {
  return (
    <>
      <h3>Accordion</h3>
      <ModusAccordion>
        <ModusAccordionItem headerText="Item 1">Content</ModusAccordionItem>
        <ModusAccordionItem headerText="Item 2">Content</ModusAccordionItem>
        <ModusAccordionItem disabled headerText="Item 3">
          Content
        </ModusAccordionItem>
      </ModusAccordion>
    </>
  );
}
