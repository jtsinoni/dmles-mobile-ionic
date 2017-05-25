import {Injectable} from "@angular/core";
import {LoggerService} from "../logger/logger-service";
import {BaseDatabaseService} from './base-database.service';
import {DatabaseTableModelService} from "./database-table-model.service";
import {IMBarcodeTableModel} from "../../models/barcode/im-barcode-table.model";

@Injectable()
export class IMDatabaseService extends BaseDatabaseService<IMBarcodeTableModel> {
    constructor(databaseTableModelService: DatabaseTableModelService,
                log: LoggerService) {
        super('IM Database Service', databaseTableModelService.getIMDataTable(), log);
    }
}
