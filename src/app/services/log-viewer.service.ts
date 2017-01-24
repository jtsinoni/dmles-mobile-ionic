import {Injectable} from "@angular/core";
import {LogsModalComponent} from "../views/logs/modal/logs-modal.component";
import {ModalController} from "ionic-angular";
import {LoggerService} from "./logger/logger-service";
import {Platform} from "ionic-angular";

@Injectable()
export class LogViewerService {
    private serviceName = "LogViewer Service";

    constructor(private log: LoggerService,
                private platform: Platform,
                private modalController: ModalController) {
        this.log.debug(`${this.serviceName} - Start`);
    }

    public presentModal() {
        let modal = this.modalController.create(LogsModalComponent);
        if (this.platform.is('cordova')) { // added 'cordova' (mobile) check, as we can't yet view logs on browser
            modal.present();
        }
    }
}
