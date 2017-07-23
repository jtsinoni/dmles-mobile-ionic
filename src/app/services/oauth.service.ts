import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

import {ApiService} from "./api.service";
import {ApiConstants} from "../constants/api.constants";
import {AuthenticationService} from "./authentication.service";
import {AppService} from "./app.service";
import {Base64Service} from "../common/services/base64.service";
import {LoggerService} from "./logger/logger-service";
import {AppConfigConstants} from "../constants/app-config.constants";
import {JSONWebTokenService} from "./jason-web-token.service";
import {LocalStorageService} from "./local-storage/local-storage.service";

@Injectable()
export class OAuthService extends ApiService {
    private serviceName: string = "OAuth Service";

    constructor(http: Http,
                public log: LoggerService,
                protected authenticationService: AuthenticationService,
                private app: AppService,
                private Base64Service: Base64Service,
                private localStorageService: LocalStorageService,
                private jwtService: JSONWebTokenService) {

        super(http, log, authenticationService, app, "OAuth");
        this.log.debug(`${this.serviceName} - Start`);
    }

    private apiGetToken(dn:string): Observable<any> {
        let encodedDn = this.Base64Service.b64EncodeUnicode(`${dn}:${AppConfigConstants.OAuth.password}`);
        return this.getTokenViaOAuth("token", encodedDn);
    }

    public getToken(dn): Observable<any> {
        return Observable.fromPromise(
            this.localStorageService.getData(ApiConstants.DMLES_TOKEN)
                .then((token) => {
                    return token;
                })
                .catch((error) => {
                    this.log.error(`${this.serviceName} => ${error}`)
                })
        )
        .flatMap((token) => {
            if(token) {
                this.log.debug(`${this.serviceName} - Token found locally`);
                if(this.jwtService.isTokenExpired(token)) {
                    this.log.debug(`Token expired => ${this.jwtService.getTokenExpirationDate(token)}`);
                    return this.getNewToken(dn);
                } else {
                    return Observable.of(token);
                }
            } else {
                this.log.debug(`${this.serviceName} - Token not found locally`);
                return this.getNewToken(dn);
            }
        });
    }

    private getNewToken(dn): Observable<any> {
        return this.apiGetToken(dn)
            .map((data) => {
                if(data) {
                    let results:any =  this.utilService.getPayload(data);
                    let authctoken: string = results.authctoken;

                    this.log.debug(`Results => ${authctoken}`);

                    // FIX: The below method is promise based, we are treating this as sequential which is incorrect
                    this.authenticationService.saveToken(authctoken);

                    this.log.debug(`${this.serviceName} - New token received and saved`);
                    return authctoken;

                } else {
                    return null;
                }
            });
    }

}
