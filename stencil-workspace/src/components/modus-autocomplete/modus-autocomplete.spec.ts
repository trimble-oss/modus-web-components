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
          <modus-text-input includesearchicon="" size="medium"></modus-text-input>
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
          <modus-text-input includesearchicon="" size="medium"></modus-text-input>
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
