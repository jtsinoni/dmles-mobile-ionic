import {UtilService} from "../common/services/util.service";
import {Injectable} from "@angular/core";
import {LoggerService} from "./logger/logger-service";

declare var window: any;

@Injectable()
export class LocalStorageService {
    private serviceName = "LocalFileStorageService";

    constructor(private log: LoggerService, private utilService: UtilService) {
        this.log.debug(`${this.serviceName} - Start`);
    }

    public clearData(){
        window.localStorage.clear();
        this.log.debug(`${this.serviceName} - Cache data cleared`);
    }

    public getData(key:string){
        var value:any = window.localStorage.getItem(key);

        if (!value || "undefined" == value || "null" == value) {
            return null;
        }

        // assume it is an object that has been stringified
        if (value[0] === "{") {
            value = JSON.parse(value);
        }

        this.log.debug(`${this.serviceName} - Get cache data: ${key} => ${value}`);
        return value;
    }

    public removeData(key:string){
        window.localStorage.removeItem(key);
        this.log.debug(`${this.serviceName} - Cache data removed: ${key}`);
    }

    public storeData(key:string, data:any, stringify:boolean){
        this.log.debug(`${this.serviceName} - Store cache data: ${key} => ${JSON.stringify(data)}`);

        if(stringify && !this.utilService.isObjectEmpty(data)){
            data = JSON.stringify(data);
            this.log.debug(`${this.serviceName} - Stringified cached data`);
        }

        window.localStorage[key] = data;
    }
}
