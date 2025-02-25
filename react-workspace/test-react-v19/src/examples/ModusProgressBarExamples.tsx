import { ModusProgressBar } from '@trimble-oss/modus-react-components';

export default function ModusProgressBarExamples() {
  return (
    <>
      <h3>Progress Bar</h3>
      <div className="grid">
        <ModusProgressBar value={3} maxValue={4} min-value="0" text="75%"></ModusProgressBar>
        <ModusProgressBar value={3} maxValue={4} min-value="0" size="compact"></ModusProgressBar>
      </div>
    </>
  );
}
