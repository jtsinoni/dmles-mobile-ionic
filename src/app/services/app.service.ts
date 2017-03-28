import { Injectable } from "@angular/core";
import { LoggerService } from "./logger/logger-service";
import { AppConfigConstants } from "../constants/app-config.constants";
import { HostServerService } from "./host-server.service";
import { ServerModel } from "../models/server.model";

export interface IAppService {

}

@Injectable()
export class AppService implements IAppService {
    private btBaseUrl: string;
    private serviceName: string = "App Service";
    private defaultServer: ServerModel;


    constructor(private log: LoggerService, private hostServerService: HostServerService) {
        this.log.debug(`${this.serviceName} - Start`);
        this.setDefaultServer();

    }

    public getBtBaseUrl() {     
        return this.btBaseUrl;       
    }

    private setConfigs() {
        if (this.defaultServer) {
            this.btBaseUrl = this.defaultServer.toString();
        } else if (AppConfigConstants.apiHosts.btBaseUrl) {
            this.btBaseUrl = AppConfigConstants.apiHosts.btBaseUrl;
            this.log.debug(`${this.serviceName} - btBaseUrl loaded: ${this.btBaseUrl}`);
        } else {
            this.log.error(`${this.serviceName} - Error: Unable to load btBaseUrl`);
        }

    }

    private setDefaultServer() {
        Promise.resolve().then(() => {
            return this.hostServerService.getDefaultServer();
        }).then((s) => {
            this.defaultServer = s;
            this.setConfigs();

        });
    }


}
