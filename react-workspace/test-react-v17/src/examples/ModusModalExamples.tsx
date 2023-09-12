import { ModusButton, ModusModal } from '@trimble-oss/modus-react-components';
import { useRef } from 'react';

export default function ModusModalExamples() {
  const ref = useRef<HTMLModusModalElement>(null);
  return (
    <>
      <h3>Modal</h3>
      <ModusButton
        id="btn-modal"
        color="primary"
        onButtonClick={(e) => {
          const modal = ref.current;
          if (modal) {
            modal.open();
            modal.primaryButtonDisabled = true;
          }
        }}>
        Open modal
      </ModusButton>
      <ModusModal
        id="modal1"
        ref={ref}
        header-text="Modal title"
        primary-button-text="Save changes"
        secondary-button-text="Sweet!"
        primary-button-aria-label="Save changes"
        secondary-button-aria-label="Sweet">
        <p>Woo-hoo, you're reading this text in a modal!</p>
      </ModusModal>
    </>
  );
}
