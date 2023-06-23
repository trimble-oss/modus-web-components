import { ModusSwitch } from '@trimble-oss/modus-react-components';

export default function ModusSwitchExamples() {
  return (
    <>
      <h3>Switch</h3>
      <div className="grid">
        <ModusSwitch label="Default"></ModusSwitch>
        <ModusSwitch checked label="Checked"></ModusSwitch>
        <ModusSwitch disabled label="Disabled"></ModusSwitch>
      </div>
    </>
  );
}
