import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {UtilService} from "../common/services/util.service";
import {LoggerService} from "./logger/logger-service";
import {Subject, Observable, Observer} from "rxjs";

declare var cordova: any;

@Injectable()
export class CACService {
    private serviceName = "CAC Service";
    private onCardInsertedObservable: Observable<any>;


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
                    //this.isCardInserted2();

                    this.CACReaderVersion()
                        .then((results) => {
                            this.log.debug(`PKardSDK Version => ${results}`)
                        })
                        .catch((error) => {
                            this.log.error(error);
                        });

                    this.onCardInsertedObservable = this.isCardInserted();
                    this.onCardInsertedObservable.subscribe((results) => {
                        this.log.debug(`onCardInserted => ${results}`);

                        //this.cacInserted = results;
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

    private isCardInserted(): Observable<any> {
        let success = (value) => {
            this.log.debug(`cordova.plugins.CacReader.isCardInserted.value => ${value}`)
        };

        let error = (error) => {
            this.log.debug(`cordova.plugins.CacReader.isCardInserted.error => ${error}`)
        };

        return Observable.create((observer) => {
            // let success = (value) => {return value};
            // let error = (value) => {return value};

            cordova.plugins.CacReader.isCardInserted(success, error);
        });
    }

    // private isCardInserted3() {
    //     cordova.plugins.CacReader.isCardInserted(
    //         (value) => {this.onCardInsertedSubject.next(value)},
    //         (error) => {this.onCardInsertedSubject.error(error)}
    //     );
    // }

    public isReaderAttached(): Promise<any> {
        //this.onReaderAttachedSubject.
        return new Promise((resolve, reject) => {
            cordova.plugins.CacReader.isReaderAttached(resolve, reject);
        });
    }

    // public isCardInserted(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         cordova.plugins.CacReader.isCardInserted(resolve, reject);
    //     });
    // }

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
