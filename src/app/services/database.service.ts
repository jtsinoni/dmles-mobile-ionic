/**
 * Created by johntsinonis on 11/8/16.
 */
import {Injectable}    from '@angular/core';

import {DatabaseDefaultsModel} from '../models/database-defaults.model';
import {DataTableDatabase} from '../database/data-table.database';

@Injectable()
export class DatabaseService {
    private dataDB: DataTableDatabase;
    //private databaseDefaultsModel: DatabaseDefaultsModel;

    constructor() {
        this.dataDB = new DataTableDatabase(DatabaseDefaultsModel.databaseName);
    }

    /**
     *
     * @param data
     * @returns {Promise<number>}
     */
    public add(data: string) {
        return this.dataDB.data.add({data: data});
    }

    /**
     * If id param is not null, delete individual record, else delete all records
     * @param id
     * @returns {Promise<void>}
     */
    public delete(id?: number) {
        if (id) { //delete individual records
            return this.dataDB.data.delete(id);
        }
        // delete all data
        return this.dataDB.data.clear();
    }

    /**
     * For now get everything
     * @param data
     * @returns {Promise<Array<DataTableModel>>}
     */
    public find(data?: string) {
        return this.dataDB.data.toArray();
    }

    /**
     * Returns record count
     * @returns {Promise<number>}
     */
    public count() {
        return this.dataDB.data.count();
    }
}
