import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, App } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LoginComponent } from './views/login/login.component';
import { AreaModel } from './models/area.model';

import { NetworkService } from "./services/network.service";
import { UtilService } from "./common/services/util.service";

import { TopicComponent } from './views/topic/topic.component';
import { EquipmentComponent } from './views/equipment/equipment.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { SupplyComponent } from './views/supply/supply.component';
import { AdminComponent } from "./views/admin/admin.component";
import { HelpComponent } from "./views/help/help.component";
import { LogsModalComponent } from "./views/logs/modal/logs-modal.component";

@Component({
    templateUrl: './app.html'
})
export class DMLESMobile {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginComponent;

    areas = new Array<AreaModel>();

    isMobility: boolean = false;
    constructor(public platform: Platform, menu: MenuController, networkService: NetworkService, private utilService: UtilService, private app: App) {
        this.initializeApp();
        this.setAreas();
        this.isMobility = this.utilService.isMobility();
    }

    setAreas() {
        this.areas.push(new AreaModel('Messaging', 'git-network', TopicComponent, 'light'));
        this.areas.push(new AreaModel('Equipment', 'cog', EquipmentComponent, 'gray'));
        this.areas.push(new AreaModel('Admin', 'card', AdminComponent, 'light'));
        this.areas.push(new AreaModel('Supply', 'document', SupplyComponent, 'gray'));
        this.areas.push(new AreaModel('Inventory', 'barcode', InventoryComponent, 'light'));
        this.areas.push(new AreaModel('Help', 'help', HelpComponent, 'gray'));


    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            if (this.isMobility) {
                // todo always show this
                this.areas.push(new AreaModel('Logs', 'logo-android', LogsModalComponent, 'light'));
            }
        });
    }

    goTo(area: AreaModel) {
        this.nav.push(area.component);
    }
}
