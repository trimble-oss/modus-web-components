import { newSpecPage } from '@stencil/core/testing';
import { ModusPagination } from './modus-pagination';
import { PaginationDirection } from './enums/pagination-direction.enum';

describe('modus-pagination', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusPagination],
      html: '<modus-pagination min-page="1" max-page="5" active-page="1"></modus-pagination>',
    });
    expect(root).toEqualHtml(`
  <modus-pagination min-page="1" max-page="5" active-page="1">
    <mock:shadow-root>
    <nav class="medium">
      <ul>
          <li><button aria-current="page" class="active hoverable">1</button></li>
          <li><button class="hoverable">2</button></li>
          <li><button class="hoverable">3</button></li>
          <li><button class="hoverable">4</button></li>
          <li><button class="hoverable">5</button></li>
      </ul>
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
    modusPagination.handleChevronKeydown(keyboardEvent, PaginationDirection.Previous);
    expect(modusPagination.activePage).toEqual(0);
    modusPagination.handleChevronKeydown(keyboardEvent, PaginationDirection.Next);
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
