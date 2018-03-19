import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

import { UserPage } from '../user/user';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  public notLogin: boolean = true;
  public logined: boolean = false;
  headFace: string;
  userInfo: string[];
  nickName: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
  ) {
    super();
  }

  showModal() {
    let loginModal = this.modalCtrl.create(LoginPage);//model 关闭后不会再次触发，刷新父页面的方法(父页面的回调)
    loginModal.onDidDismiss(f => {
      this.loadUsrePage();
    });
    loginModal.present();
  }

  ionViewDidEnter() {
    //console.error(1);
    this.loadUsrePage();
  }

  loadUsrePage() {
    //console.error(2);
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载数据用户
        var loading = super.showLoading(this.loadCtrl, "加载数据中。。。");
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.userInfo = userinfo;
              this.nickName = userinfo["UserNickName"];
              this.headFace = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();//资源文件添加随机数消除缓存
              this.notLogin = false;
              this.logined = true;
              loading.dismiss();
            });
      } else {
        this.notLogin = true;
        this.logined = false;
      }
    });
  }
  //跳转到user页面
  gotoUserPage() {
    this.navCtrl.push(UserPage);
  }

}
