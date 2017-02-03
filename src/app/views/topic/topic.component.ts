import { Component } from "@angular/core";
import { ForwardDataModel } from "../../models/forward-data.model";
import { StoreDataModel } from "../../models/store-data.model";
import { CommonDataService } from "../../services/common-data.service";
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

    constructor(private commonDataService: CommonDataService) {
        this.forwardDataModel = commonDataService.forwardDataModel;
        this.storeDataModel = commonDataService.storeDataModel;
    }
}


