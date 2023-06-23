import { ModusAutocomplete } from '@trimble-oss/modus-react-components';

export default function ModusAutoCompleteExamples() {
  return (
    <>
      <h3>AutoComplete</h3>
      <div className="grid">
        <div style={{ width: '500px' }}>
          <ModusAutocomplete
            id="default"
            options={['Apple', 'Banana', 'Orange']}
            label="Default Autocomplete"
            placeholder="Search..."></ModusAutocomplete>

          <ModusAutocomplete
            id="with-option"
            options={[
              { id: '0', value: 'Apple' },
              { id: '1', value: 'Banana' },
              { id: '2', value: 'Orange' },
            ]}
            label="Autocomplete using option model"
            placeholder="Search..."></ModusAutocomplete>

          <ModusAutocomplete label="Employee Search" clearable placeholder="Search...">
            <li data-search-value="The Git Guru" data-id="1" style={{ padding: '8px' }}>
              <div style={{ fontWeight: 'bold' }}>The Git Guru</div>
              <div style={{ fontSize: '12px' }}>Lead DevOps Engineer</div>
            </li>
            <li data-search-value="Bob the Builder" data-id="2" style={{ padding: '8px' }}>
              <div style={{ fontWeight: 'bold' }}>Bob the Builder</div>
              <div style={{ fontSize: '12px' }}>Senior Construction Engineer</div>
            </li>
          </ModusAutocomplete>
        </div>
      </div>
    </>
  );
}
