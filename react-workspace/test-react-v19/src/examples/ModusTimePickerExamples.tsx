import { ModusSelect, ModusTimePicker } from '@trimble-oss/modus-react-components';

export default function ModusTimePickerExamples() {
  return (
    <>
      <h3>Time Picker Input</h3>
      <div className="grid">
        <ModusTimePicker
          ampm={true}
          auto-format="true"
          helper-text="hh:mm AM/PM"
          label="Time"
          max-length="10"
          placeholder="12:00 AM">
          <div style={{ width: '300px', paddingLeft: '0.5rem' }} slot="timeZone">
            <ModusSelect
              id="timezone"
              label="Time Zone"
              aria-label="Time Zone"
              options={[
                { display: 'Alpha Time Zone' },
                { display: 'Australian Central Daylight Time' },
                { display: 'Atlantic Daylight Time' },
              ]}
              options-display-prop="display"></ModusSelect>
          </div>
        </ModusTimePicker>
      </div>
    </>
  );
}
