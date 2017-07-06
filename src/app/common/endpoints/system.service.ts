
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { ApiService } from "../../services/api.service";
import { AppService } from "../../services/app.service";
import { AuthenticationService } from "../../services/authentication.service";
import { LoggerService } from "../../services/logger/logger-service";
import { BranchServicesModel } from "../../models/branchServices/branch-services.model"
import { SiteModel } from "../../models/branchServices/site.model"

@Injectable()
export class SystemService extends ApiService {

    private branchServices: BranchServicesModel;

    constructor(http: Http,
        public log: LoggerService,
        protected authenticationService: AuthenticationService,
        private app: AppService) {
        super(http, log, authenticationService, app, "System");
    }

    public getServices() {
        if (!this.branchServices) {
            return this.get("getServices")
                .map(response => response.json())
                .subscribe((response) => {
                    this.branchServices = response;
                    this.log.debug("Services: " + this.branchServices);
                });
        }
    }

    public getSiteFromDodaac(dodaac: string): SiteModel {
        if (this.branchServices) {
            return this.branchServices.getSiteByDodaac(dodaac);
        } else {
            return null;
        }
    }


}