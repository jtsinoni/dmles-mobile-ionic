import {Injectable} from "@angular/core";
import {LoggerService} from "../logger/logger-service";

/**
 * Contains several factory methods that need to be implemented by the child classes
 */
@Injectable()
export abstract class LocalStorageService {
    protected serviceName = "LocalStorage Service";

    constructor(protected log: LoggerService) {
        //this.log.debug(`${this.serviceName} - Start`);
    }

    abstract clearData(): Promise<any>;
    //  {
    //     //return undefined;
    // }

    abstract getData(key:string): Promise<any> 
    // {
    //     return undefined;
    // }

    abstract removeData(key:string): Promise<any> 
    // {
    //     return undefined;
    // }

    abstract storeData(key:string, data:any): Promise<any> 
    // {
    //     return undefined;
    // }
}
