import { Component, h, Element } from '@stencil/core';
import Quill from 'quill';
import { ModusIconMap } from '../../icons/ModusIconMap';
import { convertIconToSVG } from '../../utils/utils';

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
    const editorContainer = this.hostElement.shadowRoot.querySelector('.editor-container');
    const icons = Quill.import('ui/icons');
    icons['bold'] = convertIconToSVG(<ModusIconMap icon="text_bold" size="28" />);
    icons['italic'] = convertIconToSVG(<ModusIconMap icon="text_italic" size="28" />);
    icons['underline'] = convertIconToSVG(<ModusIconMap icon="text_underlined" size="28" />);
    icons['strike'] = convertIconToSVG(<ModusIconMap icon="text_strikethrough" size="28" />);
    icons['align'][''] = convertIconToSVG(<ModusIconMap icon="text_align_left" size="28" />);
    icons['align']['center'] = convertIconToSVG(<ModusIconMap icon="text_centered" size="28" />);
    icons['align']['right'] = convertIconToSVG(<ModusIconMap icon="text_align_right" size="28" />);
    icons['list']['bullet'] = convertIconToSVG(<ModusIconMap icon="list_bulleted" size="28" />);
    icons['list']['ordered'] = convertIconToSVG(<ModusIconMap icon="list_numbered" size="28" />);
    icons['link'] = convertIconToSVG(<ModusIconMap icon="link" size="28" />);
    this.quillInstance = new Quill(editorContainer, {
      placeholder: 'Compose an epic...',
      modules: {
        toolbar: [
          [{ font: ['sans', 'serif', 'monospace'] }],
          [{ size: ['14px', '16px', '18px'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: '' }, { align: 'center' }, { align: 'right' }],
          [{ list: 'bullet' }, { list: 'ordered' }],
          ['link'],
        ],
      },
      theme: 'snow',
    });
    const fontPicker = this.hostElement.shadowRoot.querySelector('.ql-font .ql-picker-label svg');
    const fontSizePicker = this.hostElement.shadowRoot.querySelector('.ql-size .ql-picker-label svg');
    console.log(icons['list']);
    fontPicker.innerHTML = convertIconToSVG(<ModusIconMap icon="caret_down" />);
    fontSizePicker.innerHTML = convertIconToSVG(<ModusIconMap icon="caret_down" />);
  }

  render() {
    return <div class="editor-container"></div>;
  }
}
