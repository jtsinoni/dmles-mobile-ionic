import {Injectable} from "@angular/core";
import {LoggerService} from "./logger/logger-service";
import {BaseDatabaseService} from '../services/base-database.service';
import {DatabaseTableModelService} from "../services/database-table-model.service";
import {IMTableModel} from "../models/im-table.model";

@Injectable()
export class IMDatabaseService extends BaseDatabaseService<IMTableModel> {
    constructor(databaseTableModelService: DatabaseTableModelService,
                log: LoggerService) {
        super('IM Database Service', databaseTableModelService.getIMDataTable(), log);
    }
}
