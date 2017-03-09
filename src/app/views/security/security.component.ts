import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AppContainerComponent } from "../../app-container.component";

@Component({
  selector: 'security',
  templateUrl: './security.html'
})
export class SecurityComponent {

  constructor(public navCtrl: NavController) {
  }


  startApp() {
    this.navCtrl.setRoot(AppContainerComponent);
  }

}
