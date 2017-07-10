import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

import { ApiService } from "../../services/api.service";
import { AppService } from "../../services/app.service";
import { AuthenticationService } from "../../services/authentication.service";
import { LoggerService } from "../../services/logger/logger-service";

@Injectable()
export class SiteCatalogService extends ApiService {

      constructor(http: Http,
        public log: LoggerService,
        protected authenticationService: AuthenticationService,
        private app: AppService) {
        super(http, log, authenticationService, app, "AbiSiteCatalog");
    }

    public retrieveSiteCatalogItems(identifierType: string, identifier: string) : Observable<any> {
      
        if (identifierType === "enterprise") {
            let action: string = "getSiteCatalogByEnterpriseId?enterpriseProductIdentifier=" + identifier;
            return this.get(action);
        } else if (identifierType === "product") {
            let action: string = "getSiteCatalogByProductId?productSeqId=" + identifier;
            return this.get(action);
        } else {
            return null;
        }
    };

}