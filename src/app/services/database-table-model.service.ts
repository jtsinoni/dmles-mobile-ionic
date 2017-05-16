import {Injectable}    from '@angular/core';

import {DataTableDatabase} from '../database/data-table.database';
import {LoggerService} from "./logger/logger-service";
import {AppConfigConstants} from "../constants/app-config.constants";

@Injectable()
export class DatabaseTableModelService{
    private dataDB: DataTableDatabase;
    private serviceName = "Database Service";

    constructor(private log: LoggerService) {
        this.log.debug(`${this.serviceName} - Start`);
        this.dataDB = new DataTableDatabase(AppConfigConstants.indexedDatabase.name, this.log);
    }

    getSettingsDataTable() {
        return this.dataDB.settings;
    }

    getServersDataTable() {
        return this.dataDB.servers;
    }

    getStoreDataTable() {
        return this.dataDB.data;
    }

    getOrderDataTable() {
        return this.dataDB.orders;
    }

}
