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

                    // let btHost = AppConfigConstants.apiHosts.btBaseUrl;
                    // this.cacCheck(`${btHost}/Dmles.OAuth.Server/token`)
                    //     .then(() => {
                    //         this.log.debug(`CAC initialized with host => ${btHost}`)
                    //     })
                    //     .catch((error) => {
                    //         this.log.error(error);
                    //     });

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
                    //observer.complete();
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
                    //observer.complete();
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

    public cacCheck(host: string): Promise<any> {
        return new Promise((resolve, reject) => {
            cordova.plugins.CacReader.cacCheck(host, resolve, reject);
        });
    }

    // public sendPost(host: string, postData: string, headers: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         cordova.plugins.CacReader.sendPost(host, postData, headers, resolve, reject);
    //     });
    // }

    public sendPost(host: string, postData: string, headers: string): Observable<any> {
        return Observable.create((observer) => {
            cordova.plugins.CacReader.sendPost(
                host, postData, headers,
                (value) => {
                    observer.next(value);
                    observer.complete();
                },
                (error) => {
                    observer.error(error);
                }
            );
        });
    }

    public sendGet(host: string, headers: string): Observable<any> {
        return Observable.create((observer) => {
            cordova.plugins.CacReader.sendGet(
                host, headers,
                (value) => {
                    observer.next(value);
                    observer.complete();
                },
                (error) => {
                    observer.error(error);
                }
            );
        });
    }
}
