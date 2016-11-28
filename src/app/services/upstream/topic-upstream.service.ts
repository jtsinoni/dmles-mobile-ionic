/**
 * Created by johntsinonis on 11/10/16.
 */
import { Injectable }    from '@angular/core';

import { UpstreamService } from './upstream.service'
import {TopicMessagingService} from "../topic-messaging.service";
import {ConnectivityService} from "../connectivity.service";
import {DatabaseService} from "../database.service";
import {CommonDataService} from "../common-data.service";
import {CommonDataModel} from "../../models/common-data.model";
import Dexie from 'dexie';

class TopicUpstreamModel {
    client: any;
    param: any;
}

@Injectable()
export class TopicUpstreamService extends UpstreamService {
    private data: CommonDataModel;

    constructor(private topicMessagingService: TopicMessagingService,
                private connectivityService: ConnectivityService,
                private databaseService: DatabaseService,
                private commonDataService: CommonDataService) {
        super();

        this.data = commonDataService.data
    }

    public sendData(param: any): Dexie.Promise<any> {
        if(this.connectivityService.isConnected) {
            // 1. Connect to Host
            // 2. Subscribe to Topic
            // 3. Publish messages to Topic
            // 4. Unsubscribe from Topic
            return this.sendDataServer(param);

        } else {
            // Not connected, need to cache data
            return this.sendDataLocal(param);
        }
    }

    public pushLocalChanges() {
        this.databaseService.find().then((items) => {
            if (items.length > 0) {
                return items;
            } else {
                throw new Error("NoItems");
            }
        })
    }

    private adornClient(client: any, param: any) {
        client.host = this.data.host;
        client.port = this.data.port;
        client.topic = this.data.topic;
        client.topicMessagingService = this.topicMessagingService;
        client.items = param;

        return client;
    }

    private connectToHost(param: any): Dexie.Promise<any> {
        let host = this.data.host;
        let port = this.data.port;

        return new Dexie.Promise((resolve, reject) => {
            // First check for network connectivity
            if(this.connectivityService.isConnected) {
                // Second, check if already connected, if not make new Connection
                if(this.topicMessagingService.isConnected(this.data.client)) {
                    resolve(this.adornClient(this.data.client, param));
                } else {
                    let client = this.topicMessagingService.connect(host, port);
                    if(client.connected) {
                        resolve(this.adornClient(this.data.client, param));
                    } else {
                        reject(`Failed to connect to host: ${host} port: ${port}, unable to connect to messaging server`);
                    }
                }
            } else {
                reject(`Failed to connect to host: ${host} port: ${port}, no network connection.`);
            }
        });
    }

    private subscribe(client: any) {
        // Subscribe to Topic
        console.log(`Subscribing to Topic: ${client.topic}, client => ${client.options.clientId}`);
        client.topicMessagingService.subscribe(client, client.topic);

        return client;
    }

    private publish(client: any) {
        // Publish to Topic
        console.log(`Publishing message: " + ${client.items} + to Topic: + ${client.topic}`);
        client.topicMessagingService.publish(client.items, client, client.topic);

        return client;
    }

    private unsubscribe(client: any) {
        // Unsubscribe from Topic
        console.log(`Unsubscribing from Topic: ${client.topic}`);
        client.topicMessagingService.unsubscribe(client, client.topic);

        return client;
    }

    private logErrorMessage(error) {
        console.error("Error: " + error);
    }

    private sendDataServer(param: any): Dexie.Promise<any> {
        return this.connectToHost(param)
            .then(this.subscribe)
            .then(this.publish)
            .then(this.unsubscribe)
            .then(null, this.logErrorMessage);
    }

    private sendDataLocal(param: any): Dexie.Promise<any> {
        return this.databaseService.add(param)
            .then((id)=> {
                console.log(`Succesfully added: ${param} with row id: ${id}`);
            }).catch((error) => {
                console.error(error);
            });
    }
}
