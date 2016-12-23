import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';

import {SupplyComponent } from './supply.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { OrdersComponent } from './orders/orders.component';
import { IssuesComponent } from './issues/issues.component';
import { SupplyItemsComponent } from './items/supply-items.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';



@NgModule({
    declarations: [SupplyComponent, NotificationsComponent, OrdersComponent, IssuesComponent, SupplyItemsComponent, OrderDetailComponent, AddOrderComponent],
    imports: [IonicModule],
    exports: [SupplyComponent],
    entryComponents: [NotificationsComponent, OrdersComponent, IssuesComponent, SupplyItemsComponent, OrderDetailComponent, AddOrderComponent]
})
export class SupplyModule {

}
