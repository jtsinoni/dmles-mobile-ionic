import {Injectable} from "@angular/core";
import {SecureStorage, SecureStorageObject} from '@ionic-native/secure-storage';
import {LoggerService} from "../logger/logger-service";
import {LocalStorageService} from "./local-storage.service";
import {Platform} from "ionic-angular";
import {AppInjector} from "../../app.module";

@Injectable()
export class  LocalSecureStorageService extends LocalStorageService {
    serviceName = "LocalSecureStorage Service";
    private secureStorage: SecureStorage;
    private secureStorageObject: SecureStorageObject;

    constructor(log: LoggerService, private platform: Platform) {
        super(log);
        this.init();
    }

    private init() {
        this.log.debug(`${this.serviceName} - Start`);

        this.platform.ready().then(() => {
            this.secureStorage =  AppInjector.get(SecureStorage);
            this.secureStorage.create('dmles-secure-storage')
                .then((secureStorageObject: SecureStorageObject) => {
                    this.secureStorageObject = secureStorageObject;

                    this.log.debug(`LocalSecureStorageService: Secure storage is ready`);
                })
                .catch((error) => {
                    this.log.error(`Error => ${error}`);
                })
        });

    }

    /**
     * Cordova secure local storage plugin does not support clear all data
     *
     * @returns {undefined}
     */
    public clearData(): Promise<any> {
        return undefined;
    }

    public getData(key:string): Promise<any> {
        return this.secureStorageObject.get(key)
            .then((data) => {
                this.log.debug(`${this.serviceName} - Get cache data: ${key} => ${data}`);

                return data;
            })
            .catch((error) => {
                this.log.warn(`Key ${key} not found is SecureStorage`);
            })
    }

    public removeData(key:string): Promise<any> {
        return this.secureStorageObject.remove(key)
            .then(() => {
                this.log.debug(`${this.serviceName} - Cache data removed: ${key}`);

                return true;
            })
            .catch((error) => {
                this.log.warn(`Key ${key} not found is SecureStorage`);
            })
    }

    public storeData(key:string, data:any): Promise<any> {
        return this.secureStorageObject.set(key, data)
            .then((results) => {
                this.log.debug(`${this.serviceName} - Stored data => ${key} => ${JSON.stringify(results)}, results => ${results}`);
                return results;
            })
            .catch((error) => {
                this.log.error(`${this.serviceName} => ${error}`)
            });
    }
}
