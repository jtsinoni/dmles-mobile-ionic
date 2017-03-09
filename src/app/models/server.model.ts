import { BaseDataTableModel } from './base-data-table.model';

export interface IServerModel {
    serverName: string;
    port?: number;
    isDefault: boolean;
    settingsId?: number;
    toString(): string;
}


export class ServerModel extends BaseDataTableModel implements IServerModel {

    serverName: string;
    port?: number;
    isDefault: boolean;
    settingsId?: number;


    constructor(name: string, port?: number, id?: number) {
        super(id);
        this.serverName = name;
        this.port = port;    

    }

    toString(): string {
        return this.serverName + ':' + this.port + ':' + (this.isDefault ? 'Default' : '');
    }    

}
