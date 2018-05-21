import { Http } from '@angular/http';
import { Events } from 'ionic-angular'
import { Injectable } from '@angular/core';

/*
  Generated class for the ChatserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//聊天信息属性
export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userImgUrl: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}
//用户信息属性
export class UserInfo {
  userId: string;
  userName: string;
  userImgUrl: string;
  message: string;
}

@Injectable()
export class ChatserviceProvider {
  constructor(
    public http: Http,
    public event: Events
  ) {
    // console.log('Hello ChatserviceProvider Provider');
  }
  /**
   * 获取消息列表
   * 从 API 获取或者从模拟的 JSON 获取
   * @returns null 
   * @memberof ChatserviceProvider
   */
  getMessageList(): Promise<ChatMessage[]> {
    const url = '../../assets/mock/msg-list.json';
    // promise是常用的知识点
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().array as ChatMessage[])
      .catch(error => Promise.reject(error || '错误信息'));
  }

  /**
   * 发送到API, 调用自动回复
   * 
   * @param {ChatMessage} message 
   * @returns 
   * @memberof ChatserviceProvider
   */
  sendMessage(message: ChatMessage) {
    return new Promise(resolve => setTimeout(() => {
      resolve(message);
    }, Math.random() * 1000))
      .then(() => {
        this.mockNewMessage(message);
      });
  }

  /**
   * 模拟对方回复一个消息
   * 前台如何即时地接收这个消息
   * 引入 Event 
   * 
   * @param {*} message 
   * @memberof ChatserviceProvider
   */
  mockNewMessage(message:any){
    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId: id,
      userId: '123321',
      userName: '慕课女神',
      userImgUrl: "http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg",
      toUserId: message.userId,
      time: Date.now(),
      message:' 刚才是不是你给我发送 [' + message.message + '] 这个消息？',
      status: 'success'
    }

    //进行消息的发布， 类似大喇叭进行广播
    setTimeout(() => {
      this.event.publish('chat.received', messageSend, Date.now())
    }, Math.random() * 1000);
  }

}
