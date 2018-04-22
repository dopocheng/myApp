import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { VersionsPage } from '../versions/versions';
import { Storage } from '@ionic/storage';
import { UserPage } from '../user/user';
import { UserdatalistPage } from '../userdatalist/userdatalist';
import { ScanPage } from '../../pages/scan/scan'

import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { SettingProvider } from '../../providers/setting/setting';

 
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  selectedTheme: string;
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
    private setting: SettingProvider
  ) {
    super();
    // 获得用户当前的主题
    this.setting.getActieTheme().subscribe(val => {
      this.selectedTheme = val;
    })
  }

  showModal() {
    let loginModal = this.modalCtrl.create(LoginPage);//model 关闭后不会再次触发，刷新父页面的方法(父页面的回调)
    loginModal.onDidDismiss(f => {
      this.loadUsrePage();
    });
    loginModal.present();
  }
  // ionViewDidEnter每次进入都会加载； ionViewDidLoad 只加载一次
  ionViewDidLoad() {
    //console.error(1);
    this.loadUsrePage();
  }

  // 获取当前用户的信息
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

  // 判断点击的是哪个 click 事件
  gotoDataList(type){
    this.navCtrl.push(UserdatalistPage, {"dataType":type})
  }
  //跳转到user页面
  gotoUserPage() {
    this.navCtrl.push(UserPage);
  }

  /**
   * 跳转到扫描二维码的页面，加上 animate= false 的参数是为了
   * 相机能狗仔整个屏幕中显示，如果不加，相机出不来
   * animate 的参数默认为 true 
   * 
   * @memberof MorePage
   */
  gotoScanQRCode() {
    this.navCtrl.push(ScanPage, null, {"animate": false});
  }

  // 跳转版本信息页面
  gotoVersions(){
    this.navCtrl.push(VersionsPage);
  }

  // 判断并修改用户当前的主题
  toggleChangeTheme(){
    if(this.selectedTheme === 'dark-theme'){
      this.setting.setActiveTheme('light-theme');
    }else{
      this.setting.setActiveTheme('dark-theme');
    }

  }

}
