export class ElasticFilterFieldModel {
    field: string;
    value: string;

    constructor(field: string, value: string) {
        this.field = field;
        this.value = value;
    }


    public toString() : string {
        let t: string = "{ \"field\": " + "\"" + this.field + "\",";
        t += "{ \"value\": " + "\"" + this.value + "\"}";
        return t;    }

    
}