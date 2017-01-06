import {Injectable} from "@angular/core";
import {LocalFileStorageService} from "./local-file-storage.service";

@Injectable()
export class LoggerService {
    private serviceName = "Logger Service";

    constructor(private localFileStorageService: LocalFileStorageService) {
        //this.log.debug(`${this.serviceName} - Start`);
    }

    // logger.log   = function(message) { logWithArgs("LOG",   arguments); };
    //
    // logger.error = function(message) { logWithArgs("ERROR", arguments); };
    // logger.warn  = function(message) { logWithArgs("WARN",  arguments); };
    // logger.info  = function(message) { logWithArgs("INFO",  arguments); };
    // logger.debug = function(message) { logWithArgs("DEBUG", arguments); };

    // public presentModal() {
    //     let modal = this.modalController.create(LogsModalComponent);
    //     modal.present();
    // }
}
