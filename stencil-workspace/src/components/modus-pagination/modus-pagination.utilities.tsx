import { JSX, h } from '@stencil/core';

export function LeftPageDropdownOptions(
  maxPage: number,
  minPage: number,
  activePage: number
): JSX.Element[] {
  const dropdownItems: JSX.Element[] = [];

  Array.from({ length: maxPage - minPage }, (_, i) => i + minPage + 1).forEach(
    (page) => {
      if (page === minPage + 1 && activePage < maxPage - 4) {
        const pages = Array.from(
          { length: activePage - 2 - minPage },
          (_, i) => i + minPage + 1
        ).map((pageNumber) => <option>{pageNumber}</option>);

        dropdownItems.push(...pages);
      }
      if (activePage >= maxPage - 4 && page === minPage + 1) {
        const pages = Array.from(
          { length: maxPage - 4 - (minPage + 1) },
          (_, i) => i + minPage + 1
        ).map((pageNumber) => <option>{pageNumber}</option>);

        dropdownItems.push(...pages);
      }
    }
  );

  return dropdownItems;
}

export function RightPageDropdownOptions(
  maxPage: number,
  minPage: number,
  activePage: number
): JSX.Element[] {
  const dropdownItems: JSX.Element[] = [];

  Array.from({ length: maxPage - minPage }, (_, i) => i + minPage + 1).forEach(
    (page) => {
      if (activePage <= 4 && page === maxPage - 1) {
        const pages = Array.from(
          { length: maxPage - 6 },
          (_, i) => i + minPage + 5
        ).map((pageNumber) => <option>{pageNumber}</option>);

        dropdownItems.push(...pages);
      } else if (activePage >= 5 && page === maxPage - 1) {
        const pages = Array.from(
          { length: maxPage - (activePage + 2) },
          (_, i) => i + activePage + 2
        ).map((pageNumber) => <option>{pageNumber}</option>);

        dropdownItems.push(...pages);
      }
    }
  );

  return dropdownItems;
}
