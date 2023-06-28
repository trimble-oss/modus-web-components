import { FunctionalComponent, h } from '@stencil/core';

// Inspired by https://github.com/focus-trap/tabbable
const candidatesSelector = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);

  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }

  // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  // yet they are still part of the regular tab order; in FF, they get a default
  // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  // order, consider their tab index to be 0.
  // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  if (/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName)) {
    return 0;
  }

  return node.tabIndex;
}

function isNodeFocusable(node) {
  if (
    node.disabled ||
    node['ariaHidden'] === 'true' ||
    (node.tagName === 'INPUT' && node.type === 'hidden') ||
    isNonTabbableRadio(node)
  ) {
    return false;
  }
  return true;
}

const isNonTabbableRadio = function (node) {
  if (node.tagName !== 'INPUT' || node.type !== 'radio') {
    return false;
  }

  if (!node.name) {
    return false;
  }

  const queryRadios = function (name) {
    return node.ownerDocument.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };

  const radioSet = queryRadios(node.name);

  const checked = getCheckedRadio(radioSet, node.form);
  return !(!checked || checked === node);
};

const getCheckedRadio = function (nodes, form) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};

const getTabbableNodes = function (root: Element) {
  const zeroTabIndexNodes = [];
  const orderedTabNodes = [];

  // Workaround for Jest failing with an error "e.getAttributeNode is not a function", this code should be removed when a better fix is found.
  if (!root.getAttributeNode) return [];

  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeFocusable(node)) {
      return;
    }

    if (nodeTabIndex === 0) {
      zeroTabIndexNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node,
      });
    }
  });

  return orderedTabNodes
    .sort((a, b) => (a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex))
    .map((a) => a.node)
    .concat(zeroTabIndexNodes);
};

export const FocusTrap: FunctionalComponent<{
  id: string;
  ref?: (elm?: HTMLDivElement) => void;
  onFocus?: (e: Event) => void;
}> = ({ id, ref, onFocus }) => {
  return <div id={id} ref={ref} tabindex="0" aria-hidden="true" onFocus={(e) => onFocus && onFocus(e)}></div>;
};

export class FocusTrapping {
  private readonly tababbleNodes: HTMLElement[] = [];
  private readonly startTrap: HTMLElement;

  constructor(root: HTMLDivElement, startTrap: HTMLElement) {
    if (root) this.tababbleNodes = getTabbableNodes(root);
    this.startTrap = startTrap;
  }

  onStartTrapFocus() {
    if (this.tababbleNodes?.length) {
      this.tababbleNodes[0].focus();
    }
  }

  onEndTrapFocus() {
    this.startTrap.focus();
  }
}
