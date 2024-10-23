// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, h, Prop, Element, Event, EventEmitter } from '@stencil/core';
import Quill from 'quill';
import { Attributor } from 'parchment';
import { ModusIconMap } from '../../icons/ModusIconMap';
import { convertIconToSVG } from '../../utils/utils';
//import { Delta } from 'quill/core';

@Component({
  tag: 'modus-text-editor',
  styleUrl: 'modus-text-editor.scss',
})
export class ModusTextEditor {
  /** (optional) Content of the editor. */
  @Prop() content: string;

  /** (optional) Disables the editor. */
  @Prop() disabled = false;

  /** (optional) The placeholder text of the editor. */
  @Prop() placeholder = '';

  /** An event that fires on input value change. */
  @Event() textChange: EventEmitter<{ delta: unknown; oldDelta: unknown; source: string }>;

  /** An event that fires on selection change. */
  @Event() selectionUpdate: EventEmitter<{ range: unknown; oldRange: unknown; source: string }>;

  /** An event that fires on editor change. */
  @Event() editorChange: EventEmitter<{ eventName: string; args: unknown[] }>;

  private quillInstance: Quill;

  private fontSizeArr = ['14px', '16px', '18px'];

  @Element() hostElement: HTMLElement;

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
    const fontSize = Quill.import('attributors/style/size') as Attributor;
    fontSize.whitelist = this.fontSizeArr;
    Quill.register(fontSize, true);
  }

  setCaretIcons() {
    const fontPicker = this.hostElement.querySelector('.ql-font .ql-picker-label svg');
    const fontSizePicker = this.hostElement.querySelector('.ql-size .ql-picker-label svg');

    fontPicker.innerHTML = convertIconToSVG(<ModusIconMap icon="caret_down" />);
    fontSizePicker.innerHTML = convertIconToSVG(<ModusIconMap icon="caret_down" />);
  }

  componentDidRender() {
    if (!this.quillInstance) {
      this.initializeQuillEditor();
    }
  }

  initializeQuillEditor() {
    const editorContainer = this.hostElement.querySelector('.editor-container') as HTMLElement;

    this.setIcons();
    this.setFontSize();

    const toolbarOptions = {
      container: [
        [{ font: ['serif', 'monospace'] }],
        [{ size: this.fontSizeArr }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: '' }, { align: 'center' }, { align: 'right' }],
        [{ list: 'bullet' }, { list: 'ordered' }],
        ['link'],
      ],
    };

    if (editorContainer) {
      this.quillInstance = new Quill(editorContainer, {
        modules: {
          toolbar: toolbarOptions,
        },
        placeholder: this?.placeholder,
        theme: 'snow',
      });

      if (this.content) {
        this.quillInstance.setText(this.content);
      }
      if (this.disabled) {
        this.quillInstance.enable(false);
      }

      this.attachQuillEventListeners();
    }

    this.setCaretIcons();
  }

  attachQuillEventListeners() {
    this.quillInstance.on('text-change', (delta, oldDelta, source) => {
      this.textChange.emit({ delta, oldDelta, source });
    });

    this.quillInstance.on('selection-change', (range, oldRange, source) => {
      this.selectionUpdate.emit({ range, oldRange, source });
    });

    this.quillInstance.on('editor-change', (eventName, ...args) => {
      this.editorChange.emit({ eventName, args });
    });
  }

  render() {
    const editorContainerClass = `editor-container ${this.disabled ? 'disabled' : ''}`;
    return <div class={editorContainerClass}></div>;
  }
}
