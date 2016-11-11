/**
 * Created by johntsinonis on 11/9/16.
 */
import {Component, Input} from "@angular/core";
import {DatabaseService} from "../../services/database.service";
import {FactoryUpstreamService} from "../../services/upstream/factory-upstream.service";
import {UpstreamService} from '../../services/upstream/upstream.service';
import {MQTTModel} from "../../models/mqtt.model";
import {TopicMessagingService} from "../../services/topic-messaging.service";
import {CommonDataService} from "../../services/common-data.service";
@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    @Input()
    public data: MQTTModel;

    //private upstreamService: UpstreamService;

    constructor(private databaseService: DatabaseService, private upstreamService: UpstreamService,
                private topicMessagingService: TopicMessagingService, private commonDataService: CommonDataService) {
        this.data = commonDataService.data;
        topicMessagingService.client();
    }

    public connect() {
        console.log("Received connect event");
        this.upstreamService.sendData("Message 1");
    }

    public disconnect() {
        console.log("Received disconnect event");
    }
}


