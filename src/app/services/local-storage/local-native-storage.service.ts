import {Injectable} from "@angular/core";
import {NativeStorage} from 'ionic-native';
import {LoggerService} from "../logger/logger-service";
import {UtilService} from "../../common/services/util.service";

@Injectable()
export class LocalNativeStorageService {
    private serviceName = "LocalNativeStorage Service";

    constructor(private log: LoggerService, private utilService: UtilService) {
        this.log.debug(`${this.serviceName} - Start`);
    }

    public clearData(): Promise<any> {
        return NativeStorage.clear()
            .then(() => {
                this.log.debug(`${this.serviceName} - Cache data cleared`);
            })
            .catch((error) => {
                this.log.error(`${this.serviceName} => ${error}`)
            })
    }

    public getData(key:string): Promise<any> {
        return NativeStorage.getItem(key)
            .then((data) => {
                this.log.debug(`${this.serviceName} - Get cache data: ${key} => ${data}`);

                return data;
            })
            .catch((error) => {
                // Do nothing, this occurs when the key is not found
                //this.log.error(`${this.serviceName} => ${error}`)
            });
    }

    public removeData(key:string): Promise<any> {
        return NativeStorage.remove(key)
            .then(() => {
                this.log.debug(`${this.serviceName} - Cache data removed: ${key}`);
            })
            .catch((error) => {
                this.log.error(`${this.serviceName} => ${error}`)
            })
    }

    public storeData(key:string, data:any, stringify:boolean): Promise<any> {
        if(stringify && !this.utilService.isObjectEmpty(data)){
            data = JSON.stringify(data);
            this.log.debug(`${this.serviceName} - Stringified data to be cached`);
        }

        return NativeStorage.setItem(key, data)
            .then(() => {
                this.log.debug(`${this.serviceName} - Stored data => ${key} => ${JSON.stringify(data)}`);
                return data;
            })
            .catch((error) => {
                this.log.error(`${this.serviceName} => ${error}`)
            });
    }
}
