import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api-service';
import { SupplyItemModel } from '../../models/supply-item.model';

/*
  Generated class for the SupplyItemService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SupplyItemService extends ApiService<SupplyItemModel, string> {

  //private supplyItemsUrl = 'pages/supplyItems';



  constructor(public http: Http) {
    super (http, 'supply/supplyItems');
  }

   getAllSupplyItems() : Promise<SupplyItemModel[]> {
     return this.getMany();

   }

   createSupplyItem (supplyItem: SupplyItemModel) : Promise<SupplyItemModel> {
      return this.create(supplyItem);

   } 

   getSupplyItem(id:string) : Promise<SupplyItemModel> {
     return this.getOne(id);
   } 



}
