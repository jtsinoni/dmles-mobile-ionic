import Dexie from 'dexie';
import {DataTableModel} from '../models/data-table.model';
import {LoggerService} from "../services/logger/logger-service";

export class DataTableDatabase extends Dexie {
    data: Dexie.Table<DataTableModel, number>;

    constructor(databaseName: string, private log: LoggerService) {
        super(databaseName);
        this.version(1).stores({
            data: "++id,data"
        });

        // Open it
        this.open().catch(function (e) {
            this.log.error("Open failed: " + e.stack);
        });

        this.data.mapToClass(DataTableModel);
    }

}
