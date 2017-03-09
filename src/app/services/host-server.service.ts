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

    // getDefaultServer(): ServerModel {
    //     let defaultServer: ServerModel;
        
    //    Promise.resolve().then(() => {
    //         return this.getWhere('isDefault', 1); // id -- where requires an indexed 'column'
    //     }).then((tt) => {
    //         tt.first().then((dd) => {
    //             this.log.debug('what is dd: ' + dd);
    //             defaultServer = dd;
    //         });

    //     })


    //     return defaultServer;
    // }  

    setDefaultServer(server: ServerModel) {
        // unset all        
        this.dbTable.where("isDefault").equals(1).modify({ isDefault: 0 });
        // set the default to this one
        server.isDefault = 1;
        return this.dbTable.update(server.id, server);
    }

}
