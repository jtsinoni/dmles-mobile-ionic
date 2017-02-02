import {DataTableModel} from './data-table.model';

export class ServerModel extends DataTableModel {

    serverName: string;
    port:number;

    constructor(name: string, port: number, id?: number) {
        super(name, id);
        this.serverName = name;
        this.port = port;

    }

    toString() : string {
        return this.serverName + ':' + this.port;
    }
}
