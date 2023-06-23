import { ModusButton, ModusModal } from '@trimble-oss/modus-react-components';

export default function ModusModalExamples() {
  return (
    <>
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
    </>
  );
}
