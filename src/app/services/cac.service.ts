import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {LoggerService} from "./logger/logger-service";
import {Observable} from "rxjs";
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
                if(this.utilService.isMobility()) {
                    this.log.debug(`${this.serviceName} - Start`);

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
                this.log.debug(`${error}`);
            });
    }

    public CACReaderVersion(): Promise<any> {
        return new Promise((resolve, reject) => {
            cordova.plugins.CacReader.version(resolve, reject);
        });
    }

    public isCardInserted(): Observable<any> {
        return Observable.create((observer) => {
            cordova.plugins.CacReader.isCardInserted(
                (value) => {
                    observer.next(value);
                },
                (error) => {
                    observer.error(error);
                }
            );
        });
    }

    public isReaderAttached(): Observable<any> {
        return Observable.create((observer) => {
            cordova.plugins.CacReader.isReaderAttached(
                (value) => {
                    observer.next(value);
                },
                (error) => {
                    observer.error(error);
                }
            );
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

    public cacCheck(): Promise<any> {
        return new Promise((resolve, reject) => {
            cordova.plugins.CacReader.cacCheck(resolve, reject);
        });
    }
}
