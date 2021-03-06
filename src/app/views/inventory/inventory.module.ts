import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';

import { InventoryComponent } from './inventory.component';
import { CaimComponent } from './caim/caim.component';
import { EtmComponent } from './etm/etm.component';
import { ImReceiptsComponent } from './im/im-receipts.component';
import {CommonDirectivesModule} from "../../common/directives/common-directives.module";
import { EtmDetailComponent } from "./etm/etm-detail/etm-detail.component";
import {EtmFilteredComponent} from "./etm/filtered/etm-filtered.component";


@NgModule({
    declarations: [InventoryComponent, CaimComponent, EtmComponent, ImReceiptsComponent,
    EtmDetailComponent, EtmFilteredComponent],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [InventoryComponent],
    entryComponents: [CaimComponent, EtmComponent, ImReceiptsComponent, EtmDetailComponent, EtmFilteredComponent]
})
export class InventoryModule {

}
