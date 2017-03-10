import {Injectable} from "@angular/core";
import {LoggerService} from "./logger/logger-service";
import {Platform} from "ionic-angular";
import {UtilService} from "../common/services/util.service";

declare var cordova: any;

@Injectable()
export class CACService {
    private serviceName = "CAC Service";

    constructor(private log: LoggerService,
                private platform: Platform,
                private utilService: UtilService) {
        this.init();

    }

    private init() {
        this.platform.ready()
            .then(() => {
                this.log.debug(`${this.serviceName} - Start`);

                if(this.utilService.isMobility()) {
                    cordova.plugins.CACPlugin.coolMethod(
                        "Hello Plugin World",
                        (results) => {this.log.debug(`Results => ${results}`)},
                        (error) => {this.log.error(`${error}`)});
                }
            })
            .catch((error) => {
                console.error(`${error}`);
            });
    }
}
