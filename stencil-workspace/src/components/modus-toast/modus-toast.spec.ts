import { newSpecPage } from '@stencil/core/testing';
import { ModusToast } from './modus-toast';

describe('modus-toast', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusToast],
      html: '<modus-toast></modus-toast>',
    });
    expect(root).toEqualHtml(`
<modus-toast>
      <mock:shadow-root>
        <div class="default modus-toast" role="status">
          <div class="icon">
            <svg class="icon-info" fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21ZM11 7H13V9H11V7ZM11 11H13L13 17H11L11 11Z" fill="currentColor" fill-rule="evenodd"></path>
              <mask height="18" id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" width="18" x="3" y="3">
                <path clip-rule="evenodd" d="M12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21ZM11 7H13V9H11V7ZM11 11H13L13 17H11L11 11Z" fill="white" fill-rule="evenodd"></path>
              </mask>
              <g mask="url(#mask0)"></g>
            </svg>
          </div>
          <span class="text">
            <slot></slot>
          </span>
        </div>
      </mock:shadow-root>
    </modus-toast>
    `);
  });

  it('renders with "alert" role when provided', async () => {
    const { root } = await newSpecPage({
      components: [ModusToast],
      html: '<modus-toast role="alert"></modus-toast>',
    });
    expect(root).toEqualHtml(`
<modus-toast role="alert">
      <mock:shadow-root>
        <div class="default modus-toast" role="alert">
          <div class="icon">
            <svg class="icon-info" fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21ZM11 7H13V9H11V7ZM11 11H13L13 17H11L11 11Z" fill="currentColor" fill-rule="evenodd"></path>
              <mask height="18" id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" width="18" x="3" y="3">
                <path clip-rule="evenodd" d="M12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21ZM11 7H13V9H11V7ZM11 11H13L13 17H11L11 11Z" fill="white" fill-rule="evenodd"></path>
              </mask>
              <g mask="url(#mask0)"></g>
            </svg>
          </div>
          <span class="text">
            <slot></slot>
          </span>
        </div>
      </mock:shadow-root>
    </modus-toast>
    `);
  });

  it('should get the correct class by type', async () => {
    const toast = new ModusToast();
    let className = toast.classByType.get(toast.type);
    expect(className).toEqual('default');

    className = toast.classByType.get('danger');
    expect(className).toEqual('danger');

    className = toast.classByType.get('dark');
    expect(className).toEqual('dark');

    className = toast.classByType.get('primary');
    expect(className).toEqual('primary');

    className = toast.classByType.get('secondary');
    expect(className).toEqual('secondary');

    className = toast.classByType.get('success');
    expect(className).toEqual('success');

    className = toast.classByType.get('tertiary');
    expect(className).toEqual('tertiary');

    className = toast.classByType.get('warning');
    expect(className).toEqual('warning');
  });
});
