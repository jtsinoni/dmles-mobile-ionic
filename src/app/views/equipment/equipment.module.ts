import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';

import { EquipmentComponent } from './equipment.component';
import { EquipmentRecordsComponent } from './records/equipment-records.component';
import { EquipmentRequestsComponent } from './requests/equipment-requests.component';


@NgModule({
    declarations: [EquipmentComponent , EquipmentRecordsComponent, EquipmentRequestsComponent],
    imports: [IonicModule],
    exports: [EquipmentComponent ],
    entryComponents: [EquipmentRecordsComponent, EquipmentRequestsComponent]
})
export class EquipmentModule {

}
