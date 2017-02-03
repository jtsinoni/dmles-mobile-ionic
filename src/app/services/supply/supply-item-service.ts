import { Injectable } from '@angular/core';

import { SupplyItemModel } from '../../models/supply-item.model';
import { LoggerService } from "../logger/logger-service";
import { InMemoryDataService } from './in-memory-data-service';


/*
  Generated class for the SupplyItemService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SupplyItemService extends InMemoryDataService<SupplyItemModel, string> {


  constructor(private log: LoggerService) {
    super();
    this.createData();
  }

  private createData() {
    this.data = [
      { id: '662500T387223', itemId: '662500T387223', itemDescription: 'Glove Small', onHandBalance: 10, unitOfPurchasePrice: 12.25, imageUrl: 'assets/images/glove.png', isStocked: true },
      { id: '19521456', itemId: '19521456', itemDescription: 'Bandage', onHandBalance: 12, unitOfPurchasePrice: 8.25, imageUrl: 'assets/images/bandage.png', isStocked: true },
      { id: '00 2500 1', itemId: '00 2500 1', itemDescription: 'Light Bulb', onHandBalance: 7, unitOfPurchasePrice: 480.00, imageUrl: 'assets/images/lightbulb.png', isStocked: true },
      { id: '962101', itemId: '962101', itemDescription: 'Chemo Mats', onHandBalance: 5, unitOfPurchasePrice: 48.71, imageUrl: 'assets/images/chemoMat.png', isStocked: true },
      { id: '00 876 980 01', itemId: '00 876 980 01', itemDescription: 'Scalpel', onHandBalance: 0, unitOfPurchasePrice: 173.71, imageUrl: 'assets/images/scalpel.png', isStocked: false },
      { id: '165816', itemId: '165816', itemDescription: 'Catheter Foley', onHandBalance: 0, unitOfPurchasePrice: 73.11, imageUrl: 'assets/images/catheterFoley.png', isStocked: false }

    ];

  }

  getAllSupplyItems(): Promise<SupplyItemModel[]> {
    this.log.debug('in get all supply items');
    
    return this.getMany();

  }

  createSupplyItem(supplyItem: SupplyItemModel): SupplyItemModel {
    return this.add(supplyItem);

  }

  getSupplyItem(id: string): Promise<SupplyItemModel> {
    return this.getOne(id);
  }



}
