import { ModusButton } from '@trimble-oss/modus-react-components';

export default function ModusButtonExamples() {
  return (
    <>
      <h3>Buttons</h3>
      <div className="grid-row">
        <ModusButton color="primary">Primary</ModusButton>
        <ModusButton color="secondary">Secondary</ModusButton>
        <ModusButton color="tertiary">Tertiary</ModusButton>
      </div>
      <div className="grid-row">
        <ModusButton color="danger">Danger</ModusButton>
        <ModusButton disabled color="danger">
          Disabled
        </ModusButton>
      </div>
      <div className="grid-row">
        <ModusButton size="small" color="primary">
          Small
        </ModusButton>
        <ModusButton size="large" color="primary">
          Large
        </ModusButton>
      </div>
      <div className="grid-row">
        <ModusButton button-style="borderless">Borderless</ModusButton>
      </div>
      <div className="grid-row">
        <ModusButton button-style="outline" color="primary">
          Outline
        </ModusButton>
        <ModusButton button-style="outline" color="secondary">
          Outline
        </ModusButton>
      </div>
    </>
  );
}
