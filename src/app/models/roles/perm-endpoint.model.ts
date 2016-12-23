export class PermEndpoint {
    public id: any = "";
    public businessMethod: string = "";

    constructor();
    constructor(obj: PermEndpoint);
    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.businessMethod = obj && obj.businessMethod || "";
    }
}
