import { Component } from '@angular/core';
import { NavController, NavParams , ToastController, ActionSheetController, ModalController, ViewController, LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
//导入外部的四个组件
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;//导入第三方的库定义到 TS 项目中

@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {

  userId: string;
  errormessage: string;
  lastImage: string = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public transfer: Transfer,
    public file: File,
    public filePath: FilePath,
    public platform: Platform,
    public toastCtl: ToastController,
    public viewCtrl: ViewController
  ) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
      }
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从相册中选取',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: '打开相机',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('取消上传！');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    //定义相机的参数
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,//是否保存拍摄的照片到相册
      corrrectOrientation: true,//是否纠正拍摄的照片方向
    };

    //获取图片的方法
    this.camera.getPicture(options).then((imagePath) => {
      //特别处理 Android 平台文件路径问题
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)//获取 Android 平台下的文件路径
          .then(filePath => {
            //获取正确的路径
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);

            //获取正确的文件名
            // let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            let currentName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        //获取正确的路径
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //获取正确的文件名
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (error) => {
      super.showToast(this.toastCtl, "选择图片出现错误， 请在 APP 中操作查看相关权限");
    });

  }
  //将获得到的图片或相机进行一下另存为，用于后期的上传使用
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, (error) => {
      super.showToast(this.toastCtl, "储存图片到本地出现错误!");
    });
  }

  //为文件生成一个新的文件名
  createFileName() {
    var d = new Date(),//获得日期
      n = d.getTime(),//时间
      newFileName = n + ".jpg";//拼接文件名
    return newFileName;
  }
  //处理图片路径为可以上传的路径
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  //上传图片
  uploadImage() {
    var url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    var targetPath = this.pathForImage(this.lastImage);
    var filename = this.userId + ".jpg";//定义上传后的文件名

    //上传参数
    var options = {
      filekey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/for-data",
      params: { 'filename': filename, 'userid': this.userId }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    var loading = super.showLoading(this.loadCtrl, "上传中。。。");

    //开始正式上传
    fileTransfer.upload(targetPath, url, options).then(data => {
      loading.dismiss();
      super.showToast(this.toastCtl, "图片上传成功!");

      //在用户看清弹窗提示后进行页面的关闭
      setTimeout(() => {
        this.viewCtrl.dismiss();
      }, 3000);

    }, error => {
      loading.dismiss();
      super.showToast(this.toastCtl, "图片上传错误，请重试！");
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
