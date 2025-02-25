import { ModusDateInput, ModusDatePicker } from '@trimble-oss/modus-react-components';

export default function ModusDatePickerExamples() {
  return (
    <>
      <h3>Date picker</h3>
      <div className="grid">
        <ModusDateInput
          helper-text="mm/dd/yyyy"
          label="Single date"
          allowed-chars-regex="[\d\/]"
          format="mm/dd/yyyy"
          value="2022-12-22"></ModusDateInput>

        <ModusDatePicker label="Select date range">
          <ModusDateInput
            type="start"
            label="Start"
            format="dd-mm-yyyy"
            helper-text="dd-mm-yyyy"
            allowed-chars-regex="[\d-]"
            show-calendar-icon="true"
            value="2022-12-22"></ModusDateInput>

          <ModusDateInput
            type="end"
            label="End"
            format="dd-mm-yyyy"
            helper-text="dd-mm-yyyy"
            allowed-chars-regex="[\d-]"
            show-calendar-icon="true"
            value="2022-12-22"></ModusDateInput>
        </ModusDatePicker>
      </div>
    </>
  );
}
