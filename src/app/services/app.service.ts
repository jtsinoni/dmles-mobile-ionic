import {Injectable} from "@angular/core";
import {LoggerService} from "./logger/logger-service";
import {AppConfigConstants} from "../constants/app-config.constants";

export interface IAppService {

}

@Injectable()
export class AppService implements IAppService {
    private btBaseUrl:string;
    private serviceName:string = "App Service";

    constructor(private log: LoggerService) {
        this.log.debug(`${this.serviceName} - Start`);
        this.setConfigs();
    }

    public getBtBaseUrl() {
        return this.btBaseUrl;
    }

    public setConfigs() {
        if (AppConfigConstants.apiHosts.btBaseUrl) {
            this.btBaseUrl = AppConfigConstants.apiHosts.btBaseUrl;
            this.log.debug(`${this.serviceName} - btBaseUrl loaded: ${this.btBaseUrl}`);
        } else {
            this.log.error(`${this.serviceName} - Error: Unable to load btBaseUrl`);
        }
    }
}
