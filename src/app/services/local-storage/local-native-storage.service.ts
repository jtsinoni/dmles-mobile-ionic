import {Injectable} from "@angular/core";
import {NativeStorage} from '@ionic-native/native-storage';
import {LoggerService} from "../logger/logger-service";
import {LocalStorageService} from "./local-storage.service";
import {AppInjector} from "../../app.module";

@Injectable()
export class LocalNativeStorageService extends LocalStorageService {
    private nativeStorage: NativeStorage;
    serviceName = "LocalNativeStorage Service";

    constructor(log: LoggerService) {
        super(log);
        this.log.debug(`${this.serviceName} - Start`);

        this.nativeStorage = AppInjector.get(NativeStorage);
    }

    public clearData(): Promise<any> {
        return this.nativeStorage.clear()
            .then(() => {
                this.log.debug(`${this.serviceName} - Cache data cleared`);
                return true;
            })
            .catch((error) => {
                this.log.error(`${this.serviceName} => ${error}`)
            })
    }

    public getData(key:string): Promise<any> {
        return this.nativeStorage.getItem(key)
            .then((data) => {
                this.log.debug(`${this.serviceName} - Get cache data: ${key} => ${data}`);

                return data;
            })
            .catch((error) => {
                this.log.warn(`Key ${key} not found is SecureStorage`);
            });
    }

    public removeData(key:string): Promise<any> {
        return this.nativeStorage.remove(key)
            .then(() => {
                this.log.debug(`${this.serviceName} - Cache data removed: ${key}`);

                return true;
            })
            .catch((error) => {
                this.log.warn(`Key ${key} not found is SecureStorage`);
            })
    }

    public storeData(key:string, data:any): Promise<any> {
        return this.nativeStorage.setItem(key, data)
            .then((results) => {
                this.log.debug(`${this.serviceName} - Stored data => ${key} => ${JSON.stringify(results)}, results => ${results}`);
                return results;
            })
            .catch((error) => {
                this.log.error(`${this.serviceName} => ${error}`)
            });
    }
}
