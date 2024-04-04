import { newSpecPage } from '@stencil/core/testing';
import { ModusSentimentScale } from './modus-sentiment-scale';

describe('modus-sentiment-scale', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusSentimentScale],
      html: '<modus-sentiment-scale type="thumbs"></modus-sentiment-scale>',
    });
    expect(root).toEqualHtml(`
      <modus-sentiment-scale type="thumbs">
        <mock:shadow-root>
          <div class="sentiment-scale-container" role="group">
          <div aria-label="Helpful" class="thumbs-container" role="button" tabindex="0">
             <svg class="icon-thumbs-up-outlined" fill="none" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
               <path d="M21.99 12.23c0-1.85-1.5-3.35-3.35-3.35h-3.69c.21-1.88.16-4.52-2.64-5.65-.38-.15-.76-.23-1.13-.23-.76 0-1.44.32-1.93.9-.92 1.1-.73 2.61-.65 3 .09.56-.31 1.06-1.16 2.01-.16.18-.32.35-.47.53a2.48 2.48 0 0 0-1.63-.6h-.83a2.5 2.5 0 0 0-2.5 2.5v7.51a2.5 2.5 0 0 0 2.5 2.5h.83c.76 0 1.45-.34 1.91-.88.6.56 1.4.9 2.28.9h7.06c1.99 0 2.8-1.08 3.49-2.91.6-1.44 1.59-3.81 1.69-4.03.1-.22.28-.62.22-2.21ZM6.17 18.86c0 .46-.38.83-.83.83h-.83c-.46 0-.83-.37-.83-.83v-7.51c0-.46.37-.83.83-.83h.83c.46 0 .83.38.83.83v7.51Zm14.07-5.11c-.12.26-1.71 4.08-1.71 4.08-.63 1.65-1.02 1.88-1.95 1.88H9.52c-.93 0-1.68-.75-1.68-1.68V11.5s-.01-.45.1-.61c.99-1.27 2.59-2.42 2.31-4.23-.18-.99.14-2.38 1.45-1.87 2.29.93 1.64 3.46 1.39 5.35.03.22.32.33.72.38h.04c.18.02.37.03.58.03h4.2c.93 0 1.68.75 1.68 1.68 0 0 .05 1.26-.07 1.52Z" fill="currentColor"></path>
             </svg>
           </div>
           <div aria-label="Not helpful" class="thumbs-container" role="button" tabindex="0">
             <svg class="icon-thumbs-down-outlined" fill="none" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
               <path d="M21.99 12.15c0 1.85-1.5 3.35-3.35 3.35h-3.69c.21 1.88.16 4.52-2.64 5.65-.38.15-.76.23-1.13.23-.76 0-1.44-.32-1.93-.9-.92-1.1-.73-2.61-.65-3 .09-.56-.31-1.06-1.16-2.01-.16-.18-.32-.35-.47-.53-.44.38-1.01.6-1.63.6h-.83a2.5 2.5 0 0 1-2.5-2.5V5.53a2.5 2.5 0 0 1 2.5-2.5h.83c.76 0 1.45.34 1.91.88.6-.56 1.4-.9 2.28-.9h7.06c1.99 0 2.8 1.08 3.49 2.91.6 1.44 1.59 3.81 1.69 4.03.1.22.28.62.22 2.21ZM6.17 5.52c0-.46-.38-.83-.83-.83h-.83c-.46 0-.83.37-.83.83v7.51c0 .46.37.83.83.83h.83c.46 0 .83-.38.83-.83V5.52Zm14.07 5.11c-.12-.26-1.71-4.08-1.71-4.08-.63-1.65-1.02-1.88-1.95-1.88H9.52c-.93 0-1.68.75-1.68 1.68v6.53s-.01.45.1.61c.99 1.27 2.59 2.42 2.31 4.23-.18.99.14 2.38 1.45 1.87 2.29-.93 1.64-3.46 1.39-5.35.03-.22.32-.33.72-.38h.04c.18-.02.37-.03.58-.03h4.2c.93 0 1.68-.75 1.68-1.68 0 0 .05-1.26-.07-1.52Z" fill="currentColor"></path>
             </svg>
           </div>
          </div>
        </mock:shadow-root>
      </modus-sentiment-scale>
    `);
  });

  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusSentimentScale],
      html: '<modus-sentiment-scale type="smileys"></modus-sentiment-scale>',
    });
    expect(root).toEqualHtml(`
      <modus-sentiment-scale type="smileys">
        <mock:shadow-root>
          <div class="sentiment-scale-container" role="group">
            <div aria-label="Dissatisfied" class="smileys-container" role="button" tabindex="0">
              <svg class="icon-smiley-dissatistied-outline" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm1 8.99c.27-.06.44-.33.38-.6-.52-2.29-2.53-3.89-4.88-3.89s-4.36 1.6-4.88 3.89a.503.503 0 0 0 .98.22c.42-1.83 2.02-3.11 3.9-3.11s3.49 1.28 3.9 3.11c.05.23.26.39.49.39.04 0 .07 0 .11-.01Z" fill="currentColor"></path>
              </svg>
            </div>
            <div aria-label="Somewhat Dissatisfied" class="smileys-container" role="button" tabindex="0">
              <svg class="icon-smiley-somewhat-dissatistied-outline" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm.21 8.88c.21-.18.23-.5.05-.71-.95-1.08-2.32-1.71-3.76-1.71s-2.81.62-3.76 1.71c-.18.21-.16.52.05.71.21.18.52.16.71-.05.76-.87 1.86-1.36 3.01-1.36s2.25.5 3.01 1.36c.1.11.24.17.38.17.12 0 .23-.04.33-.12Z" fill="currentColor"></path>
              </svg>
            </div>
            <div aria-label="Neutral" class="smileys-container" role="button" tabindex="0">
              <svg class="icon-smiley-neutral-outline" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm.5 7.5c0-.28-.22-.5-.5-.5h-7c-.28 0-.5.22-.5.5s.22.5.5.5h7c.28 0 .5-.22.5-.5Z" fill="currentColor"></path>
              </svg>
            </div>
            <div aria-label="Somewhat Satisfied" class="smileys-container" role="button" tabindex="0">
              <svg class="icon-smiley-somewhat-satistied-outline" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm.26 8.29c.18-.21.16-.52-.05-.71a.506.506 0 0 0-.71.05c-.76.87-1.86 1.36-3.01 1.36s-2.25-.5-3.01-1.36a.505.505 0 0 0-.71-.05c-.21.18-.23.5-.05.71.95 1.08 2.32 1.71 3.76 1.71s2.81-.62 3.76-1.71Z" fill="currentColor"></path>
              </svg>
            </div>
            <div aria-label="Satisfied" class="smileys-container" role="button" tabindex="0">
              <svg class="icon-smiley-satistied-outline" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm1.38 6.11a.503.503 0 0 0-.98-.22C15.48 15.72 13.88 17 12 17s-3.49-1.28-3.9-3.11a.503.503 0 0 0-.98.22C7.64 16.4 9.65 18 12 18s4.36-1.6 4.88-3.89Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </modus-sentiment-scale>    `);
  });

  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusSentimentScale],
      html: '<modus-sentiment-scale type="smileys" disabled></modus-sentiment-scale>',
    });
    expect(root).toEqualHtml(`
      <modus-sentiment-scale type="smileys" disabled>
        <mock:shadow-root>
          <div aria-disabled="true" class="sentiment-scale-container" role="group">
            <div aria-label="Dissatisfied" class="disabled smileys-container" role="button" tabindex="-1">
              <svg class="icon-smiley-dissatistied-outline" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm1 8.99c.27-.06.44-.33.38-.6-.52-2.29-2.53-3.89-4.88-3.89s-4.36 1.6-4.88 3.89a.503.503 0 0 0 .98.22c.42-1.83 2.02-3.11 3.9-3.11s3.49 1.28 3.9 3.11c.05.23.26.39.49.39.04 0 .07 0 .11-.01Z" fill="currentColor"></path>
              </svg>
            </div>
            <div aria-label="Somewhat Dissatisfied" class="disabled smileys-container" role="button" tabindex="-1">
              <svg class="icon-smiley-somewhat-dissatistied-outline" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm.21 8.88c.21-.18.23-.5.05-.71-.95-1.08-2.32-1.71-3.76-1.71s-2.81.62-3.76 1.71c-.18.21-.16.52.05.71.21.18.52.16.71-.05.76-.87 1.86-1.36 3.01-1.36s2.25.5 3.01 1.36c.1.11.24.17.38.17.12 0 .23-.04.33-.12Z" fill="currentColor"></path>
              </svg>
            </div>
            <div aria-label="Neutral" class="disabled smileys-container" role="button" tabindex="-1">
              <svg class="icon-smiley-neutral-outline" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm.5 7.5c0-.28-.22-.5-.5-.5h-7c-.28 0-.5.22-.5.5s.22.5.5.5h7c.28 0 .5-.22.5-.5Z" fill="currentColor"></path>
              </svg>
            </div>
            <div aria-label="Somewhat Satisfied" class="disabled smileys-container" role="button" tabindex="-1">
              <svg class="icon-smiley-somewhat-satistied-outline" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm.26 8.29c.18-.21.16-.52-.05-.71a.506.506 0 0 0-.71.05c-.76.87-1.86 1.36-3.01 1.36s-2.25-.5-3.01-1.36a.505.505 0 0 0-.71-.05c-.21.18-.23.5-.05.71.95 1.08 2.32 1.71 3.76 1.71s2.81-.62 3.76-1.71Z" fill="currentColor"></path>
              </svg>
            </div>
            <div aria-label="Satisfied" class="disabled smileys-container" role="button" tabindex="-1">
              <svg class="icon-smiley-satistied-outline" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm1.38 6.11a.503.503 0 0 0-.98-.22C15.48 15.72 13.88 17 12 17s-3.49-1.28-3.9-3.11a.503.503 0 0 0-.98.22C7.64 16.4 9.65 18 12 18s4.36-1.6 4.88-3.89Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
        </mock:shadow-root>
      </modus-sentiment-scale>    `);
  });
});
