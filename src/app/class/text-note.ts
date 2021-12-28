import { SyncObject, SyncVar } from './core/synchronize-object/decorator';
import { DataElement } from './data-element';
import { TabletopObject } from './tabletop-object';
import { moveToTopmost } from './tabletop-object-util';

@SyncObject('text-note')
export class TextNote extends TabletopObject {
  @SyncVar() rotate: number = 0;
  @SyncVar() zindex: number = 0;
  @SyncVar() password: string = '';
  @SyncVar() isUpright: boolean = true;
  @SyncVar() isLocked: boolean = false;
  @SyncVar() isSizeLocked: boolean = false;
  @SyncVar() isOnlyPreview: boolean = false;

  get width(): number { return this.getCommonValue('width', 1); }
  
  get viewWidth(): number { 
    let element = this.getCommonValue('viewWidth', 1);
    if (!element && this.commonDataElement) {
      this.commonDataElement.appendChild(DataElement.create('viewWidth',  0, {}, 'viewWidth_' + this.identifier));
    }
    return element ? element  : 0;
  }
  get height(): number { 
    let element = this.getCommonValue('height', 1);
    if (!element && this.commonDataElement) {
      this.commonDataElement.appendChild(DataElement.create('height',  0, {}, 'height_' + this.identifier));
    }
    return element ? element  : 0;
  }
  get fontSize(): number { return this.getCommonValue('fontsize', 1); }
  get title(): string { return this.getCommonValue('title', ''); }
  get text(): string { return this.getCommonValue('text', ''); }
  set text(text: string) { this.setCommonValue('text', text); }

  toTopmost() {
    moveToTopmost(this);
  }

  static create(title: string, text: string, fontSize: number = 16, width: number = 1, height: number = 1,viewWidth: number = 0, identifier?: string): TextNote {
    let object: TextNote = identifier ? new TextNote(identifier) : new TextNote();

    object.createDataElements();
    object.commonDataElement.appendChild(DataElement.create('width', width, {}, 'width_' + object.identifier));
    object.commonDataElement.appendChild(DataElement.create('viewWidth', viewWidth, {}, 'viewWidth_' + object.identifier));
    object.commonDataElement.appendChild(DataElement.create('height', height, {}, 'height_' + object.identifier));
    object.commonDataElement.appendChild(DataElement.create('fontsize', fontSize, {}, 'fontsize_' + object.identifier));
    object.commonDataElement.appendChild(DataElement.create('title', title, {}, 'title_' + object.identifier));
    object.commonDataElement.appendChild(DataElement.create('text', text, { type: 'note', currentValue: text }, 'text_' + object.identifier));
    object.commonDataElement.appendChild(DataElement.create('altitude', 0, {}, 'altitude_' + object.identifier));
    object.initialize();

    return object;
  }
}
