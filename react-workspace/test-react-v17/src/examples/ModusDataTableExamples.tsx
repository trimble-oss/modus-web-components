import { ModusDataTable } from '@trimble-oss/modus-react-components';

export default function ModusDataTableExamples() {
  return (
    <>
      <h3>Data Table</h3>
      <ModusDataTable
        columns={['Name', 'Age', 'Contacted']}
        data={[
          ['John', 25, false],
          ['Jane', 26, false],
          ['Joe', 27, true],
        ]}
      />
    </>
  );
}
