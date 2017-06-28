import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

import { ApiService } from "../../services/api.service";
import { AppService } from "../../services/app.service";
import { AuthenticationService } from "../../services/authentication.service";
import { LoggerService } from "../../services/logger/logger-service";
import { ElasticQueryModel } from "../../models/search/elastic-query.model";
import { ElasticFilterFieldModel } from "../../models/search/elastic-filter-field.model";


@Injectable()
export class ABiCatalogService extends ApiService {
    currentQuery: ElasticQueryModel;
    constructor(http: Http,
        public log: LoggerService,
        protected authenticationService: AuthenticationService,
        private app: AppService) {
        super(http, log, authenticationService, app, "AbiCatalog");
    }

    public getABiCatalogRecords(searchValue: string,
        filters?: Array<ElasticFilterFieldModel>,
        searchWithinResults?: string): Observable<any> {
        this.log.debug('search within: ' + searchWithinResults);

        let actionString = 'getABiCatalogRecordESResults';
        if (this.currentQuery) {
            this.currentQuery.searchWithinResults = [];
            // if (filters) {
            //     for (let f of filters) {
            //     this.currentQuery.addFilter("or", new 
            //      f.field, f.value);
            //     }
            // }
            this.currentQuery.addSearchWithinResults(searchWithinResults);

        } else {
            this.currentQuery = ElasticQueryModel.createSimpleQuery(searchValue);
            if (filters) {
                //add new filters here
            }
        }


        // let filters = new Array<ElasticFilterFieldModel>(); 
        // let filter = new ElasticFilterFieldModel("preferredProductIndicator", "Y");
        // filters.push(filter);
        // searchInput.addFilter("or", filters);
        // searchInput.addSearchWithinResults("500s");

        // {
        //     queryString: searchValue,
        //     filters: [
        //         {
        //             operator: "or",
        //             fieldValues: [
        //                 {
        //                     field: "preferredProductIndicator",
        //                     value: "Y"
        //                 }
        //             ]

        //         }
        //     ]
        // }
        //this.log.debug('search input: ' + searchInput);
        return this.post(actionString, this.currentQuery);
    }

    searchWithinResults(search: string) {
        if (this.currentQuery) {
            this.log.debug('got a current query');
            this.currentQuery.addSearchWithinResults(search);
            this.getABiCatalogRecords(this.currentQuery.queryString, null, search);
        }
    }


}





