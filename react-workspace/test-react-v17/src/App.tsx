import React from 'react';
import './App.css';
import * as ModusReactExamples from './examples';
import { ModusSwitch } from '@trimble-oss/modus-react-components';

function App() {
  return (
    <>
      <div className="theme-toggle-switch">
        <ModusSwitch
          label="
    Toggle Theme"
          onSwitchClick={(e: any) => {
            const theme = window.document?.firstElementChild?.getAttribute('data-mwc-theme') === 'dark' ? 'light' : 'dark';
            window.document?.firstElementChild?.setAttribute('data-mwc-theme', theme);
          }}></ModusSwitch>
      </div>
      <div className="grid w-50">
        <ModusReactExamples.Accordion />
        <ModusReactExamples.Alert />
        <ModusReactExamples.Badge />
        <ModusReactExamples.Breadcrumb />
        <ModusReactExamples.Button />
        <ModusReactExamples.Card />
        <ModusReactExamples.Chip />
        <ModusReactExamples.ContentTree />
        <ModusReactExamples.DataTable />
        <ModusReactExamples.Dropdown />
        <ModusReactExamples.FileDropZone />
        <ModusReactExamples.List />
        <ModusReactExamples.Message />
        <ModusReactExamples.Modal />
        <ModusReactExamples.Pagination />
        <ModusReactExamples.Navbar />
        <ModusReactExamples.ProgressBar />
        <ModusReactExamples.RadioGroup />
        <ModusReactExamples.SideNavigation />
        <ModusReactExamples.Slider />
        <ModusReactExamples.Spinner />
        <ModusReactExamples.Tab />
        <ModusReactExamples.Toast />
        <ModusReactExamples.Tooltip />
        <ModusReactExamples.AutoComplete />
        <ModusReactExamples.Checkbox />
        <ModusReactExamples.DatePicker />
        <ModusReactExamples.NumberInput />
        <ModusReactExamples.Select />
        <ModusReactExamples.Switch />
        <ModusReactExamples.TextInput />
        <ModusReactExamples.TimePicker />
      </div>
    </>
  );
}

export default App;
