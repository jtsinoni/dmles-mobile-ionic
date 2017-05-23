import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

import { ApiService } from "../../services/api.service";
import { AppService } from "../../services/app.service";
import { AuthenticationService } from "../../services/authentication.service";
import { LoggerService } from "../../services/logger/logger-service";


@Injectable()
export class ABiCatalogService extends ApiService {

    constructor(
        http: Http,
        public log: LoggerService,
        protected authenticationService: AuthenticationService,
        private app: AppService) {
        super(http, log, authenticationService, app, "AbiCatalog");
    }

    public getABiCatalogRecords(searchValue: string): Observable<any> {

        let updatedSearchValue = this.formatSearchValue(searchValue);

        let searchString = 'getABiCatalogRecordESResults?queryString=' + updatedSearchValue;

        this.log.debug('In getABiCatalogRecordESResults with (' + searchValue + ') making (' + searchString + ')');
      
        return this.get(searchString);
    }

    private formatSearchValue(searchValue: string) {
        let updatedSearchValue: string = searchValue;
        if ((updatedSearchValue.lastIndexOf("unspscCommodity") >= 0) || (updatedSearchValue.lastIndexOf("productType") >= 0)) {
            // do not add asterisks since we are doing a secondary search
        } else {
            let updatedSearchValueArray: Array<string> = updatedSearchValue.split(" ");
            updatedSearchValue = "";
            for (let i = 0; i < updatedSearchValueArray.length; i++) {
                if (i === updatedSearchValueArray.length - 1) {
                    updatedSearchValue += '*' + updatedSearchValueArray[i] + '* ';
                } else {
                    updatedSearchValue += '*' + updatedSearchValueArray[i] + '* AND ';
                }
            }
            updatedSearchValue = updatedSearchValue.trim();

            this.log.debug("updatedSearchValue: " + JSON.stringify(updatedSearchValue));
        }

        if (updatedSearchValue.indexOf("AND ") === 0) {
            updatedSearchValue = updatedSearchValue.substr("AND ".length);
        }
        // encode URI/URL reserved characters
        return encodeURIComponent(updatedSearchValue);

    }

}




