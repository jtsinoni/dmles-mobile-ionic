import {NgModule} from "@angular/core";

import { NotificationService } from './supply/notification-service';
import { OrderService } from './supply/order-service';
import { IssueService } from './supply/issue-service';
import { SupplyItemService } from './supply/supply-item-service';


@NgModule({   
    providers: [
        NotificationService,
        OrderService,
        SupplyItemService,
        IssueService,
    ]
})
export class ServicesModule {

}
