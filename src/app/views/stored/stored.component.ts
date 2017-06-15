import {Component, OnInit} from "@angular/core";
import {LoggerService} from "../../services/logger/logger-service";
import {BaseDataTableModel} from "../../models/base-data-table.model";
import {NavParams, NavController} from "ionic-angular";
import {BaseDatabaseService} from "../../services/database/base-database.service";
import {StoredDetailsComponent} from "./details/stored-details.component";

@Component({
    selector: 'stored-view',
    templateUrl: './stored.component.html',
})
export class StoredComponent implements OnInit {
    public items: BaseDataTableModel[] = [];
    private databaseService: BaseDatabaseService<BaseDataTableModel>;

    constructor(private log: LoggerService,
                private navParams: NavParams,
                public navCtrl: NavController) {
        this.databaseService = navParams.get('databaseService');
    }

    ngOnInit(): void {
        this.databaseService.getAll()
            .then(data => {
                this.items = data;
            })
            .catch((error) => {
                this.log.error(error);
            });
    }

    public itemTapped(event, item) {
        this.log.log(`Store Event: ${event} Item: ${item.id}`);
        this.navCtrl.push(StoredDetailsComponent, {item: item});
    }

    public delete(item: BaseDataTableModel, id: number) {
        this.log.debug(`Deleting record with ${item.id} ...`);

        // remove from scope
        this.items.splice(id, 1);

        // now remove from db
        this.databaseService.delete(item);

    }
}
