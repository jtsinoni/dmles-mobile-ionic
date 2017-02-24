import {Injectable} from "@angular/core";
import {LoggerService} from "../logger/logger-service";
import {WindowService} from "../window.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class LocalDevStorageService extends LocalStorageService {
    serviceName = "LocalDevStorageService";

    constructor(log: LoggerService, private windowService: WindowService) {
        super(log);
        this.log.debug(`${this.serviceName} - Start`);
    }

    public clearData(): Promise<any>{
        return Promise.resolve()
            .then(() => {
                this.windowService.window.localStorage.clear();
                this.log.debug(`${this.serviceName} - Cache data cleared`);

                return true;
            })
    }

    public getData(key:string): Promise<any> {
        return Promise.resolve()
            .then(() => {
                let value:any = this.windowService.window.localStorage.getItem(key);
                this.log.debug(`${this.serviceName} - Get cache data: ${key} => ${value}`);

                if (!value || "undefined" == value || "null" == value) {
                    return null;
                }

                return value;
            });
    }

    public removeData(key:string): Promise<any> {
        return Promise.resolve()
            .then(() => {
                this.windowService.window.localStorage.removeItem(key);
                this.log.debug(`${this.serviceName} - Cache data removed: ${key}`);

                return true;
            });
    }

    public storeData(key:string, data:any){
        return Promise.resolve()
            .then(() => {
                this.windowService.window.localStorage[key] = data;
                this.log.debug(`${this.serviceName} - Store cache data: ${key} => ${JSON.stringify(data)}`);

                return data;
            });
    }
}
