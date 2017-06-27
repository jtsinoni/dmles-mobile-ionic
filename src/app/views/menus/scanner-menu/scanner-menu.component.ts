import {Component} from "@angular/core";
import {LoggerService} from "../../../services/logger/logger-service";
import {ViewController, ModalController} from "ionic-angular";
import {ABiDatabaseService} from "../../../services/database/abi-database.service";
import {MenuComponent} from "../menu.component";

@Component({
    selector: 'scanner-menu',
    templateUrl: './scanner-menu.component.html'
})
export class ScannerMenuComponent extends MenuComponent<ABiDatabaseService> {
    constructor(protected log: LoggerService,
                protected viewCtrl: ViewController,
                protected modalController: ModalController,
                protected databaseService: ABiDatabaseService) {
        super(log, viewCtrl, modalController, databaseService);
    }

}
