import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {EquipmentRequestDetailsComponent} from './details/equip-request-details.component';
import {RequestApiService} from "../../../common/endpoints/request-api.service";

@Component({
    templateUrl: 'equipment-requests.component.html'
})

export class EquipmentRequestsComponent {
    selectedItem: any;

    @Input()
    items: Array<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private RequestApiService: RequestApiService) {

        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        this.getEquipmentRequests();
    }

    private getEquipmentRequests() {
        this.RequestApiService.getEquipmentRequests()
            .map(results => results.json())
            .subscribe((results) => {
                this.items = results;
                //this.logger.debug(`getAllRoles => ${JSON.stringify(results)}`);
            });
    }

    itemTapped(item) {
        this.navCtrl.push(EquipmentRequestDetailsComponent, {
            item: item
        });
    }
}
