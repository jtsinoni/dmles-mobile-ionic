import { Component } from '@angular/core';
import { LoginModel } from "../../models/login.model";
import { Platform, ModalController, ViewController } from 'ionic-angular';
//import { AppContainerComponent } from '../../app-container.component';
import { OAuthService } from "../../services/oauth.service";
import { LoggerService } from "../../services/logger/logger-service";
import { AppService } from "../../services/app.service";
import { JSONWebTokenService } from "../../services/jason-web-token.service";
import { WarningDialogComponent } from "../common/dialogs/warning-dialog.component";

@Component({
    selector: 'login-login',
    templateUrl: './login.html'

})
export class LoginComponent {

    loginModel: LoginModel;

    constructor(private platform: Platform,
        //public navCtrl: NavController,
        private OAuthService: OAuthService,
        private log: LoggerService,
        private appService: AppService,
        private jwtService: JSONWebTokenService,
        private modalController: ModalController,
        private viewController: ViewController
        //private menuController: MenuController,
        //private app: App
        ) {
        this.loginModel = new LoginModel(this.appService.getBtBaseUrl());
        //this.menuController.enable(false, "mainMenu");

    }

    public login(loginModel: LoginModel) {

        let message = '';
        this.addLogMessage('logging in: ' + loginModel.username);
        this.platform.ready()
            .then(() => {
                this.OAuthService.getToken(loginModel.username)
                    .subscribe(
                    (token) => {
                        let decodedToken = this.jwtService.decodeToken(token);
                        let message = `OAuth Token Decoded => ${JSON.stringify(decodedToken)}`;
                        this.addLogMessage(message);
                    },
                    (error) => {
                        message = `Error => ${error}`;
                        this.logErrorMessage(message);
                        this.viewController.dismiss();
                        this.showErrorModal(message);
                    },
                    () => {
                        message = `Authentication Complete`;
                        this.addLogMessage(message);
                        //this.navCtrl.setRoot(AppContainerComponent, );
                        //this.app.getRootNav().setRoot(AppContainerComponent);
                        this.viewController.dismiss();
                    })
            })
            .catch((error) => {
                message = `Error => ${error}`;
                this.logErrorMessage(message);
                this.viewController.dismiss();
                this.showErrorModal(message);
            });
    }

    private addLogMessage(message: string) {
        this.log.info(message);
    }

    private logErrorMessage(error: string) {
        this.log.error(error);
    }

    private showErrorModal(error) {
        let msg = 'Until you establish a connection with a server you will be in off-line / disconnected mode.';
        let errorModal = this.modalController.create(WarningDialogComponent, { txt: error, message: msg });
        errorModal.present();
    }

    // cancel() {
    //     this.viewController.dismiss();
    // }



}
