import { ModusBreadcrumb } from '@trimble-oss/modus-react-components';

export default function ModusBreadcrumbExamples() {
  return (
    <>
      <h3>Breadcrumbs</h3>
      <ModusBreadcrumb
        crumbs={[
          { id: '1', display: 'Crumb 1' },
          { id: '2', display: 'Crumb 2' },
          { id: '3', display: 'Crumb 3' },
          { id: '4', display: 'Crumb 4' },
        ]}></ModusBreadcrumb>
    </>
  );
}
