import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";

import { ApiConstants } from "../constants/api.constants";
import { AppService } from "./app.service";
import { AuthenticationService } from "./authentication.service";
import { LoggerService } from "./logger/logger-service";
import { ServerModel } from "../models/server.model";


export class ApiService {
    private apiServiceName: string = "Api Service";
    private defaultServer: ServerModel;

    constructor(
        private http: Http,
        public log: LoggerService,
        protected Authentication: AuthenticationService,
        private App: AppService,
        private managerName: string) {
        this.log.debug(`${this.apiServiceName} - Start`);
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
            default:
                url += this.managerName + '/Api/' + action;
        }
        return url;
    };

    public getTokenViaOAuth(action: string, encodedDn: string): Observable<any> {
        let url: string = this.determineUrl(action);
        this.log.debug(`${this.apiServiceName} - BT getToken URL: ${url}`);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + encodedDn);
        headers.append('ClientId', 'dmles');

        return this.http.post(url, {}, { headers: headers });
    };

    public get(action: string): Observable<any> {
        let url: string = this.determineUrl(action);
        this.log.debug(`${this.apiServiceName} - BT Get URL: ${url}`);

        return this.getLocalToken()
            .flatMap((token) => {
                let headers = new Headers();
                headers.append('Authorization', 'Token ' + token);
                headers.append('ClientId', 'dmles');

                return this.http.get(url, { headers: headers });
            });
    };

    public post(action: string, data: any): Observable<any> {
        let url: string = this.determineUrl(action);
        this.log.debug(`${this.apiServiceName} - BT Post URL: ${url}`);

        return this.getLocalToken()
            .flatMap((token) => {
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Token ' + token);
                headers.append('ClientId', 'dmles');

                return this.http.post(url, data, { headers: headers });
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
