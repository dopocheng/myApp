import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

// @IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI {

  id: string;//questionId 提问者的 id 
  content: string;//要发表的内容
  errorMessage: any;//错误信息

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
    super();
    //或取 detail 页面传过来的参数; 即 questionId
    this.id = this.navParams.get('id');
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AnswerPage');
  // }

  //关闭弹框
  dismiss() {
    this.viewCtrl.dismiss();
  }

  //向后台发送 answer 请求;携带参数 当前用户 userId  提问用户 questionId 回答内容 content
  submit() {
    // console.log("submit");
    this.storage.get("UserId").then((val) => {
      if (val !== null) {
        var loading = super.showLoading(this.loadingCtrl, "发布中。。。");
        this.rest.answer(val, this.id, this.content)
          .subscribe(
            f => {
              if (f["Status"] == "OK") {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["StatusContent"]);
                //设置延迟;先显示提示成功,再去关闭当前的页面
                setTimeout(() => {
                  this.dismiss();
                }, 1000);
              } else {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["StatusContent"]);
              }
            }, error => this.errorMessage = <any>error);
      } else {
        super.showToast(this.toastCtrl, "请登录后再回答!");
      }
    });
  }
}
