export class Permission {
    public id:any = "";
    public name:string = "";
    public description:string = "";
    public functionalArea:string = "";
    public active:Boolean = true;

    constructor();
    constructor(obj:Permission);
    constructor(obj?:any) {
        this.id = obj && obj.id || "";
        this.name = obj && obj.name || "";
        this.description = obj && obj.description || "";
        this.functionalArea = obj && obj.functionalArea || "";
        this.active = obj && obj.active || true;
    }
}
