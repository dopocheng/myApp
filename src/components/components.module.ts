import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmojipickerComponent } from './emojipicker/emojipicker';

//相当于路由
@NgModule({
	declarations: [
		EmojipickerComponent
	],
	imports: [
		IonicPageModule.forChild(EmojipickerComponent),
	],
	//ng5 要增加这个不然解析不了自定义的组件 
	 exports: [
		EmojipickerComponent
	]
})
export class ComponentsModule { }
