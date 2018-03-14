import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';

import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

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
export class MorePage {

  public notLogin: boolean = true;
  public logined: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl:ModalController,
              public storage: Storage
              ) {
  }
  
  showModal(){
    let loginModal = this.modalCtrl.create(LoginPage);
    loginModal.present();
  }

  ionViewDidEnter() {
    this.loadUsrePage();
  }

  loadUsrePage() {
    this.storage.get('UserId').then((val)=>{
      if(val!=null){
        this.notLogin = false;
        this.logined = true;
      }else{
        this.notLogin = true;
        this.logined = false
      }
    });
  }
}
