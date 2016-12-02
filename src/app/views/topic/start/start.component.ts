/**
 * Created by johntsinonis on 11/9/16.
 */
import {Component, Input, OnInit} from "@angular/core";
import {DatabaseService} from "../../../services/database.service";
import {UpstreamService} from '../../../services/upstream/upstream.service';
import {CommonDataModel} from "../../../models/common-data.model";
import {TopicMessagingService} from "../../../services/topic-messaging.service";
import {CommonDataService} from "../../../services/common-data.service";
import {StoreDataModel} from "../../../models/store-data.model";
import {ConnectivityService} from "../../../services/connectivity.service";

@Component({
    templateUrl: 'start.component.html',
    selector: 'start-view'
})
export class StartComponent implements OnInit {

    @Input()
    public data: CommonDataModel;

    @Input()
    public isConnected: boolean;

    public storeDataModel: StoreDataModel;

    constructor(private databaseService: DatabaseService,
                private upstreamService: UpstreamService,
                private topicMessagingService: TopicMessagingService,
                private commonDataService: CommonDataService,
                public connectivityService: ConnectivityService) {
        this.data = commonDataService.data;
        this.storeDataModel = commonDataService.storeDataModel;
        this.isConnected = connectivityService.isConnected;

        topicMessagingService.connect(this.data.host, this.data.port);
    }

    private updateCount() {
        this.databaseService.count()
            .then(count => {
                this.storeDataModel.badgeCount = count;
            })
            .catch((error) => {
                this.logErrorMessage(error);
            });
    }

    private addLogMessage(message: string) {
        this.data.messages = this.data.messages + message + "\n";
    }

    private logErrorMessage(error: string) {
        console.error(error);
        this.addLogMessage(error);
    }

    ngOnInit(): void {
        this.updateCount();
    }

    public connect(event, button) {
        let message = "Received connect event";

        this.upstreamService.connect()
            .then((client) => {
                console.log(message);
                this.addLogMessage(message);

                console.log(`Connect Button disabled: ${event.target.disabled} Disconnect Button disabled: ${button.disabled}`);
            })
            .catch((error) => {
                this.logErrorMessage(error);
            });
    }

    public disconnect(event, button) {
        let message = "Received disconnect event";

        this.upstreamService.disconnect()
            .then((client) => {
                console.log(message);
                this.addLogMessage(message);

                console.log(`Disconnect Button disabled: ${event.target.disabled} Connect Button disabled: ${button.disabled}`);
                //event.target.disabled = true;

                //console.log(`Client ID: ${client.options.clientId}, connected: ${client.connected}`);
            })
            .catch((error) => {
                this.logErrorMessage(error);
            });
    }

    public add(data: string) {
        this.upstreamService.sendData(data)
            .then((client) => {
                //console.log("Upstream Returned Data: " + JSON.stringify(data));
                this.updateCount();
                this.addLogMessage(`Sending data to messaging server => ${data}`);
            })
            .catch((error) => {
                this.logErrorMessage(error);
            });
    }

    public clearLogMessages() {
        this.data.messages = '';
    }


}


