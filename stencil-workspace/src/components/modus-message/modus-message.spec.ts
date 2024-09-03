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
            <svg class="icon-info" fill="currentColor" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1.06 14.15c0 .55-.45 1-1 1s-1-.45-1-1v-4.14c0-.55.45-1 1-1s1 .45 1 1zm-1-7.11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"></path>
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
