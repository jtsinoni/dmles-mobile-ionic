import { Component } from "@angular/core";
import { ViewController, App, Platform } from 'ionic-angular';
import { AuthenticationService } from "../../../services/authentication.service";
import { LoginComponent } from "../../login/login.component";
  

@Component({
  templateUrl: './app-menu.component.html'  
  
})
export class AppMenuComponent {

  logIn  = 'Login';
  logOut = 'Logout'; 
  logInOrOut: string = this.logOut;

  constructor(public viewCtrl: ViewController, private app: App, private platform: Platform, private authService: AuthenticationService) { 

  }

  ionViewWillEnter() {
    if (this.authService.isTokenValid()) {
      this.logInOrOut = this.logOut;
    } else {
      this.logInOrOut = this.logIn;
    }
  }

  logInOut() {
    
    this.authService.logout();
    this.app.getRootNav().setRoot(LoginComponent);
    this.viewCtrl.dismiss();
    
  }
  exit() {
    this.authService.logout();
    this.viewCtrl.dismiss();
    this.platform.exitApp();  
  }
  close() {
    this.viewCtrl.dismiss();
  }


}