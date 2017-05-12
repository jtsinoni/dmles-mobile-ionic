import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {UtilService} from "../common/services/util.service";
import {LoggerService} from "./logger/logger-service";

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
                    this.CACReaderVersion()
                        .then((results) => {
                            this.log.debug(`PKardSDK Version => ${results}`)
                        })
                        .catch((error) => {
                            this.log.error(error);
                        });
                }
            })
            .catch((error) => {
                this.log.error(`${error}`);
            });
    }

    public CACReaderVersion(): Promise<any> {
        return new Promise((resolve, reject) => {
            cordova.plugins.CacReader.version(resolve, reject);
        });
    }

    public isReaderAttached(): Promise<any> {
        return new Promise((resolve, reject) => {
            cordova.plugins.CacReader.isReaderAttached(resolve, reject);
        });
    }

    public isCardInserted(): Promise<any> {
        return new Promise((resolve, reject) => {
            cordova.plugins.CacReader.isCardInserted(resolve, reject);
        });
    }

    public lockScreen(): Promise<any> {
        return new Promise((resolve, reject) => {
            cordova.plugins.CacReader.lockScreen(resolve, reject);
        });
    }

    public setFipsMode(fipsMode): Promise<any> {
        return new Promise((resolve, reject) => {
            cordova.plugins.CacReader.setFipsMode(fipsMode, resolve, reject);
        });
    }
}
