import { ModusToast } from '@trimble-oss/modus-react-components';

export default function ModusToastExamples() {
  return (
    <>
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
    </>
  );
}
