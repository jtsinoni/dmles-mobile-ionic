import {Platform} from "ionic-angular";
declare var console: any;

import {Injectable, Optional} from "@angular/core";
import {LocalFileStorageService} from "../local-file-storage.service";
import {ILogger} from "./ilogger";
import {Options} from "./options";
import {LoggerService} from "./logger-service";
import {UtilService} from "../../common/services/util.service";

@Injectable()
export class FileLoggerService extends LoggerService implements ILogger  {
    private serviceName = "File Logger Service";
    private isMobility: boolean = false;
    private isProd: boolean = false;

    constructor(private localFileStorageService: LocalFileStorageService,
                private platform: Platform,
                private util: UtilService,
                @Optional() options?: Options) {
        super(options);
        this.init();
    }

    private init() {
        this.debug(`${this.serviceName} - Start`);

        this.isMobility = this.util.isMobility();
        this.isProd = this.util.isProd();
    }

    private writeFile(message: string) {
        // Check if we are running on a 'cordova' (device), otherwise write to console?
        if (this.isMobility && !this.isProd) {
            this.localFileStorageService.writeToFile(message + "<br />");
        }
    }

    public log(message: any): void {
        if(this.isLogEnabled() && console && console.log) {
            console.log('Log: ' + message);
            this.writeFile(message);
        }
    }

    public info(message: any): void {
        if(this.isInfoEnabled() && console && console.info) {
            console.info('Info: ' + message);
            this.writeFile(message);
        }
    }

    public warn(message: any): void {
        if(this.isWarnEnabled() && console && console.warn) {
            console.warn('Warn: ' + message);
            this.writeFile(message);
        }
    }

    public debug(message: any): void {
        if(this.isDebugEnabled() && console) {
            (<any>console)[this.CONSOLE_DEBUG_METHOD]('Debug: ' + message);
            //console.debug(message);
            this.writeFile(message);
        }
    }

    public error(message: any): void {
        if(this.isErrorEnabled() && console && console.error) {
            console.error('Error: ' + message);
            this.writeFile(message);
        }
    }
}
