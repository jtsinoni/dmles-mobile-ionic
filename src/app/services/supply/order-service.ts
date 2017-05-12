import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { OrderModel } from "../../models/order.model";
import { LoggerService } from "../logger/logger-service";
import { BaseDatabaseService } from '../../services/base-database.service';
import { DatabaseService } from '../../services/database.service';
import { UtilService } from "../../common/services/util.service";


@Injectable()
export class OrderService extends BaseDatabaseService<OrderModel> {
  // Demo messagingDataModel file location
  assetFilename: string = "orders.json";
  assetDirectory: string = "assets/files";

  ITEM_REF: string = 'REF-';

  constructor(
    databaseService: DatabaseService,
    private http: Http,
    private utilService: UtilService,
    log: LoggerService) {
    super('Order Service', databaseService.getOrderDataTable(), log);
  }


  getAllOrders() {
    this.log.debug('in get all orders');
    let url: string = this.assetDirectory + '/' + this.assetFilename;
    return this.http.get(url);
  }

  getSavedOrders() : Promise<Array<OrderModel>> {
    return this.getAll();
  }


  addOrder(order: OrderModel) {
    this.add(order).then((o) => {
      this.log.debug('saving order: '+ order.id);
      this.createReferenceNumber(order);
    });
  }

  private createReferenceNumber(order: OrderModel) {
    let referenceNumber = this.utilService.padLeft(order.id, '0000');
    order.referenceId = this.ITEM_REF + referenceNumber;
    this.update(order);
  }

}
