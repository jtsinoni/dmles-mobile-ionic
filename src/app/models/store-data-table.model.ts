import {BaseDataTableModel} from './base-data-table.model';

/**
 * Created by johntsinonis on 11/15/16.
 */
export class StoreDataTableModel extends BaseDataTableModel {
  id?: number;
  data: string;

  constructor(data: string, id?: number) {
    super(id);
    this.data = data;
    if(id) {
      this.id = id;
    }
  }
}

