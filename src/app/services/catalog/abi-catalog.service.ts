import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

import { ApiService } from "../../services/api.service";
import { AppService } from "../../services/app.service";
import { ApiConstants } from "../../constants/api.constants";
import { AuthenticationService } from "../../services/authentication.service";
import { LoggerService } from "../../services/logger/logger-service";


@Injectable()
export class ABiCatalogService extends ApiService {

    constructor(
        http: Http,
        public log: LoggerService,
        protected authenticationService: AuthenticationService,
        private app: AppService) {
        super(http, log, authenticationService, app, ApiConstants.ABI_CATALOG_API);
    }

    public getABiCatalogRecords(searchValue: String): Observable<any> {
        let searchString = 'getABiCatalogRecordESResults?' + searchValue;

        this.log.debug('In getABiCatalogRecordESResults with (' + searchValue + ') making (' + searchString + ')');
        return this.get(searchString);
    }


}


