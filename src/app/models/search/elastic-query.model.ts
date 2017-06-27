
import { ElasticFilterModel } from "./elastic-filter.model";

export class ElasticQueryModel {

    public queryString: string;
    public searchWithinResults: Array<string>;
    public filters: Array<ElasticFilterModel>;

    constructor(query: string) {
        this.queryString = query;
    }

    public addFilter(operator: string) {
        this.filters.push(new ElasticFilterModel(operator));
    }

    public addSearchWithinResults(searchItem: string) {
        this.searchWithinResults.push(searchItem);
    }

    toString(): string {
        let s = "{ \"queryString\":" + this.queryString + ",";
        let count = this.filters.length;
        let index = 0
        for (let filter of this.filters) {
            s += filter.toString();
            if (index < (count - 1)) {
                s += ",";
            }
            index++;
        }
        // add search within results
        s += this.formatSearchWithinResults();
        s += "}";
        return s;
    }

    formatSearchWithinResults(): string {
        let s: string = "";
        let count = this.searchWithinResults.length;
        let index = 0
        if (count > 0) {
            s += "["
            for (let search of this.searchWithinResults) {
                s += "\"" + search + "\"";
                if (index < (count - 1)) {
                    s += ",";
                }
                index++;

            }
            s += "]";
        }
        return s;

    }


}