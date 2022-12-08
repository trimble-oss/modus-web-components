import {
  ModusAccordion,
  ModusAccordionItem,
} from '@trimble-oss/modus-react-components';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeToggle';

const Accordion = () => {
  const theme = useContext(ThemeContext);
  return (
    <ModusAccordion data-mwc-theme={theme ? theme : undefined}>
      <ModusAccordionItem header-text="Collapsible Group Item #1">
        This is the first item's accordion body. It is shown by default, until
        the collapse plugin adds the appropriate classes that we use to style
        each element. These classes control the overall appearance, as well as
        the showing and hiding via CSS transitions. You can modify any of this
        with custom CSS or overriding our default variables.
      </ModusAccordionItem>
      <ModusAccordionItem header-text="Collapsible Group Item #2">
        Content
      </ModusAccordionItem>
      <ModusAccordionItem disabled header-text="Collapsible Group Item #3">
        Content
      </ModusAccordionItem>
    </ModusAccordion>
  );
};

export default Accordion;
