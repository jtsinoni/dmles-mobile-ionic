import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import {Platform} from "ionic-angular";

import { ApiConstants } from "../constants/api.constants";
import { AppService } from "./app.service";
import { AuthenticationService } from "./authentication.service";
import { LoggerService } from "./logger/logger-service";
import { ServerModel } from "../models/server.model";
import {AppInjector} from "../app.module";
import {CACService} from "./cac.service";
import {UtilService} from "../common/services/util.service";

export class ApiService {
    private apiServiceName: string = "Api Service";
    private defaultServer: ServerModel;
    private cacService: CACService;
    protected utilService: UtilService;
    public platform: Platform;

    constructor(
        private http: Http,
        public log: LoggerService,
        protected Authentication: AuthenticationService,
        private App: AppService,
        private managerName: string) {
        this.log.debug(`${this.apiServiceName} - Start`);
        this.cacService = AppInjector.get(CACService)
        this.utilService = AppInjector.get(UtilService);
        this.platform = AppInjector.get(Platform);
    }


    private determineUrl(action: string) {
        let url: string = this.getServer();
        switch (this.managerName) {
            case "User":
                url += ApiConstants.USER_API + action;
                break;
            case "Role":
                url += ApiConstants.ROLE_API + action;
                break;
            case "EquipmentManagement":
                url += ApiConstants.EQUIPMENT_API + action;
                break;
            case "Site":
                url += ApiConstants.SITE_API + action;
                break;
            case "System":
                url += ApiConstants.SYSTEM_API + action;
                break;
            case "OAuth":
                url += ApiConstants.OAUTH_API + action;
                break;
            case "Inventory":
                url += ApiConstants.INVENTORY_API + action;
                break;
            case "AbiCatalog":
                url += ApiConstants.ABI_PRODUCTION_API + action;
                break;
            case "AbiSiteCatalog":
                url += ApiConstants.ABI_SITE_CATALOG_API + action;
                break;
            default:
                url += this.managerName + '/Api/' + action;
        }
        return url;
    };

    public getTokenViaOAuth(action: string, encodedDn: string): Observable<any> {
        let url: string = this.determineUrl(action);
        this.log.debug(`${this.apiServiceName} - BT getToken URL: ${url}`);

        let headers:any = {'Content-Type': 'application/json',
                           'Authorization': 'Basic ' + encodedDn,
                           'Accept': 'application/json',
                           'ClientId': 'dmles'};

        if(this.platform.is('android')) {
            return this.cacService.sendPost(url, "{}", headers);
        } else {
            return this.http.post(url, {}, { headers: new Headers(headers) });
        }
    };

    public get(action: string): Observable<any> {
        let url: string = this.determineUrl(action);
        this.log.debug(`${this.apiServiceName} - BT Get URL: ${url}`);

        return this.getLocalToken()
            .flatMap((token) => {
                let headers:any = {'Authorization': 'Token ' + token ,
                                   'Accept': 'application/json',
                                   'ClientId': 'dmles'};

                if(this.platform.is('android')) {
                    return this.cacService.sendGet(url, headers);
                } else {
                    return this.http.get(url, {headers: new Headers(headers)});
                }
            });
    };

    public post(action: string, data: any): Observable<any> {
        let url: string = this.determineUrl(action);
        this.log.debug(`${this.apiServiceName} - BT Post URL: ${url}`);
        this.log.debug(`${this.apiServiceName} - BT Post Data: ${JSON.stringify(data)}`);

        return this.getLocalToken()
            .flatMap((token) => {

                let headers:any = {'Content-Type': 'application/json',
                                   'Authorization': 'Token ' + token ,
                                   'Accept': 'application/json',
                                   'ClientId': 'dmles'};

                if(this.platform.is('android')) {
                    return this.cacService.sendPost(url, data, headers);
                } else {
                    return this.http.post(url, data, { headers: new Headers(headers) });
                }
            });
    };

    private getLocalToken(): Observable<any> {
        return Observable.fromPromise(
            this.Authentication.getToken()
                .then((token) => {
                    return token;
                })
                .catch((error) => {
                    this.log.error(`${this.apiServiceName} - ${error}`);
                })
        )
    }

    public setServer(server: ServerModel) {
        this.defaultServer = server;
    }

    getServer() {
        if (this.defaultServer === null || this.defaultServer === undefined) {
            return this.App.getBtBaseUrl();
        } else {
            return this.defaultServer.toString();
        }
    }

}
