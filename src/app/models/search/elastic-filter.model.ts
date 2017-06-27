import { ElasticFilterFieldModel } from  "./elastic-filter-field.model";

export class ElasticFilterModel {

    operator: string;
    fieldValues: Array<ElasticFilterFieldModel>;

    constructor (operator: string) {
        this.operator = operator;
        this.fieldValues = new Array<ElasticFilterFieldModel>();
    }

    addFieldValues(field: string, value: string) {
        this.fieldValues.push(new ElasticFilterFieldModel(field, value));
    }

    toString() {
        let t:string = "\"filters\": [";
        let count: number = this.fieldValues.length;
        let index: number = 0;
        for (let model of this.fieldValues) {
            t+= model.toString();
            if (index < (count - 1)) {
                t += ",";
            }  
            index++;
        }

        t += "]";
        return t;


    }



}