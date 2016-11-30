import {Component} from "@angular/core/src/metadata/directives";
import {CommonDataService} from "../../../services/common-data.service";
import {ForwardDataModel} from "../../../models/forward-data.model";

@Component({
    selector: 'forward-view',
    templateUrl: 'forward.component.html',
})
export class ForwardComponent {
    forwardDataModel: ForwardDataModel;

    constructor(private commonDataService: CommonDataService) {
        this.forwardDataModel = commonDataService.forwardDataModel;
    }

    public itemTapped(event, item) {
        console.log(`Store Event: ${event} Item: ${item.data}`);
        // this.navCtrl.push(EquipmentRequestDetailsComponent, {
        //   item: item
        // });
    }
}
