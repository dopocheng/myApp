import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {

  title: string;
  content: string;
  errorMessage: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  submitQuestion() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, "发表中。。。");
        this.rest.saveQuestion(val, this.title, this.content)
          .subscribe(f => {
            if (f["Status"] == "OK") {
              loading.dismiss();
              this.dismiss();
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["statusContent"])
            }
          }, error => this.errorMessage = <any>error);
      } else {
        super.showToast(this.toastCtrl,"请登录后再提问!");
      }
    });
  }
  //关闭modal页面
  dismiss() {
    this.viewCtrl.dismiss()
  }
}
