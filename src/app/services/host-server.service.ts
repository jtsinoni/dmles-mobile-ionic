import { Injectable } from "@angular/core";
import { LoggerService } from "./logger/logger-service";
import { ServerModel } from '../models/server.model'
import { BaseDatabaseService } from '../services/base-database.service';
import { DexieDatabaseService } from '../services/dexie-database.service'

@Injectable()
export class HostServerService extends BaseDatabaseService<ServerModel> {

    constructor(private databaseService: DexieDatabaseService, log: LoggerService) {
        super("Host Server Service", databaseService.getServersDataTable(), log);

    }


    setDefaultServer(server: ServerModel) {
        this.dbTable.toCollection().modify({ isDefault: false }).then(() => {
            server.isDefault = true;
            this.update(server);
        }).catch((error) => {
            this.log.error(error);
        });
    }


    defaultServerCallBack = (s: ServerModel): boolean => {
        return s.isDefault === true;
    }

    getDefaultServer() {
        return this.dbTable.filter(this.defaultServerCallBack).first();
    }


}
