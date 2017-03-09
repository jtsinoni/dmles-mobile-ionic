import {Injectable} from "@angular/core";
import {LoggerService} from "./logger/logger-service";
import {WindowService} from "./window.service";
import {Platform} from "ionic-angular";
import {UtilService} from "../common/services/util.service";

@Injectable()
export class CACService {
    private serviceName = "CAC Service";

    constructor(private log: LoggerService,
                private platform: Platform,
                private windowService: WindowService,
                private utilService: UtilService) {
        this.init();

    }

    private init() {
        this.platform.ready()
            .then(() => {
                this.log.debug(`${this.serviceName} - Start`);

                if(this.utilService.isMobility()) {
                    (<any>window).CACPlugin.coolMethod(
                            "",
                            (results) => {this.log.debug(`Results => ${results}`)},
                            (error) => {this.log.error(`${error}`)});
                }
            })
            .catch((error) => {
                console.error(`${error}`);
            });
    }

}
