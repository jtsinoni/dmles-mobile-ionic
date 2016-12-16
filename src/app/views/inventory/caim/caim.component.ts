import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Search} from "../../common/search";
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'inventory-caim',
  templateUrl: 'caim.component.html'
})
export class CaimComponent extends Search {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    super (loadingCtrl);
  }


}