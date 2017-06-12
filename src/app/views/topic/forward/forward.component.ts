import {Component} from "@angular/core";
import {CommonDataService} from "../../../services/common-data.service";
import {ForwardDataModel} from "../../../models/forward-data.model";
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
    selector: 'forward-view',
    templateUrl: './forward.component.html',
})
export class ForwardComponent {
    forwardDataModel: ForwardDataModel;

    constructor(private commonDataService: CommonDataService,
                private log: LoggerService) {
        this.forwardDataModel = commonDataService.forwardDataModel;
    }

    public itemTapped(event, item) {
        this.log.log(`Store Event: ${event} Item: ${item.data}`);
        // this.navCtrl.push(EquipmentRequestCardRowComponent, {
        //   item: item
        // });
    }
}
