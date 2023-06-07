import { ModusTabs } from '@trimble-oss/modus-react-components';

export default function ModusTabExamples() {
  return (
    <>
      <h3>Tabs</h3>
      <ModusTabs
        tabs={[
          {
            id: '0',
            label: 'Tab 1',
          },
          {
            active: true,
            id: '1',
            label: 'Tab 2',
          },
        ]}></ModusTabs>
    </>
  );
}
