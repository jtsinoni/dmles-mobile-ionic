import {AppConfig} from "../configs/app-config";
import {Injectable} from "@angular/core";
import {LoggerService} from "./logger/logger-service";

export interface IAppService {

}

@Injectable()
export class AppService implements IAppService {
    private btBaseUrl:string;
    private serviceName:string = "App Service";

    constructor(private log: LoggerService, private AppConfig: AppConfig) {
        this.setConfigs();
    }

    public getBtBaseUrl() {
        return this.btBaseUrl;
    }

    public setConfigs() {
        if (this.AppConfig.apiHosts.btBaseUrl) {
            this.btBaseUrl = this.AppConfig.apiHosts.btBaseUrl;
            this.log.debug(`${this.serviceName} - btBaseUrl loaded: ${this.btBaseUrl}`);
        } else {
            this.log.error(`${this.serviceName} - Error: Unable to load btBaseUrl`);
        }
    }
}
