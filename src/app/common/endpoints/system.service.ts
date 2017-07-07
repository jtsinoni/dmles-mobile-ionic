
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { ApiService } from "../../services/api.service";
import { AppService } from "../../services/app.service";
import { AuthenticationService } from "../../services/authentication.service";
import { LoggerService } from "../../services/logger/logger-service";
import { BranchModel } from "../../models/branchServices/branch.model"
import { SiteModel } from "../../models/branchServices/site.model"

@Injectable()
export class SystemService extends ApiService {

    private branchServices: Array<BranchModel>;

    private static sites: Array<SiteModel>;

    constructor(http: Http,
        public log: LoggerService,
        protected authenticationService: AuthenticationService,
        private app: AppService) {
        super(http, log, authenticationService, app, "System");
    }

    public getServices() {
        SystemService.sites = new Array<SiteModel>();
        if (!this.branchServices) {
            return this.get("getServices")
                .map(response => response.json())
                .subscribe((response) => {
                    this.branchServices = response;
                    if (this.branchServices) {
                        for (let branch of this.branchServices) {
                            for (let region of branch.regions) {
                                for (let site of region.sites) {
                                    SystemService.sites.push(site);
                                    this.log.debug(site.dodaac + " " + site.name);
                                }
                            }
                        }
                    }
                });
        }
    }

    public getSites() {
        return SystemService.sites;
    }

    public getSiteNameFromDodaac(dodaac: string): string {
        if (SystemService.sites) {
            let site: SiteModel = SystemService.sites.find((t) => t.dodaac === dodaac);
            if (site) {
                return site.name;
            }
        } else {
            return null;
        }
    }


}