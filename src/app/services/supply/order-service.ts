import { Injectable } from '@angular/core';

import { OrderModel } from "../../models/order.model";
import { LoggerService } from "../logger/logger-service";

import {InMemoryDataService} from './in-memory-data-service';

/*
  Generated class for the OrderService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class OrderService extends InMemoryDataService<OrderModel, string> {
  // todo replace with next data key/id or something
  nextNumber:number = 1;

  ITEM_REF: string = 'REF-';

  constructor(private log: LoggerService) {
    super();
    this.createData();
  }

  private createData() {
       this.data = [
      { id: 'W560JL6025J001', documentNumber: 'W560JL6025J001', itemId: '662500T387223', requiredDate: new Date().toJSON(), orderDate: new Date(), orderState: 1, orderQuantity: 10, requestor: 'Billy', unitOfPurchasePrice: 12.25 },
      { id: 'W560JL6060J001', documentNumber: 'W560JL6060J001', itemId: '00 2500 1', requiredDate: new Date().toJSON(), orderDate: new Date(), orderState: 1, orderQuantity: 12, requestor: 'Ted', unitOfPurchasePrice: 352.12 },
      { id: 'W560JL6060J003', documentNumber: 'W560JL6060J003', itemId: '00 876 980 01', requiredDate: new Date().toJSON(), orderDate: new Date(), orderState: 1, orderQuantity: 2, requestor: 'Fred', unitOfPurchasePrice: 12.58 },
      { id: 'W560JL6060J005', documentNumber: 'W560JL6060J005', itemId: '165816', requiredDate: new Date().toJSON(), orderDate: new Date(), orderState: 1, orderQuantity: 85, requestor: 'Sally', unitOfPurchasePrice: 10.17 }
    ];
  }

  getAllOrders(): Promise<Array<OrderModel>> {
    return this.getMany();
  }

  getOrder(id: string): Promise<OrderModel> {
    return this.getOne(id);
  }

  deleteOrder(id: string) {
    this.delete(id);
  }

  // updateOrder(order: OrderModel): Promise<OrderModel> {
  //   return this.update(order);
  // }

  addOrder(order: OrderModel): OrderModel {
    
    let dNumber = this.createReferenceNumber();
    console.log('Doc Num:' + dNumber);
    order.id = dNumber;
    return this.add(order);
  }

  private createReferenceNumber() : string {
    let prefix = this.ITEM_REF;
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
