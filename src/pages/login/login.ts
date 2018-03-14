import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController} from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  //从前台获取的值
  mobile: any;
  password: any;
  errorMessage:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl:LoadingController,
              public rest: RestProvider,
              public toastCtrl: ToastController,
              public storage: Storage
            ) {
              super();//调用父类的构造函数 constructor
  }

  login() {
    var loading = super.showLoading(this.loadingCtrl,"登陆中。。。")
    this.rest.login(this.mobile, this.password)//rest返回回来的方法（rest的provide）的使用，返回的observe的方法可以调用subscribe
    .subscribe(
      f=>{
        if(f["Status"]=="OK") {
          //处理跳转成功的页面
          //你也可以存储接口返回的 token
          this.storage.set('UserId', f["UserId"]);
          loading.dismiss();
          this.dismiss();
        }else{
          loading.dismiss();
          super.showToast(this.toastCtrl,f["StatusContent"])
        }
      },error=>this.errorMessage = <any>error);//?什么意思？
  }

  /**
   * 关闭当前页面的方法，调用自身viewCtrl的dismiss方法
   * 
   * @memberof LoginPage
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
