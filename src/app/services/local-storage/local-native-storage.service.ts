import {Injectable} from "@angular/core";
import {NativeStorage} from 'ionic-native';
import {LoggerService} from "../logger/logger-service";
import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class LocalNativeStorageService extends LocalStorageService {
    serviceName = "LocalNativeStorage Service";

    constructor(log: LoggerService) {
        super(log);
        this.log.debug(`${this.serviceName} - Start`);
    }

    public clearData(): Promise<any> {
        return NativeStorage.clear()
            .then(() => {
                this.log.debug(`${this.serviceName} - Cache data cleared`);
                return true;
            })
            .catch((error) => {
                this.log.error(`${this.serviceName} => ${error}`)
            })
    }

    public getData(key:string): Promise<any> {
        return NativeStorage.getItem(key)
            .then((data) => {
                this.log.log(`${this.serviceName} - Get cache data: ${key} => ${data}`);

                return data;
            })
            .catch((error) => {
                this.log.warn(`Key ${key} not found is SecureStorage`);
            });
    }

    public removeData(key:string): Promise<any> {
        return NativeStorage.remove(key)
            .then(() => {
                this.log.debug(`${this.serviceName} - Cache data removed: ${key}`);

                return true;
            })
            .catch((error) => {
                this.log.warn(`Key ${key} not found is SecureStorage`);
            })
    }

    public storeData(key:string, data:any): Promise<any> {
        return NativeStorage.setItem(key, data)
            .then((results) => {
                this.log.debug(`${this.serviceName} - Stored data => ${key} => ${JSON.stringify(results)}, results => ${results}`);
                return results;
            })
            .catch((error) => {
                this.log.error(`${this.serviceName} => ${error}`)
            });
    }
}
