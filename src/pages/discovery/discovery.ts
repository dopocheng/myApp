import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../../pages/details/details';

@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI {

  questions: string[];//所有的问题
  errorMessage: any;//处理错误
  refresher = "as";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
  ) {
    super();
  }

  ionViewDidLoad() {
    //页面加载完成后调用 getQuestions() 方法
    this.getQuestions(this.refresher);
  }
  //请求后台,返回所有的问题; "refresher" 控制下拉刷新时不会触发 loading
  getQuestions(refresher) {
    //判断 this.refresher 是否为 "refresher.state = refreshing".
    if (this.refresher !== "refreshing") {
      var loading = super.showLoading(this.loadingCtrl, "数据加载中。。。");
    }
    this.rest.getQuestions()
      .subscribe(
        q => {
          //返回的数据赋值给 questions ;用于页面展示
          this.questions = q;
          //判断 this.refresher 是否为 "refresher.state = refreshing".
          if (this.refresher !== "refreshing") {
            loading.dismiss();
          }
        }, error => this.errorMessage = <any>error);
  }

  //关闭刷新
  doRefresh(refresher) {
    // console.log(refresher);
    this.refresher = refresher.state;
    this.getQuestions(this.refresher);
    //刷新 logo 延迟 1s,等待执行 getQuestions() 方法结束.
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  //页面间的传参方法
  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }
}
