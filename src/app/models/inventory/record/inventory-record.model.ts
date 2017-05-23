import {StorageRecordModel} from "./storage-record.model";

export class InventoryRecordModel {
    public id: string;
    public ownerOrgNodeId: string;
    public storageRecords: Array<StorageRecordModel>;
    public reorderPointQty:number = 0;
    public levelQty : number = 0;
    public levelingType: string = "S";
    public unitOfInventory: string;
    public unitOfInventoryPrice: number = 0;
    public unitOfInventoryQty: number = 0;
    public isResellable: boolean = false;
    public catalogItemId: string;

    constructor();
    constructor(obj: InventoryRecordModel);
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.ownerOrgNodeId = obj && obj.ownerOrgNodeId || null;
        this.storageRecords = obj && obj.storageRecords || [];
        this.reorderPointQty = obj && obj.reorderPointQty || null;
        this.levelQty = obj && obj.levelQty || null;
        this.levelingType = obj && obj.levelingType || null;
        this.unitOfInventory = obj && obj.unitOfInventory || null;
        this.unitOfInventoryPrice = obj && obj.unitOfInventoryPrice || null;
        this.unitOfInventoryQty = obj && obj.unitOfInventoryQty||null;
        this.isResellable = obj && obj.isResellable || null;
        this.catalogItemId = obj && obj.catalogItemId || null;
    }
}
