import {BaseDataTableModel} from './base-data-table.model';

export class StoreDataTableModel extends BaseDataTableModel {
  id?: number;
  data: any;

  constructor(data: any, id?: number) {
    super(id);
    this.data = data;
    if(id) {
      this.id = id;
    }
  }
}

