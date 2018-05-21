import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController} from 'ionic-angular';

import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { AnswerPage } from '../answer/answer'

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {

  id: string;//前一个页面的 id
  userId: string;//当前使用者 id
  question: string[];//问题列表
  answers: string[];//问题的回答列表
  errorMessage: any;//错误处理
  isFavourite: boolean;//是否关注
  isMyQuestion: boolean;//是否自己的问题

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public modalCtrl: ModalController
  ) {
    super();
  }

  ionViewDidLoad() {
    //获得页面传过来的参数
    this.id = this.navParams.get('id');
    // console.error("ssssssssss= " + this.id);
    this.loadQuestion(this.id);
  }
  //加载问题内容和回答的内容
  loadQuestion(id) {
    this.storage.get('UserId').then(
      (val) => {
        if (val !== null) {
          this.userId = val;
          var loading = super.showLoading(this.loadingCtrl, "数据加载中。。。");
          this.rest.getQuestionWithUser(id, val)
            .subscribe(
              q => {
                loading.dismiss();
                this.question = q;
                // console.error("ssssssssss" + q["IdentityId"]);
                //对问题的回答
                this.answers = q["Answers"];
                this.isFavourite = q["IsFavourite"];
                //提问的 id 与当前的 id 比较是否相等
                this.isMyQuestion = (q["OwnUserId"] == val);
              }, 
              error => this.errorMessage = <any>error);
        }
      }
    );
  }
  //关注和取消关注
  saveFavourte() {
    console.log("saveFavourte");
    var loading = super.showLoading(this.loadingCtrl, "请求中。。。");
    this.rest.saveFavourte(this.id, this.userId)
      .subscribe(
        f => {
          //两个 id 通过后台判断， 返回一个状态 
          if (f["Status"] == "OK") {
            loading.dismiss();
            super.showToast(this.toastCtrl, this.isFavourite ? "取消关注成功!" : "关注问题成功!");
            this.isFavourite = !this.isFavourite;
          }
        },
        error => this.errorMessage = <any>error);
  }
  //弹出回答界面
  showAnswerPage(){
    // console.log("gotoAnswer");
    //modal 传参 要回答问题的 Id,还有之前的 navigation 导航栏传参 
    let modal = this.modalCtrl.create(AnswerPage, {"id" : this.id});
    //页面关掉后的回调
    modal.onDidDismiss(() => {
      this.loadQuestion(this.id);
    })
    modal.present();
  }
}
