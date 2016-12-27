import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {EquipmentRequestDetailsComponent} from './details/equip-request-details.component';

import { EquipmentRequestModel } from '../../../models/equipment-request.model';
import { EquipmentRequestService } from "../../../services/supply/equipment-request-service";

@Component({
    templateUrl: 'equipment-requests.component.html'
})

export class EquipmentRequestsComponent {

    public equipmentRequestList: Array<EquipmentRequestModel>;

    selectedItem: any;
    // icons: string[];
    // items: Array<{title: string, note: string, icon: string}>;

    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public equipmentRequestService: EquipmentRequestService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
        //     'american-football', 'boat', 'bluetooth', 'build'];

        // this.items = [];
        // for (let i = 1; i < 11; i++) {
        //     this.items.push({
        //         title: 'Equipment Request ' + i,
        //         note: 'This is Equipment Request #' + i,
        //         icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        //     });
        // }
    }

    getAllEquipmentRequests() {
      this.equipmentRequestService.getAllRequests().then(requests => this.equipmentRequestList = requests);
    }

    ionViewWillEnter() {
        this.getAllEquipmentRequests();       

    }

    itemTapped(item) {
        this.navCtrl.push(EquipmentRequestDetailsComponent, {
            item: item
        });
    }
}
