import { Component } from '@angular/core';
import { LoginModel } from "../../models/login.model";
import { NavController, Platform } from 'ionic-angular';
import { Storage } from "@ionic/storage";
//import { SecurityComponent } from "../security/security.component";
import { AppContainerComponent } from '../../app-container.component';
import { OAuthService } from "../../services/oauth.service";
import { LoggerService } from "../../services/logger/logger-service";
import { AppService } from "../../services/app.service";

@Component({
  selector: 'login-login',
  templateUrl: './login.html',
  providers: [Storage]
})
export class LoginComponent { 
 
  loginModel: LoginModel;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public storage: Storage,
    private OAuthService: OAuthService,
    private log: LoggerService,
    private appService: AppService) {
    this.loginModel = new LoginModel(this.appService.getBtBaseUrl());

  }

  public login(loginModel: LoginModel) {
    let message = '';
    this.addLogMessage('logging in: ' + loginModel.username);
    this.platform.ready()
      .then(() => {
        this.OAuthService.getToken(loginModel.username)
          .subscribe(
          (token) => {
            message = `OAuth Token => ${token}`;
            this.addLogMessage(message);
          },
          (error) => {
            message = `Error => ${error}`;
            this.logErrorMessage(message);
          },
          () => {
            message = `Authentication Complete`;
            this.addLogMessage(message);
            this.navCtrl.setRoot(AppContainerComponent);
          }
          )
      }).then(() => {
        //todo remove this for real Authentication
        this.navCtrl.setRoot(AppContainerComponent);
      })
      .catch((error) => {
        message = `Error => ${error}`;
        this.logErrorMessage(message);
      });
  }

  private addLogMessage(message: string) {
    this.log.info(message);
  }

  private logErrorMessage(error: string) {
    this.log.error(error);
  }


}
