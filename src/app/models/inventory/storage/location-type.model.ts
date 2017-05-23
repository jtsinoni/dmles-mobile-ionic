export class LocationTypeModel {
    public id:String;
    public type:String;

    constructor();
    constructor(obj: LocationTypeModel);
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.type = obj && obj.type || null;
    }
}
