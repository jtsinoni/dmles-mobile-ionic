
import { ElasticFilterModel } from "./elastic-filter.model";
import { ElasticFilterFieldModel } from "./elastic-filter-field.model";

export class ElasticQueryModel {

    public queryString: string;
    public filters: Array<ElasticFilterModel>;
    public searchWithinResults: Array<string>;

    constructor(query: string) {
        this.queryString = query;
        this.filters = new Array<ElasticFilterModel>();

    }

    public addFilter(operator: string, filters: Array<ElasticFilterFieldModel>) {
        let model: ElasticFilterModel = new ElasticFilterModel(operator)
        for (let fm of filters) {
            model.addFieldValues(fm.field, fm.value);
        }
        this.filters.push(model);
    }


    public addSearchWithinResults(searchItem: string) {
        if (!this.searchWithinResults) {
            this.searchWithinResults = new Array<string>();
        }
        this.searchWithinResults.push(searchItem);
    }  

    public static createSimpleQuery(queryString: string) : ElasticQueryModel {
       return new ElasticQueryModel(queryString);
    }
   

}