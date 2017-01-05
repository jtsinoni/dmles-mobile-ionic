import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Search} from "../../common/search";
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'inventory-etm',
  templateUrl: './etm.component.html'
})
export class EtmComponent extends Search {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    super (loadingCtrl);

  }


}