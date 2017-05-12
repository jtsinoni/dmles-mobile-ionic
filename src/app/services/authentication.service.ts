import {ApiConstants} from "../constants/api.constants";
import {Injectable} from "@angular/core";
import {LoggerService} from "./logger/logger-service";
import { JSONWebTokenService } from "./jason-web-token.service";
import {LocalStorageService} from "./local-storage/local-storage.service";

@Injectable()
export class AuthenticationService {
    private serviceName = "Authentication Service";


    constructor(private log: LoggerService, private localStorageService: LocalStorageService,
                private jwtService: JSONWebTokenService) {
        this.log.debug(`${this.serviceName} - Start`);

    }

    public getToken():Promise<any> {
        return this.localStorageService.getData(ApiConstants.DMLES_TOKEN);
    }

    public logout():Promise<any> {
        return this.localStorageService.removeData(ApiConstants.DMLES_TOKEN);
        // todo should we clear all messagingDataModel...?
        //this.localStorageService.clearData();
    }

    public saveToken(token):Promise<any> {
        return this.localStorageService.storeData(ApiConstants.DMLES_TOKEN, token);
    }

    public isTokenValid(): Promise<boolean> {
        return this.localStorageService.getData(ApiConstants.DMLES_TOKEN)
            .then((token) => {
                if(token) {
                    this.log.debug(`${this.serviceName} - Token found locally`);
                    return !this.jwtService.isTokenExpired(token);
                } else {
                    return false;
                }

            })
            .catch((error) => {
                this.log.error(`${this.serviceName} => ${error}`)
            })
    }
}
