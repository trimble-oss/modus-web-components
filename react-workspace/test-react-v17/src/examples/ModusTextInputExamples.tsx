import { ModusTextInput } from '@trimble-oss/modus-react-components';

export default function ModusTextInputExamples() {
  return (
    <>
      <h3>Text Input</h3>
      <div className="grid">
        <ModusTextInput label="Text Input Demo 1" placeholder="Placeholder" include-search-icon required></ModusTextInput>
        <ModusTextInput label="Text Input Demo 2" include-search-icon disabled></ModusTextInput>
        <ModusTextInput
          label="Text Input Demo 3"
          placeholder="Placeholder"
          value="Value"
          helper-text="Helper Demo"
          include-search-icon
          required></ModusTextInput>
        <ModusTextInput
          label="Text Input Demo 4"
          placeholder="Placeholder"
          value="Value"
          error-text="Error Demo"
          include-search-icon></ModusTextInput>
        <ModusTextInput
          label="Text Input Demo 5"
          placeholder="Placeholder"
          value="Value"
          valid-text="Valid Demo"
          include-search-icon></ModusTextInput>
        <ModusTextInput
          label="Text Input Demo 6"
          placeholder="Placeholder"
          value="Value"
          size="large"
          include-search-icon></ModusTextInput>
        <ModusTextInput label="Text Input Demo 7" placeholder="Placeholder" value="Value" clearable={true}></ModusTextInput>
        <ModusTextInput label="Text Input Demo Password" placeholder="Password" type="password"></ModusTextInput>
      </div>
    </>
  );
}
