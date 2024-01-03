import { newSpecPage } from '@stencil/core/testing';
import { ModusAutocomplete } from './modus-autocomplete';

describe('modus-autocomplete', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusAutocomplete],
      html: '<modus-autocomplete></modus-autocomplete>',
    });
    expect(root).toEqualHtml(`
    <modus-autocomplete>
      <mock:shadow-root>
        <div class="autocomplete medium">
          <div class="chips-container">
                  <svg class="icon-search" fill="currentColor" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                     <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"></path>
                  </svg>
            <modus-text-input class="input" size="medium"></modus-text-input>
          </div>
          <div class="error"></div>
          <div class="options-container" style="max-height: 300px; z-index: 1; overflow-y: auto;">
            <ul></ul>
          </div>
          <div style="display: none;">
            <slot></slot>
          </div>
        </div>
      </mock:shadow-root>
    </modus-autocomplete>
    `);
  });

  it('renders with slot value', async () => {
    const { root } = await newSpecPage({
      components: [ModusAutocomplete],
      html: `<modus-autocomplete>
        <li id="item-1" data-search-value="Test" data-id="1" style="padding: 8px">
          <div style="font-weight: bold">Test Option</div>
          <div style="font-size: 12px">Option Description</div>
        </li>
      </modus-autocomplete>`,
    });
    expect(root).toEqualHtml(`
    <modus-autocomplete>
      <mock:shadow-root>
        <div class="autocomplete medium">
        <div class="chips-container">
                 <svg class="icon-search" fill="currentColor" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                   <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"></path>
                 </svg>
          <modus-text-input class="input" size="medium"></modus-text-input>
          </div>
          <div class="error"></div>
          <div class="options-container" style="max-height: 300px; z-index: 1; overflow-y: auto;">
            <ul></ul>
          </div>
          <div style="display: none;">
            <slot></slot>
          </div>
        </div>
      </mock:shadow-root>
      <li data-id="1" data-search-value="Test" id="item-1" style="padding: 8px;">
        <div style="font-weight: bold;">
          Test Option
        </div>
        <div style="font-size: 12px;">
          Option Description
        </div>
      </li>
    </modus-autocomplete>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusAutocomplete = new ModusAutocomplete();
    expect(modusAutocomplete.classBySize.get('medium')).toEqual('medium');
    expect(modusAutocomplete.classBySize.get('large')).toEqual('large');
  });

  it('should convert options to ModusAutocompleteOption[]', async () => {
    const modusAutocomplete = new ModusAutocomplete();
    modusAutocomplete.options = ['Option 1', 'Option 2'];
    modusAutocomplete.convertOptions();
    expect(modusAutocomplete.options).toEqual([
      { id: 'Option 1', value: 'Option 1' },
      { id: 'Option 2', value: 'Option 2' },
    ]);
  });

  it('should accept ModusAutocompleteOption[] as options before conversion', async () => {
    const modusAutocomplete = new ModusAutocomplete();
    modusAutocomplete.options = [
      { id: 'Option 1', value: 'Option 1' },
      { id: 'Option 2', value: 'Option 2' },
    ];
    modusAutocomplete.convertOptions();
    expect(modusAutocomplete.options).toEqual([
      { id: 'Option 1', value: 'Option 1' },
      { id: 'Option 2', value: 'Option 2' },
    ]);
  });

  it('should update visible options on search change', async () => {
    const modusAutocomplete = new ModusAutocomplete();
    modusAutocomplete.options = [
      { id: 'Option 1', value: 'Option 1' },
      { id: 'Option 2', value: 'Option 2' },
    ];
    modusAutocomplete.handleSearchChange('Option 1');
    expect(modusAutocomplete.visibleOptions).toEqual([{ id: 'Option 1', value: 'Option 1' }]);
  });

  it('should show all options on empty search', async () => {
    const modusAutocomplete = new ModusAutocomplete();
    modusAutocomplete.options = [
      { id: 'Option 1', value: 'Option 1' },
      { id: 'Option 2', value: 'Option 2' },
    ];
    modusAutocomplete.visibleOptions = [{ id: 'Option 1', value: 'Option 1' }];
    modusAutocomplete.handleSearchChange('');
    expect(modusAutocomplete.visibleOptions).toEqual([
      { id: 'Option 1', value: 'Option 1' },
      { id: 'Option 2', value: 'Option 2' },
    ]);
  });

  it('should display no results when there are no regular or custom results', async () => {
    const modusAutocomplete = new ModusAutocomplete();
    modusAutocomplete.showNoResultsFoundMessage = true;
    modusAutocomplete.hasFocus = true;
    modusAutocomplete.visibleOptions = [];
    modusAutocomplete.visibleCustomOptions = [];
    modusAutocomplete.value = 'search value';

    expect(modusAutocomplete.displayNoResults()).toEqual(true);
  });

  it('should display options', async () => {
    const modusAutocomplete = new ModusAutocomplete();
    modusAutocomplete.disabled = false;
    modusAutocomplete.hasFocus = true;
    modusAutocomplete.value = 'search value';

    expect(modusAutocomplete.displayOptions()).toEqual(true);
  });
});
