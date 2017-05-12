import {Component} from "@angular/core/src/metadata/directives";
import {MessagingDataService} from "../../../services/messaging-data.service";
import {ForwardDataModel} from "../../../models/forward-data.model";
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
    selector: 'forward-view',
    templateUrl: './forward.component.html',
})
export class ForwardComponent {
    forwardDataModel: ForwardDataModel;

    constructor(private messagingDataService: MessagingDataService,
                private log: LoggerService) {
        this.forwardDataModel = messagingDataService.forwardDataModel;
    }

    public itemTapped(event, item) {
        this.log.log(`Store Event: ${event} Item: ${item.messagingDataModel}`);
        // this.navCtrl.push(EquipmentRequestCardRowComponent, {
        //   item: item
        // });
    }
}
