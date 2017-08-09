import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';

import { EquipmentComponent } from './equipment.component';
import { EquipmentRequestsComponent } from './requests/equipment-requests.component';
import { EquipmentRequestDetailsComponent } from './requests/details/equip-request-details.component';
import {CommonDirectivesModule} from "../../common/directives/common-directives.module";
import {EquipmentRequestCardRowComponent} from "./requests/details/card-row/equip-request-card-row.component";
import {EditEquipmentRequestDetailsComponent} from "./requests/edit/edit-equip-request-details.component";


@NgModule({
    declarations: [EquipmentComponent , EquipmentRequestsComponent, EquipmentRequestDetailsComponent,
        EquipmentRequestCardRowComponent, EditEquipmentRequestDetailsComponent],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [EquipmentComponent ],
    entryComponents: [EquipmentComponent, EquipmentRequestsComponent,
        EquipmentRequestDetailsComponent, EquipmentRequestCardRowComponent, EditEquipmentRequestDetailsComponent]
})
export class EquipmentModule {

}
