import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest'
 
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {

  mobile: any;
  nickname: any = '';
  password: any ='';
  confirmPassword:any ='';
  errorMessage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl:LoadingController,
              public rest: RestProvider,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController
            ) {
              super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
//已有账号返回
  gotoLogin() {
    this.navCtrl.pop();
  }
//注册账号
doRegister() {
  //前台验证表单数据的正确性
  if(!(/^1[34578]\d{9}$/.test(this.mobile))){//^开头，$结尾,\d从中括号挑一位，{9}还有9位
    super.showToast(this.toastCtrl, "您输入的手机号码格式不正确2!")
  }else if(this.nickname.length < 3 || this.nickname.length > 10) { 
    super.showToast(this.toastCtrl, "昵称的长度应该在 3 ~ 10 位之间!");
  }else if(this.password.length < 6 || this.password.length > 20 
        || this.confirmPassword.length < 6 || this.confirmPassword.length > 20) {
    super.showToast(this.toastCtrl, "密码和确认密码的长度应该在 6 ~ 20 位之间!")     
  }else if(this.password != this.confirmPassword) {
    super.showToast(this.toastCtrl, "两次输入的密码不一样!");
  }else{  
    var loading = super.showLoading(this.loadingCtrl,"注册中。。。");
    this.rest.register(this.mobile, this.nickname, this.password)
    .subscribe(
      f=>{
        if(f["Status"]=="OK") {
          loading.dismiss();
          super.showToast(this.toastCtrl, "注册成功!");
          this.dismiss();
        }else{
          loading.dismiss();
          super.showToast(this.toastCtrl, f["StatusContent"]);
        }
      },error=>this.errorMessage = <any>error)
    }
}

dismiss() {
  this.viewCtrl.dismiss();
}

}
