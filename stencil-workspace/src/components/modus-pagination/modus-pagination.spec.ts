import { newSpecPage } from '@stencil/core/testing';
import { ModusPagination } from './modus-pagination';
import { PaginationDirection } from './enums/pagination-direction.enum';

describe('modus-pagination', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusPagination],
      html: '<modus-pagination></modus-pagination>',
    });
    expect(root).toEqualHtml(`
  <modus-pagination>
    <mock:shadow-root>
      <nav class="medium">
        <ol>
          <li class="disabled" tabindex="0">
            <svg class="icon-chevron-left-thick" fill="currentColor" height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.753 28.06A2.483 2.483 0 0 0 22.864 26c0-.523-.165-1.024-.476-1.45l-.026-.035-.028-.032L14.941 16l7.393-8.483.028-.032.026-.035c.311-.426.476-.927.476-1.45 0-.823-.415-1.593-1.112-2.06-1.135-.76-2.704-.501-3.519.574l-8.572 9.974-.026.03-.024.032a2.445 2.445 0 0 0 0 2.9l.024.032.026.03 8.572 9.974c.816 1.075 2.384 1.335 3.52.574z" fill="#6A6976"></path>
            </svg>
          </li>
          <li tabindex="-1">
            ...
          </li>
          <li tabindex="0">
            NaN
          </li>
          <li tabindex="0">
            NaN
          </li>
          <li tabindex="0">
            NaN
          </li>
          <li tabindex="-1">
            ...
          </li>
          <li class="active" tabindex="0"></li>
          <li class="disabled" tabindex="0">
            <svg class="icon-chevron-right-thick" fill="currentColor" height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="m13.767 27.486 8.572-9.974.026-.03.023-.032a2.444 2.444 0 0 0 0-2.9l-.023-.032-.026-.03-8.572-9.974c-.815-1.075-2.384-1.335-3.52-.574A2.482 2.482 0 0 0 9.136 6c0 .523.164 1.024.476 1.45l.025.035.028.032L17.058 16l-7.392 8.483-.028.032-.026.034A2.442 2.442 0 0 0 9.136 26c0 .823.415 1.594 1.111 2.06 1.136.762 2.704.502 3.52-.573z" fill="#6A6976"></path>
              </g>
            </svg>
          </li>
        </ol>
      </nav>
    </mock:shadow-root>
  </modus-pagination>
`);
  });

  it('should get the correct class by size', async () => {
    const modusPagination = new ModusPagination();
    let className = modusPagination.classBySize.get(modusPagination.size);
    expect(className).toEqual('medium');

    className = modusPagination.classBySize.get('small');
    expect(className).toEqual('small');

    className = modusPagination.classBySize.get('large');
    expect(className).toEqual('large');
  });

  it('should get the correct chevron size by size', async () => {
    const modusPagination = new ModusPagination();
    let className = modusPagination.chevronSizeBySize.get('small');
    expect(className).toEqual('16');

    className = modusPagination.chevronSizeBySize.get(modusPagination.size);
    expect(className).toEqual('20');

    className = modusPagination.chevronSizeBySize.get('large');
    expect(className).toEqual('24');
  });

  it('should handle chevron click', async () => {
    const modusPagination = new ModusPagination();

    const keyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });

    modusPagination.activePage = 1;
    modusPagination.handleOnArrowsKeydown(keyboardEvent, PaginationDirection.Previous);
    expect(modusPagination.activePage).toEqual(0);
    modusPagination.handleOnArrowsKeydown(keyboardEvent, PaginationDirection.Next);
    expect(modusPagination.activePage).toEqual(1);
  });

  it('set correct pages', async () => {
    const modusPagination = new ModusPagination();

    // One of the first 4 pages are selected.
    modusPagination.activePage = 1;
    modusPagination.minPage = 1;
    modusPagination.maxPage = 100;
    modusPagination.setPages();
    let ellipsis = modusPagination.pages.filter((page) => page === '...');
    expect(ellipsis.length).toEqual(1);

    // One of the last 4 pages are selected.
    modusPagination.activePage = 100;
    modusPagination.setPages();
    ellipsis = modusPagination.pages.filter((page) => page === '...');
    expect(ellipsis.length).toEqual(1);

    // One of the middle pages are selected.
    modusPagination.activePage = 50;
    modusPagination.setPages();
    ellipsis = modusPagination.pages.filter((page) => page === '...');
    expect(ellipsis.length).toEqual(2);

    // There are only 7 pages.
    modusPagination.activePage = 4;
    modusPagination.minPage = 1;
    modusPagination.maxPage = 7;
    modusPagination.setPages();
    ellipsis = modusPagination.pages.filter((page) => page === '...');
    expect(ellipsis.length).toEqual(0);
  });
});
