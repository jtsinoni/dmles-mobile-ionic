import {Component} from "@angular/core/src/metadata/directives";
import {LoggerService} from "../../../services/logger/logger-service";
import {ViewController, ModalController} from "ionic-angular";
import {ABiDatabaseService} from "../../../services/database/abi-database.service";
import {MenuComponent} from "../menu.component";

@Component({
    selector: 'etm-menu',
    templateUrl: './etm-menu.component.html'
})
export class EtmMenuComponent extends MenuComponent<ABiDatabaseService> {
    constructor(protected log: LoggerService,
                protected viewCtrl: ViewController,
                protected modalController: ModalController,
                protected databaseService: ABiDatabaseService) {
        super(log, viewCtrl, modalController, databaseService);
    }

}
