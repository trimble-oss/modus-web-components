import { ModusButton, ModusTooltip } from '@trimble-oss/modus-react-components';

export default function ModusToolTipExamples() {
  return (
    <>
      <h3>Tooltips</h3>
      <ModusTooltip text="Tooltip text..." position="right">
        <ModusButton>Button</ModusButton>
      </ModusTooltip>
    </>
  );
}
