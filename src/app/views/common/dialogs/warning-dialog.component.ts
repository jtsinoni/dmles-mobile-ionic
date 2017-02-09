import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import { AppContainerComponent } from '../../../app-container.component';


@Component({
  selector: 'warning-dialog',
  templateUrl: './warning-dialog.component.html'
})
export class WarningDialogComponent {

  text: string;
  component: Component;

  constructor(public navCtrl: NavController, params: NavParams, public viewController: ViewController, private app: App) {
     this.text = params.get('txt');         
  }  

  continue() {
      this.viewController.dismiss();   
      //this.navCtrl.setRoot(AppContainerComponent);  
      this.app.getRootNav().setRoot(AppContainerComponent);
      
  }

  cancel() {
    this.viewController.dismiss();
  }
}