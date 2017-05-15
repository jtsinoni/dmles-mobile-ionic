import {Injectable} from "@angular/core";
import {LoggerService} from "./logger/logger-service";
import {BaseDatabaseService} from '../services/base-database.service';
import {DatabaseService} from '../services/database.service';
import {IMTableModel} from "../models/im-table.model";

@Injectable()
export class IMDatabaseService extends BaseDatabaseService<IMTableModel> {
    constructor(databaseService: DatabaseService,
                log: LoggerService) {
        super('IM Database Service', databaseService.getIMDataTable(), log);
    }
}
