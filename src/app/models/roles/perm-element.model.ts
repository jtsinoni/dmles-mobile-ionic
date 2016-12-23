export class PermElement {
    public id: any = "";
    public name: string = "";

    constructor();
    constructor(obj: PermElement);
    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.name = obj && obj.name || "";
    }
}
