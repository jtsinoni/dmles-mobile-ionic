/**
 * Created by johntsinonis on 11/15/16.
 */
export class DataTableModel {
  id?: number;
  data: string;

  constructor(data: string, id?: number) {
    this.data = data;
    if(id) {
      this.id = id;
    }
  }
}

