import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';

import { InventoryComponent } from './inventory.component';
import { CaimComponent } from './caim/caim.component';
import { EtmComponent } from './etm/etm.component';
import { ImReceiptsComponent } from './im/im-receipts.component';


@NgModule({
    declarations: [InventoryComponent, CaimComponent, EtmComponent, ImReceiptsComponent],
    imports: [IonicModule],
    exports: [InventoryComponent],
    entryComponents: [CaimComponent, EtmComponent, ImReceiptsComponent]
})
export class InventoryModule {

}
