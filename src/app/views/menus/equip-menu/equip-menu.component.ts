import {Component} from "@angular/core/src/metadata/directives";
import {LoggerService} from "../../../services/logger/logger-service";
import {ViewController, ModalController} from "ionic-angular";
import {MenuComponent} from "../menu.component";
import {StoreDatabaseService} from "../../../services/database/store-database.service";

@Component({
    selector: 'equip-menu',
    templateUrl: './equip-menu.component.html'
})
export class EquipMenuComponent extends MenuComponent<StoreDatabaseService> {
    constructor(protected log: LoggerService,
                protected viewCtrl: ViewController,
                protected modalController: ModalController,
                protected databaseService: StoreDatabaseService) {
        super(log, viewCtrl, modalController, databaseService);
    }

}
