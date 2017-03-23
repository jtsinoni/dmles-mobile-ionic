import Dexie from 'dexie';
import { StoreDataTableModel } from '../models/store-data-table.model';
import { SettingsModel } from '../models/settings.model';
import { ServerModel } from '../models/server.model';

import { OrderModel } from '../models/order.model';
import { LoggerService } from "../services/logger/logger-service";

export class DataTableDatabase extends Dexie {
    data: Dexie.Table<StoreDataTableModel, number>;
    settings: Dexie.Table<SettingsModel, number>;
    servers: Dexie.Table<ServerModel, number>;
    orders: Dexie.Table<OrderModel, number>;


    constructor(databaseName: string, private log: LoggerService) {
        super(databaseName);
        //this.delete();
        this.version(1).stores({ 
            data: "++id,data",      
            servers: '++id, serverName, port, protocol, isDefault',
            settings: '++id, settingsName, setting, dataType, *values',
            orders: '++id, documentNumber, referenceId, itemId, requiredDate, orderDate, orderState, orderQuantity, requestor, unitOfPurchasePrice' 
        });

        // Open it
        this.open().catch(function (e) {
            this.log.error("Open failed: " + e.stack);
        });
        this.data.mapToClass(StoreDataTableModel);
        this.settings.mapToClass(SettingsModel);
        this.servers.mapToClass(ServerModel);
        this.orders.mapToClass(OrderModel);

    }




}
