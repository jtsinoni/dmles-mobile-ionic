import { Component, ViewChild } from '@angular/core';
import { Events, Platform, Nav, App } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LoginComponent } from './views/login/login.component';
import { AreaModel } from './models/area.model';
import { AppContainerComponent } from "./app-container.component";


import { UtilService } from "./common/services/util.service";

import { HelpComponent } from "./views/help/help.component";
import { LogsModalComponent } from "./views/logs/modal/logs-modal.component";
import { AuthenticationService } from "./services/authentication.service";
import { SettingsComponent } from "./views/settings/settings.component";
import { LoginModalService } from "./services/login-modal.service";
import { LoggerService } from "./services/logger/logger-service";


@Component({
    templateUrl: './app.html'
})
export class DMLESMobile {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = AppContainerComponent;

    loggedOutAreas = new Array<AreaModel>();
    //loggedInAreas = new Array<AreaModel>();

    isMobility: boolean = false;

    home = 'Home';
    logOut = 'Logout';
    exit = 'Exit';
    //isLoggedIn: boolean = false;


    constructor(public events: Events,
        public platform: Platform,
        private utilService: UtilService,
        private app: App,
        private authService: AuthenticationService,
        private loginModalService: LoginModalService,
        private log: LoggerService) {
        this.initializeApp();
       


    }

    initializeApp() {
        this.isMobility = this.utilService.isMobility();
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
        });
    }

    ngOnInit() {
        //this.isLoggedIn = this.authService.isTokenValid();
        this.setLoggedInOutAreas();
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

        if (this.isMobility) {
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

    logout() {
        // todo are you sure message...?
        this.log.debug('in logout')
        this.authService.logout();

    }

    exitApp() {
        this.log.info('exiting app')
        this.authService.logout();
        if (this.isMobility) {
            this.platform.exitApp();
        }
    }

  
   

}
