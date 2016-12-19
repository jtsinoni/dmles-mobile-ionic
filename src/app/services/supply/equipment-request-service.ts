import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api-service';
import { EquipmentRequestModel } from "../../models/equipment-request.model";


/*
  Generated class for the EquipmentRequestsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EquipmentRequestService extends ApiService<EquipmentRequestModel, number> {

  constructor(public http: Http) {
    super(http, 'supply/equipmentRequests');
  }

  getAllRequests() : Promise<Array<EquipmentRequestModel>> {
    return this.getMany();
  }

  getRequest(id: number) : Promise<EquipmentRequestModel> {
    return this.getOne(id);
  }

  createRequest(request: EquipmentRequestModel) : Promise<EquipmentRequestModel> {
    return this.create(request);
  }

  deleteRequest(id: number) : Promise<void> {
    return this.delete(id);
  }  

}
