import {ModalController} from 'ionic-angular';
import {AppInjector} from "../../../app.module";

interface Params {
    message: string;
    error: any;
}

export class ModalDialogController {
    private modalController: ModalController;
    constructor(private dialog: any) {
        this.modalController = AppInjector.get(ModalController);
    }

    public show(params: Params) {
        let errorModal = this.modalController.create(this.dialog, { txt: params.error, message: params.message });
        errorModal.present();
    }
}
