import { ModusChip } from '@trimble-oss/modus-react-components';

export default function ModusChipExamples() {
  return (
    <>
      <h3>Chips</h3>
      <div className="grid-row">
        <ModusChip image-url="https://example.com/image.jpg" show-close value="Bryan"></ModusChip>
        <ModusChip has-error image-url="https://example.com/image.jpg" show-close value="Bryan"></ModusChip>
        <ModusChip disabled image-url="https://example.com/image.jpg" show-close value="Bryan"></ModusChip>
      </div>
      <div className="grid-row">
        <ModusChip image-url="https://example.com/image.jpg" show-close chip-style="outline" value="Bryan"></ModusChip>
        <ModusChip
          has-error
          image-url="https://example.com/image.jpg"
          show-close
          chip-style="outline"
          value="Bryan"></ModusChip>
        <ModusChip
          disabled
          image-url="https://example.com/image.jpg"
          show-close
          chip-style="outline"
          value="Bryan"></ModusChip>
      </div>
      <div className="grid-row">
        <ModusChip show-checkmark size="small" value="Pets OK"></ModusChip>
      </div>
    </>
  );
}
