import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class SettingProvider {

  private theme: BehaviorSubject<string>

  constructor(public http: HttpClient) {
    // 默认为白天样式
   this.theme = new BehaviorSubject('light-theme');
  }

  /**
   * 用户设置主题
   * 
   * @param {any} val 
   * @memberof SettingProvider
   */
  setActiveTheme(val){
    this.theme.next(val);
  }

  /**
   * 获得当前主题并返回
   * 
   * @returns 
   * @memberof SettingProvider
   */
  getActieTheme() {
    return this.theme.asObservable();
  }

}
