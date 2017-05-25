export class InventoryRecordSummaryModel {
    public id: string = "";
    public ownerOrgNodeId: string = "";
    public ownerOrgId: string = "";
    public reorderPointQty: number = 0;
    public levelQty: number = 0;
    public levelingType: string = "S";
    public unitOfInventory: string;
    public unitOfInventoryPrice: number = 0;
    public unitOfInventoryQty: number = 0;
    public isResellable: boolean = false;
    public catalogItemId: string = "";
    public itemId: string = "";
    public totalOnHandBalanceQty: number = 0;
    public totalPhysicalBalanceDifferenceQty: number = 0;
    public totalQueuedForPickQty: number = 0;
    public totalInPickQty: number = 0;
    public totalQueuedForPutQty: number = 0;
    public totalInPutQty: number = 0;
    public minLastInventoryDate: Date = null;
    public maxLastInventoryDate: Date = null;

    constructor();
    constructor(obj: InventoryRecordSummaryModel);
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.ownerOrgNodeId = obj && obj.ownerOrgNodeId || null;
        this.ownerOrgId = obj && obj.ownerOrgId || null;
        this.reorderPointQty = obj && obj.reorderPointQty || null;
        this.levelQty = obj && obj.levelQty || null;
        this.levelingType = obj && obj.levelingType || null;
        this.unitOfInventory = obj && obj.unitOfInventory || null;
        this.unitOfInventoryPrice = obj && obj.unitOfInventoryPrice || null;
        this.unitOfInventoryQty = obj && obj.unitOfInventoryQty || null;
        this.isResellable = obj && obj.isResellable || null;
        this.catalogItemId = obj && obj.catalogItemId || null;
        this.itemId = obj && obj.itemId || null;
        this.totalOnHandBalanceQty = obj && obj.totalOnHandBalanceQty || null;
        this.totalPhysicalBalanceDifferenceQty = obj && obj.totalPhysicalBalanceDifferenceQty || null;
        this.totalQueuedForPickQty = obj && obj.totalQueuedForPickQty || null;
        this.totalInPickQty = obj && obj.totalInPickQty || null;
        this.totalQueuedForPutQty = obj && obj.totalQueuedForPutQty || null;
        this.totalInPutQty = obj && obj.totalInPutQty || null;
        this.minLastInventoryDate = obj && obj.minLastInventoryDate || null;
        this.maxLastInventoryDate = obj && obj.maxLastInventoryDate || null;
    }
}
