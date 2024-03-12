import { Component, h, Element } from '@stencil/core';
import Quill from 'quill';

@Component({
  tag: 'modus-text-editor',
  styleUrl: 'modus-text-editor.scss',
  shadow: true,
})
export class MyRichTextEditor {
  @Element() hostElement;

  quillInstance: Quill;

  componentDidLoad() {
    // Initialize Quill editor inside the shadow DOM
    const editorContainer = this.hostElement.shadowRoot.querySelector('.editor-container');
    this.quillInstance = new Quill(editorContainer, {
      theme: 'snow', // You can change the theme here
    });
  }

  render() {
    return <div class="editor-container">{/* This is where the Quill editor will be rendered */}</div>;
  }
}
