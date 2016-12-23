import { DataItemModel } from './data-item.model';

export class EquipmentRecordModel extends DataItemModel<string> {
    itemId: string;
    orgId: string
    shortItemDesc:string;
    longItemDesc:string;
    equipmentStatus:string;
    ecn:string;
    deviceClass:string;

    id: string = this.itemId;

}