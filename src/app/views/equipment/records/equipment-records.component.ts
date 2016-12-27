import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {EquipmentRecordDetailsComponent} from './details/equip-record-details.component';

import { EquipmentRecordModel } from '../../../models/equipment-record.model';
import { EquipmentRecordService } from "../../../services/supply/equipment-record-service";


@Component({
    templateUrl: 'equipment-records.component.html'
})

export class EquipmentRecordsComponent {

    public equipmentRecordList: Array<EquipmentRecordModel>;

    selectedItem: any;
    // icons: string[];
    // items: Array<{title: string, note: string, icon: string}>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public equipmentRecordService: EquipmentRecordService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
        //     'american-football', 'boat', 'bluetooth', 'build'];

        // this.items = [];
        // for (let i = 1; i < 11; i++) {
        //     this.items.push({
        //         title: 'Equipment Record ' + i,
        //         note: 'This is Equipment Record #' + i,
        //         icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        //     });
        // }
    }

    getAllEquipmentRecords() {
      this.equipmentRecordService.getAllRecords().then(records => this.equipmentRecordList = records);
    }

    ionViewWillEnter() {
        this.getAllEquipmentRecords();       

    }

    itemTapped(item) {
        this.navCtrl.push(EquipmentRecordDetailsComponent, {
            item: item
        });
    }
}
