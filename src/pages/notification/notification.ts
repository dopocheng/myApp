import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { Storage} from '@ionic/storage';

import { RestProvider } from '../../providers/rest/rest'
import { BaseUI } from '../../common/baseui';
import { DetailsPage } from '../details/details';

// @IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {

  notifications: string[];
  errorMessage: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public rest: RestProvider,
    public loadingCtrl: LoadingController
  ) {
    super();
  }
  
  ionViewDidLoad() {
    this.storage.get('UserId').then((val) => {
      if(val != null ){
        var loading = super.showLoading(this.loadingCtrl,"数据增在加载。。。");
        this.rest.getNotifications(val)
        .subscribe(
          n => {
            this.notifications = n;
            // 有时页面切换太快 loading 还没消失，用 dismissAll 好
            loading.dismissAll();
          }, error => this.errorMessage = <any>error
        )
      }
    });
  }

  // 点击消息加载相应 DetailsPage 的详细页面数据
  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, {id: questionId});
  }


}
