import {
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Component,
  Prop,
  Element,
  Watch,
  EventEmitter,
  Event,
  Listen,
  State,
} from '@stencil/core';
import { ModusSideNavigationItemCustomEvent } from '../../components';
import { IconChevronLeftThick } from '../icons/icon-chevron-left-thick';
import { ModusSideNavigationTree } from './modus-side-navigation-tree';
import {
  ModusSideNavigationItemInfo,
  ModusSideNavigationLevelInfo,
} from './modus-side-navigation.types';

@Component({
  tag: 'modus-side-navigation',
  styleUrl: 'modus-side-navigation.scss',
  shadow: true,
})
export class ModusSideNavigation {
  @Element() element: HTMLElement;

  /** (optional) Data property to create the items. */
  @Prop() data: ModusSideNavigationItemInfo[];

  /** (optional) Maximum width of the side navigation panel in an expanded state. */
  @Prop() maxWidth = '256px';

  /** Mode to make side navigation either overlay or push the content for the selector specified in `targetContent` */
  @Prop() mode: 'overlay' | 'push' = 'overlay';

  /** (optional) The expanded state of side navigation panel and items. */
  @Prop({ mutable: true, reflect: true }) expanded = false;

  /** (optional) Specify the selector for the page's content for which paddings and margins will be set by side navigation based on the `mode`. */
  @Prop() targetContent: string;

  /** An event that fires on side navigation panel collapse & expand.  */
  @Event() sideNavExpand: EventEmitter<boolean>;

  private _callbackQueue: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
  private _children: { [key: string]: HTMLModusSideNavigationItemElement } = {};
  private _firstChild: string;
  private _itemInFocus: string;
  private _itemSelected: string;
  private _minWidth = '4rem';
  private _levelsContainerRef: HTMLDivElement;
  private _timeout: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  @State() _navigationLevelInfo: ModusSideNavigationLevelInfo[] = [];

  componentDidRender() {
    // Execute the callbacks on Render
    // Be careful with updating states in these callbacks to avoid infinite looping
    if (this._callbackQueue?.length) {
      this._callbackQueue.forEach((callbackFn) => callbackFn && callbackFn());
    }
    this._callbackQueue = [];
  }

  componentWillLoad() {
    this.handleExpandedChange(this.expanded);

    // If data prop is set, get the level1 info
    this.initializeLevelInfo(this.data);
  }

  @Listen('click', { target: 'document' })
  documentClickHandler(event: MouseEvent): void {
    if (
      this.element.contains(event.target as HTMLElement) ||
      event.defaultPrevented
    )
      return;

    // Collapse when clicked outside
    this.expanded = false;
  }

  gotoNextLevel(id: string) {
    if (this.data) {
      const newLevels = [...(this._navigationLevelInfo || [])];
      const existing = newLevels.length
        ? newLevels[newLevels.length - 1]
        : null;

      const level = existing
        ? existing.children?.find((i) => i.id === id)
        : this.data.find((i) => i.id === id);
      if (!level?.children) return;

      newLevels.push({ ...level, slidePosition: 'right' });

      this._navigationLevelInfo = [...newLevels];
      this.expanded = true;

      // Animation for sliding levels
      this._callbackQueue.push(() => {
        const levels = [...this._navigationLevelInfo];
        levels.forEach((level, index) => {
          if (index === levels.length - 2) {
            level.slidePosition = 'left';
          } else if (index === levels.length - 1) {
            level.slidePosition = 'center';
          }
        });
        this._navigationLevelInfo = [...levels];
      });
    }
  }

  gotoPreviousLevel() {
    const levels = [...this._navigationLevelInfo];

    // Animation for sliding levels
    levels.forEach((level, index) => {
      if (levels.length > 1) {
        if (index === levels.length - 2) {
          level.slidePosition = 'center';
        } else if (index === levels.length - 1) {
          level.slidePosition = 'right';
        }
      } else {
        level.slidePosition = 'center';
      }
    });
    this._navigationLevelInfo = [...levels];

    this._callbackQueue.push(() => {
      this._timeout = setTimeout(() => {
        levels.pop();
        this._navigationLevelInfo = [...levels];

        clearTimeout(this._timeout);
      }, 250);
    });
  }

  @Listen('_sideNavItemAdded')
  handleItemAdded(event: ModusSideNavigationItemCustomEvent<HTMLElement>) {
    if (event.detail?.id) {
      this._children[event.detail.id] =
        event.detail as HTMLModusSideNavigationItemElement;
      this._children[event.detail.id].expanded = this.expanded;
    }
    this.itemChanged(event);
  }

  @Listen('_sideNavItemRemoved')
  handleItemRemoved(event: ModusSideNavigationItemCustomEvent<HTMLElement>) {
    if (event.detail?.id) {
      delete this._children[event.detail.id];
    }
    this.itemChanged(event);
  }

  @Listen('sideNavItemFocus')
  handleItemFocus(event: ModusSideNavigationItemCustomEvent<{ id: string }>) {
    this.setFocusItem(event.detail.id);
  }

  @Listen('sideNavItemLevelExpandClick')
  handleItemLevelExpand(
    event: ModusSideNavigationItemCustomEvent<{ id: string }>
  ) {
    this.gotoNextLevel(event.detail.id);
  }

  @Listen('sideNavItemSelected')
  handleItemSelected(
    event: ModusSideNavigationItemCustomEvent<{ id: string; selected: boolean }>
  ) {
    if (this._itemSelected) {
      this._children[this._itemSelected].selected = false;
      this._itemSelected = null;
    }
    this._itemSelected = event.detail.selected ? event.detail.id : null;
  }

  @Watch('data')
  handleDataChange(val) {
    this.initializeLevelInfo(val);
    this.handleExpandedChange(this.expanded);
  }

  @Watch('expanded')
  handleExpandedChange(isExpanded) {
    const handleChange = () => {
      Object.values(this._children).forEach((c) => (c.expanded = isExpanded));
      this.sideNavExpand?.emit(this.expanded);

      this.setTargetContentMargin(isExpanded, this.mode, this.targetContent);
    };
    const levelHeadings = this._levelsContainerRef?.querySelector(
      '.side-nav-level.center .level-headings'
    ) as HTMLElement;

    // Animation to hide/show the Back button and Level heading
    if (this.data && levelHeadings) {
      if (isExpanded) {
        levelHeadings.classList.remove('collapse');
        levelHeadings.classList.add('collapsing');
        levelHeadings.style.height = '0';

        this._timeout = setTimeout(() => {
          levelHeadings.classList.remove('collapsing');
          levelHeadings.classList.add('show');
          levelHeadings.style.height = '';
          clearTimeout(this._timeout);

          handleChange();
        }, 150);
        levelHeadings.style.height = `${levelHeadings.scrollHeight}px`;
      } else {
        levelHeadings.style.height = `${
          levelHeadings.getBoundingClientRect().height
        }px`;
        this.reflow(levelHeadings);

        levelHeadings.classList.add('collapsing');

        // Timeout to reset collapsing class
        this._timeout = setTimeout(() => {
          levelHeadings.classList.remove('show');
          levelHeadings.classList.remove('collapsing');
          levelHeadings.classList.add('collapse');

          clearTimeout(this._timeout);

          handleChange();
        }, 200);

        levelHeadings.style.height = '';
      }
    } else {
      handleChange();
    }
  }

  @Watch('mode')
  handleModeChange(mode) {
    this.setTargetContentMargin(this.expanded, mode, this.targetContent);
  }

  @Watch('targetContent')
  handleTargetChange(target) {
    this.setTargetContentMargin(this.expanded, this.mode, target);
  }

  handleBackClick(e: KeyboardEvent | MouseEvent): void {
    const code = e['code']?.toUpperCase();

    if (code) {
      if (code === 'ENTER' || code === 'SPACE') {
        this.gotoPreviousLevel();
      }
    } else this.gotoPreviousLevel();

    e.stopPropagation();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }

    const key = event.code.toUpperCase();
    let preventDefault = false;
    // If the tree is empty there will be no child
    if (event.altKey || !this._firstChild) {
      return;
    }
    switch (key) {
      case 'SPACE':
      case 'ENTER':
        event.stopPropagation();
        break;
      case 'ARROWDOWN':
        // eslint-disable-next-line no-case-declarations
        const nextItem: HTMLModusSideNavigationItemElement = this._children[
          this._itemInFocus
        ]?.nextElementSibling as HTMLModusSideNavigationItemElement;

        nextItem?.focusItem();
        preventDefault = true;
        break;
      case 'ARROWUP':
        // eslint-disable-next-line no-case-declarations
        const prevItem = this._children[this._itemInFocus]
          ?.previousElementSibling as HTMLModusSideNavigationItemElement;

        prevItem?.focusItem();
        preventDefault = true;
        break;
      case 'ARROWRIGHT':
        this.gotoNextLevel(this._itemInFocus);
        break;
      case 'ARROWLEFT':
        this.gotoPreviousLevel();
        break;
      default:
    }

    if (preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  initializeLevelInfo(data: ModusSideNavigationItemInfo[]) {
    if (data) {
      this._navigationLevelInfo = [
        {
          id: null,
          label: null,
          children: data,
          slidePosition: 'center',
        },
      ];
    }
  }

  itemChanged(event: ModusSideNavigationItemCustomEvent<HTMLElement>) {
    const keys = Object.keys(this._children);
    this._firstChild = keys[0];

    event.preventDefault();
    event.stopPropagation();
  }

  setTargetContentMargin(isExpanded: boolean, mode: string, target: string) {
    if (target) {
      const content = document.querySelector(target) as HTMLElement;
      if (content) {
        content.style.marginLeft =
          isExpanded && mode === 'push' ? this.maxWidth : this._minWidth;
      }
    }
  }

  setFocusItem(itemId: string): void {
    this._itemInFocus = itemId;
  }

  // Trick to restart an element's animation
  // see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
  // taken from: https://getbootstrap.com/docs/5.2/dist/js/bootstrap.js
  reflow = (element) => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };

  render() {
    return (
      <nav
        role="navigation"
        class={`side-nav-panel${this.expanded ? ' expanded' : ''}`}
        style={{ width: this.expanded ? this.maxWidth : null }}
        onKeyDown={(e) => this.handleKeyDown(e)}
        aria-label="side navigation">
        {this.data ? (
          <div ref={(el) => (this._levelsContainerRef = el)}>
            {this._navigationLevelInfo.map((level, index) => (
              <div class={`side-nav-level ${level.slidePosition}`}>
                {index !== 0 && (
                  <div
                    class="level-headings"
                    tabindex={level.slidePosition === 'center' ? 0 : -1}
                    ref={(el) => el?.focus()}>
                    <p>
                      <IconChevronLeftThick size="10" />
                      <a
                        tabIndex={0}
                        onClick={(e) => this.handleBackClick(e)}
                        onKeyDown={(e) => this.handleBackClick(e)}>
                        Back
                      </a>
                    </p>

                    <h4>{level.label}</h4>
                  </div>
                )}
                <div>
                  <ul class="side-nav-menu" role="tree">
                    <ModusSideNavigationTree
                      data={level.children}></ModusSideNavigationTree>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div class="side-nav-level center">
            <ul class="side-nav-menu" role="tree">
              <slot></slot>
            </ul>
          </div>
        )}
      </nav>
    );
  }
}
