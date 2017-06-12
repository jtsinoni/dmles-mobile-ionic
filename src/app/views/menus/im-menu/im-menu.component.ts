import {Component} from "@angular/core";
import {LoggerService} from "../../../services/logger/logger-service";
import {ViewController, ModalController} from "ionic-angular";
import {MenuComponent} from "../menu.component";
import {IMDatabaseService} from "../../../services/database/im-database.service";

@Component({
    selector: 'im-menu',
    templateUrl: './im-menu.component.html'
})
export class ImMenuComponent extends MenuComponent<IMDatabaseService> {
    constructor(protected log: LoggerService,
                protected viewCtrl: ViewController,
                protected modalController: ModalController,
                protected databaseService: IMDatabaseService) {
        super(log, viewCtrl, modalController, databaseService);
    }

}
