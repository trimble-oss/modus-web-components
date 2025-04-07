import {
  Component,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Element,
  Host,
} from '@stencil/core';

@Component({
  tag: 'flex-renderer',
  shadow: true,
})
export class FlexRenderer {
  @Element() el!: HTMLElement;

  @Prop() content = '';

  componentDidLoad() {
    this.renderHTMLContent();
  }

  private renderHTMLContent() {
    const htmlString = this.content.trim();
    const parsedElements = this.parseHTMLString(htmlString);

    const shadowRoot = this.el.shadowRoot;
    if (shadowRoot) {
      parsedElements.forEach((element) => {
        shadowRoot.appendChild(element);
      });
    }
  }

  private parseHTMLString(html: string): HTMLElement[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements: HTMLElement[] = Array.from(doc.body.childNodes) as HTMLElement[];

    return elements.map((element) => this.createElementFromNode(element));
  }

  private createElementFromNode(node: HTMLElement): HTMLElement {
    const element = document.createElement(node.tagName.toLowerCase());

    Array.from(node.attributes).forEach((attr) => {
      element.setAttribute(attr.name, attr.value);
    });

    if (node.childNodes.length > 0) {
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          element.appendChild(document.createTextNode(child.textContent));
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          element.appendChild(this.createElementFromNode(child as HTMLElement));
        }
      });
    }

    return element;
  }

  render() {
    return <Host></Host>;
  }
}
