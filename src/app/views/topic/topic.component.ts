/**
 * Created by johntsinonis on 11/9/16.
 */
import {Component, Output, ViewChild} from "@angular/core";
import {ForwardDataModel} from "../../models/forward-data.model";
import {StoreDataModel} from "../../models/store-data.model";
import {CommonDataService} from "../../services/common-data.service";
import {LogViewerService} from "../../services/log-viewer.service";
import {UtilService} from "../../common/services/util.service";

@Component({
    templateUrl: './topic.component.html',
    selector: 'topic-view',
})

export class TopicComponent {
    public forwardDataModel: ForwardDataModel;
    public storeDataModel: StoreDataModel;

    // Default toolbar start page
    // TODO: should be setup in a defaults file or some other persistence mechanism
    public page: string = "start";

    @Output()
    public isMobility: boolean;

    constructor(private commonDataService: CommonDataService,
                private logViewerService: LogViewerService,
                private utilService: UtilService) {
        this.forwardDataModel = commonDataService.forwardDataModel;
        this.storeDataModel = commonDataService.storeDataModel;
    }

    ngOnInit(): void {
        this.isMobility = this.utilService.isMobility();
    }

    public viewLogs() {
        this.logViewerService.presentModal();
    }
}


