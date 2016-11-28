import {Injectable}    from '@angular/core';
import {DatabaseService} from "./database.service";
import {TopicMessagingService} from "./topic-messaging.service";
import {CommonDataService} from "./common-data.service";
import {CommonDataModel} from "../models/common-data.model";

@Injectable()
export class SyncService {
    public offlineMessages: any[] = [];
    private data: CommonDataModel;

    constructor(private databaseService: DatabaseService,
                private topicMessageService: TopicMessagingService,
                private commonDataService: CommonDataService) {
        this.data = commonDataService.data;

        //console.log(`SyncService => ${this.isConnected}`);
    }

    public pushLocalChanges() {
        let topic = this.data.topic;
        let host = this.data.host;
        let port = this.data.port;

        this.databaseService.find()
            .then((items) => {
                //console.log("items.length: " + items.length);
                if (items.length > 0) {
                    return items;
                } else {
                    throw new Error("NoItems");
                }
            }).then((items) => {
            // Connect to Host
            console.log("Connecting to Host: " + host + " Port: " + port);
            this.topicMessageService.connect(host, port);

            return {client: this.data.client, items: items};

            }).then((data) => {
                // Subscribe to Topic
                console.log(`Subscribing to Topic: ${topic}, client => ${data.client.options.clientId}`);

                this.topicMessageService.subscribe(data.client, topic);

                return data;

            }).then((data) => {
                // Publish messages to Topic
                console.log("Publishing " + data.items.length + " messages to Topic: " + topic);

                //TODO:  needs to be done in a transaction
                //public publish(message: string, client?: any, topic?: string) {
                for (let i in data.items) {
                    this.topicMessageService.publish(data.items[i].data, data.client, topic);
                }

                return data;

            }).then((data) => {
                // Unsubscribe from Topic
                console.log("Unsubscribing from Topic: " + topic);
                this.topicMessageService.unsubscribe(data.client, topic);

                return data;

            }).then((data) => {
                // Remove items from local storage
                console.log("Removing messages from local storage");
                this.databaseService.delete();

                // temporarily save the offline items
                this.offlineMessages = data.items;

            }).catch(function handleReject(reason) {
                if (reason.message === "NoItems") {
                    console.log("The are no items in local storage");
                } else {
                    console.error(reason);
                }
            });
    }
}
