import { Component } from '@angular/core';
import { LoginModel } from "../../models/login.model";
import { Platform, ModalController, ViewController } from 'ionic-angular';
import { OAuthService } from "../../services/oauth.service";
import { LoggerService } from "../../services/logger/logger-service";
import { AppService } from "../../services/app.service";
import { HostServerService } from "../../services/host-server.service";
import { ServerModel } from "../../models/server.model";
import { JSONWebTokenService } from "../../services/jason-web-token.service";
import { WarningDialogComponent } from "../common/dialogs/warning-dialog.component";
import { AppConfigConstants } from "../../constants/app-config.constants";

@Component({
    selector: 'login-login',
    templateUrl: './login.html'

})
export class LoginComponent {

    loginModel: LoginModel;

    constructor(private platform: Platform,
        private OAuthService: OAuthService,
        private log: LoggerService,
        private appService: AppService,
        private jwtService: JSONWebTokenService,
        private hostServerService: HostServerService,
        private modalController: ModalController,
        private viewController: ViewController) {
        this.loginModel = new LoginModel('');
        this.setLoginServer();

    }


    setLoginServer() {
        let server: ServerModel;
        this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
            if (server) {
                this.loginModel.serverName = server.toString();
                this.OAuthService.setServer(server);
            } else {
                this.loginModel.serverName = this.appService.getBtBaseUrl();
            }
        });
    }

    public login(loginModel: LoginModel) {
        let message = '';
        this.addLogMessage('logging in: ' + loginModel.username);
        this.platform.ready()
            .then(() => {
                this.OAuthService.getToken(loginModel.username)
                    .timeout(AppConfigConstants.timeout.login.value)
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

}
