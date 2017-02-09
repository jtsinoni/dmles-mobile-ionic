import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';


@Component({
  selector: 'warning-dialog',
  templateUrl: './warning-dialog.component.html'
})
export class WarningDialogComponent {

  text: string;
  message: string;
  

  constructor(public navCtrl: NavController, params: NavParams, public viewController: ViewController, private app: App) {
     this.text = params.get('txt');
     this.message = params.get('message');
  }  

  continue() {
      this.viewController.dismiss();         
  }

}
