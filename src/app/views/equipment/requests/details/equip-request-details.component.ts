import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {LoggerService} from "../../../../services/logger/logger-service";


@Component({
    templateUrl: './equip-request-details.component.html',
})
export class EquipmentRequestDetailsComponent {
    selectedItem: any;
    isClassVisible: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private log: LoggerService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }

    public equipmentDetails() {
        this.log.debug(`EquipmentRequestDetailsComponent:equipmentDetails()`);
    }

    public editEquipmentDetails(event: Event) {
        if(event) {
            event.stopPropagation();
        }

        this.log.debug(`EquipmentRequestDetailsComponent:editEquipmentDetails()`);
    }
}
