import {Component} from "@angular/core";
import {ModalController} from 'ionic-angular';
import {LogsModalComponent} from "./modal/logs-modal.component";

@Component({
    // templateUrl: 'logs.component.html',
    selector: 'logs-view'
})
export class LogsComponent {

    constructor(private modalController: ModalController) {
    }

    public presentModal() {
        let modal = this.modalController.create(LogsModalComponent);
        modal.present();
    }
}


