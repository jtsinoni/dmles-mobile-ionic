export class Role {
    public id:any = "";
    public name:string = "";
    public description:string = "";
    public functionalArea:string = "";
    public assignedPermissions:Array<any> = [];
    public systemRole:boolean = false;

    constructor();
    constructor(obj:Role);
    constructor(obj?:any) {
        this.id = obj && obj.id || "";
        this.name = obj && obj.name || "";
        this.description = obj && obj.description || "";
        this.functionalArea = obj && obj.functionalArea || "";
        this.assignedPermissions = obj && obj.assignedPermissions || [];
        this.systemRole = obj && obj.systemRole || false;
    }
}
