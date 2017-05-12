import { Component } from "@angular/core";
import { ForwardDataModel } from "../../models/forward-data.model";
import { StoreDataModel } from "../../models/store-data.model";
import { MessagingDataService } from "../../services/messaging-data.service";
import {AppConfigConstants} from "../../constants/app-config.constants";

@Component({
    templateUrl: './topic.component.html',
    selector: 'topic-view'
})
export class TopicComponent {
    public forwardDataModel: ForwardDataModel;
    public storeDataModel: StoreDataModel;

    // Default toolbar start page
    public page: string = AppConfigConstants.topicComponent.page;

    constructor(private messagingDataService: MessagingDataService) {
        this.forwardDataModel = messagingDataService.forwardDataModel;
        this.storeDataModel = messagingDataService.storeDataModel;
    }
}


