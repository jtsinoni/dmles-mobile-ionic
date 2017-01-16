import {Platform} from "ionic-angular";
declare var console: any;

import {Injectable, Optional} from "@angular/core";
import {LocalFileStorageService} from "../local-file-storage.service";
import {ILogger} from "./ilogger";
import {Options} from "./options";
import {LoggerService} from "./logger-service";

@Injectable()
export class FileLoggerService extends LoggerService implements ILogger  {
    private serviceName = "File Logger Service";
    //private level: Level;

    constructor(private localFileStorageService: LocalFileStorageService,
                private platform: Platform,
                @Optional() options?: Options) {
        super(options);
    }

    ngOnInit(): void {
        this.log(`${this.serviceName} - Start`);
    }

    private writeFile(message: string) {
        if(this.platform.is('mobile')) {
            this.localFileStorageService.writeFile(message + "<br />");
        }
    }

    public log(message: any): void {
        if(this.isLogEnabled() && console && console.log) {
            console.log(message);
            this.writeFile(message);
        }
    }

    public info(message: any): void {
        if(this.isInfoEnabled() && console && console.info) {
            console.info(message);
            this.writeFile(message);
        }
    }

    public warn(message: any): void {
        if(this.isWarnEnabled() && console && console.warn) {
            console.warn(message);
            this.writeFile(message);
        }
    }

    public debug(message: any): void {
        if(this.isDebugEnabled() && console) {
            (<any>console)[this.CONSOLE_DEBUG_METHOD](message);
            //console.debug(message);
            this.writeFile(message);
        }
    }

    public error(message: any): void {
        if(this.isErrorEnabled() && console && console.error) {
            console.error(message);
            this.writeFile(message);
        }
    }
}
