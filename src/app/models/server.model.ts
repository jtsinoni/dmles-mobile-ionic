import { BaseDataTableModel } from './base-data-table.model';

export interface IServerModel {
    serverName: string;
    port?: number;
    isDefault: boolean;
    settingsId?: number;
    protocol: string;
    toString(): string;
}


export class ServerModel extends BaseDataTableModel implements IServerModel {

    serverName: string;
    port?: number;
    isDefault: boolean;
    settingsId?: number;
    protocol: string;


    constructor(name: string, port?: number, protocol?: string, id?: number) {
        super(id);
        this.serverName = name;
        this.port = port;    
        this.protocol = protocol;

    }

    toString(): string {
        let proto = this.protocol ? this.protocol : 'https';
        return proto + '://' + this.serverName + ':' + this.port + '/'; 
    }    

}
