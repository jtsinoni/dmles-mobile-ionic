import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';

import { EquipmentComponent } from './equipment.component';
import { EquipmentRecordsComponent } from './records/equipment-records.component';
import { EquipmentRequestsComponent } from './requests/equipment-requests.component';
import { EquipmentRequestDetailsComponent } from './requests/details/equip-request-details.component';
import { EquipmentRecordDetailsComponent } from './records/details/equip-record-details.component';
import {CommonDirectivesModule} from "../../common/directives/common-directives.module";
import {EquipmentRequestCardRowComponent} from "./requests/details/card-row/equip-request-card-row.component";
import {InputTextComponent} from "../common/input/input-text.component";
import {EditEquipmentRequestDetailsComponent} from "./requests/edit/edit-equip-request-details.component";


@NgModule({
    declarations: [EquipmentComponent , EquipmentRecordsComponent, InputTextComponent,
        EquipmentRequestsComponent, EquipmentRequestDetailsComponent,
        EquipmentRecordDetailsComponent, EquipmentRequestCardRowComponent, EditEquipmentRequestDetailsComponent],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [EquipmentComponent ],
    entryComponents: [EquipmentComponent, EquipmentRecordsComponent, InputTextComponent, EquipmentRequestsComponent,
        EquipmentRequestDetailsComponent, EquipmentRecordDetailsComponent, EquipmentRequestCardRowComponent, EditEquipmentRequestDetailsComponent]
})
export class EquipmentModule {

}
