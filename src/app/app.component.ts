import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, App, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginComponent } from './views/login/login.component';
import { AreaModel } from './models/area.model';
import { AppContainerComponent } from "./app-container.component";
import { UtilService } from "./common/services/util.service";
import { HelpComponent } from "./views/help/help.component";
import { LogsModalComponent } from "./views/logs/modal/logs-modal.component";
import { LoggerService } from "./services/logger/logger-service";
import { AuthenticationService } from "./services/authentication.service";
import { SettingsComponent } from "./views/settings/settings.component";
import { LoginModalService } from "./services/login-modal.service";
import { SecurityComponent } from "./views/security/security.component";
//import { CACService } from "./services/cac.service";
import { SettingsService } from "./services/settings.service";
import { AppInjector } from "./app.module";
import { NetworkService } from "./services/network.service";
import {AppVersionService} from "./services/app-version.service";

@Component({
    templateUrl: './app.html'
})
export class DMLESMobile implements OnInit {
    @ViewChild(Nav) nav: Nav;

    private statusBar: StatusBar;
    private splashScreen: SplashScreen;

    rootPage: any = SecurityComponent;
    loggedOutAreas = new Array<AreaModel>();
    //loggedInAreas = new Array<AreaModel>();

    isMobility: boolean = false;

    home = 'Home';
    logOut = 'Logout';
    exit = 'Exit';
    settingsCount: number = 0;
    isLoggedIn: boolean = false;

    constructor(
        public platform: Platform,
        private utilService: UtilService,
        private app: App,
        private authService: AuthenticationService,
        private loginModalService: LoginModalService,
        private log: LoggerService,
        private settingService: SettingsService,
        public alertController: AlertController) {
        if (this.utilService.isProd() == false) {
            this.rootPage = AppContainerComponent;

            //this.loginModalService.presentModal();
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
            // Initialize Ionic-Plugins
            AppInjector.get(AppVersionService);
            AppInjector.get(NetworkService);
            //AppInjector.get(CACService);
            this.splashScreen = AppInjector.get(SplashScreen);
            this.statusBar = AppInjector.get(StatusBar);

            this.splashScreen.hide();
            this.statusBar.styleDefault();

            this.isMobility = this.utilService.isMobility();
            if (this.settingsCount < 1 && this.isMobility) {
                // add settings to the db from asset file
                this.settingService.getAssetFile();

            }
            this.setLoggedInOutAreas();

            // If logged in show area Logout, remove area Logout when logging out
            this.authService.onLoggedIn().subscribe((loggedIn: boolean) => {
                if(loggedIn) {
                    this.loggedOutAreas.forEach((area, index) => {
                        if(area.component == LoginComponent) {
                            this.loggedOutAreas.splice(index, 1);
                        }
                    });                    
                    this.loggedOutAreas.push(new AreaModel('Logout', 'log-out', this.logOut, 'gray'));
                    this.goToHome();
                } else {
                    this.loggedOutAreas.forEach((area, index) => {
                        if(area.component == this.logOut || area.component == LoginComponent) {
                            this.loggedOutAreas.splice(index, 1);
                        }
                    });
                    this.loggedOutAreas.push(new AreaModel('Login', 'log-in', LoginComponent, 'gray'));
                }
            }); 

            this.loginModalService.presentModal();
        });
    }
    setLoggedInOutAreas() {
        //this.setAreas(this.loggedInAreas);
        this.setAreas(this.loggedOutAreas);
    }

    setAreas(areas: Array<AreaModel>) {
        areas.push(new AreaModel('Home', 'home', this.home, 'primary'));

        //this.isMobility && !this.isProd
        if (this.isMobility && !this.utilService.isProd()) {
            // todo always show this?
            areas.push(new AreaModel('Logs', 'logo-android', LogsModalComponent, 'light'));
        }
        areas.push(new AreaModel('Settings', 'settings', SettingsComponent, 'light'));
        areas.push(new AreaModel('Help', 'help', HelpComponent, 'gray'));
        if(!this.isLoggedIn) {
            this.loggedOutAreas.push(new AreaModel('Login', 'log-in', LoginComponent, 'gray'));
        }
    }

    goTo(area: AreaModel) {
        if (area.component !== undefined) {
            if (area.component == LoginComponent) {
                this.loginModalService.presentModal();
            } else if (area.component == this.logOut) {
                this.confirmLogout();
            } else if (area.component == this.home) {
                this.goToHome();
            } else {
                this.nav.push(area.component);
            }
        } else {
            this.log.error('should not be here, component:' + area.component);
        }
    }

    goToHome() {
        this.app.getRootNav().popToRoot();
    }

    private logout() {
        // todo are you sure message...?
        this.log.debug('in logout')
        this.authService.logout()
            .then(() => {
                this.app.getRootNav().setRoot(AppContainerComponent);
            })
            .catch((error) => {
                this.log.error(`${error}`);
            });
    }

    confirmLogout() {
        let confirm = this.alertController.create({
            title: 'Are you sure you want to Logout?',
            message: 'Logging out will clear tokens and search queries.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        this.log.debug(`confirmLogout => Cancel clicked`);
                    }
                },
                {
                    text: 'OK',
                    handler: () => {
                        this.logout()
                    }
                }
            ]
        });
        confirm.present();
    }    

    private setSettingsCount() {
        this.settingService.getCount().then((c) => {
            this.log.info('settings count is: ' + c);
            this.settingsCount = c;
        })

    }
}
