import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
//import { Login } from "../login/login";

@Component({
  selector: 'security',
  templateUrl: './security.html'
})
export class SecurityComponent {

  constructor(public navCtrl: NavController) {    
  }


   startApp() {
        //this.navCtrl.setRoot(Login);
    }

}
