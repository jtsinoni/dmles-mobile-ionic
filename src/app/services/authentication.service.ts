import {ApiConstants} from "../constants/api.constants";
import {Injectable} from "@angular/core";
import {LocalStorageService} from "./local-storage.service";
import {LoggerService} from "./logger/logger-service";

@Injectable()
export class AuthenticationService {
    private serviceName = "Authentication Service";

    constructor(private log: LoggerService, private LocalStorageService: LocalStorageService) {
        this.log.debug(`${this.serviceName} - Start`);
    }

    public getToken() {
        return this.LocalStorageService.getData(ApiConstants.DMLES_TOKEN);
    }

    public isLoggedIn() {
        return !!this.getToken();
    }

    public logout() {
        this.LocalStorageService.removeData(ApiConstants.DMLES_TOKEN);
        this.LocalStorageService.clearData();
    }

    public saveToken(token) {
        this.LocalStorageService.storeData(ApiConstants.DMLES_TOKEN, token, false);
    }
}
