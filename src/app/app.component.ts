import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, App } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginComponent } from './views/login/login.component';
import { AreaModel } from './models/area.model';
import { AppContainerComponent } from "./app-container.component";
import { UtilService } from "./common/services/util.service";
import { HelpComponent } from "./views/help/help.component";
import { LogsModalComponent } from "./views/logs/modal/logs-modal.component";
import { UpstreamService } from "./services/upstream/upstream.service";
import { LoggerService } from "./services/logger/logger-service";
import { AppConfigConstants } from "./constants/app-config.constants";
import { AuthenticationService } from "./services/authentication.service";
import { SettingsComponent } from "./views/settings/settings.component";
import { LoginModalService } from "./services/login-modal.service";
import { SecurityComponent } from "./views/security/security.component";
import { CACService } from "./services/cac.service";
import { SettingsService } from "./services/settings.service";

@Component({
    templateUrl: './app.html'
})
export class DMLESMobile implements OnInit {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = SecurityComponent;
    loggedOutAreas = new Array<AreaModel>();
    //loggedInAreas = new Array<AreaModel>();

    isMobility: boolean = false;

    home = 'Home';
    logOut = 'Logout';
    exit = 'Exit';
    settingsCount: number = 0;
    //isLoggedIn: boolean = false;

    constructor(
        public platform: Platform,
        private utilService: UtilService,
        private app: App,
        private authService: AuthenticationService,
        private loginModalService: LoginModalService,
        private upstreamService: UpstreamService,
        private log: LoggerService,
        private cacService: CACService,
        private settingService: SettingsService) {
        if (this.utilService.isProd() == false) {
            this.rootPage = AppContainerComponent;
        }
        // if you want to see the DoD warning in DEV / ionic serve --lab - use this block
        // if (this.utilService.isMobility() === false) {
        //     this.rootPage = AppContainerComponent;
        // }
    }

    ngOnInit(): void {
        this.initializeApp();
    }

    initializeApp() {
        this.setSettingsCount();
        this.platform.ready().then(() => {
            Splashscreen.hide();
            StatusBar.styleDefault();


            this.isMobility = this.utilService.isMobility();

            if (this.settingsCount < 1 && this.isMobility) {
                // add settings to the db from asset file
                this.settingService.getAssetFile();

            }

            // Attempt to connect to messaging server if connect flag is true
            if (AppConfigConstants.messagingServer.connect) {
                this.upstreamService.connect()
                    .then((client) => {
                        if (client.connected) {
                            this.log.debug(`Received connect event, Client ID: ${client.options.clientId}, connected: ${client.connected}`);
                        }
                    })
                    .catch((error) => {
                        this.log.error(error);
                    })
            }

            this.setLoggedInOutAreas();
        });
    }
    setLoggedInOutAreas() {
        //this.setAreas(this.loggedInAreas);
        this.setAreas(this.loggedOutAreas);
    }

    setAreas(areas: Array<AreaModel>) {
        areas.push(new AreaModel('Home', 'home', this.home, 'primary'));
        // todo show logged out, watch for token expiration
        // if (this.isLoggedIn) {
        //     areas.push(new AreaModel('Logout', 'log-out', this.logOut, 'gray'));
        // } else {
        areas.push(new AreaModel('Login', 'log-in', LoginComponent, 'gray'));
        //}

        //this.isMobility && !this.isProd
        if (this.isMobility && !this.utilService.isProd()) {
            // todo always show this?
            areas.push(new AreaModel('Logs', 'logo-android', LogsModalComponent, 'light'));
        }


        areas.push(new AreaModel('Settings', 'settings', SettingsComponent, 'light'));
        areas.push(new AreaModel('Help', 'help', HelpComponent, 'gray'));
        areas.push(new AreaModel(this.exit, 'exit', this.exit, 'light'));

    }

    goTo(area: AreaModel) {
        if (area.component !== undefined) {
            if (area.component == LoginComponent) {
                this.loginModalService.presentModal();
            } else if (area.component == this.logOut) {
                this.logout();
            } else if (area.component == this.home) {
                this.goToHome();
            } else if (area.component == this.exit) {
                // todo are you sure message...?
                this.exitApp();
            } else {
                this.nav.push(area.component);
            }
        } else {
            this.log.error('should not be here, component:' + area.component);
        }
    }

    goToHome() {
        this.app.getRootNav().setRoot(AppContainerComponent);
    }

    goToDoDConfirmationPage() {
        this.app.getRootNav().setRoot(SecurityComponent);
    }

    logout() {
        // todo are you sure message...?
        this.log.debug('in logout')
        this.authService.logout();

    }

    exitApp() {
        // TODO: this doesn't work as expected on the device...
        // are there any cordova plugins that do this?
        // we may need to create one
        this.log.info('exiting app')
        this.authService.logout();
        if (this.isMobility && !this.platform.is('ios')) {
            this.platform.exitApp();
        }
    }

    private setSettingsCount() {
        this.settingService.getCount().then((c) => {
            this.log.info('settings count is: ' + c);
            this.settingsCount = c;
        })

    }


}
