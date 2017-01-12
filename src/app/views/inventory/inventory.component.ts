import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ImReceiptsComponent } from './im/im-receipts.component';
import { CaimComponent } from './caim/caim.component';
import { EtmComponent } from './etm/etm.component';


@Component({
  selector: 'inventory-inventory',
  templateUrl: './inventory.component.html'  
})

export class InventoryComponent {

    tab1Root: any = ImReceiptsComponent;
    tab2Root: any = CaimComponent;
    tab3Root: any = EtmComponent;

    constructor(navCtrl: NavController) {

        


    }
}
