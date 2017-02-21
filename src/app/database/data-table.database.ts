import Dexie from 'dexie';
import {DataTableModel} from '../models/data-table.model';
import {SettingsModel} from '../models/settings.model';
import {ServerModel} from '../models/server.model';

import {LoggerService} from "../services/logger/logger-service";

export class DataTableDatabase extends Dexie {
    data: Dexie.Table<DataTableModel, number>;
    settings: Dexie.Table<SettingsModel, number>;
    servers: Dexie.Table<ServerModel, number>;

    constructor(databaseName: string, private log: LoggerService) {
        super(databaseName);
        this.version(1).stores({data: "++id,data"});
        this.version(2).stores({data: "++id,data"});
        this.version(3).stores({
            servers: '++id, serverName, settingsId, port',
            settings: '++id, settingsName, setting, dataType'            
        });      

        // Open it
        this.open().catch(function (e) {
            this.log.error("Open failed: " + e.stack);
        });
        this.data.mapToClass(DataTableModel);
        this.settings.mapToClass(SettingsModel);
        this.servers.mapToClass(ServerModel);
        
    }

 
    

}
