import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiProvider } from '../../providers/emoji/emoji';

/**
 * Generated class for the EmojipickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export const EMOJI_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmojipickerComponent),
  multi: true
}

@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html',
  providers: [EMOJI_ACCESSOR],
})

//自定义表单必须实现 控件 ControlValueAccessor 接口中的所有方法
export class EmojipickerComponent implements ControlValueAccessor {

  emojiArray = [];//存放 13 组 emoji 图标
  content: string;//输入框的内容
  onChanged: Function;//要实现的方法
  onTouch: Function;//要实现的方法

  constructor(emojiProvider: EmojiProvider) {
    this.emojiArray = emojiProvider.getEmojis();
  }

  writeValue(obj: any): void {
    this.emojiArray = obj;
  }
  //registerOnChange() 可以用来通知外部，组件已经发生变化
  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.setValue(this.onChanged);
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  //?可以不用实现
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error("Method not implemented.");
  // }

  // click 事件传入 item 即 emoji 图标
  setValue(val: any) {
    this.content += val;
    if (this.content) {
      this.onChanged(this.content);
    }
  }
}
