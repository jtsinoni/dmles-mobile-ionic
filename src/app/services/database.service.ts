import {Injectable}    from '@angular/core';

import {DataTableDatabase} from '../database/data-table.database';
import {LoggerService} from "./logger/logger-service";
import {AppConfigConstants} from "../constants/app-config.constants";

@Injectable()
export class DatabaseService{
    private dataDB: DataTableDatabase;
    private serviceName = "Database Service";

    constructor(private log: LoggerService) {
        this.log.debug(`${this.serviceName} - Start`);
        this.dataDB = new DataTableDatabase(AppConfigConstants.indexedDatabase.name, this.log);
    }

    /**
     * Add data to local database
     * @param data
     * @returns {Promise<number>}
     */
    public add(data: string): Promise<number> {
        // Wrapped Dexie.Promise to produce Promise
        return Promise.resolve(this.dataDB.data.add({data: data}));
    }

    /**
     * If id param is not null, delete individual record, else delete all records
     * @param id
     * @returns {Promise<void>}
     */
    public delete(id?: number): Promise<void> {
        if (id) { //delete individual records
            return Promise.resolve(this.dataDB.data.delete(id));
        }
        // delete all data
        return Promise.resolve(this.dataDB.data.clear());
    }

    /**
     * For now get everything
     * @param data
     * @returns {Promise<Array<DataTableModel>>}
     */
    public find(data?: string):Promise<any> {
        return Promise.resolve(this.dataDB.data.toArray());
    }

    /**
     * Returns record count
     * @returns {Promise<number>}
     */
    public count(): Promise<number> {
        return Promise.resolve(this.dataDB.data.count());
    }
}
