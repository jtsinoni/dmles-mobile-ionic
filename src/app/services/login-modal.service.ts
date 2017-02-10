
import { Injectable } from "@angular/core";
import { LoginComponent } from '../views/login/login.component';
import { ModalController, Modal } from "ionic-angular";
import { LoggerService } from "./logger/logger-service";

@Injectable()
export class LoginModalService {

    modal: Modal;
    constructor(private log: LoggerService,
        private modalController: ModalController) {
    }

    public presentModal() {
        this.modal = this.modalController.create(LoginComponent);
        this.modal.present();

    }

    public cancelModal() {
        this.modal.dismiss();
    }
}