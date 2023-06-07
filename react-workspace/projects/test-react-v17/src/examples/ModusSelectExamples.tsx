import { ModusSelect } from '@trimble-oss/modus-react-components';

export default function ModusSelectExamples() {
  return (
    <>
      <h3>Select Input</h3>
      <div className="grid">
        <ModusSelect
          id="select-demo-1"
          label="Select Demo 1"
          value={{ display: 'Option 1' }}
          options-display-prop="display"
          options={[{ display: 'Option 1' }, { display: 'Option 2' }, { display: 'Option 3' }]}></ModusSelect>

        <ModusSelect
          disabled
          helper-text="Helper demo"
          id="select-demo-2"
          label="Select Demo 2"
          options-display-prop="display"></ModusSelect>

        <ModusSelect error-text="Error demo" label="Select Demo 3"></ModusSelect>

        <ModusSelect label="Select Demo 4" value="Option 1" valid-text="Valid demo"></ModusSelect>
      </div>
    </>
  );
}
