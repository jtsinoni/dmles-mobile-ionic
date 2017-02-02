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
    searchValue: string;
    aggregations: string;

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
        this.searchValue = this.navParams.get('searchValue');
        this.aggregations = this.navParams.get('aggregations');

        this.getEquipmentRecords();
    }

    private getEquipmentRecords() {
        this.log.debug('In getEquipmentRecords with (' + this.searchValue + ', ' + this.aggregations + ')');
        this.RequestApiService.getEquipmentRecords(this.searchValue, this.aggregations)
            .map(results => results.json())
            .subscribe(
                (results) => {
                    this.items = results.hits.hits; //mec: NOTE: MAGIC - We are 2 layers deep in results
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
