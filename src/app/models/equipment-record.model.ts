import { BaseDataTableModel } from './base-data-table.model';

export class EquipmentRecordModel extends BaseDataTableModel {
    itemId: string;
    orgId: string;
    meECNId: string; //mec...
    itemDesc:string;
    longItemDesc:string;
    equipmentStatus:string;
    ecn:string;
    deviceClass:string;

    //id: string = this.itemId;
    constructor(id?: number) {
        super(id);
    }

}
