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

  private fontSizeArr = ['14px', '16px', '18px'];

  componentDidLoad() {
    const editorContainer = this.hostElement.shadowRoot.querySelector('.editor-container');
    this.setIcons();
    this.setFontSize();
    this.quillInstance = new Quill(editorContainer, {
      modules: {
        toolbar: [
          [{ font: ['serif', 'monospace'] }],
          [{ size: this.fontSizeArr }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: '' }, { align: 'center' }, { align: 'right' }],
          [{ list: 'bullet' }, { list: 'ordered' }],
          ['link'],
        ],
      },
      theme: 'snow',
    });

    this.setCaretIcons();
  }
  setIcons() {
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
  }
  setFontSize() {
    const fontSize: any = Quill.import('attributors/style/size');

    fontSize.whitelist = this.fontSizeArr;

    Quill.register(fontSize, true);
  }
  setCaretIcons() {
    const fontPicker = this.hostElement.shadowRoot.querySelector('.ql-font .ql-picker-label svg');
    const fontSizePicker = this.hostElement.shadowRoot.querySelector('.ql-size .ql-picker-label svg');

    fontPicker.innerHTML = convertIconToSVG(<ModusIconMap icon="caret_down" />);
    fontSizePicker.innerHTML = convertIconToSVG(<ModusIconMap icon="caret_down" />);
  }

  render() {
    return <div class="editor-container"></div>;
  }
}
