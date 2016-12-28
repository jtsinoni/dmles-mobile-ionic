import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderModel } from '../../../../models/order.model';
import { SupplyItemModel } from '../../../../models/supply-item.model';
import { OrderService } from '../../../../services/supply/order-service';
import { QuantityValidator } from '../../../common/validators/quantity-validator';

/*
  Generated class for the AddOrder component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'add-order',
  templateUrl: 'add-order.component.html'
})
export class AddOrderComponent {

  orderForm: FormGroup;
  supplyItem: SupplyItemModel;
  model = new OrderModel();
  submitted = false;
  futureDate: string;



  constructor(params: NavParams, public orderService: OrderService, public formBuilder: FormBuilder, public viewController: ViewController) {
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
      console.log('not getting a supply item here');
    }

    this.futureDate = this.setDates(10);
    this.model.requiredDate = this.setDates(0);

  }

  ionViewWillEnter() {
    this.model.orderQuantity = 0;
    this.model.orderDate = new Date();

    this.model.orderState = 1;
    this.model.id = this.model.itemId;
    //set other defaults here

  }

  saveOrder() {
    console.log('saving the order');
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

  private setDates(yearGap) {

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    year = year + yearGap;
    let month = currentDate.getMonth();
    let day = currentDate.getDate();

    let rDate = new Date(year, month, day, 0, 0, 0, 0);
    return this.getDate(rDate);
  }


  // todo move to utils - rename getISODateString or similar
  public getDate(d) {
    var yr = d.getFullYear();
    var mn = this.padZero(d.getMonth()) + 1;
    var dy = this.padZero(d.getDate());
    return yr + "-" + mn + "-" + dy + "T00:00:00Z";
  }

  public padZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }


}