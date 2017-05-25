export class StorageRecordModel {
    public id: string;
    public storageLocationId: string;
    public stratificationState: string;
    public onHandBalanceQty: number = 0;
    public physicalBalanceDifferenceQty: number = 0;
    public queuedForPickQty: number = 0;
    public inPickQty: number = 0;
    public queuedForPutQty: number = 0;
    public inPutQty: number = 0;
    public lastInventoryDate: Date;
    public isLocked: boolean;

    constructor();
    constructor(obj: StorageRecordModel);
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.storageLocationId = obj && obj.storageLocationId || null;
        this.stratificationState = obj && obj.stratificationState || null;
        this.onHandBalanceQty = obj && obj.onHandBalanceQty || null;
        this.physicalBalanceDifferenceQty = obj && obj.physicalBalanceDifferenceQty || null;
        this.queuedForPickQty = obj && obj.queuedForPickQty || null;
        this.inPickQty = obj && obj.inPickQty || null;
        this.queuedForPutQty = obj && obj.queuedForPutQty || null;
        this.inPutQty = obj && obj.inPutQty || null;
        this.lastInventoryDate = obj && obj.lastInventoryDate || null;
        this.isLocked = obj && obj.isLocked || null;
    }
}
