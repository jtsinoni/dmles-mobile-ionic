import Dexie from 'dexie';
import { LoggerService } from "./logger/logger-service";
import { BaseDataTableModel } from '../models/base-data-table.model';

export abstract class BaseDatabaseService<M extends BaseDataTableModel> {
    private serviceName;
    dbTable: Dexie.Table<M, number>;

    constructor(serviceName: string, table: Dexie.Table<M, number>, public log: LoggerService) {

        this.log.debug(`${serviceName} - Start`);
        this.serviceName = serviceName;
        this.dbTable = table;
    }

    getAll() {
        return Promise.resolve(this.dbTable.toArray());
    }

    get(id: number) {
        return Promise.resolve(this.dbTable.where("id").equals(id));
    }

    getWhere(where: string, value: any) {
        return Promise.resolve(this.dbTable.where(where).equals(value));
    }

    add(model: M) {
        return Promise.resolve(this.dbTable.add(model));
    }

    update(model: M) {
        return Promise.resolve(this.dbTable.update(model.id, model));
    }

    getCount(): Promise<number> {
        return Promise.resolve(this.dbTable.count());
    }

    delete(model: M) {
        return Promise.resolve(this.dbTable.delete(model.id));
    }
   

}