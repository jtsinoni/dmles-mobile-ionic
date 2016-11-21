/**
 * Created by johntsinonis on 11/8/16.
 */
import { Injectable }    from '@angular/core';

import Dexie from 'dexie';
//import {MQTTModel} from "../models/mqtt.model";
import {CommonDataService} from "./common-data.service";
import {DataTableModel} from '../models/data-table.model';

@Injectable()
export class DatabaseService extends Dexie {
  private db: DatabaseService;
  //public commonData: MQTTModel;
  public dataTableModel: Dexie.Table<DataTableModel, number>;

  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  //contacts: Dexie.Table<MQTTModel, number>; // number = type of the primkey
  //...other tables goes here...

  constructor (private commonDataService: CommonDataService) {
    super("dmles-mobile-dt-ionic2");
    this.db = this;
    //this.commonData = commonDataService.data;

    this.db.version(1).stores({
      dataTableModel: '++id, data'
    });

    // Open it
    this.db.open().catch(function (e) {
      //alert ("Open failed: " + e);
      console.error("Open failed: " + e.stack);
    });

    this.db.dataTableModel.mapToClass(DataTableModel);
  }

  /**
   *
   * @param data
   * @returns {Promise<number>}
   */
  public add(data: string) {
    return this.db.dataTableModel.add({data: data});

  }

  public delete(id?: number) {
    if(id) { //delete individual records
      return this.db.dataTableModel.delete(id);
    }
    // delete all data
    return this.db.dataTableModel.clear();
  }

/*
 this.delete = function(data) {
 if(data) { //delete individual records
 return db.messages.delete(data);
 } else { // delete all data
 return db.messages.clear();
 }
 }
   */
}

//export var db = new DatabaseService();
