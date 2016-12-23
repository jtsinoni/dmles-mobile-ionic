import {Logger} from "angular2-logger/core";
import {UtilService} from "../common/services/util.service";
import {Injectable} from "@angular/core";

declare var window: any;

@Injectable()
export class LocalStorageService {
    private serviceName = "LocalStorageService";

    constructor(private log: Logger, private utilService: UtilService) {
        this.log.debug(`${this.serviceName} - Start'`);
    }

    public clearData(){
        window.localStorage.clear();
        this.log.info(`${this.serviceName} - Cache data cleared`);
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

        this.log.info(`${this.serviceName} - Get cache data: ${key} => ${value}`);
        return value;
    }

    public removeData(key:string){
        window.localStorage.removeItem(key);
        this.log.info(`${this.serviceName} - Cache data removed: ${key}`);
    }

    public storeData(key:string, data:any, stringify:boolean){
        this.log.info(`${this.serviceName} - Store cache data: ${key} => ${JSON.stringify(data)}`);

        if(stringify && !this.utilService.isObjectEmpty(data)){
            data = JSON.stringify(data);
            this.log.info(`${this.serviceName} - Stringified cached data`);
        }

        window.localStorage[key] = data;
    }
}
