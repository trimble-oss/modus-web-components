import { ModusCheckbox } from '@trimble-oss/modus-react-components';

export default function ModusCheckboxExamples() {
  return (
    <>
      <h3>Checkbox</h3>
      <div className="grid">
        <ModusCheckbox></ModusCheckbox>
        <ModusCheckbox disabled></ModusCheckbox>
        <ModusCheckbox label="Checkbox"></ModusCheckbox>
        <ModusCheckbox disabled label="Checkbox"></ModusCheckbox>
        <ModusCheckbox checked disabled label="Checkbox"></ModusCheckbox>

        <ModusCheckbox indeterminate></ModusCheckbox>
      </div>
    </>
  );
}
