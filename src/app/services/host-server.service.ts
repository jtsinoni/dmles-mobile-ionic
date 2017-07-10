import { Injectable } from "@angular/core";
import { LoggerService } from "./logger/logger-service";
import { ServerModel } from '../models/server.model'
import { BaseDatabaseService } from './database/base-database.service';
import { DatabaseTableModelService } from './database/database-table-model.service'

@Injectable()
export class HostServerService extends BaseDatabaseService<ServerModel> {

    constructor(private databaseService: DatabaseTableModelService, log: LoggerService) {
        super("Host Server Service", databaseService.getServersDataTable(), log);

    }

    addHostServer(server: ServerModel) {
        server.setPort();
        this.add(server).then(() => {
            if (server.isDefault) {
                this.setDefaultServer(server);
            }
        }).catch((error) => {
            this.log.error(error);
        });

    }

    updateHostServer(server: ServerModel) {
        server.setPort();
        this.update(server).then(() => {
            if (server.isDefault) {
                this.setDefaultServer(server);
            }
        }).catch((error) => {
            this.log.error(error);
        });

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
        return this.findFirst(this.defaultServerCallBack);
    }


}
