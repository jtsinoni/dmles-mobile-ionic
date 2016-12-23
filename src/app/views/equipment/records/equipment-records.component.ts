import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {EquipmentRecordDetailsComponent} from './details/equip-record-details.component';

@Component({
    templateUrl: 'equipment-records.component.html'
})

export class EquipmentRecordsComponent {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];

        this.items = [];
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Equipment Record ' + i,
                note: 'This is Equipment Record #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }

    itemTapped(item) {
        this.navCtrl.push(EquipmentRecordDetailsComponent, {
            item: item
        });
    }
}
