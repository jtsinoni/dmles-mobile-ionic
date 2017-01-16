import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import { AppContainerComponent } from './app-container.component';
import {NetworkService} from "./services/network.service";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class DMLESMobile {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = AppContainerComponent;

    constructor(public platform: Platform, menu: MenuController, networkService: NetworkService) {
        this.initializeApp();
    }


    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        // this.menu.close();
        // // navigate to the new page if it is not the current page
        // this.nav.setRoot(page.component);
    }
}
