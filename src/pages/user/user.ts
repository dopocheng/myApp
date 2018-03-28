import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { HeadfacePage } from '../../pages/headface/headface';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {


  nickName: string = "加载中。。。";
  headFace: string = "http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg";
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
  ) {
    super();
  }

  ionViewDidEnter() {
    this.loadUserPge();
    console.error(this.nickName);
  }

  loadUserPge() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadCtrl, "加载数据中。。。");
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.nickName = userinfo["UserNickName"];
              this.headFace = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
              loading.dismiss();
            }, error => this.errorMessage = <any>error
          )
      }
    })
  }

  //保存方法
  updateNickName() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadCtrl, "修改中。。。");
        this.rest.updateNickName(val, this.nickName)
          .subscribe(
            f => {
              if (f["Status"] == "OK") {
                super.showToast(this.toastCtrl, "修改成功!");
                loading.dismiss();
              } else {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["StatusContent"])
              }
            },error => this.errorMessage = <any>error
          )
      }
    });
  }

  //注销
  unload() {
    console.error("1111");
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }

  //调到 headFace 页面
  gotoHeadFace() {
    this.navCtrl.push(HeadfacePage);
  }
}
