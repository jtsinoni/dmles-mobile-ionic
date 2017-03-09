import { BaseDataTableModel } from './base-data-table.model';

export interface IServerModel {
    serverName: string;
    port?: number;
    isDefault: number;
    settingsId?: number;
    toString(): string;
}


export class ServerModel extends BaseDataTableModel implements IServerModel {

    serverName: string;
    port?: number;
    isDefault: number;
    settingsId?: number;

    localIsDefault: boolean;

    constructor(name: string, port?: number, id?: number) {
        super(id);
        this.serverName = name;
        this.port = port;
        if (this.isDefault === 1) {
            this.localIsDefault = true;
        } else {
            this.localIsDefault = false;
        }          

    }

    toString(): string {
        return this.serverName + ':' + this.port;
    }    

}
