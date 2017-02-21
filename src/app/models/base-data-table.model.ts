
export class BaseDataTableModel {
  id?: number;
  

  constructor(id?: number) {
    if(id) {
      this.id = id;
    }
  }
  
}
