import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController, MenuController } from 'ionic-angular';
import { LoggerService } from "./services/logger/logger-service";
//import { AppMenuComponent } from "./views/common/header/app-menu.component";
import { AreaModel } from './models/area.model';

import { TopicComponent } from './views/topic/topic.component';
import { EquipmentComponent } from './views/equipment/equipment.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { SupplyComponent } from './views/supply/supply.component';
import { AdminComponent } from "./views/admin/admin.component";


@Component({
    templateUrl: './app-container.html'
})
export class AppContainerComponent {

    demoAreas = new Array<AreaModel>();

    constructor(public navCtrl: NavController,
        public alertController: AlertController,
        public log: LoggerService,
        private popoverCtrl: PopoverController,
        private menuController: MenuController) {
        //this.menuController.enable(true, "mainMenu");
        this.setAreas();
    }

     setAreas() {
        this.demoAreas.push(new AreaModel('Messaging', 'git-network', TopicComponent, 'light'));
        this.demoAreas.push(new AreaModel('Equipment', 'cog', EquipmentComponent, 'gray'));
        this.demoAreas.push(new AreaModel('Admin', 'card', AdminComponent, 'light'));
        this.demoAreas.push(new AreaModel('Supply', 'document', SupplyComponent, 'gray'));
        this.demoAreas.push(new AreaModel('Inventory', 'barcode', InventoryComponent, 'light'));
    }

     goTo(area: AreaModel) {
        this.navCtrl.push(area.component);
    } 


    showFindItem() {
        let alert = this.alertController.create({
            title: "Search",
            message: 'Find something',
            inputs: [
                {
                    type: 'text',
                    placeholder: 'Search'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        this.log.debug('Cancel clicked');
                    }
                },
                {
                    text: 'Go',
                    handler: data => {
                        this.log.debug('Go clicked');
                        //this.showLoadingData(data.value);
                    }
                }
            ]

        });
        alert.present();
    }

    

}

