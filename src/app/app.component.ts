import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import { AppContainerComponent } from './app-container.component';
// import {LogsModalComponent} from './views/topic/topic.component';
// import {EquipmentRecordsComponent} from "./views/equipment/records/equipment-records.component";
// import {EquipmentRequestsComponent} from "./views/equipment/requests/equipment-requests.component";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class DMLESMobile {
    @ViewChild(Nav) nav: Nav;

    // make StartComponent the root (or first) page
    rootPage: any = AppContainerComponent;
    // pages: Array<{title: string, component: any}>;

    // constructor(public platform: Platform,
    //             public menu: MenuController,
    //             //private upstreamService: UpstreamService
    // ) {
    //     this.initializeApp();

    //     // set our app's pages
    //     this.pages = [
    //         {title: 'Equipment Records', component: EquipmentRecordsComponent},
    //         {title: 'Equipment Requests', component: EquipmentRequestsComponent},
    //         {title: 'Messaging', component: LogsModalComponent}
    //     ];
    // }

    constructor(public platform: Platform, menu: MenuController) {
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
