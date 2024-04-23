import { newSpecPage } from '@stencil/core/testing';
import { ModusDropdown } from './modus-dropdown';

describe('modus-dropdown', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusDropdown],
      html: `
        <modus-dropdown toggle-element-id="toggle-id">
          <modus-button id="toggle-id" slot="dropdownToggle">Dropdown</modus-button>
        </modus-dropdown>`,
    });
    expect(root).toEqualHtml(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <mock:shadow-root>
          <div class="dropdown">
            <slot name='dropdownToggle'></slot>
            <div class='bottom dropdown-list hidden list-border' style='left: unset; min-width: 0px;'>
              <slot name='dropdownList'></slot>
            </div>
          </div>
        </mock:shadow-root>
        <modus-button id='toggle-id' slot='dropdownToggle'>
          Dropdown
        </modus-button>
      </modus-dropdown>
    `);
  });

  it('should get the correct class by placement', async () => {
    const modusDropdown = new ModusDropdown();
    let className = modusDropdown.classByPlacement.get('bottom');
    expect(className).toEqual('bottom');

    className = modusDropdown.placement = 'top';
    expect(className).toEqual('top');

    className = modusDropdown.placement = 'right';
    expect(className).toEqual('right');

    className = modusDropdown.placement = 'left';
    expect(className).toEqual('left');
  });

  it('should throw matching element not found error', async () => {
    const modusDropdown = new ModusDropdown();
    expect(() => {
      modusDropdown.componentDidRender();
    }).toThrowError('matching element not found for toggle-element-id');
  });
});
