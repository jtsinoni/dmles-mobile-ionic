import {Component} from "@angular/core/src/metadata/directives";
import {OnInit} from "@angular/core";
import {DataTableModel} from "../../../models/data-table.model";
import {DatabaseService} from "../../../services/database.service";
import {CommonDataService} from "../../../services/common-data.service";
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
    selector: 'store-view',
    templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {
    public items: DataTableModel[] = [];

    constructor(private databaseService: DatabaseService,
                private commonDataService: CommonDataService,
                private log: LoggerService) {
    }

    ngOnInit(): void {
        this.databaseService.find()
            .then(data => {
                this.items = data;
            })
            .catch((error) => {
                this.log.error(error);
            });
    }

    public itemTapped(event, item) {
        this.log.log(`Store Event: ${event} Item: ${item.data}`);
        // this.navCtrl.push(RoleDetailsComponent, {
        //   item: item
        // });
    }

    public delete(item: DataTableModel, id: number) {
        this.log.info(`Deleting record with ${item.id} ...`);

        // remove from scope
        this.items.splice(id, 1);

        // update badge count
        this.commonDataService.storeDataModel.badgeCount = this.items.length;

        // now remove from db
        this.databaseService.delete(item.id);

    }
}
