import {Component} from "@angular/core/src/metadata/directives";
import {OnInit} from "@angular/core";
import {DataTableModel} from "../../../models/data-table.model";
import {DatabaseService} from "../../../services/database.service";
import {CommonDataService} from "../../../services/common-data.service";
import {CommonDataModel} from "../../../models/common-data.model";

@Component({
    selector: 'forward-data',
    templateUrl: 'forward.component.html',
})
export class ForwardComponent {
    data: CommonDataModel;

    constructor(private commonDataService: CommonDataService) {
        this.data = commonDataService.data;
    }

    public itemTapped(event, item) {
        console.log(`Store Event: ${event} Item: ${item.data}`);
        // this.navCtrl.push(ItemDetailsPage, {
        //   item: item
        // });
    }
}
