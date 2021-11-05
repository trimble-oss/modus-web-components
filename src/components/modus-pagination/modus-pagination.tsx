// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { IconChevronLeftThick } from '../icons/icon-chevron-left-thick';
import { IconChevronRightThick } from '../icons/icon-chevron-right-thick';

@Component({
  tag: 'modus-pagination',
  styleUrl: 'modus-pagination.scss',
  shadow: true,
})
export class ModusPagination {
  /* The active page. */
  @Prop() activePage: number;

  /* The maximum page value. */
  @Prop() maxPage: number;

  /* The minimum page value. */
  @Prop() minPage: number;

  /* The pagination's size. */
  @Prop() size: 'large' | 'medium' | 'small' = 'medium';

  /** An event that fires on page change. */
  @Event() pageChange: EventEmitter<number>;

  @State() pages: (number | string)[];

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
    pages.push(this.minPage);

    if (this.maxPage - this.minPage < 7) {
      // No need for ellipsis for 7 pages - push all of them.
      for (let i = this.minPage + 1; i < this.maxPage; i++) {
        pages.push(i);
      }
    } else {
      if (this.activePage - this.minPage < 4) {
        // One of the first 4 pages is active.
        [1, 2, 3, 4].map(val => pages.push(this.minPage + val));
        pages.push(ellipsis);
      } else if (this.maxPage - this.activePage < 4) {
        // One of the last 4 pages is active.
        pages.push(ellipsis);
        [4, 3, 2, 1].map(val => pages.push(this.maxPage - val));
      } else {
        // The active page is somewhere in the middle.
        pages.push(ellipsis);
        [-1, 0, 1].map(val => pages.push(this.activePage + val));
        pages.push(ellipsis);
      }
    }

    // Always show the last page.
    pages.push(this.maxPage);

    this.pages = pages;
  }

  handleChevronClick(way: 'back' | 'forward'): void {
    if (way === 'back' && this.activePage != this.minPage) {
      this.activePage--;
    } else if (way === 'forward' && this.activePage != this.maxPage) {
      this.activePage++;
    }
  }

  handlePageClick(page: number): void {
    if (!isNaN(page)) {
      this.activePage = page;
      this.pageChange.emit(page);
    }
  }

  render(): unknown {
    this.setPages();

    return (
      <nav class={`${this.classBySize.get(this.size)}`}>
        <ol>
          {this.maxPage - this.minPage >= 7 && <li class={`${this.activePage != this.minPage ? 'hoverable' : 'disabled'}`} onClick={() => this.handleChevronClick('back')}>
            <IconChevronLeftThick size={this.chevronSizeBySize.get(this.size)} />
          </li>}
          {this.pages.map(page => {
            return (
                <li class={`${page === this.activePage ? 'active' : ''} ${!isNaN(+page) ? 'hoverable' : ''}`} onClick={() => this.handlePageClick(+page)}>
                  {page}
                </li>
              );
          })}
          {this.maxPage - this.minPage >= 7 && <li class={`${this.activePage != this.maxPage ? 'hoverable' : 'disabled'}`} onClick={() => this.handleChevronClick('forward')}>
            <IconChevronRightThick size={this.chevronSizeBySize.get(this.size)} />
          </li>}
        </ol>
      </nav>
    );
  }
}
