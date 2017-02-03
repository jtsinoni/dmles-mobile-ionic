import {Input, Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {EquipmentRequestDetailsComponent} from './details/equip-request-details.component';
import {RequestApiService} from "../../../common/endpoints/request-api.service";
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
    templateUrl: './equipment-requests.component.html'
})

export class EquipmentRequestsComponent {
    selectedItem: any;

    @Input()
    items: Array<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private RequestApiService: RequestApiService,
                private log: LoggerService) {
    }

    ngOnInit() {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = this.navParams.get('item');

        this.getEquipmentRequests();
    }

    private getEquipmentRequests() {
        this.RequestApiService.getEquipmentRequests()
            .map(results => results.json())
            .subscribe(
                (results) => {
                    this.items = results;
                    this.log.log(`results => ${JSON.stringify(results)}`);
                },
                (error) => {
                    this.log.error(`Error => ${error}`);
                });
    }

    itemTapped(item) {
        this.navCtrl.push(EquipmentRequestDetailsComponent, {
            item: item
        });
    }
}
