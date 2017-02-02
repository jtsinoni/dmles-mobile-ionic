import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginComponent} from './views/login/login.component';
import {LoggerService} from "./services/logger/logger-service";
import {AuthenticationService} from "./services/authentication.service";

//import { AppContainerComponent } from './app-container.component';

import {NetworkService} from "./services/network.service";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class DMLESMobile {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginComponent;

    constructor(public platform: Platform, private log: LoggerService, protected authenticationService: AuthenticationService, menu: MenuController, networkService: NetworkService) {
        this.initializeApp();
    }


    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();

            // subscribe to pause and resume events
            this.platform.pause.subscribe(() => {
                this.log.debug('In initializeApp - app PAUSED');
                this.authenticationService.logout();
            });

            this.platform.resume.subscribe(() => {
                this.log.debug('In initializeApp - app RESUMED');
                this.authenticationService.isLoggedIn(); //mec... come back to here and reobtain credentials
            });
        });
    }

    // openPage(page) {
    // }
}
