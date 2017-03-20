import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { OrderModel } from '../../../../models/order.model';
import { SupplyItemModel } from '../../../../models/supply-item.model';
import { SupplyItemService } from '../../../../services/supply/supply-item-service';
import { LoggerService } from "../../../../services/logger/logger-service";

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent {

  order: OrderModel;
  supplyItem: SupplyItemModel;

  constructor(params: NavParams,
    public supplyItemsService: SupplyItemService,
    public viewController: ViewController, private log: LoggerService) {

    this.order = params.get('orderItem');
  }

  ionViewWillEnter() {
    if (!this.order) {
      this.order = new OrderModel();
    } else {
      this.supplyItemsService.getSupplyItem(this.order.itemId)       
        .subscribe(
        (result) => {
          this.supplyItem = result;
          this.log.info(`Supply item => ${result}`);
        },
        (error) => {
          this.log.error(`Error => ${error}`);
        });
    }
  }

  dismiss() {
    this.viewController.dismiss();
  }

}
