import { Component } from '@angular/core';

import {NavController, NavParams, ModalController} from 'ionic-angular';
import {LoggerService} from "../../../../services/logger/logger-service";
import {EditEquipmentRequestDetailsComponent} from "../edit/edit-equip-request-details.component";


@Component({
    templateUrl: './equip-request-details.component.html',
})
export class EquipmentRequestDetailsComponent {
    selectedItem: any;
    isClassVisible: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private log: LoggerService,
                private modalController: ModalController) {
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

        let modal = this.modalController.create(EditEquipmentRequestDetailsComponent, {selectedItem: this.selectedItem});
        modal.present();

        this.log.debug(`EquipmentRequestDetailsComponent:editEquipmentDetails()`);
    }
}
