import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderModel } from '../../../../models/order.model';
import { SupplyItemModel } from '../../../../models/supply-item.model';
import { OrderService } from '../../../../services/supply/order-service';
import { QuantityValidator } from '../../../common/validators/quantity-validator';
import { UtilService } from '../../../../common/services/util.service';
import {LoggerService} from "../../../../services/logger/logger-service";

/*
  Generated class for the AddOrder component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'add-order',
  templateUrl: './add-order.component.html'
})
export class AddOrderComponent {

  orderForm: FormGroup;
  supplyItem: SupplyItemModel;
  model = new OrderModel();
  submitted = false;
  futureDate: string;


  constructor(params: NavParams, public orderService: OrderService, public formBuilder: FormBuilder, public viewController: ViewController, utilService: UtilService, public log: LoggerService) {
    this.supplyItem = params.get('supplyItem');
    if (this.supplyItem) {
      this.model.itemId = this.supplyItem.itemId;
      this.model.unitOfPurchasePrice = this.supplyItem.unitOfPurchasePrice;
      this.orderForm = formBuilder.group({
        orderQuantityInput: ['', QuantityValidator.isValid],
        requestorInput: ['', Validators.required],
        requiredDateInput: ['', Validators.required]
      });
    } else {
      this.log.info('not getting a supply item here');
    }

    this.futureDate = utilService.getIsoDateString(new Date(), 2);

  }

  ionViewWillEnter() {
    this.model.orderQuantity = 0;
    this.model.orderDate = new Date();

    this.model.orderState = 1;
    
    //this.model.id = this.model.itemId;
    //set other defaults here

  }

  saveOrder() {
    this.log.debug('saving the order')
    // todo return promise then close
    this.orderService.addOrder(this.model);
    this.dismiss();
  }

  onSubmit() {
    this.submitted = true;

  }

  dismiss() {
    this.viewController.dismiss();
  }

}
