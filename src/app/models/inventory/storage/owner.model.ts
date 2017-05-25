export class OwnerModel {
    public id:String;
    public name:String;

    constructor();
    constructor(obj: OwnerModel);
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
    }
}
