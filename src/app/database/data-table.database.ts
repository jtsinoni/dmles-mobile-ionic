/**
 * Created by johntsinonis on 11/16/16.
 */
import Dexie from 'dexie';
import {DataTableModel} from '../models/data-table.model';

export class DataTableDatabase extends Dexie {
  data: Dexie.Table<DataTableModel, number>;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      data: "++id,data"
    });

    // Open it
    this.open().catch(function (e) {
      //alert ("Open failed: " + e);
      console.error("Open failed: " + e.stack);
    });

    this.data.mapToClass (DataTableModel);
  }

}
