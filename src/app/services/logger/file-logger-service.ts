declare var console: any;

import {Injectable} from "@angular/core";
import {LocalFileStorageService} from "../local-file-storage.service";
import {ILogger} from "./ilogger";

@Injectable()
export class FileLoggerService implements ILogger {
    private serviceName = "File Logger Service";

    constructor(private localFileStorageService: LocalFileStorageService) {
    }

    ngOnInit(): void {
        this.log(`${this.serviceName} - Start`);
    }

    private writeFile(message: string) {       
         this.localFileStorageService.writeFile(message + "<br />");        
    }

    public log(message: any): void {
        if(console && console.log) {
            console.log(message);
            this.writeFile(message);
        }
    }

    public info(message: any): void {
        if(console && console.info) {
            console.info(message);
            this.writeFile(message);
        }
    }

    public warn(message: any): void {
        if(console && console.warn) {
            console.warn(message);
            this.writeFile(message);
        }
    }

    public debug(message: any): void {
        if(console && console.debug) {
            console.debug(message);
            this.writeFile(message);
        }
    }

    public error(message: any): void {
        if(console && console.error) {
            console.error(message);
            this.writeFile(message);
        }
    }
}
