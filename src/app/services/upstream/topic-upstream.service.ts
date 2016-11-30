/**
 * Created by johntsinonis on 11/10/16.
 */
import { Injectable }    from '@angular/core';

import { UpstreamService } from './upstream.service'
import {TopicMessagingService} from "../topic-messaging.service";
import {ConnectivityService} from "../connectivity.service";
import {DatabaseService} from "../database.service";
import {CommonDataService} from "../common-data.service";
import Dexie from 'dexie';
import {ForwardDataModel} from "../../models/forward-data.model";
import {StoreDataModel} from "../../models/store-data.model";

@Injectable()
export class TopicUpstreamService extends UpstreamService {
    private forwardDataModel: ForwardDataModel;
    private storeDataModel: StoreDataModel;

    constructor(private topicMessagingService: TopicMessagingService,
                private connectivityService: ConnectivityService,
                private databaseService: DatabaseService,
                private commonDataService: CommonDataService) {
        super(commonDataService);

        this.forwardDataModel = commonDataService.forwardDataModel;
        this.storeDataModel = commonDataService.storeDataModel;
    }

    public connect(): Dexie.Promise<any> {
        // Get client connection and subscribe
        return this.getClientConnection()
                    .then(this.subscribe);
    }

    public disconnect(): Dexie.Promise<any> {
        // Get client connection and unsubscribe
        return this.getClientConnection()
            .then(this.unsubscribe)
            .then((client) => {
                return this.topicMessagingService.disconnect();
            });
    }

    public pushLocalChanges(): Dexie.Promise<any> {
        return this.findCachedData()
            .then(this.publishMany)
            .then(this.deleteCachedData)
            .then((client) => {
                this.storeDataModel.badgeCount = 0;
                this.forwardDataModel.pushedChanges = client.message;

                return client;
            })
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

    private sendDataServer(message: any): Dexie.Promise<any> {
        return this.getClientConnection()
        //.then(this.subscribe)
            .then((client) => {
                client.message = message;
                return client;
            })
            .then(this.publish)
            //.then(this.unsubscribe)
            .then(null, this.logErrorMessage);
    }

    private sendDataLocal(message: any): Dexie.Promise<any> {
        return this.databaseService.add(message)
            .then((id)=> {
                console.log(`Succesfully added: ${message} with row id: ${id}`);
            }).catch((error) => {
                console.error(error);
            });
    }

    private deleteCachedData(client: any) {
        // Remove items from local storage
        console.log("Removing messages from local storage");
        client.databaseService.delete()
            .then(() => {
                //Do nothing
            }).catch((error) => {
                this.logErrorMessage(error);
            });

        return client;
    }

    private findCachedData(): Dexie.Promise<any> {
        return this.databaseService.find()
            .then((items) => {
                if (items.length > 0) {
                    return this.adornClient(this.data.client, items)
                } else {
                    throw new Error("NoItems");
                }
            })
    }

    private adornClient(client: any, message?: any) {
        client.host = this.data.host;
        client.port = this.data.port;
        client.topic = this.data.topic;
        client.topicMessagingService = this.topicMessagingService;
        client.databaseService = this.databaseService;
        client.connectivityService = this.connectivityService;
        if (message) {
            client.message = message;
        }

        return client;
    }

    private subscribe(client: any) {
        // Subscribe to Topic
        console.log(`Subscribing to Topic: ${client.topic}, client: ${client.options.clientId}`);
        client.topicMessagingService.subscribe(client, client.topic);

        return client;
    }

    private publish(client: any) {
        if(client.connectivityService.isConnected) {
            // Publish to Topic
            console.log(`Publishing message: ${client.message}  to Topic: ${client.topic}`);
            client.topicMessagingService.publish(client.message, client, client.topic);
        } else {
            console.warn("Network disconnected");
        }

        return client;
    }

    private publishMany(client: any) {
        if(client.connectivityService.isConnected) {
            // Publish many messages to Topic
            console.log(`Publishing ${client.message.length} messages to Topic: ${client.topic}`);

            //TODO:  needs to be done in a transaction
            for (let i in client.message) {
                client.topicMessagingService.publish(client.message[i], client, client.topic);
            }
        } else {
            console.warn("Network disconnected");
        }

        return client;
    }

    private unsubscribe(client: any) {
        // Unsubscribe from Topic
        client.topicMessagingService.unsubscribe(client, client.topic);

        return client;
    }

    private logErrorMessage(error) {
        console.error(`Error: ${error}`);
    }

    private getClientConnection(): Dexie.Promise<any> {
        let host = this.data.host;
        let port = this.data.port;

        return new Dexie.Promise((resolve, reject) => {
            // First check for network connectivity
            if(this.connectivityService.isConnected) {
                // Second, check if already connected, if not make new Connection
                if(this.topicMessagingService.isConnected(this.data.client)) {
                    resolve(this.adornClient(this.data.client));
                } else {
                    let client = this.topicMessagingService.connect(host, port);
                    if(client.connected) {
                        resolve(this.adornClient(this.data.client));
                    } else {
                        reject(`Failed to connect to host: ${host} port: ${port}, unable to connect to messaging server`);
                    }
                }
            } else {
                reject(`Failed to connect to host: ${host} port: ${port}, no network connection.`);
            }
        });
    }

}
