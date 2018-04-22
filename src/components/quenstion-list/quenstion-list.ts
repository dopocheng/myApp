import { NavController, LoadingController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';

import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { DetailsPage } from '../../pages/details/details';

@Component({
  selector: 'quenstion-list',
  templateUrl: 'quenstion-list.html'
})
export class QuenstionListComponent extends BaseUI{

  errorMessage: any;
  questions: string[];

  // datatype 外部传递进来， DataSourceType 本地接收之后的参数命名
  @Input('datatype') dataSourceType;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public rest: RestProvider,
    public loadingCtrl: LoadingController

  ) {
    super();
    // console.log('Hello QuenstionListComponent Component');
  }

  // component 这里没有 ionViewDidLoad 生命周期的函数
  ngAfterContentInit() {
    this.storage.get('UserId').then((val) => {
      if(val != null){
        let loading = super.showLoading(this.loadingCtrl, "数据加载中。。。")
        this.rest.getUserQuestionList(val, this.dataSourceType)
        .subscribe(
          q => {
            this.questions = q;
            loading.dismissAll();
          },
          error => this.errorMessage = <any>error);
      }
    })    
  }

  // 跳转到对应问题页面
  gotoDetiles(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId} );
  }

}
