export class BaseResultModel<T> {
  resultCount: number;
  milliseconds: number;
  resultReturned: boolean;
  items: Array<T>;
  //hits: any;

  setDefaults() {
    this.resultCount = 0;
    this.milliseconds = 0;
    this.resultReturned = false;
  }

  setResults(count: number, mSeconds: number, values: Array<T>) {
    this.resultCount = count;
    this.milliseconds = mSeconds;
    this.items = values;
  }
  
  clearItems() {
    this.items = new Array<T>();
}

}


