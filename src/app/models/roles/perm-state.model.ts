export class PermState {
    public id: any = "";
    public name: string = "";

    constructor();
    constructor(obj: PermState);
    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.name = obj && obj.name || "";
    }
}
