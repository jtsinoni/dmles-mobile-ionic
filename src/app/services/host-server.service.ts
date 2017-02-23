import { Injectable } from "@angular/core";
import { LoggerService } from "./logger/logger-service";
import { ServerModel } from '../models/server.model'
import { BaseDatabaseService } from '../services/base-database.service';
import { DexieDatabaseService } from '../services/dexie-database.service' 

@Injectable()
export class HostServerService extends BaseDatabaseService<ServerModel> {

    constructor(databaseService: DexieDatabaseService, log: LoggerService) {
     super("Host Server Service", databaseService.getServersDataTable(), log);
       
    }

    getDefaultServer() {
        return Promise.resolve(this.dbTable.where("defaultServer").equals(1))
            .then((model) => {
                this.log.debug(`Get default server from IndexedDB`)
                return model;
            })
            .catch((error) => {
                this.log.error(error);
            });
    }

    setDefaultServer(server: ServerModel) {
        // unset all        
        this.dbTable.where("isDefault").equals(1).modify({isDefault: 0});
        // set the default to this one
        server.isDefault = true;
        return this.dbTable.update(server.id, server);        
    }

}
