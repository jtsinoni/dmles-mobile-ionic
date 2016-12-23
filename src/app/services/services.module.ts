import {NgModule} from "@angular/core";

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './supply/in-memory-data-service';
import { NotificationService } from './supply/notification-service';
import { OrderService } from './supply/order-service';
import { IssueService } from './supply/issue-service';
import { SupplyItemService } from './supply/supply-item-service';



@NgModule({
    imports: [
        InMemoryWebApiModule.forRoot(InMemoryDataService),
    ],
    providers: [     
        NotificationService,
        OrderService,
        SupplyItemService,
        IssueService
    ]
})
export class ServicesModule {

}
