import {Component} from "@angular/core/src/metadata/directives";
import {OnInit} from "@angular/core";
import {DataTableModel} from "../../../models/data-table.model";
import {DatabaseService} from "../../../services/database.service";
import {CommonDataService} from "../../../services/common-data.service";

@Component({
    selector: 'store-data',
    templateUrl: 'store.component.html',
})
export class StoreComponent implements OnInit {
    public items: DataTableModel[] = [];

    constructor(private databaseService: DatabaseService, private commonDataService: CommonDataService) {

    }

    ngOnInit(): void {
        this.databaseService.find()
            .then(data => {
                this.items = data;
            }).catch(console.log.bind(console));
    }

    public itemTapped(event, item) {
        console.log(`Store Event: ${event} Item: ${item.data}`);
        // this.navCtrl.push(ItemDetailsPage, {
        //   item: item
        // });
    }

    public delete(item: DataTableModel, id: number) {
        console.log(`Deleting record with ${item.id} ...`);

        // remove from scope
        this.items.splice(id, 1);

        // update badge count
        this.commonDataService.data.badgeCount = this.items.length;

        // now remove from db
        this.databaseService.delete(item.id);

    }
}
