/**
 * Created by johntsinonis on 11/8/16.
 */
import {Injectable}    from '@angular/core';

import {DatabaseDefaultsModel} from '../models/database-defaults.model';
import {DataTableDatabase} from '../database/data-table.database';

@Injectable()
export class DatabaseService {
    private dataDB: DataTableDatabase;

    constructor() {
        this.dataDB = new DataTableDatabase(DatabaseDefaultsModel.databaseName);
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
