import { ModusBadge } from '@trimble-oss/modus-react-components';

export default function ModusBadgeExamples() {
  return (
    <>
      <h3>Badge</h3>
      <div className="grid">
        <div className="grid-row">
          <ModusBadge>Default</ModusBadge>
          <ModusBadge color="secondary">Secondary</ModusBadge>
          <ModusBadge color="tertiary">Tertiary</ModusBadge>
          <ModusBadge color="dark">Dark</ModusBadge>
          <ModusBadge color="warning">Warning</ModusBadge>
          <ModusBadge color="danger">Danger</ModusBadge>
        </div>

        <div className="grid-row">
          <ModusBadge size="small">Small</ModusBadge>
          <ModusBadge size="medium">Medium</ModusBadge>
          <ModusBadge size="large">Large</ModusBadge>
        </div>

        <div className="grid-row">
          <ModusBadge type="counter">Counter</ModusBadge>
          <ModusBadge color="secondary" type="counter">
            Counter
          </ModusBadge>
          <ModusBadge color="tertiary" type="counter">
            Counter
          </ModusBadge>
          <ModusBadge color="dark" type="counter">
            Counter
          </ModusBadge>
          <ModusBadge color="warning" type="counter">
            Counter
          </ModusBadge>
          <ModusBadge color="danger" type="counter">
            Counter
          </ModusBadge>
        </div>

        <div className="grid-row">
          <ModusBadge size="small" type="counter">
            Small
          </ModusBadge>
          <ModusBadge size="medium" type="counter">
            Medium
          </ModusBadge>
          <ModusBadge size="large" type="counter">
            Large
          </ModusBadge>
        </div>

        <div className="grid-row">
          <ModusBadge type="text">Primary</ModusBadge>
          <ModusBadge color="secondary" type="text">
            Secondary
          </ModusBadge>
          <ModusBadge color="dark" type="text">
            High Contrast
          </ModusBadge>
          <ModusBadge color="success" type="text">
            Success
          </ModusBadge>
          <ModusBadge color="danger" type="text">
            Danger
          </ModusBadge>
        </div>

        <div className="grid-row">
          <ModusBadge size="small" type="text">
            Small
          </ModusBadge>
          <ModusBadge size="medium" type="text">
            Medium
          </ModusBadge>
          <ModusBadge size="large" type="text">
            Large
          </ModusBadge>
        </div>
      </div>
    </>
  );
}
