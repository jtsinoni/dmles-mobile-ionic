import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AreaModel } from '../../models/area.model';
import { NotificationsComponent } from './notifications/notifications.component';
import { IssuesComponent } from './issues/issues.component';
import { OrdersComponent } from  './orders/orders.component';
import { SupplyItemsComponent } from  './items/supply-items.component';

@Component({
  selector: 'supply-supply',
  templateUrl: './supply.component.html'  
})

export class SupplyComponent {

  

 areas = new Array<AreaModel>();

  
    constructor(public navCtrl: NavController) {
        this.setAreas();      
    }

     setAreas() {
        this.areas.push(new AreaModel('Notifications', 'medical', NotificationsComponent, 'light'));
        this.areas.push(new AreaModel('Issues', 'logo-dropbox', IssuesComponent, 'gray'));
        this.areas.push(new AreaModel('Orders', 'contract', OrdersComponent, 'light'));
        this.areas.push(new AreaModel('Supply Items', 'paper', SupplyItemsComponent, 'gray'));
        
    }

    goTo(area: AreaModel) {
       this.navCtrl.push(area.component);
   }

}