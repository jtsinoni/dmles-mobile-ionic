import {ApiConstants} from "../constants/api.constants";
import {Injectable} from "@angular/core";
import {LocalStorageService} from "./local-storage.service";
import {LoggerService} from "./logger/logger-service";
import { JSONWebTokenService } from "./jason-web-token.service";

@Injectable()
export class AuthenticationService {
    private serviceName = "Authentication Service";
    

    constructor(private log: LoggerService, private localStorageService: LocalStorageService, 
    private jwtService: JSONWebTokenService) {
        this.log.debug(`${this.serviceName} - Start`);
      
    }

    public getToken() {
        return this.localStorageService.getData(ApiConstants.DMLES_TOKEN);
    }
    
    public logout() {
        this.localStorageService.removeData(ApiConstants.DMLES_TOKEN);
        // todo should we clear all data...?
        //this.localStorageService.clearData();   
    }

    public saveToken(token) {
        this.localStorageService.storeData(ApiConstants.DMLES_TOKEN, token, false);
    }

    public isTokenValid(): boolean {
        let isValid = false;
        let token = this.localStorageService.getData(ApiConstants.DMLES_TOKEN);
        if (token) {
            this.log.debug(`${this.serviceName} - Token found locally`);
            isValid = !this.jwtService.isTokenExpired(token);        
        }
        return isValid;
    }  

    
}
