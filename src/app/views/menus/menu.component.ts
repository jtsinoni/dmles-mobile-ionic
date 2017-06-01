import {Input, OnInit} from "@angular/core";

import {ViewController, ModalController, Modal} from "ionic-angular";
import {BaseDatabaseService} from "../../services/database/base-database.service";
import {BaseDataTableModel} from "../../models/base-data-table.model";
import {LoggerService} from "../../services/logger/logger-service";
import {StoredComponent} from "../stored/stored.component";

export abstract class MenuComponent<D extends BaseDatabaseService<BaseDataTableModel>> implements OnInit {
    private modal: Modal;

    @Input()
    badgeCount: number;

    constructor(protected log: LoggerService,
                protected viewCtrl: ViewController,
                protected modalController: ModalController,
                protected databaseService: D) {
    }

    ngOnInit(): void {
        this.databaseService.getCount()
            .then(count => {
                this.badgeCount  = count;
            })
            .catch((error) => {
                this.log.error(error);
            });
    }

    list() {
        //this.cancel();

        //this.log.info('Show local list of cached items.');
        this.presentModal();
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    presentModal() {
        this.cancel();

        this.modal = this.modalController.create(StoredComponent, {databaseService: this.databaseService});
        this.modal.present();
    }

    cancelModal() {
        this.modal.dismiss();
    }
}
