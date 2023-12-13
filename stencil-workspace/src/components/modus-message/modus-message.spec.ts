import { newSpecPage } from '@stencil/core/testing';
import { ModusMessage } from './modus-message';

describe('modus-message', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusMessage],
      html: '<modus-message></modus-message>',
    });
    expect(root).toEqualHtml(`
      <modus-message>
            <mock:shadow-root>
              <div class="info modus-message" role="note">
                <span class="icon">
                  <svg class="icon-info" fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21ZM11 7H13V9H11V7ZM11 11H13L13 17H11L11 11Z" fill="currentColor" fill-rule="evenodd"></path>
                    <mask height="18" id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" width="18" x="3" y="3">
                      <path clip-rule="evenodd" d="M12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21ZM11 7H13V9H11V7ZM11 11H13L13 17H11L11 11Z" fill="white" fill-rule="evenodd"></path>
                    </mask>
                    <g mask="url(#mask0)"></g>
                  </svg>
                </span>
                <span class="message">
                  <slot></slot>
                </span>
              </div>
            </mock:shadow-root>
          </modus-message>
    `);
  });

  it('should get the correct class by type', async () => {
    const modusMessage = new ModusMessage();
    let className = modusMessage.classByType.get(modusMessage.type);
    expect(className).toEqual('info');

    className = modusMessage.classByType.get('question');
    expect(className).toEqual('question');
  });
});
