import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';


@Component({
    templateUrl: './stored-details.component.html'
})
export class StoredDetailsComponent {
    selectedItem: any;
    keysSelectedItem: string[] = [];
    valuesSelectedItem: any[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        Object.keys(this.selectedItem).forEach(key => {
            this.valuesSelectedItem.push(this.selectedItem[key]);
            this.keysSelectedItem.push(key);
        });
    }
}
