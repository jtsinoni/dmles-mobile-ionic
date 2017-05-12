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

    getSettingsDataTable(): any {
        return this.dataDB.settings;
    }

    getServersDataTable(): any {
        return this.dataDB.servers;
    }

    getStoreDataTable(): any {
        return this.dataDB.data;
    }

    getOrderDataTable(): any {
        return this.dataDB.orders;
    }

    getIMDataTable() {
        return this.dataDB.im;
    }
}
