import { ModusRadioGroup } from '@trimble-oss/modus-react-components';

export default function ModusRadioGroupExamples() {
  return (
    <>
      <h3>Radio group</h3>
      <ModusRadioGroup
        checked-id="1"
        name="my-group"
        radioButtons={[
          {
            id: '0',
            label: 'Radio 1',
          },
          {
            id: '1',
            checked: true,
            label: 'Radio 2',
          },
          {
            id: '2',
            label: 'Radio 3',
          },
        ]}></ModusRadioGroup>
    </>
  );
}
