import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {

  chatUserName: string;//接收传参 当前用户
  isOpenEmojiPicker = false;//控制 emoji 组件是否显示的标志

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  //获取 chat 页面传过来的参数
  this.chatUserName = navParams.get('username');   
  }

  // 当触发 click 事件 isOpenEmojiPicker 设置为 true
  switchEmojiPicker() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }
}
