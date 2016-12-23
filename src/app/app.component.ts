import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {TopicComponent} from './views/topic/topic.component';
import {EquipmentRecordsComponent} from "./views/equipment/records/equipment-records.component";
import {EquipmentRequestsComponent} from "./views/equipment/requests/equipment-requests.component";
import {RolesComponent} from "./views/admin/roles/roles.component";

@Component({
    templateUrl: 'app.html'
})
export class DMLESMobile {
    @ViewChild(Nav) nav: Nav;

    // make StartComponent the root (or first) page
    rootPage: any = TopicComponent;
    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform,
                public menu: MenuController,
                //private upstreamService: UpstreamService
    ) {
        this.initializeApp();

        // set our app's pages
        this.pages = [
            {title: 'Equipment Records', component: EquipmentRecordsComponent},
            {title: 'Equipment Requests', component: EquipmentRequestsComponent},
            {title: 'Messaging', component: TopicComponent},
            {title: 'Roles', component: RolesComponent}
        ];
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
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }
}
