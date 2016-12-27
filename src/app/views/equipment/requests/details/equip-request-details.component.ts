import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { EquipmentRequestModel } from '../../../../models/equipment-request.model';


@Component({
  templateUrl: 'equip-request-details.component.html'
})
export class EquipmentRequestDetailsComponent {
  selectedItem: EquipmentRequestModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}
