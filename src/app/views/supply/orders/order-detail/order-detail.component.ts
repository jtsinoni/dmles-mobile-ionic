import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { OrderModel } from '../../../../models/order.model';
import { SupplyItemModel } from '../../../../models/supply-item.model';
import { SupplyItemService } from '../../../../services/supply/supply-item-service';

/*
  Generated class for the OrderDetail component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html'  
})
export class OrderDetailComponent {

  order: OrderModel;
  supplyItem: SupplyItemModel;

  constructor(params: NavParams,
    public supplyItemsService: SupplyItemService,
    public viewController: ViewController) {

    this.order = params.get('orderItem');
  }

  ionViewWillEnter() {
    if (!this.order) {
      this.order = new OrderModel();
    } else {
      this.supplyItemsService.getSupplyItem(this.order.itemId).then(sItem => this.supplyItem = sItem);
    }
  }

  dismiss() {
    this.viewController.dismiss();
  }

}
