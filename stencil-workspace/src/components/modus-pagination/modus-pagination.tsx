import {
  Component,
  Event,
  EventEmitter,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  JSX,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { PaginationDirection } from './enums/pagination-direction.enum';
import { IconChevronRightThick } from '../icons/icon-chevron-right-thick';
import { IconChevronLeftThick } from '../icons/icon-chevron-left-thick';

@Component({
  tag: 'modus-pagination',
  styleUrl: 'modus-pagination.scss',
  shadow: true,
})
export class ModusPagination {
  /* (optional) The pagination's aria-label. */
  @Prop() ariaLabel: string | null;

  /* The active page. */
  @Prop({ mutable: true }) activePage: number;
  @Watch('activePage')
  activePageWatch(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      this.pageChange.emit(newValue);
    }
  }

  /* The maximum page value. */
  @Prop() maxPage: number;

  /* The minimum page value. */
  @Prop() minPage: number;

  /* The previous page button text. If not set, an icon control will be used. */
  @Prop() prevPageButtonText?: string;

  /* The next page button text. If not set, an icon control will be used. */
  @Prop() nextPageButtonText?: string;

  /* The pagination's size. */
  @Prop() size: 'large' | 'medium' | 'small' = 'medium';

  /** An event that fires on page change. */
  @Event() pageChange: EventEmitter<number>;

  @State() pages: (number | string)[];

  constructor() {
    this.setPages();
  }

  componentWillRender(): void {
    this.setPages();
  }

  chevronSizeBySize: Map<string, string> = new Map([
    ['small', '16'],
    ['medium', '20'],
    ['large', '24'],
  ]);

  classBySize: Map<string, string> = new Map([
    ['small', 'small'],
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  setPages(): void {
    const pages: (number | string)[] = [];

    const ellipsis = '...';

    // Always show the first page.
    this.maxPage > 1 && pages.push(this.minPage);

    if (this.maxPage - this.minPage < 7) {
      // No need for ellipsis for 7 pages - push all of them.
      for (let i = this.minPage + 1; i < this.maxPage; i++) {
        pages.push(i);
      }
    } else {
      if (this.activePage - this.minPage < 4) {
        // One of the first 4 pages is active.
        [1, 2, 3, 4].map((val) => pages.push(this.minPage + val));
        pages.push(ellipsis);
      } else if (this.maxPage - this.activePage < 4) {
        // One of the last 4 pages is active.
        pages.push(ellipsis);
        [4, 3, 2, 1].map((val) => pages.push(this.maxPage - val));
      } else {
        // The active page is somewhere in the middle.
        pages.push(ellipsis);
        [-1, 0, 1].map((val) => pages.push(this.activePage + val));
        pages.push(ellipsis);
      }
    }

    // Always show the last page.
    pages.push(this.maxPage);

    this.pages = pages;
  }

  handleChevronClick(direction: PaginationDirection): void {
    if (direction === PaginationDirection.Previous && this.activePage !== this.minPage) {
      this.activePage--;
    } else if (direction === PaginationDirection.Next && this.activePage !== this.maxPage) {
      this.activePage++;
    }
  }

  handleChevronKeydown(event: KeyboardEvent, direction: PaginationDirection): void {
    if (event.key.toLowerCase() === 'enter') {
      this.handleChevronClick(direction);
      event.preventDefault();
    }
  }

  handlePageKeydown(event: KeyboardEvent, page: number): void {
    if (event.key.toLowerCase() === 'enter') {
      this.handlePageClick(page);
      event.preventDefault();
    }
  }

  handlePageClick(page: number): void {
    if (!isNaN(page)) {
      this.activePage = page;
    }
  }

  renderPreviousPageControl(): JSX.Element[] {
    return (
      this.maxPage - this.minPage >= 7 && (
        <li
          aria-label="Previous"
          class={`${this.activePage != this.minPage ? 'hoverable' : 'disabled'}`}
          onClick={() => this.handleChevronClick(PaginationDirection.Previous)}
          onKeyDown={(event) => this.handleChevronKeydown(event, PaginationDirection.Previous)}
          tabIndex={0}>
          {this.prevPageButtonText ? (
            <span data-test-id="prev-button-text">{this.prevPageButtonText}</span>
          ) : (
            <IconChevronLeftThick size={this.chevronSizeBySize.get(this.size)} />
          )}
        </li>
      )
    );
  }

  renderNextPageControl(): JSX.Element[] {
    return (
      this.maxPage - this.minPage >= 7 && (
        <li
          aria-label="Next"
          class={`${this.activePage != this.maxPage ? 'hoverable' : 'disabled'}`}
          onClick={() => this.handleChevronClick(PaginationDirection.Next)}
          onKeyDown={(event) => this.handleChevronKeydown(event, PaginationDirection.Next)}
          tabIndex={0}>
          {this.nextPageButtonText ? (
            <span data-test-id="next-button-text">{this.nextPageButtonText}</span>
          ) : (
            <IconChevronRightThick size={this.chevronSizeBySize.get(this.size)} />
          )}
        </li>
      )
    );
  }

  renderPageNumbers(): JSX.Element[] {
    return this.pages.map((page) => {
      const isCurrentPage = page === this.activePage;

      if (page === '...') {
        return (
          <li class={`${!isNaN(+page) ? 'hoverable' : ''}`} tabIndex={-1}>
            {page}
          </li>
        );
      }

      return (
        <li
          aria-current={isCurrentPage ? 'page' : null}
          class={`${page === this.activePage ? 'active' : ''} ${!isNaN(+page) ? 'hoverable' : ''}`}
          onClick={() => this.handlePageClick(+page)}
          onKeyDown={(event: KeyboardEvent) => this.handlePageKeydown(event, +page)}
          tabIndex={0}>
          {page}
        </li>
      );
    });
  }

  render(): unknown {
    return (
      <nav aria-label={this.ariaLabel} class={`${this.classBySize.get(this.size)}`}>
        <ul>
          {this.renderPreviousPageControl()}
          {this.renderPageNumbers()}
          {this.renderNextPageControl()}
        </ul>
      </nav>
    );
  }
}
