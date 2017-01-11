import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api-service';
import { ProviderConstants } from './provider-constants';
import { OrderModel } from "../../models/order.model";

/*
  Generated class for the OrderService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class OrderService extends ApiService<OrderModel, string> {
  // todo replace with next data key/id or something
  nextNumber:number = 1;
  constructor(http: Http) {
    super(http, 'supply/orders');
  }

  getAllOrders(): Promise<Array<OrderModel>> {
    return this.getMany();
  }

  getOrder(id: string): Promise<OrderModel> {
    return this.getOne(id);
  }

  deleteOrder(id: string): Promise<void> {
    return this.delete(id);;
  }

  updateOrder(order: OrderModel): Promise<OrderModel> {
    return this.update(order);
  }

  addOrder(order: OrderModel): Promise<OrderModel> {
    
    let dNumber = this.createReferenceNumber();
    console.log('Doc Num:' + dNumber);
    order.id = dNumber;
    return this.create(order);
  }

  private createReferenceNumber() : string {
    let prefix = ProviderConstants.ITEM_REF;
    let referenceNumber = this.getNextReferenceNumber();
    return  prefix + referenceNumber; 
  }
  
  private getNextReferenceNumber(): number {
    // todo store a value for nextNumber  
    let value = (this.nextNumber + 1);
    this.nextNumber = value;
   
    return value;
  }

}
