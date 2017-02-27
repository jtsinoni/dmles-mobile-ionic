import { Injectable } from "@angular/core";
import { BluetoothComponent } from '../views/bluetooth/bluetooth.component';
import { ModalController, Modal } from "ionic-angular";
import { LoggerService } from "./logger/logger-service";

@Injectable()
export class BluetoothModalService {

    modal: Modal;
    constructor(private log: LoggerService,
        private modalController: ModalController) {
    }

    public presentModal() {
        this.modal = this.modalController.create(BluetoothComponent);
        this.modal.present();

    }

    public cancelModal() {
        this.modal.dismiss();
    }
}
