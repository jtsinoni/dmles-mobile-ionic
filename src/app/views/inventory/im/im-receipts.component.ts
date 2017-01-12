
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Search} from "../../common/search";
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'inventory-im-receipts',
  templateUrl: './im-receipts.component.html'
})
export class ImReceiptsComponent extends Search  {

  

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    super (loadingCtrl);

  }


}
