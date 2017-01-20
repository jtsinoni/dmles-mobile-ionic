import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AreaModel} from './models/area.model';
import {TopicComponent} from './views/topic/topic.component';
import {EquipmentComponent} from './views/equipment/equipment.component';
import {InventoryComponent} from './views/inventory/inventory.component';
import {SupplyComponent} from './views/supply/supply.component';
import {AdminComponent} from "./views/admin/admin.component";
import {LoggerService} from "./services/logger/logger-service";
import {UpstreamService} from "./services/upstream/upstream.service";

@Component({
    templateUrl: './app-container.html'
})
export class AppContainerComponent {

    areas = new Array<AreaModel>();

    constructor(public navCtrl: NavController,
                public alertController: AlertController,
                public log: LoggerService,
                private upstreamService: UpstreamService) {
        this.setAreas();
    }

    setAreas() {
        this.areas.push(new AreaModel('Messaging', 'git-network', TopicComponent, 'light'));
        this.areas.push(new AreaModel('Equipment', 'cog', EquipmentComponent, 'gray'));
        this.areas.push(new AreaModel('Admin', 'cog', AdminComponent, 'light'));
        this.areas.push(new AreaModel('Supply', 'document', SupplyComponent, 'gray'));
        this.areas.push(new AreaModel('Inventory', 'barcode', InventoryComponent, 'light'));
    }

    ionViewLoaded() {
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

