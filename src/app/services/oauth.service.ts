import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {ApiService} from "./api.service";
import {CurrentUserProfile} from "../models/current-user-profile.model";
import {ApiConstants} from "../constants/api.constants";
import {AuthenticationService} from "./authentication.service";
import {AppService} from "./app.service";
import {Base64Service} from "../common/services/base64.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {LoggerService} from "./logger/logger-service";
import {AppConfig} from "../configs/app-config";
import {JSONWebTokenService} from "./jason-web-token.service";

declare var window: any;

@Injectable()
export class OAuthService extends ApiService {
    public currentUser: CurrentUserProfile;
    public serviceName: string = "OAuth Service";

    constructor(http: Http,
                public log: LoggerService,
                protected authenticationService: AuthenticationService,
                private app: AppService,
                private AppConfig: AppConfig,
                private Base64Service: Base64Service,
                private localStorageService: LocalStorageService,
                private jwtService: JSONWebTokenService) {

        super(http, log, authenticationService, app, "OAuth");
        this.log.debug(`${this.serviceName} - Start`);
    }

    private apiGetToken(dn:string): Observable<any> {
        var encodedDn = this.Base64Service.b64EncodeUnicode(`${dn}:${this.AppConfig.OAuth.password}`);
        return this.getTokenViaOAuth("token", encodedDn);
    }

    public getToken(dn):Observable<any> {
        let token = this.localStorageService.getData(ApiConstants.DMLES_TOKEN);
        if(token){
            this.log.debug(`${this.serviceName} - Token found locally`);

            // Check if token is expired
            if(this.jwtService.isTokenExpired(token)) {
                this.log.debug(`Token expired => ${this.jwtService.getTokenExpirationDate(token)}`);
                return this.getNewToken(dn);
            }

            return Observable.of(token);
        }else{
            this.log.debug(`${this.serviceName} - Token not found locally`);
            return this.getNewToken(dn);
        }
    }

    public getNewToken(dn): Observable<any> {
        return this.apiGetToken(dn)
            .map((response) => {
                if(response) {
                    let results = response.json();
                    this.authenticationService.saveToken(results.authctoken);
                    this.log.debug(`${this.serviceName} - New token received and saved`);
                    return results.authctoken;

                } else {
                    return Observable.of(null)
                }
            });
    }

}
