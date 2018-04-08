import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiProvider } from '../../providers/emoji/emoji';

/**
 *可以查看 Component API
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

 //默认的定义做成自身的 provide
export const EMOJI_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // 传递给使用
  useExisting: forwardRef(() => EmojipickerComponent),
  multi: true
}

@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html',
  providers: [EMOJI_ACCESSOR]
})

//自定义表单必须实现 控件 ControlValueAccessor 接口中的所有方法
export class EmojipickerComponent implements ControlValueAccessor {
  
  emojiArray = [];//存放 13 组 emoji 图标
  content: string;//输入框的内容
  onChanged: any = () => { };//要实现的方法
  onTouch: any = () => { };//要实现的方法

  constructor(emojiProvider: EmojiProvider) {
    this.emojiArray = emojiProvider.getEmojis();
  }

  //写一个新的值到 element
  writeValue(obj: any): void {
    // 判断 obj 是否是非 undefine null 空字符串，是则赋为空 
    this.content = obj ? obj : "";
  }
  //registerOnChange() 可以用来通知外部，组件已经发生变化
  registerOnChange(fn: any): void {
    this.onChanged = fn;
    console.log("registerOnChange");
    this.setValue(this.content);
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  //?可以不用实现
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error("Method not implemented.");
  // }

  // click 事件传入 item 即 emoji 图标再；处理新的赋值以及函数绑定
  setValue(val: any): any{
    // console.error("setValue");
    this.content += val;
    if (this.content) {
      this.onChanged(this.content);
    }
  }
};
