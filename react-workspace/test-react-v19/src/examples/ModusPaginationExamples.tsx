import { ModusPagination } from '@trimble-oss/modus-react-components';

export default function ModusPaginationExamples() {
  return (
    <>
      <h3>Pagination</h3>
      <div className="grid">
        <ModusPagination active-page="8" max-page="32" min-page="1" size="medium"></ModusPagination>
        <ModusPagination active-page="8" max-page="32" min-page="1" size="large"></ModusPagination>
        <ModusPagination active-page="8" max-page="32" min-page="1" size="small"></ModusPagination>
      </div>
    </>
  );
}
