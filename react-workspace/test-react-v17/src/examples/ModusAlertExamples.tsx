import { ModusAlert } from '@trimble-oss/modus-react-components';

export default function ModusAlertExamples() {
  return (
    <>
      <h3>Alert</h3>
      <div className="grid">
        <ModusAlert dismissible message="Dismissible alert"></ModusAlert>
        <ModusAlert message="Error alert" type="error"></ModusAlert>
        <ModusAlert message="Info gray alert" type="info-gray"></ModusAlert>
        <ModusAlert message="Info gray dark alert" type="info-gray-dark"></ModusAlert>
        <ModusAlert message="Success alert" type="success"></ModusAlert>
        <ModusAlert message="Warning alert" type="warning"></ModusAlert>
      </div>
    </>
  );
}
