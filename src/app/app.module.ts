import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
// import { Http } from '@angular/http'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { MorePage } from '../pages/more/more';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { HeadfacePage } from '../pages/headface/headface';
import { TrianglePage} from '../pages/triangle/triangle';
import { QuestionPage } from '../pages/question/question';
import { DetailsPage } from '../pages/details/details';
import { AnswerPage } from '../pages/answer/answer';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { NotificationPage } from '../pages/notification/notification';
import { UserdatalistPage } from '../pages/userdatalist/userdatalist';
import { ScanPage } from '../pages/scan/scan'
import { VersionsPage } from '../pages/versions/versions';
import { RelativetimePipe } from '../pipes/relativetime/relativetime';
//导入自定义表情包
import { EmojiProvider} from '../providers/emoji/emoji';
import { SettingProvider } from '../providers/setting/setting';
  /*                  为嘛这个路由要导入             */  
import { ComponentsModule } from '../components/components.module';
//导入外部的四个组件
import { File} from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { QRScanner } from '@ionic-native/qr-scanner';
import { AppVersion } from '@ionic-native/app-version';
import { ChatserviceProvider } from '../providers/chatservice/chatservice';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    LoginPage,
    TabsPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    TrianglePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    UserdatalistPage,
    RelativetimePipe,
    ScanPage,
    VersionsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    HttpModule,
    // Http,//全局需要导入Http
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
    }),
    ComponentsModule,
    IonicStorageModule.forRoot(),//全局定义 storge的模块
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    LoginPage,
    TabsPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    TrianglePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    UserdatalistPage,
    ChatdetailsPage,
    ScanPage,
    VersionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,//rest 的定义导入
    File,  
    Transfer, 
    TransferObject, 
    FilePath, 
    Camera,
    QRScanner,
    EmojiProvider,
    ChatserviceProvider,
    SettingProvider,
    AppVersion
  ]
})
export class AppModule {}
