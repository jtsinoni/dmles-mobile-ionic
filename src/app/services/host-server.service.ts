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


    setDefaultServer(server: ServerModel) {
        // unset all       TODO test this 

        this.dbTable.where("isDefault").equals(1).modify({ isDefault: 0 }).then((t) => {
            this.log.debug('what is t: ' + t);

        }).catch((error) => {
            this.log.error(error.toString());
        });
        // set the default to this one
        // server.isDefault = 1;
        // return this.dbTable.update(server.id, server);
    }


   defaultServerCallBack = (s: ServerModel) : boolean => {
       return s.isDefault === true;
   } 

   getDefaultServer() {
       return this.dbTable.filter(this.defaultServerCallBack).first();  
   }
   

}
