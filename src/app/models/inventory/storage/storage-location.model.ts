export class StorageLocationModel {
    public id:String;
    public name:String;
    public ownerOrgNodeId:String;
    public locationTypes:String[];
    public locationAccess:String;
    public authorizedOrgNodeIds:String[];

    constructor();
    constructor(obj: StorageLocationModel);
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.service || null;
        this.ownerOrgNodeId = obj && obj.ownerOrgNodeId || null;
        this.locationTypes = obj && obj.locationTypes || null;
        this.locationAccess = obj && obj.locationAccess || null;
        this.authorizedOrgNodeIds = obj && obj.authorizedOrgNodeIds || null;
    }
}
