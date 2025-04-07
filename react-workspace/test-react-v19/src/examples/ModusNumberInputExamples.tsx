import { ModusNumberInput } from '@trimble-oss/modus-react-components';

export default function ModusNumberInputExamples() {
  return (
    <>
      <h3>Number Input</h3>
      <div className="grid">
        <ModusNumberInput label="Number Input Demo 1" placeholder="Placeholder" required={true}></ModusNumberInput>
        <ModusNumberInput
          disabled={true}
          label="Number Input Demo 2"
          placeholder="Placeholder"
          required={true}></ModusNumberInput>
        <ModusNumberInput helper-text="Helper demo" label="Number Input Demo 3" placeholder="Placeholder"></ModusNumberInput>
        <ModusNumberInput error-text="Error demo" label="Number Input Demo 4" placeholder="Placeholder"></ModusNumberInput>
        <ModusNumberInput valid-text="Valid demo" label="Number Input Demo 5" placeholder="Placeholder"></ModusNumberInput>
        <ModusNumberInput label="Text Input Demo 6" placeholder="Placeholder" size="large" value="100"></ModusNumberInput>
      </div>
    </>
  );
}
