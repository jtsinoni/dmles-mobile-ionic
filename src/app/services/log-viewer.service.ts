import {Injectable} from "@angular/core";
import {LogsModalComponent} from "../views/logs/modal/logs-modal.component";
import {ModalController} from "ionic-angular";
import {LoggerService} from "./logger/logger-service";

@Injectable()
export class LogViewerService {
    private serviceName = "LogViewer Service";

    constructor(private log: LoggerService,
                private modalController: ModalController) {
        this.log.debug(`${this.serviceName} - Start`);
    }

    public presentModal() {
        let modal = this.modalController.create(LogsModalComponent);
        modal.present();
    }
}
