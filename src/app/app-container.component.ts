import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, PopoverController, MenuController } from 'ionic-angular';
import { LoggerService } from "./services/logger/logger-service";
//import { AppMenuComponent } from "./views/common/header/app-menu.component";
import { AreaModel } from './models/area.model';

import { EquipmentComponent } from './views/equipment/equipment.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { SupplyComponent } from './views/supply/supply.component';
import { AdminComponent } from "./views/admin/admin.component";
import { ScannerComponent } from "./views/scanner/scanner.component";
import { SettingsService } from "./services/settings.service";
import { SettingsModel } from "./models/settings.model";
import { ElementPositionDirective } from "./common/directives/element-position.directive";

@Component({
    templateUrl: './app-container.html'
})
export class AppContainerComponent {

    demoAreas = new Array<AreaModel>();
    
    @ViewChild(ElementPositionDirective)
    posDirective: ElementPositionDirective;

    constructor(public navCtrl: NavController,
        public alertController: AlertController,
        public log: LoggerService,
        private popoverCtrl: PopoverController,
        private menuController: MenuController, 
        private settingsService: SettingsService) {
        this.setAreas();
    }

    ngOnInit() {
      this.setActionLocation();
    }

     setAreas() {

        this.demoAreas.push(new AreaModel('Equipment', 'cog', EquipmentComponent, 'gray'));
        this.demoAreas.push(new AreaModel('Admin', 'card', AdminComponent, 'light'));
        this.demoAreas.push(new AreaModel('Supply', 'document', SupplyComponent, 'gray'));
        this.demoAreas.push(new AreaModel('Inventory', 'clipboard',InventoryComponent , 'light'));        // TODO include component
        this.demoAreas.push(new AreaModel('Scanner', 'barcode', ScannerComponent, 'gray'));

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

      private setActionLocation() {
        let setting: SettingsModel;
        this.settingsService.getActionPositionSetting().then(s => setting = s).then(() => {

            if (setting) {
                let val = setting.setting.split(" ");
                if (val && val.length > 0) {
                    let topBottom = "bottom";
                    let leftRight = val[1];                    
                    this.posDirective.setPosition(leftRight, topBottom);  
                    this.log.debug('Got a Setting: ' + setting.settingsName);                 
                } 
            }
        });
    }



}

