import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";

import {ApiConstants} from "../constants/api.constants";
import {AppService} from "./app.service";
import {AuthenticationService} from "./authentication.service";
import {LoggerService} from "./logger/logger-service";

export class ApiService {
    private apiServiceName: string = "Api Service";

    constructor(private http: Http, public log: LoggerService, protected Authentication: AuthenticationService, private App: AppService, private managerName: string) {
        this.log.debug(`${this.apiServiceName} - Start`);
    }

    private determineUrl(action: string) {
        let url: string = '';
        switch (this.managerName) {
            case "User":
                url = this.App.getBtBaseUrl() + ApiConstants.USER_API + action;
                break;
            case "Role":
                url = this.App.getBtBaseUrl() + ApiConstants.ROLE_API + action;
                break;
            case "EquipmentManagement":
                url = this.App.getBtBaseUrl() + ApiConstants.EQUIPMENT_API + action;
                break;
            case "Site":
                url = this.App.getBtBaseUrl() + ApiConstants.SITE_API + action;
                break;
            case "System":
                url = this.App.getBtBaseUrl() + ApiConstants.SYSTEM_API + action;
                break;
            case "OAuth":
                url = this.App.getBtBaseUrl() + ApiConstants.OAUTH_API + action;
                break;
            default:
                url = this.App.getBtBaseUrl() + this.managerName + '/Api/' + action;
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

        return this.http.post(url, {}, {headers:headers});
    };

    public get(action: string): Observable<any> {
        let url: string = this.determineUrl(action);
        this.log.debug(`${this.apiServiceName} - BT Get URL: ${url}`);

        let headers = new Headers();
        headers.append('Authorization', 'Token ' + this.Authentication.getToken());
        headers.append('ClientId', 'dmles');

        return this.http.get(url, {headers: headers});
    };

    public post(action: string, data: any): Observable<any> {
        let url: string = this.determineUrl(action);
        this.log.debug(`${this.apiServiceName} - BT Post URL: ${url}`);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Token ' + this.Authentication.getToken());
        headers.append('ClientId', 'dmles');

        return this.http.post(url, data, {headers: headers});
    };

}
