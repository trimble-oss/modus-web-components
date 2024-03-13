import { Component, h, Element } from '@stencil/core';
import Quill from 'quill';
//import { ModusIconMap } from '../../icons/ModusIconMap';

@Component({
  tag: 'modus-text-editor',
  styleUrl: 'modus-text-editor.scss',
  shadow: true,
})
export class ModusTextEditor {
  @Element() hostElement;

  quillInstance: Quill;
  el: Element;

  componentDidLoad() {
    //  const size = Quill.import('attributors/style/size') as (typeof Quill.imports)['attributors/style/size'];
    // (size as any).whitelist = ['14px', '16px', '18px'];

    const editorContainer = this.hostElement.shadowRoot.querySelector('.editor-container');
    this.quillInstance = new Quill(editorContainer, {
      modules: {
        toolbar: [
          [{ header: [false, 1, 2] }],
          [{ size: ['14px', '16px', '18px'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ font: ['serif', 'monospace'] }],
          ['blockquote', 'code-block', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
      },
      theme: 'snow', // You can change the theme here
    });
  }

  render() {
    return <div class="editor-container"></div>;
  }
}
