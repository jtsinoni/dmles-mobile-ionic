export class ExampleModel {
    public barcode: string = "";

    constructor();
    constructor(obj: ExampleModel);
    constructor(obj?: any) {
        this.barcode = obj && obj.barcode || "";
    };
}
