import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoggerService} from "../../../services/logger/logger-service";

import {EquipmentRecordDetailsComponent} from './details/equip-record-details.component';
import {RequestApiService} from "../../../common/endpoints/request-api.service";

@Component({
    templateUrl: './equipment-records.component.html'
})

export class EquipmentRecordsComponent {
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

        this.getEquipmentRecords();
    }

    private getEquipmentRecords() {
        this.RequestApiService.getEquipmentRecords()
            .map(results => results.json())
            .subscribe(
                (results) => {
                    this.items = results.hits.hits; //mec...magic???
                    this.log.debug(`results => ${JSON.stringify(results)}`);
                },
                (error) => {
                    this.log.error(`Error => ${error}`);
                });
    }

    itemTapped(item) {
        this.navCtrl.push(EquipmentRecordDetailsComponent, {
            item: item
        });
    }
}
