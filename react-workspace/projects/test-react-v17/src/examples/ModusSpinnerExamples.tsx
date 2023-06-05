import { ModusButton, ModusSpinner } from '@trimble-oss/modus-react-components';

export default function ModusSpinnerExamples() {
  return (
    <>
      <h3>Spinner</h3>
      <ModusSpinner></ModusSpinner>
      <ModusSpinner color="secondary"></ModusSpinner>
      <ModusButton color="primary" disabled>
        <ModusSpinner color="white" size=".5rem"></ModusSpinner>
        &nbsp;Loading...
      </ModusButton>
    </>
  );
}
