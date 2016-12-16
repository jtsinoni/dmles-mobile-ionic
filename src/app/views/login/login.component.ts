import { Component } from '@angular/core';
//import { User } from "../user/user";
import { NavController, Events } from 'ionic-angular';
import { Storage } from "@ionic/storage";
//import { DMLESMobile } from "../app-container";
import { SecurityComponent } from "../security/security.component";

@Component({
  selector: 'login-login',
  templateUrl: 'login.html',
  providers: [Storage]
})
export class LoginComponent {

  isLoggedIn = 'isLoggedIn';
  

  constructor(public navCtrl: NavController, public storage: Storage, public events: Events) {
    
  }

  signIn(event, user) {
    // todo do something with user...
    //this.user = user;
    this.storage.set(this.isLoggedIn, true);
    this.events.publish('login : signIn');
    //this.navCtrl.setRoot(AppContainer);
  }
   signOut(event) {
    // todo do something with user...
    //this.user = null;
    this.storage.remove(this.isLoggedIn);
    this.events.publish('login : signOut')
    this.navCtrl.push(SecurityComponent);

  }


}
