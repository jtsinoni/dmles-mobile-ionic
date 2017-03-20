import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { LoggerService } from "./logger/logger-service";
import { StoreDataTableModel } from '../models/store-data-table.model'
import { BaseDatabaseService } from '../services/base-database.service';
import { DatabaseService } from '../services/database.service';

@Injectable()
export class StoreDatabaseService extends BaseDatabaseService<StoreDataTableModel> {


    constructor(databaseService: DatabaseService,
        private http: Http,
        log: LoggerService) {
        super('Store Database Service', databaseService.getStoreDataTable(), log);
    }

    



}