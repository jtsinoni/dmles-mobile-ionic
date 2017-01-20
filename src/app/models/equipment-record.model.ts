import { DataItemModel } from './data-item.model';

export class EquipmentRecordModel extends DataItemModel<string> {
    itemId: string;
    orgId: string;
    meECNId: string; //mec...
    itemDesc:string;
    longItemDesc:string;
    equipmentStatus:string;
    ecn:string;
    deviceClass:string;

    id: string = this.itemId;

}
