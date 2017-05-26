import {Injectable} from "@angular/core";
import {LoggerService} from "../logger/logger-service";
import {BaseDatabaseService} from './base-database.service';
import {DatabaseTableModelService} from "./database-table-model.service";
import {ABiBarcodeTableModel} from "../../models/barcode/abi-barcode-table.model";

@Injectable()
export class ABiDatabaseService extends BaseDatabaseService<ABiBarcodeTableModel> {
    constructor(databaseTableModelService: DatabaseTableModelService,
                log: LoggerService) {
        super('ABi Database Service', databaseTableModelService.getABiDataTable(), log);
    }
}
