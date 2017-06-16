import {Injectable} from "@angular/core";
import {SecureStorage} from 'ionic-native';
import {LoggerService} from "../logger/logger-service";
import {LocalStorageService} from "./local-storage.service";
import {Platform} from "ionic-angular";

@Injectable()
export class  LocalSecureStorageService extends LocalStorageService {
    serviceName = "LocalSecureStorage Service";
    private secureStorage:SecureStorage;

    constructor(log: LoggerService, private platform: Platform) {
        super(log);
        this.init();
    }

    private init() {
        this.log.debug(`${this.serviceName} - Start`);

        this.platform.ready().then(() => {
            this.secureStorage = new SecureStorage();
            this.secureStorage.create('dmles-secure-storage')
                .then(() => {
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
        return this.secureStorage.get(key)
            .then((data) => {
                this.log.log(`${this.serviceName} - Get cache data: ${key} => ${data}`);

                return data;
            })
            .catch((error) => {
                this.log.warn(`Key ${key} not found is SecureStorage`);
            })
    }

    public removeData(key:string): Promise<any> {
        return this.secureStorage.remove(key)
            .then(() => {
                this.log.debug(`${this.serviceName} - Cache data removed: ${key}`);

                return true;
            })
            .catch((error) => {
                this.log.warn(`Key ${key} not found is SecureStorage`);
            })
    }

    public storeData(key:string, data:any): Promise<any> {
        return this.secureStorage.set(key, data)
            .then((results) => {
                this.log.debug(`${this.serviceName} - Stored data => ${key} => ${JSON.stringify(results)}, results => ${results}`);
                return results;
            })
            .catch((error) => {
                this.log.error(`${this.serviceName} => ${error}`)
            });
    }
}
