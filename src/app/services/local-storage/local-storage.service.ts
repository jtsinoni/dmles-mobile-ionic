import {Injectable} from "@angular/core";
import {LoggerService} from "../logger/logger-service";

/**
 * Contains several factory methods that need to be implemented by the child classes
 */
@Injectable()
export class LocalStorageService {
    protected serviceName = "LocalStorage Service";

    constructor(protected log: LoggerService) {
        //this.log.debug(`${this.serviceName} - Start`);
    }

    public clearData(): Promise<any> {
        return undefined;
    }

    public getData(key:string): Promise<any> {
        return undefined;
    }

    public removeData(key:string): Promise<any> {
        return undefined;
    }

    public storeData(key:string, data:any): Promise<any> {
        return undefined;
    }
}
