import {Injectable} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {LogsModalComponent} from "../views/logs/modal/logs-modal.component";
import {ModalController} from "ionic-angular";

@Injectable()
export class LogViewerService {
    private serviceName = "LogViewer Service";

    constructor(private log: Logger,
                private modalController: ModalController) {
        this.log.debug(`${this.serviceName} - Start`);
    }

    public presentModal() {
        let modal = this.modalController.create(LogsModalComponent);
        modal.present();
    }
}
