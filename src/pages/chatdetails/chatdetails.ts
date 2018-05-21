import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Content, TextInput, Events} from 'ionic-angular';

import { ChatserviceProvider, ChatMessage } from '../../providers/chatservice/chatservice';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest'

@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage extends BaseUI {
  chatUserName: string;//接收传参 当前用户
  chatUserId: string;//和谁聊天
  userId: string;//当前用户 ID
  userName: string;//当前用户名
  userImgUrl: string;//当前用户头像
  isOpenEmojiPicker = false;//控制 emoji 组件是否显示的标志
  //定义一个 ChatMessage 类型的空数组
  messageList: ChatMessage[] = [];
  errorMessage: any;
  editorMessage: string; //输入框文本内容
  @ViewChild(Content) content: Content; //全局的 content 注意写法
  @ViewChild('chatInput') messageInput: TextInput //获取前台的输入框

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chatService: ChatserviceProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public event: Events
  ) {
    super();
    //获取 chat 页面传过来的参数
    this.chatUserName = navParams.get('username');
    this.chatUserId = navParams.get('userid');
  }
  //页面进入时就要去请求，(若使用 ionViewDidLoad 页面闪一下,现在用的是 mock 可能效果不明显)
  ionViewWillEnter() {
    //获取用户信息
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        // 若放在 getUserInfo 会先看到自己的信息在左边然后在到右边
        this.userId = val;
        console.error("storage" + this.userId);
        this.rest.getUserInfo(val)
          .subscribe(userinfo => {
            this.userName = userinfo["UserNickName"];
            this.userImgUrl = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
          }, error => this.errorMessage = <any>error);
      }
      // 向后台或 mock 获取数据
      this.getMessage()
        .then(() => {
          // 自动滚屏
          this.scrollToBottom();
        })
    })

    //刚进入页面就听取发布的消息即 订阅
    this.event.subscribe('chat.received',(msg,time) => {
      // mockNewMessage()模拟自动回复的数据
      this.messageList.push(msg);
      this.scrollToBottom();
    })
  }

  sendMessage() {
    // trim()去掉字符串的开头和结尾的空格若 "   " 取为 ""
    if (!this.editorMessage.trim()) {
      console.error("sendMessage");
      return;
    }
    
    // 按时间给要发送的消息设置一个 id 
    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId: id,
      userId: this.userId,
      userName: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.chatUserId,
      time: Date.now(),
      message: this.editorMessage,
      status: 'pending'
    }
    // 放到已定义的数组中
    this.messageList.push(messageSend);
    this.scrollToBottom();

    this.editorMessage = '';

    // 表情选择窗口关闭状态时,光标焦点放到输入框
    if (!this.isOpenEmojiPicker) {
      this.messageInput.setFocus();
    }
    
    //发送消息并改变消息的状态
    this.chatService.sendMessage(messageSend)
      .then(() => {
        let index = this.getMessageIndex(id);
        if (index != -1) {
          this.messageList[index].status = 'success';
        }
      })

      // 图片发送后关闭 emoji 选择窗口
      if (this.isOpenEmojiPicker) {
        this.isOpenEmojiPicker = false;
      }
  }

  ionViewWillLeave() {
    // 进行订阅的取消
    this.event.unsubscribe('chat.received');
  }
 
  // 焦点
  focus() {
    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  /**
   * 调用 service 里面的方法进行属性的赋值
   * 获得最初的mock数据
   * 
   * @returns 
   * @memberof ChatdetailsPage
   */
  getMessage() {
    return this.chatService.getMessageList()
      .then(res => {
        // 将mock过来的数据放到messageList给前端使用
        this.messageList = res;
        // 查看mock过来的数据
        // console.log("getMessage=="+this.messageList)
        for (var i = 0; i < (this.messageList.length); i++) {
          // console.error(this.messageList[i].userId);
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  // 滚屏
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom()) {
        this.content.scrollToBottom();
      }
    }, 400);
  }

  //获取消息下标
  getMessageIndex(id: string) {
    return this.messageList.findIndex(e => e.messageId === id);
  }

  /**
   * 切换表情组件
   * 当触发 click 事件 isOpenEmojiPicker 设置为 true
   * @memberof ChatdetailsPage
   */
  switchEmojiPicker() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }
}
