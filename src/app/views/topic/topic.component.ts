/**
 * Created by johntsinonis on 11/9/16.
 */
import {Component} from "@angular/core";
import {ForwardDataModel} from "../../models/forward-data.model";
import {StoreDataModel} from "../../models/store-data.model";
import {CommonDataService} from "../../services/common-data.service";

@Component({
    templateUrl: './topic.component.html',
    selector: 'topic-view'
})
export class TopicComponent {
    public forwardDataModel: ForwardDataModel;
    public storeDataModel: StoreDataModel;

    // Default toolbar start page
    // TODO: should be setup in a defaults file or some other persistence mechanism
    public page: string = "start";

    constructor(private commonDataService: CommonDataService) {
        this.forwardDataModel = commonDataService.forwardDataModel;
        this.storeDataModel = commonDataService.storeDataModel;
    }
}


