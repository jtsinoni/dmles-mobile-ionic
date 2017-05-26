import { Injectable } from "@angular/core";
import { LoggerService } from "../logger/logger-service";
import { StoreDataTableModel } from '../../models/store-data-table.model'
import { BaseDatabaseService } from './base-database.service';
import { DatabaseTableModelService } from './database-table-model.service';

@Injectable()
export class StoreDatabaseService extends BaseDatabaseService<StoreDataTableModel> {
    constructor(databaseTableModelService: DatabaseTableModelService,
        log: LoggerService) {
        super('Store Database Service', databaseTableModelService.getStoreDataTable(), log);
    }
}
