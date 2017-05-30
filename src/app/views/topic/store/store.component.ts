import {Component} from "@angular/core/src/metadata/directives";
import {OnInit} from "@angular/core";
import {StoreDataTableModel} from "../../../models/store-data-table.model";
import {StoreDatabaseService} from "../../../services/database/store-database.service";
import {CommonDataService} from "../../../services/common-data.service";
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
    selector: 'store-view',
    templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {
    public items: StoreDataTableModel[] = [];

    constructor(private databaseService: StoreDatabaseService,
                private commonDataService: CommonDataService,
                private log: LoggerService) {
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
        this.log.log(`Store Event: ${event} Item: ${item.data}`);
        // this.navCtrl.push(StoredDetailsComponent, {
        //   item: item
        // });
    }

    public delete(item: StoreDataTableModel, id: number) {
        this.log.info(`Deleting record with ${item.id} ...`);

        // remove from scope
        this.items.splice(id, 1);

        // update badge count
        this.commonDataService.storeDataModel.badgeCount = this.items.length;

        // now remove from db
        this.databaseService.delete(item);

    }
}
