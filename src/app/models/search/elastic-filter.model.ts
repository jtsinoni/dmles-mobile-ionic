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

}