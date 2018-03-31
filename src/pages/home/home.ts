import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, Tabs } from 'ionic-angular';

import { QuestionPage } from '../question/question';
import { LoginPage } from '../login/login';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest'
import { DetailsPage } from '../../pages/details/details'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {

  feeds: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider
  ) {
    super();
  }

  //页面加载完成
  ionViewDidLoad(){
    this.getFeeds();
  }

  gotoQuestion() {
    console.log(11);
    let modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }

  gotoChat() {
    this.selectTab(2);
  }
  /**
   * 选定指定的 tabs
   * 
   * @param {number} index 
   * @memberof HomePage
   */
  selectTab(index: number) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index);
  }

  //获得首页的流（自己关注的问题被回答了）
  getFeeds() {
    var loading = super.showLoading(this.loadingCtrl, "数据加载中。。。");
    this.rest.getFeeds()
      .subscribe(
        f => {
          this.feeds = f;
          loading.dismiss();
        },
        error => this.errorMessage = <any>error
      );
  }
  //页面间的传参方法
  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage,{id: questionId});
  }

}
