import {NgModule} from "@angular/core";

import { InMemoryDataService } from './supply/in-memory-data-service';
import { NotificationService } from './supply/notification-service';
import { OrderService } from './supply/order-service';
import { IssueService } from './supply/issue-service';
import { SupplyItemService } from './supply/supply-item-service';
// import { EquipmentRequestService } from "./supply/equipment-request-service";
// import { EquipmentRecordService } from './supply/equipment-record-service';


@NgModule({   
    providers: [
        NotificationService,
        OrderService,
        SupplyItemService,
        IssueService,
        InMemoryDataService
    ]
})
export class ServicesModule {

}
