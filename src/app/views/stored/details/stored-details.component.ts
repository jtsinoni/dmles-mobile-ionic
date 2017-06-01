import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'store-details-view',
    templateUrl: './stored-details.component.html'
})
export class StoredDetailsComponent {
    title: string;
    selectedItem: any;
    keysSelectedItem: string[] = [];
    valuesSelectedItem: any[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        if(this.selectedItem.data) {
            // hack for EquipmentRequest
            this.title = this.selectedItem.data.requestInformation.requestTitle;
        } else if(this.selectedItem.barcodeData) {
            //// hack for Barcode data item.barcodeData
            this.title = this.selectedItem.barcodeData;
        }

        Object.keys(this.selectedItem).forEach(key => {
            this.valuesSelectedItem.push(this.selectedItem[key]);
            this.keysSelectedItem.push(key);
        });

        // if no title is set, set a default for now
        if(!this.title) {
            this.title = this.valuesSelectedItem[0];
        }
    }
}
