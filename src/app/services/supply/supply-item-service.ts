import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { SupplyItemModel } from '../../models/supply-item.model';
import { LoggerService } from "../logger/logger-service";
import { BaseDatabaseService } from '../../services/base-database.service';
import { DatabaseTableModelService } from '../database-table-model.service';


@Injectable()
export class SupplyItemService extends BaseDatabaseService<SupplyItemModel> {
  // Demo data file location
  assetFilename: string = "supply-items.json";
  assetDirectory: string = "assets/files";


  constructor(
    databaseService: DatabaseTableModelService,
    private http: Http,
    log: LoggerService) {
    // TODO store in db ? inject table : null
    super('Supply Item Service', null, log);
  }


  getAllSupplyItems()  {
    this.log.debug('in get all supply items');
    let url: string = this.assetDirectory + '/' + this.assetFilename;
    return this.http.get(url);
    //add to db?
  }


   getSupplyItem(itemId: string) : Observable<SupplyItemModel> {
     return this.getAllSupplyItems().map(items => items.json().filter(item => item.itemId === itemId)[0]);

   }
}
