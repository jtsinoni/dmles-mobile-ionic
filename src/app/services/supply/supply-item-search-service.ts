import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from  'rxjs';

import { SupplyItemModel } from '../../models/supply-item.model';

/*
  Generated class for the SupplyItemSearch provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SupplyItemSearchService {  

  constructor(public http: Http) {
  } 

  search(searchTerm: string) : Observable<Array<SupplyItemModel>> {
     return this.http.get(`providers/supplyItems?itemDescription=${searchTerm}`).map((r: Response) => r.json().data as Array<SupplyItemModel>);
  }

}
