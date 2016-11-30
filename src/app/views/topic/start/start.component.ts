/**
 * Created by johntsinonis on 11/9/16.
 */
import {Component, Input, OnInit} from "@angular/core";
import {DatabaseService} from "../../../services/database.service";
import {UpstreamService} from '../../../services/upstream/upstream.service';
import {CommonDataModel} from "../../../models/common-data.model";
import {TopicMessagingService} from "../../../services/topic-messaging.service";
import {CommonDataService} from "../../../services/common-data.service";
import {ForwardDataModel} from "../../../models/forward-data.model";
import {StoreDataModel} from "../../../models/store-data.model";

@Component({
    templateUrl: 'start.component.html',
    selector: 'start-view'
})
export class StartComponent implements OnInit {

    @Input()
    public data: CommonDataModel;

    public forwardDataModel: ForwardDataModel;
    public storeDataModel: StoreDataModel;

    constructor(private databaseService: DatabaseService, private upstreamService: UpstreamService,
                private topicMessagingService: TopicMessagingService, private commonDataService: CommonDataService) {
        this.data = commonDataService.data;
        this.forwardDataModel = commonDataService.forwardDataModel;
        this.storeDataModel = commonDataService.storeDataModel;

        topicMessagingService.connect('localhost', 61616);
    }

    private updateCount() {
        this.databaseService.count()
            .then(count => {
                this.storeDataModel.badgeCount = count;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    ngOnInit(): void {
        this.updateCount();
    }

    public connect() {
        console.log("Received connect event");
        this.upstreamService.connect();
    }

    public disconnect() {
        console.log("Received disconnect event");
        this.upstreamService.disconnect()
            .then((client) => {
                //console.log(`Client ID: ${client.options.clientId}, connected: ${client.connected}`);
            });
    }

    public add(data: string) {
        this.upstreamService.sendData(data).then(() => {
            //console.log("Upstream Returned Data: " + JSON.stringify(data));
            this.updateCount();
        });
    }

    public itemTapped(event, item) {
        console.log(`Event: ${event} Item: ${item.data}`);
        // this.navCtrl.push(EquipmentRequestDetailsComponent, {
        //   item: item
        // });
    }

}


