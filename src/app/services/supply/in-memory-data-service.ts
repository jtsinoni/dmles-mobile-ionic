export class InMemoryDataService<T, K> {

    data: Array<T>;

    constructor() {
        this.data = new Array<T>();
    }

    public getMany(): Promise<Array<T>> {
        return Promise.resolve(this.data);
    }


    public getOne(id: K): Promise<T> {
        let item = this.data.find(val => id == id);
        return Promise.resolve(item);
    }

    public add(dataItem: T): T {
        this.data.push(dataItem);
        return dataItem;

    }

    public delete(id: K): void {
        let index: number = -1;
        let item: T = this.data.find(val => id === id);
        if (item) {
            index = this.data.indexOf(item, 0);
            this.data.slice(index, 1);
        }

    }

}
