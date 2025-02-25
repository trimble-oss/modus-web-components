import { ModusSlider } from '@trimble-oss/modus-react-components';

export default function ModusSliderExamples() {
  return (
    <>
      <h3>Slider</h3>
      <div className="grid">
        <ModusSlider label="Slider"></ModusSlider> <ModusSlider disabled label="Disabled slider"></ModusSlider>
        <h3>Spinner</h3>
      </div>
    </>
  );
}
