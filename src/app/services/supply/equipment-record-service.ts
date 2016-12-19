import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api-service';
import { EquipmentRecordModel } from "../../models/equipment-record.model";

/*
  Generated class for the EquipmentRecordService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EquipmentRecordService extends ApiService<EquipmentRecordModel, string> {

  constructor(public http: Http) {
    super(http, 'supply/equipmentRecords');
  }

  getAllRecords() : Promise<Array<EquipmentRecordModel>>   {
    return this.getMany();
  }

  getRecord(id: string) : Promise<EquipmentRecordModel>   {
    return this.getOne(id);
  }

  addRecord(record: EquipmentRecordModel) : Promise<void> {
     return this.create(record);
  }

  deleteRecord(id: string) : Promise<void> {
    return this.delete(id);
  }

  updateRecord(record: EquipmentRecordModel) : Promise<EquipmentRecordModel>   {
    return  this.update(record);
  }

}
