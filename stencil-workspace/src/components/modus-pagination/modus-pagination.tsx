// eslint-disable-next-line
import {
  Component,
  Event,
  EventEmitter,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { IconChevronLeftThick } from '../icons/icon-chevron-left-thick';
import { IconChevronRightThick } from '../icons/icon-chevron-right-thick';
import { IconCaretDown } from '../icons/icon-caret-down';
import {
  LeftPageDropdownOptions,
  RightPageDropdownOptions,
} from './modus-pagination.utilities';

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
      this.setPages();
      this.pageChange.emit(newValue);
    }
  }

  /* The maximum page value. */
  @Prop() maxPage: number;

  /**
   * Checks and updates maxPage value on change of items per page.
   */
  @Watch('maxPage')
  maxPageWatch(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      this.setPages();
    }
  }

  /* The minimum page value. */
  @Prop() minPage: number;

  /* The pagination's size. */
  @Prop() size: 'large' | 'medium' | 'small' = 'medium';

  /* To use ellipsis instead of dropdown icon. */
  @Prop() showPagesDropdowns = true;

  /** An event that fires on page change. */
  @Event() pageChange: EventEmitter<number>;

  @State() pages: (number | string)[];
  @State() showDropdownLeft = false;
  @State() showDropdownRight = false;

  constructor() {
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
    const ellipsis = '...';
    const pages: (number | string)[] = [];

    // Always show the first page.
    this.maxPage > 1 && pages.push(this.minPage);

    if (this.maxPage - this.minPage < 7) {
      // No need for icon for 7 pages - push all of them.
      for (let i = this.minPage + 1; i < this.maxPage; i++) {
        pages.push(i);
      }
    } else {
      if (this.activePage - this.minPage < 4) {
        // One of the first 4 pages is active.
        [1, 2, 3, 4].map((val) => pages.push(this.minPage + val));
        pages.push(
          this.showPagesDropdowns ? (
            <IconCaretDown
              id="for-right"
              onClick={() => (this.showDropdownRight = !this.showDropdownRight)}
            />
          ) : (
            ellipsis
          )
        );
      } else if (this.maxPage - this.activePage < 4) {
        // One of the last 4 pages is active.
        pages.push(
          this.showPagesDropdowns ? (
            <IconCaretDown
              id="for-left"
              onClick={() => (this.showDropdownLeft = !this.showDropdownLeft)}
            />
          ) : (
            ellipsis
          )
        );
        [4, 3, 2, 1].map((val) => pages.push(this.maxPage - val));
      } else {
        // The active page is somewhere in the middle.
        pages.push(
          this.showPagesDropdowns ? (
            <IconCaretDown
              id="for-left"
              onClick={() => (this.showDropdownLeft = !this.showDropdownLeft)}
            />
          ) : (
            ellipsis
          )
        );
        [-1, 0, 1].map((val) => pages.push(this.activePage + val));
        pages.push(
          this.showPagesDropdowns ? (
            <IconCaretDown
              id="for-right"
              onClick={() => (this.showDropdownRight = !this.showDropdownRight)}
            />
          ) : (
            ellipsis
          )
        );
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

  handleKeydownBack(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }

    this.handleChevronClick('back');
  }

  handleKeydownForward(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }

    this.handleChevronClick('forward');
  }

  handlePageClick(page: number): void {
    if (!isNaN(page)) {
      this.activePage = page;
    }
  }

  render(): unknown {
    return (
      <nav
        aria-label={this.ariaLabel}
        class={`${this.classBySize.get(this.size)}`}>
        <ol>
          {
            <li
              class={`${this.activePage != this.minPage ? 'hoverable' : 'disabled'
                }`}
              onClick={() => this.handleChevronClick('back')}
              onKeyDown={(event) => this.handleKeydownBack(event)}
              tabIndex={0}>
              <IconChevronLeftThick
                size={this.chevronSizeBySize.get(this.size)}
              />
            </li>
          }
          {this.pages.map((page) => {
            return (
              <li
                class={`${page === this.activePage && 'active'} ${!isNaN(+page) && 'hoverable'
                  }`}
                onClick={() => this.handlePageClick(+page)}
                onKeyDown={(event) => {
                  if (event.code === 'Enter') {
                    this.handlePageClick(+page);
                  }
                }}
                tabIndex={0}>
                {page}
                {isNaN(+page) &&
                  this.showDropdownLeft &&
                  page['$attrs$'].id === 'for-left' && (
                    <ul class="page-number-dropdown">
                      <li
                        onClick={(event) => {
                          const target = event.target as EventTarget &
                            HTMLInputElement;
                          this.handlePageClick(Number(target.value));
                        }}>
                        {LeftPageDropdownOptions(
                          this.maxPage,
                          this.minPage,
                          this.activePage
                        )}
                        {(this.showDropdownLeft = false)}
                      </li>
                    </ul>
                  )}

                {isNaN(+page) &&
                  this.showDropdownRight &&
                  page['$attrs$'].id === 'for-right' && (
                    <ul class="page-number-dropdown">
                      <li
                        onClick={(event) => {
                          const target = event.target as EventTarget &
                            HTMLInputElement;
                          this.handlePageClick(Number(target.value));
                        }}>
                        {RightPageDropdownOptions(
                          this.maxPage,
                          this.minPage,
                          this.activePage
                        )}
                        {(this.showDropdownRight = false)}
                      </li>
                    </ul>
                  )}
              </li>
            );
          })}
          {
            <li
              class={`${this.activePage != this.maxPage ? 'hoverable' : 'disabled'
                }`}
              onClick={() => this.handleChevronClick('forward')}
              onKeyDown={(event) => this.handleKeydownForward(event)}
              tabIndex={0}>
              <IconChevronRightThick
                size={this.chevronSizeBySize.get(this.size)}
              />
            </li>
          }
        </ol>
      </nav>
    );
  }
}
