import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';

import { EquipmentComponent } from './equipment.component';
import { EquipmentRecordsComponent } from './records/equipment-records.component';
import { EquipmentRequestsComponent } from './requests/equipment-requests.component';
import { EquipmentRequestDetailsComponent } from './requests/details/equip-request-details.component';
import { EquipmentRecordDetailsComponent } from './records/details/equip-record-details.component';
import {CommonDirectivesModule} from "../../common/directives/common-directives.module";


@NgModule({
    declarations: [EquipmentComponent , EquipmentRecordsComponent,
                   EquipmentRequestsComponent, EquipmentRequestDetailsComponent, EquipmentRecordDetailsComponent],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [EquipmentComponent ],
    entryComponents: [EquipmentComponent, EquipmentRecordsComponent, EquipmentRequestsComponent,
                      EquipmentRequestDetailsComponent, EquipmentRecordDetailsComponent]
})
export class EquipmentModule {

}
