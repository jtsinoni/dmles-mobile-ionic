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


    constructor(name: string, isDefault?: boolean, port?: number, protocol?: string, id?: number) {
        super(id);
        this.serverName = name;
        this.port = port;    
        this.protocol = protocol;
        this.isDefault = isDefault ? false : isDefault;       

    }

   

    setPort() {
        if (this.port === undefined) {
            if (this.protocol === "https") {
                this.port = 443
            } else {
                this.port = 80;
            }
        }
    }

    toString(): string {
        let proto = this.protocol ? this.protocol : 'https';
        return proto + '://' + this.serverName + ':' + this.port + '/'; 
    }    

}
